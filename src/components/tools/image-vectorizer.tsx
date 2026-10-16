"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { track } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import {
  Upload, Camera, Download, RefreshCw, Loader2, AlertCircle,
  ZoomIn, ZoomOut, Hand, Clock, ShieldCheck, ArrowRight, X,
} from "lucide-react"

/*
 * Vectorisation gratuite dans le navigateur (imagetracerjs, chargé à la demande).
 * Rien n'est envoyé sur un serveur : l'image reste sur l'appareil du visiteur.
 * Le résultat est un tracé automatique, honnêtement présenté comme tel ; la
 * reprise manuelle (69 € HT) est proposée à côté, jamais imposée.
 */

type Preset = { id: string; label: string; hint: string; options: Record<string, number | boolean> }

const PRESETS: Preset[] = [
  { id: "logo", label: "Logo", hint: "2 à 6 couleurs nettes", options: { numberofcolors: 6, colorquantcycles: 3, pathomit: 12, ltres: 0.8, qtres: 0.8, blurradius: 0, roundcoords: 1, linefilter: true } },
  { id: "noir", label: "Noir et blanc", hint: "Tampon, signature, pictogramme", options: { colorsampling: 0, numberofcolors: 2, pathomit: 8, ltres: 0.8, qtres: 0.8, blurradius: 0, roundcoords: 1, linefilter: true } },
  { id: "detail", label: "Détaillé", hint: "Illustration, dégradés", options: { numberofcolors: 16, colorquantcycles: 3, pathomit: 4, ltres: 0.5, qtres: 0.5, blurradius: 0, roundcoords: 1, linefilter: true } },
  { id: "photo", label: "Affiche", hint: "Photo posterisée, 8 couleurs", options: { numberofcolors: 8, colorquantcycles: 3, pathomit: 20, ltres: 1, qtres: 1, blurradius: 3, blurdelta: 30, roundcoords: 1, linefilter: true } },
]

const MAX_SIDE = 1200 // px : au-delà le tracé devient lent sur mobile
const MAX_BYTES = 12 * 1024 * 1024

type Tracer = { imagedataToSVG: (imgd: ImageData, options: Record<string, unknown>) => string }
let tracerPromise: Promise<Tracer> | null = null
function loadTracer() {
  if (!tracerPromise) {
    tracerPromise = import("imagetracerjs").then((m) => (m.default ?? m) as unknown as Tracer)
  }
  return tracerPromise
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} Ko` : `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

export function ImageVectorizer() {
  const [file, setFile] = useState<File | null>(null)
  const [srcUrl, setSrcUrl] = useState<string | null>(null)
  const [imgd, setImgd] = useState<ImageData | null>(null)
  const [preset, setPreset] = useState<string>("logo")
  const [svg, setSvg] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [view, setView] = useState<"vecteur" | "original">("vecteur")
  const inputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const startedAt = useRef<number>(0)

  // Nettoyage des URLs objet
  useEffect(() => () => { if (srcUrl) URL.revokeObjectURL(srcUrl) }, [srcUrl])

  const svgUrl = useMemo(() => (svg ? URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })) : null), [svg])
  useEffect(() => () => { if (svgUrl) URL.revokeObjectURL(svgUrl) }, [svgUrl])

  const decode = useCallback(async (f: File) => {
    setError(null)
    setSvg(null)
    if (f.size > MAX_BYTES) { setError(`Fichier trop lourd (${formatSize(f.size)}). Limite : 12 Mo.`); return }
    if (!f.type.startsWith("image/") || f.type === "image/svg+xml") {
      setError(f.type === "image/svg+xml" ? "Ce fichier est déjà un SVG, donc déjà vectoriel." : "Format non reconnu. Utilisez un PNG, un JPG, un WEBP ou une photo.")
      return
    }
    try {
      const bitmap = await createImageBitmap(f)
      const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
      const w = Math.max(1, Math.round(bitmap.width * scale))
      const h = Math.max(1, Math.round(bitmap.height * scale))
      const canvas = document.createElement("canvas")
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext("2d", { willReadFrequently: true })!
      ctx.drawImage(bitmap, 0, 0, w, h)
      bitmap.close?.()
      setImgd(ctx.getImageData(0, 0, w, h))
      if (srcUrl) URL.revokeObjectURL(srcUrl)
      setSrcUrl(URL.createObjectURL(f))
      setFile(f)
      setZoom(1)
      setView("vecteur")
      track("tool_start", { tool: "vectoriseur", type: f.type, size_kb: Math.round(f.size / 1024) })
    } catch {
      setError("Impossible de lire cette image. Essayez un PNG ou un JPG.")
    }
  }, [srcUrl])

  // Tracé à chaque changement d'image ou de réglage
  useEffect(() => {
    if (!imgd) return
    let cancelled = false
    setBusy(true)
    setError(null)
    startedAt.current = performance.now()
    const p = PRESETS.find((x) => x.id === preset) ?? PRESETS[0]
    ;(async () => {
      try {
        const tracer = await loadTracer()
        // Laisse le navigateur peindre l'état « en cours » avant le calcul bloquant
        await new Promise((r) => setTimeout(r, 30))
        if (cancelled) return
        const out = tracer.imagedataToSVG(imgd, { ...p.options, viewbox: true, desc: false, scale: 1 })
        if (cancelled) return
        setSvg(out)
        track("tool_result", { tool: "vectoriseur", preset: p.id, ms: Math.round(performance.now() - startedAt.current), paths: (out.match(/<path/g) ?? []).length })
      } catch {
        if (!cancelled) setError("Le tracé a échoué sur cette image. Essayez un autre réglage ou une image plus petite.")
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()
    return () => { cancelled = true }
  }, [imgd, preset])

  function reset() {
    setFile(null); setImgd(null); setSvg(null); setError(null)
    if (srcUrl) URL.revokeObjectURL(srcUrl)
    setSrcUrl(null)
    if (inputRef.current) inputRef.current.value = ""
    if (cameraRef.current) cameraRef.current.value = ""
  }

  const baseName = file ? file.name.replace(/\.[^.]+$/, "") : "image"
  const pathCount = svg ? (svg.match(/<path/g) ?? []).length : 0
  const svgKb = svg ? Math.round(new Blob([svg]).size / 1024) : 0

  /* ─── État 1 : dépôt ─── */
  if (!file) {
    return (
      <div className="border border-[#1c1c1c] bg-[#0f0f0f]">
        <div
          role="button"
          tabIndex={0}
          aria-label="Déposer une image à vectoriser"
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click() } }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files?.[0]; if (f) decode(f) }}
          className={`cursor-pointer p-8 sm:p-12 text-center transition-colors ${dragging ? "bg-signal/10" : "hover:bg-[#141414]"}`}
        >
          <Upload className="mx-auto h-8 w-8 text-signal" aria-hidden="true" />
          <p className="mt-4 text-xl sm:text-2xl font-bold text-ivory">Déposez votre image ici</p>
          <p className="mt-2 text-sm text-aluminium">PNG, JPG, WEBP, GIF, jusqu&apos;à 12 Mo. Le tracé se fait sur votre appareil, l&apos;image n&apos;est envoyée nulle part.</p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button type="button" size="md" onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}>
              <Upload className="h-4 w-4" aria-hidden="true" /> Choisir une image
            </Button>
            <Button type="button" size="md" variant="outline" className="sm:hidden" onClick={(e) => { e.stopPropagation(); cameraRef.current?.click() }}>
              <Camera className="h-4 w-4" aria-hidden="true" /> Prendre en photo
            </Button>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) decode(f) }} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) decode(f) }} />
        </div>
        {error && (
          <p role="alert" className="flex items-center gap-2 border-t border-[#1c1c1c] px-6 py-4 text-sm text-signal">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
          </p>
        )}
      </div>
    )
  }

  /* ─── État 2 : résultat ─── */
  return (
    <div className="border border-[#1c1c1c] bg-[#0f0f0f]">
      {/* Barre : réglages */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1c1c1c] p-3 sm:p-4">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Type d'image">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={preset === p.id}
              onClick={() => setPreset(p.id)}
              title={p.hint}
              className={`h-10 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${preset === p.id ? "bg-ivory text-noir" : "border border-[#2a2a2a] text-aluminium hover:text-ivory"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={reset} className="ml-auto inline-flex h-10 items-center gap-2 px-3 text-xs font-bold uppercase tracking-widest text-aluminium hover:text-ivory">
          <X className="h-4 w-4" aria-hidden="true" /> Autre image
        </button>
      </div>

      {/* Aperçu */}
      <div className="relative">
        <div className="absolute left-3 top-3 z-10 flex gap-1" role="tablist" aria-label="Aperçu">
          {(["vecteur", "original"] as const).map((v) => (
            <button key={v} type="button" role="tab" aria-selected={view === v} onClick={() => setView(v)}
              className={`h-8 px-3 text-[11px] font-bold uppercase tracking-widest ${view === v ? "bg-signal text-white" : "bg-noir/80 text-aluminium hover:text-ivory"}`}>
              {v === "vecteur" ? "Vecteur" : "Original"}
            </button>
          ))}
        </div>
        <div className="absolute right-3 top-3 z-10 flex gap-1">
          <button type="button" aria-label="Zoom arrière" onClick={() => setZoom((z) => Math.max(0.5, z / 1.5))} className="h-8 w-8 bg-noir/80 text-aluminium hover:text-ivory inline-flex items-center justify-center"><ZoomOut className="h-4 w-4" /></button>
          <button type="button" aria-label="Zoom avant" onClick={() => setZoom((z) => Math.min(8, z * 1.5))} className="h-8 w-8 bg-noir/80 text-aluminium hover:text-ivory inline-flex items-center justify-center"><ZoomIn className="h-4 w-4" /></button>
        </div>
        <div
          className="h-[52vh] min-h-[280px] max-h-[560px] overflow-auto bg-[conic-gradient(#1a1a1a_25%,#111_0_50%,#1a1a1a_0_75%,#111_0)] bg-[length:24px_24px] touch-pan-x touch-pan-y"
          aria-busy={busy}
        >
          <div className="flex min-h-full min-w-full items-center justify-center p-4 sm:p-6 [&>*]:max-w-full">
            {view === "vecteur" ? (
              svg ? (
                <div
                  className="[&>svg]:block [&>svg]:h-auto [&>svg]:max-w-none [&>svg]:w-[var(--w)]"
                  style={{ ["--w" as string]: zoom === 1 ? `min(100%, ${Math.min(imgd?.width ?? 600, 600)}px)` : `${Math.round(Math.min(imgd?.width ?? 600, 600) * zoom)}px` }}
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-aluminium">
                  <Loader2 className="h-6 w-6 animate-spin text-signal" aria-hidden="true" />
                  <p className="text-sm">Tracé en cours sur votre appareil…</p>
                </div>
              )
            ) : (
              srcUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={srcUrl} alt="Image d'origine" style={{ width: zoom === 1 ? `min(100%, ${Math.min(imgd?.width ?? 600, 600)}px)` : Math.round(Math.min(imgd?.width ?? 600, 600) * zoom) }} className="block max-w-none [image-rendering:pixelated]" />
              )
            )}
          </div>
        </div>
        {busy && svg && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-noir/80 px-3 py-1.5 text-xs text-aluminium">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-signal" aria-hidden="true" /> Nouveau tracé…
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2 border-t border-[#1c1c1c] px-6 py-4 text-sm text-signal">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}

      {/* Barre : résultat + téléchargement */}
      <div className="flex flex-col gap-4 border-t border-[#1c1c1c] p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-aluminium">
          {svg ? (
            <>
              <span className="text-ivory font-semibold">{pathCount} forme{pathCount > 1 ? "s" : ""}</span> · SVG de {svgKb} Ko · {imgd?.width}×{imgd?.height} px analysés
            </>
          ) : "…"}
        </p>
        <div className="flex gap-3">
          {svgUrl ? (
            <a
              href={svgUrl}
              download={`${baseName}-vectorise.svg`}
              onClick={() => track("tool_download", { tool: "vectoriseur", preset, paths: pathCount })}
              className="inline-flex h-12 items-center justify-center gap-2 bg-signal px-7 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#d62e20] transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Télécharger le SVG
            </a>
          ) : (
            <Button type="button" disabled><RefreshCw className="h-4 w-4" aria-hidden="true" /> Tracé en cours</Button>
          )}
        </div>
      </div>

      {/* Pont vers la reprise manuelle, sans forcer */}
      <div className="border-t border-[#1c1c1c] bg-[#141414] p-5 sm:p-6">
        <p className="text-base sm:text-lg font-bold text-ivory">
          Zoomez sur les bords. S&apos;ils sont tremblés, c&apos;est normal : un tracé automatique reproduit les pixels, il ne comprend pas le dessin.
        </p>
        <p className="mt-2 text-sm text-aluminium leading-relaxed">
          Pour un logo qui part chez un imprimeur, un brodeur ou un enseigniste, un designer le redessine à la main à partir de ce même fichier : formes propres, typographie identifiée, couleurs exactes, fichiers AI, EPS, SVG et PDF.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-aluminium sm:grid-cols-3">
          <li className="flex items-center gap-2"><Hand className="h-4 w-4 text-signal" aria-hidden="true" /> Redessin manuel, pas un tracé</li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-signal" aria-hidden="true" /> Livré sous 24 h</li>
          <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-signal" aria-hidden="true" /> 69 € HT, remboursé si on ne peut pas</li>
        </ul>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button href="/services/vectorisation-logo#envoyer" size="md" track={{ event: "cta_click", props: { cta: "vectorisation-pro", location: "vectoriseur-result" } }}>
            Faire redessiner mon logo <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Link href="/blog/comment-vectoriser-un-logo" className="inline-flex h-12 items-center text-sm text-aluminium underline underline-offset-4 hover:text-ivory">
            Comprendre la différence entre tracé et redessin
          </Link>
        </div>
      </div>
    </div>
  )
}

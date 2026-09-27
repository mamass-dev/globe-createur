"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Wordmark } from "@/components/ui/wordmark"
import { CardIntro } from "@/components/carte/card-intro"
import { WHATSAPP_NUMBER } from "@/components/ui/whatsapp-link"
import { track, trackAttrs } from "@/lib/analytics"
import type { IgLink } from "@/lib/data/ig-links"

/**
 * Page de liens Instagram en format story : une carte plein écran par destination, visuel réel,
 * hook en gros, un seul bouton. Swipe horizontal / flèches / clavier, barre de progression en haut,
 * intro « G » au chargement (une fois par session), suivi Rybbit `ig_view` + `ig_click`.
 */
export function IgStories({ links, handle, tagline }: { links: IgLink[]; handle: string; tagline: string }) {
  const [intro, setIntro] = useState(true)
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const touch = useRef<{ x: number; y: number } | null>(null)
  const n = links.length
  const cur = links[i]

  const go = useCallback(
    (d: number) => {
      setDir(d)
      setI((v) => Math.min(n - 1, Math.max(0, v + d)))
    },
    [n]
  )

  useEffect(() => {
    if (intro) return
    track("ig_view", { link: cur.id, index: i + 1 })
  }, [i, intro, cur.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  const onIntroDone = useCallback(() => setIntro(false), [])
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Axel, je viens d'Instagram et j'aimerais discuter d'un projet.")}`

  return (
    <div className="flex min-h-dvh items-center justify-center bg-noir lg:py-8">
    <div
      className="relative h-dvh w-full overflow-hidden bg-noir text-ivory select-none lg:h-[min(860px,calc(100dvh-4rem))] lg:w-[420px] lg:border lg:border-[#2a2a2a] lg:shadow-[0_0_120px_rgba(230,58,43,0.15)]"
      onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
      onTouchEnd={(e) => {
        if (!touch.current) return
        const dx = e.changedTouches[0].clientX - touch.current.x
        const dy = e.changedTouches[0].clientY - touch.current.y
        touch.current = null
        if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      }}
    >
      <CardIntro slug="ig" onDone={onIntroDone} />

      {/* Visuel plein écran */}
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={cur.id}
          custom={dir}
          initial={{ opacity: 0, x: dir * 60, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -dir * 60, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={cur.image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/90" />
        </motion.div>
      </AnimatePresence>

      {/* Zones tap gauche / droite (mobile) */}
      {/* Zones de tap sur la moitié haute (le bas est réservé au bouton) : gauche = précédent, droite = suivant */}
      <button type="button" aria-label="Précédent" onClick={() => go(-1)} className="absolute left-0 top-0 z-30 h-1/2 w-1/3 cursor-pointer" />
      <button type="button" aria-label="Suivant" onClick={() => go(1)} className="absolute right-0 top-0 z-30 h-1/2 w-2/3 cursor-pointer" />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-md flex-col px-5 pb-6 pt-4" style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}>
        {/* Progression */}
        <div className="relative z-40 flex gap-1.5">
          {links.map((l, k) => (
            <button
              key={l.id}
              type="button"
              aria-label={`Aller à ${k + 1}`}
              onClick={() => { setDir(k > i ? 1 : -1); setI(k) }}
              className="h-1 flex-1 overflow-hidden bg-white/25"
            >
              <span className={`block h-full bg-ivory transition-[width] duration-500 ${k < i ? "w-full" : k === i ? "w-full" : "w-0"}`} />
            </button>
          ))}
        </div>

        {/* En-tête */}
        <div className="relative z-40 mt-4 flex items-center justify-between">
          <Wordmark size="sm" />
          <a href={`https://www.instagram.com/${handle.replace("@", "")}/`} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold uppercase tracking-widest text-ivory/80">
            {handle}
          </a>
        </div>

        {/* Contenu de la carte */}
        <div className="mt-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: intro ? 0 : 1, y: intro ? 22 : 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 font-mono-accent text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
                <span className="h-[2px] w-6 bg-signal" />
                {cur.tag} · {i + 1}/{n}
              </span>
              <h1 className="text-impact mt-4 text-[2.4rem] leading-[0.95] sm:text-5xl text-ivory">{cur.hook}</h1>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-ivory/80">{cur.sub}</p>
              <a
                href={cur.href}
                {...(cur.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...trackAttrs("ig_click", { link: cur.id, index: String(i + 1) })}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 bg-signal text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#d62e20]"
              >
                {cur.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Pied : WhatsApp + navigation */}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              {...trackAttrs("whatsapp_click", { location: "ig" })}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-bold text-white"
              style={{ backgroundColor: "#25D366" }}
            >
              WhatsApp
            </a>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => go(-1)} disabled={i === 0} aria-label="Précédent" className="flex h-10 w-10 items-center justify-center border border-white/25 text-ivory disabled:opacity-30">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(1)} disabled={i === n - 1} aria-label="Suivant" className="flex h-10 w-10 items-center justify-center border border-white/25 text-ivory disabled:opacity-30">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-ivory/50">{tagline}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

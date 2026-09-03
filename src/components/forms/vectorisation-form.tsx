"use client"

import { useRef, useState } from "react"
import { track } from "@/lib/analytics"
import { Upload, FileImage, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import {
  VECTO_OFFRES,
  VECTO_ACCEPT_MIME,
  VECTO_MAX_FILE_MB,
  VECTO_FORMATS_ACCEPTES,
  VECTO_DELAI_HEURES,
  formatPrixVecto,
} from "@/lib/data/vectorisation"

const MAX_BYTES = VECTO_MAX_FILE_MB * 1024 * 1024
const MAX_FILES = 3

function formatSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} Ko` : `${(bytes / 1024 / 1024).toFixed(1)} Mo`
}

export function VectorisationForm({ defaultOffre = "simple" }: { defaultOffre?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const [offre, setOffre] = useState(defaultOffre)
  const [dragging, setDragging] = useState(false)
  const [renderTime] = useState(() => Date.now())
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(list: FileList | File[]) {
    setErrorMsg(null)
    const incoming = Array.from(list)
    const next = [...files]
    for (const f of incoming) {
      if (next.length >= MAX_FILES) {
        setErrorMsg(`${MAX_FILES} fichiers maximum.`)
        break
      }
      if (!VECTO_ACCEPT_MIME.includes(f.type)) {
        setErrorMsg(`« ${f.name} » n'est pas un format pris en charge (${VECTO_FORMATS_ACCEPTES.join(", ")}).`)
        continue
      }
      if (next.some((x) => x.name === f.name && x.size === f.size)) continue
      next.push(f)
    }
    const total = next.reduce((s, f) => s + f.size, 0)
    if (total > MAX_BYTES) {
      setErrorMsg(`${VECTO_MAX_FILE_MB} Mo maximum au total. Au-delà, collez un lien WeTransfer ou Drive dans le message.`)
      return
    }
    setFiles(next)
  }

  function removeFile(i: number) {
    setFiles(files.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)
    if (files.length === 0) {
      setErrorMsg("Ajoutez votre logo (PNG, JPG, PDF…) avant d'envoyer.")
      return
    }
    setStatus("loading")
    const formData = new FormData(e.currentTarget)
    formData.delete("files")
    files.forEach((f) => formData.append("files", f))
    formData.set("_t", String(renderTime))
    try {
      const res = await fetch("/api/vectorisation", { method: "POST", body: formData })
      if (res.ok) {
        setStatus("success")
        track("lead_submit", { form: "vectorisation", offre: String(formData.get("offre") ?? "") })
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error ?? "Une erreur est survenue. Réessayez.")
        setStatus("error")
        track("lead_error", { form: "vectorisation" })
      }
    } catch {
      setErrorMsg("Une erreur est survenue. Réessayez ou écrivez-nous à contact@globecreateur.fr.")
      setStatus("error")
      track("lead_error", { form: "vectorisation" })
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-signal/40 bg-[#141414] p-8 lg:p-10">
        <CheckCircle2 className="h-8 w-8 text-signal" aria-hidden="true" />
        <p className="mt-4 text-2xl font-bold text-ivory">Logo bien reçu.</p>
        <ol className="mt-4 space-y-2 text-sm text-aluminium leading-relaxed list-decimal pl-5">
          <li>Un designer vérifie votre fichier et vous confirme le forfait par email (ou vous dit honnêtement si ce n&apos;est pas le bon).</li>
          <li>Vous recevez un lien de paiement sécurisé.</li>
          <li>Vos fichiers vectoriels sont livrés sous {VECTO_DELAI_HEURES} h ouvrées après paiement.</li>
        </ol>
        <p className="mt-4 text-xs text-aluminium">
          Un accusé de réception vient de partir sur votre adresse email. Pas reçu ? Vérifiez vos spams ou écrivez à contact@globecreateur.fr.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <input type="text" name="_hp" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />

      {/* Zone de dépôt */}
      <div>
        <span className="block text-xs font-black uppercase tracking-widest text-gray-400">Votre logo</span>
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
          className={`mt-3 flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragging ? "border-signal bg-signal/5" : "border-[#2a2a2a] hover:border-aluminium"
          }`}
        >
          <Upload className="h-7 w-7 text-signal" aria-hidden="true" />
          <p className="text-base font-bold text-ivory">Glissez votre logo ici, ou cliquez pour le choisir</p>
          <p className="text-xs text-aluminium">
            {VECTO_FORMATS_ACCEPTES.join(", ")} — {VECTO_MAX_FILE_MB} Mo max. Envoyez la meilleure qualité que vous avez, même si c&apos;est une capture d&apos;écran.
          </p>
          <input
            ref={inputRef}
            type="file"
            name="files"
            accept={VECTO_ACCEPT_MIME.join(",")}
            multiple
            className="sr-only"
            onChange={(e) => e.target.files && addFiles(e.target.files)}
          />
        </div>
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 border border-[#2a2a2a] bg-[#141414] px-4 py-2.5 text-sm">
                <FileImage className="h-4 w-4 text-signal shrink-0" aria-hidden="true" />
                <span className="truncate text-ivory">{f.name}</span>
                <span className="text-xs text-aluminium shrink-0">{formatSize(f.size)}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-auto text-aluminium hover:text-signal transition-colors"
                  aria-label={`Retirer ${f.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Forfait */}
      <fieldset>
        <legend className="block text-xs font-black uppercase tracking-widest text-gray-400">Forfait</legend>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          {VECTO_OFFRES.map((o) => (
            <label
              key={o.id}
              className={`cursor-pointer border p-4 transition-colors ${
                offre === o.id ? "border-signal bg-signal/5" : "border-[#2a2a2a] hover:border-aluminium"
              }`}
            >
              <input
                type="radio"
                name="offre"
                value={o.id}
                checked={offre === o.id}
                onChange={() => setOffre(o.id)}
                className="sr-only"
              />
              <span className="block text-sm font-bold text-ivory">{o.nom}</span>
              <span className="mt-1 block font-mono-accent text-xs uppercase tracking-widest text-signal">{formatPrixVecto(o)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nom complet" name="name" id="vecto-name" required placeholder="Jean Dupont" />
        <Input label="Email" name="email" id="vecto-email" type="email" required placeholder="jean@exemple.fr" />
      </div>
      <Input label="Entreprise (facultatif)" name="company" id="vecto-company" placeholder="Nom de votre entreprise" />
      <Input
        label="À quoi va servir le logo ? (facultatif)"
        name="usage"
        id="vecto-usage"
        placeholder="Cartes de visite, t-shirts, enseigne, véhicule, site…"
      />
      <Textarea
        label="Un détail à nous signaler ? (facultatif)"
        name="message"
        id="vecto-message"
        rows={3}
        placeholder="Police utilisée si vous la connaissez, couleurs exactes, lien WeTransfer si le fichier est lourd…"
      />

      {errorMsg && <p className="text-sm font-bold text-signal">{errorMsg}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Envoi en cours…" : "Envoyer mon logo"}
        </Button>
        <p className="text-xs text-aluminium leading-relaxed">
          Aucun paiement à cette étape : on vérifie d&apos;abord votre fichier, vous réglez ensuite par lien sécurisé.
        </p>
      </div>
    </form>
  )
}

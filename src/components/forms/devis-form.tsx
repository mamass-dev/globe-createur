"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { track } from "@/lib/analytics"

type DevisFormProps = {
  /** Pré-remplit le service (pages d'offres à prix fixe) : le champ n'est alors pas affiché. */
  defaultService?: string
  submitLabel?: string
  successTitle?: string
  successText?: string
}

/**
 * Formulaire de devis court : nom, email, téléphone, une phrase.
 * Rien d'autre n'est demandé avant le premier échange (le détail se qualifie de vive voix).
 */
export function DevisForm({
  defaultService,
  submitLabel = "Recevoir ma proposition",
  successTitle = "Demande envoyée !",
  successText = "On vous répond sous 24 h ouvrées, par email ou par téléphone si vous l'avez laissé.",
}: DevisFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [renderTime] = useState(() => Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    if (formData.get("_hp")) return
    const service = defaultService ?? ""
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service,
          message: formData.get("message"),
          _hp: formData.get("_hp"),
          _t: renderTime,
        }),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        setStatus("success")
        track(data?.filtered ? "lead_filtered" : "lead_submit", { form: "devis", service })
      } else {
        setStatus("error")
        track("lead_error", { form: "devis", service })
      }
    } catch {
      setStatus("error")
      track("lead_error", { form: "devis", service })
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 dark:bg-success/10 p-8 text-center">
        <p className="text-lg font-semibold text-foreground">{successTitle}</p>
        <p className="mt-2 text-gray-500 dark:text-slate-400">{successText}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="_hp" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Votre nom" name="name" id="name" required autoComplete="name" placeholder="Jean Dupont" />
        <Input label="Email" name="email" id="email" type="email" required autoComplete="email" placeholder="jean@exemple.fr" />
      </div>
      <Input
        label="Téléphone (optionnel, pour aller plus vite)"
        name="phone"
        id="phone"
        type="tel"
        autoComplete="tel"
        placeholder="06 12 34 56 78"
      />
      <Textarea
        label={defaultService ? "Un mot sur votre contexte" : "Votre projet, en une phrase"}
        name="message"
        id="message"
        required
        rows={3}
        placeholder={defaultService ? "Votre site, votre activité, votre échéance…" : "Ex. : refaire le site de mon cabinet avant janvier"}
      />
      {status === "error" && (
        <p className="text-sm text-error">Une erreur est survenue. Réessayez, ou écrivez à contact@globecreateur.fr.</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : submitLabel}
      </Button>
      <p className="text-xs text-gray-400 dark:text-slate-500">Sans engagement. Pas de newsletter, pas de relance automatique en boucle.</p>
    </form>
  )
}

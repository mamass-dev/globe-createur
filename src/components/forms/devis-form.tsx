"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"

const serviceOptions = [
  "Création de site internet",
  "Refonte de site internet",
  "SEO local",
  "Création de contenu",
  "Support communication",
  "Automatisation no-code",
  "Forfait communication",
  "Autre",
]

export function DevisForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [renderTime] = useState(() => Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    if (formData.get("_hp")) return
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          service: formData.get("service"),
          budget: formData.get("budget"),
          message: formData.get("message"),
          _hp: formData.get("_hp"),
          _t: renderTime,
        }),
        headers: { "Content-Type": "application/json" },
      })

      if (res.ok) {
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 dark:bg-success/10 p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Demande envoyée !</p>
        <p className="mt-2 text-gray-500 dark:text-slate-400">Nous préparons votre devis et revenons vers vous sous 48h.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="_hp" autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nom complet" name="name" id="name" required placeholder="Jean Dupont" />
        <Input label="Email" name="email" id="email" type="email" required placeholder="jean@exemple.fr" />
      </div>
      <Input label="Entreprise" name="company" id="company" placeholder="Nom de votre entreprise" />
      <div className="space-y-1.5">
        <label htmlFor="service" className="block text-sm font-medium text-foreground">
          Service souhaité
        </label>
        <select
          name="service"
          id="service"
          required
          className="w-full rounded-lg border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-foreground transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none"
        >
          <option value="">Sélectionnez un service</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="budget" className="block text-sm font-medium text-foreground">
          Budget indicatif
        </label>
        <select
          name="budget"
          id="budget"
          className="w-full rounded-lg border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-foreground transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none"
        >
          <option value="">Sélectionnez une fourchette</option>
          <option value="< 1 500 €">&lt; 1 500 €</option>
          <option value="1 500 – 3 000 €">1 500 – 3 000 €</option>
          <option value="3 000 – 5 000 €">3 000 – 5 000 €</option>
          <option value="5 000 – 10 000 €">5 000 – 10 000 €</option>
          <option value="> 10 000 €">&gt; 10 000 €</option>
        </select>
      </div>
      <Textarea
        label="Décrivez votre projet"
        name="message"
        id="message"
        required
        rows={5}
        placeholder="Objectifs, délais, contraintes particulières…"
      />
      {status === "error" && (
        <p className="text-sm text-error">Une erreur est survenue. Veuillez réessayer.</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Demander mon devis gratuit"}
      </Button>
    </form>
  )
}

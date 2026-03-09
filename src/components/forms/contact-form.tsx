"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
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
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Message envoyé !</p>
        <p className="mt-2 text-gray-500">Nous vous répondrons sous 24h.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Nom complet" name="name" id="name" required placeholder="Jean Dupont" />
        <Input label="Email" name="email" id="email" type="email" required placeholder="jean@exemple.fr" />
      </div>
      <Textarea
        label="Votre message"
        name="message"
        id="message"
        required
        rows={5}
        placeholder="Décrivez votre projet ou votre besoin…"
      />
      {status === "error" && (
        <p className="text-sm text-error">Une erreur est survenue. Veuillez réessayer.</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  )
}

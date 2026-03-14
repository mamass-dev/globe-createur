"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Lock, Mail, Phone, User, CheckCircle2, ArrowRight } from "lucide-react"

type LeadCaptureGateProps = {
  source: string
  context: Record<string, unknown>
  teaser: string
  ctaLabel?: string
  onUnlock: () => void
}

export function LeadCaptureGate({
  source,
  context,
  teaser,
  ctaLabel = "Recevoir mon rapport complet",
  onUnlock,
}: LeadCaptureGateProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [hp, setHp] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [renderTime] = useState(() => Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) return
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source, context, _hp: hp, _t: renderTime }),
      })

      if (res.ok) {
        setStatus("success")
        setTimeout(onUnlock, 1200)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50 p-8 lg:p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <CheckCircle2 className="h-14 w-14 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
          Merci {name.split(" ")[0]} !
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Vos résultats détaillés s&apos;affichent...
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30 pointer-events-none" />

      <div className="relative p-8 lg:p-10">
        {/* Lock icon + teaser */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Débloquez vos résultats complets
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            {teaser}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
          <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              required
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              placeholder="Téléphone (optionnel)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-500 text-center font-medium">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              "Envoi en cours..."
            ) : (
              <>
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            En soumettant ce formulaire, vous acceptez d&apos;être recontacté par Globe Créateur.
            Aucun spam, promis.
          </p>
        </form>
      </div>
    </motion.div>
  )
}

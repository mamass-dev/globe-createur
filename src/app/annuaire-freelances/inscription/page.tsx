"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categoryLabels } from "@/lib/data/freelances"
import type { FreelanceCategory } from "@/lib/data/freelances"
import { UserPlus, CheckCircle2, User, Mail, Phone, Globe, Linkedin, Instagram, MapPin, Briefcase, PenTool, Sparkles } from "lucide-react"

const inputClass =
  "w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"

export default function InscriptionFreelancePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [hp, setHp] = useState("")
  const [renderTime] = useState(() => Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (hp) return

    setStatus("loading")
    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get("name") as string,
      title: form.get("title") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      website: form.get("website") as string,
      linkedin: form.get("linkedin") as string,
      instagram: form.get("instagram") as string,
      location: form.get("location") as string,
      category: form.get("category") as string,
      bio: form.get("bio") as string,
      skills: form.get("skills") as string,
      _hp: hp,
      _t: renderTime,
    }

    try {
      const res = await fetch("/api/freelance-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <>
        <Breadcrumb
          items={[
            { name: "Annuaire Freelances", href: "/annuaire-freelances" },
            { name: "Inscription", href: "/annuaire-freelances/inscription" },
          ]}
        />
        <Container className="pt-28 pb-20 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
              Demande envoyée !
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Merci pour votre inscription. Nous vérifions votre profil et le publions sous 48h.
              Vous recevrez un email de confirmation.
            </p>
            <Button href="/annuaire-freelances" variant="outline" className="mt-8">
              Retour à l&apos;annuaire
            </Button>
          </motion.div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Annuaire Freelances", href: "/annuaire-freelances" },
          { name: "Inscription", href: "/annuaire-freelances/inscription" },
        ]}
      />

      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
            <UserPlus className="h-4 w-4" />
            Inscription gratuite
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-3xl mx-auto">
            Rejoignez l&apos;annuaire{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">freelances</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Référencez-vous gratuitement et gagnez en visibilité auprès des PME de Bourgogne-Franche-Comté.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Sparkles, label: "100% gratuit", desc: "Sans engagement" },
              { icon: Globe, label: "Votre fiche SEO", desc: "Référencée sur Google" },
              { icon: Mail, label: "Contact direct", desc: "Les PME vous trouvent" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-violet-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{f.label}</p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12 lg:py-20">
        <Card className="max-w-2xl mx-auto p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="name" type="text" required placeholder="Prénom et nom *" className={inputClass} />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="title" type="text" required placeholder="Titre / Métier *" className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="email" type="email" required placeholder="Email *" className={inputClass} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="phone" type="tel" placeholder="Téléphone" className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="location" type="text" required placeholder="Ville, département *" className={inputClass} />
              </div>
              <div className="relative">
                <PenTool className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select name="category" required className={`${inputClass} pl-11 appearance-none cursor-pointer`}>
                  <option value="">Catégorie *</option>
                  {Object.entries(categoryLabels).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="website" type="url" placeholder="Site web" className={inputClass} />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="linkedin" type="url" placeholder="LinkedIn" className={inputClass} />
              </div>
              <div className="relative">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input name="instagram" type="url" placeholder="Instagram" className={inputClass} />
              </div>
            </div>

            <div>
              <textarea
                name="bio"
                required
                rows={4}
                placeholder="Décrivez votre activité, votre expérience et ce qui vous différencie... *"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none"
              />
            </div>

            <div>
              <input
                name="skills"
                type="text"
                required
                placeholder="Compétences (séparées par des virgules) *"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
              <p className="mt-1.5 text-xs text-slate-400">Ex : React, Next.js, Tailwind CSS, SEO, Figma</p>
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500 font-medium text-center">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white py-3.5 rounded-xl font-bold cursor-pointer disabled:opacity-60"
            >
              {status === "loading" ? "Envoi en cours..." : "Soumettre mon profil"}
            </Button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Votre profil sera vérifié et publié sous 48h. En soumettant ce formulaire, vous acceptez
              d&apos;apparaître dans l&apos;annuaire Globe Créateur.
            </p>
          </form>
        </Card>
      </Container>
    </>
  )
}

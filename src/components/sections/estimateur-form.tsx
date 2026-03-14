"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  ShoppingCart,
  RefreshCw,
  Search,
  PenTool,
  HelpCircle,
  FileText,
  BookOpen,
  CalendarCheck,
  Users,
  Languages,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* ────────────────────────────────────────────────────────────────────────────
   Types & Constants
   ──────────────────────────────────────────────────────────────────────────── */

type ProjectType =
  | "site-vitrine"
  | "site-ecommerce"
  | "refonte"
  | "seo"
  | "contenu"
  | "autre"

type FormState = {
  projectType: ProjectType | null
  // Site options
  pageCount: string | null
  features: string[]
  // SEO options
  siteExists: string | null
  geoZone: string | null
  // Content options
  contentTypes: string[]
  // Budget & timeline
  budget: string | null
  timeline: string | null
  // Contact
  name: string
  email: string
  phone: string
  message: string
}

const initialState: FormState = {
  projectType: null,
  pageCount: null,
  features: [],
  siteExists: null,
  geoZone: null,
  contentTypes: [],
  budget: null,
  timeline: null,
  name: "",
  email: "",
  phone: "",
  message: "",
}

const projectTypes = [
  { id: "site-vitrine" as const, label: "Site vitrine", icon: Globe },
  { id: "site-ecommerce" as const, label: "Site e-commerce", icon: ShoppingCart },
  { id: "refonte" as const, label: "Refonte de site", icon: RefreshCw },
  { id: "seo" as const, label: "SEO / Référencement", icon: Search },
  { id: "contenu" as const, label: "Création de contenu", icon: PenTool },
  { id: "autre" as const, label: "Autre", icon: HelpCircle },
]

const pageOptions = [
  { id: "1-5", label: "1 – 5 pages" },
  { id: "6-10", label: "6 – 10 pages" },
  { id: "11-20", label: "11 – 20 pages" },
  { id: "20+", label: "20+ pages" },
]

const featureOptions = [
  { id: "formulaire", label: "Formulaire de contact", icon: FileText },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "reservation", label: "Réservation en ligne", icon: CalendarCheck },
  { id: "espace-client", label: "Espace client", icon: Users },
  { id: "multilingue", label: "Multilingue", icon: Languages },
  { id: "paiement", label: "Paiement en ligne", icon: CreditCard },
]

const geoOptions = [
  { id: "locale", label: "Locale (ville)" },
  { id: "regionale", label: "Régionale" },
  { id: "nationale", label: "Nationale" },
]

const contentTypeOptions = [
  { id: "photo", label: "Photographie" },
  { id: "video", label: "Vidéo" },
  { id: "reseaux-sociaux", label: "Réseaux sociaux" },
  { id: "redaction", label: "Rédaction web" },
]

const budgetOptions = [
  { id: "<1000", label: "Moins de 1 000 €" },
  { id: "1000-3000", label: "1 000 – 3 000 €" },
  { id: "3000-5000", label: "3 000 – 5 000 €" },
  { id: "5000-10000", label: "5 000 – 10 000 €" },
  { id: "10000+", label: "10 000 €+" },
]

const timelineOptions = [
  { id: "<1mois", label: "Moins d'1 mois" },
  { id: "1-2mois", label: "1 – 2 mois" },
  { id: "2-3mois", label: "2 – 3 mois" },
  { id: "pas-presse", label: "Pas pressé" },
]

const stepLabels = [
  "Type de projet",
  "Détails",
  "Budget & Délais",
  "Résultat",
]

/* ────────────────────────────────────────────────────────────────────────────
   Pricing Logic
   ──────────────────────────────────────────────────────────────────────────── */

function computeEstimate(state: FormState): { min: number; max: number; monthly: boolean } {
  const { projectType, pageCount, features, siteExists, geoZone, contentTypes } = state

  if (projectType === "seo") {
    let min = 500
    let max = 800
    if (siteExists === "non") {
      min += 200
      max += 300
    }
    if (geoZone === "regionale") {
      min += 200
      max += 300
    }
    if (geoZone === "nationale") {
      min += 500
      max += 700
    }
    return { min, max, monthly: true }
  }

  if (projectType === "contenu") {
    let min = 0
    let max = 0
    const prices: Record<string, [number, number]> = {
      photo: [500, 1200],
      video: [800, 2000],
      "reseaux-sociaux": [400, 1000],
      redaction: [300, 800],
    }
    for (const ct of contentTypes) {
      const [lo, hi] = prices[ct] ?? [300, 800]
      min += lo
      max += hi
    }
    if (min === 0) {
      min = 500
      max = 2000
    }
    return { min, max, monthly: false }
  }

  if (projectType === "autre") {
    return { min: 1000, max: 5000, monthly: false }
  }

  // Site-based projects
  const basePrices: Record<string, number> = {
    "site-vitrine": 1500,
    "site-ecommerce": 3000,
    refonte: 1200,
  }

  let base = basePrices[projectType ?? "site-vitrine"] ?? 1500

  // Page count modifier
  const pageModifiers: Record<string, number> = {
    "1-5": 0,
    "6-10": 500,
    "11-20": 1000,
    "20+": 2000,
  }
  base += pageModifiers[pageCount ?? "1-5"] ?? 0

  // Feature modifiers
  const featurePrices: Record<string, [number, number]> = {
    formulaire: [300, 500],
    blog: [400, 700],
    reservation: [600, 1000],
    "espace-client": [800, 1500],
    multilingue: [500, 1000],
    paiement: [600, 1200],
  }

  let featureMin = 0
  let featureMax = 0
  for (const f of features) {
    const [lo, hi] = featurePrices[f] ?? [300, 600]
    featureMin += lo
    featureMax += hi
  }

  return {
    min: base + featureMin,
    max: base + featureMax + 500,
    monthly: false,
  }
}

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n)

/* ────────────────────────────────────────────────────────────────────────────
   Fade wrapper
   ──────────────────────────────────────────────────────────────────────────── */

const fadeVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
}

/* ────────────────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────────────────── */

export function EstimateurForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hp, setHp] = useState("")
  const [renderTime] = useState(() => Date.now())

  const isSiteProject =
    form.projectType === "site-vitrine" ||
    form.projectType === "site-ecommerce" ||
    form.projectType === "refonte"

  /* ── helpers ── */

  const toggleFeature = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }))
  }, [])

  const toggleContentType = useCallback((id: string) => {
    setForm((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(id)
        ? prev.contentTypes.filter((c) => c !== id)
        : [...prev.contentTypes, id],
    }))
  }, [])

  const canGoNext = (): boolean => {
    if (step === 1) return form.projectType !== null
    if (step === 2) {
      if (isSiteProject) return form.pageCount !== null
      if (form.projectType === "seo") return form.siteExists !== null && form.geoZone !== null
      if (form.projectType === "contenu") return form.contentTypes.length > 0
      return true // "autre"
    }
    if (step === 3) return form.budget !== null && form.timeline !== null
    return true
  }

  const handleSubmit = async () => {
    if (hp) return
    setSubmitting(true)
    try {
      const estimate = computeEstimate(form)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `[Estimateur] Projet : ${form.projectType} | Budget estimé : ${fmt(estimate.min)} – ${fmt(estimate.max)}${estimate.monthly ? "/mois" : ""} | ${form.message}`,
          source: "estimateur",
          _hp: hp,
          _t: renderTime,
        }),
      })
    } catch {
      // silently continue — we show success regardless
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  /* ── render helpers ── */

  const estimate = computeEstimate(form)

  /* ────────────────────────────────────────────────────────────────────────
     Progress bar
     ──────────────────────────────────────────────────────────────────────── */

  function ProgressBar() {
    return (
      <div className="mb-10">
        {/* Step labels (desktop) */}
        <div className="hidden sm:flex justify-between mb-3">
          {stepLabels.map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium transition-colors ${
                i + 1 <= step
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-slate-400 dark:text-slate-600"
              }`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Mobile label */}
        <p className="sm:hidden text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2">
          Étape {step} sur 4 — {stepLabels[step - 1]}
        </p>

        {/* Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
            initial={false}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────────────────
     Step 1 — Type de projet
     ──────────────────────────────────────────────────────────────────────── */

  function Step1() {
    return (
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Quel est votre projet ?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Sélectionnez le type de projet qui correspond le mieux à votre besoin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTypes.map(({ id, label, icon: Icon }) => {
            const active = form.projectType === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setForm((p) => ({ ...p, projectType: id }))}
                className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all cursor-pointer ${
                  active
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-indigo-950/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span
                  className={`font-semibold transition-colors ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <motion.div
                    layoutId="check"
                    className="absolute top-3 right-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────────────────
     Step 2 — Détails
     ──────────────────────────────────────────────────────────────────────── */

  function Step2Site() {
    return (
      <div className="space-y-8">
        {/* Page count */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Combien de pages ?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Estimation du nombre de pages de votre site.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pageOptions.map(({ id, label }) => {
              const active = form.pageCount === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, pageCount: id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Fonctionnalités souhaitées
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Sélectionnez toutes celles qui vous intéressent (optionnel).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featureOptions.map(({ id, label, icon: Icon }) => {
              const active = form.features.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFeature(id)}
                  className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                  {active && (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  function Step2Seo() {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Votre site existe déjà ?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Cela influence le travail de référencement à prévoir.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "oui", label: "Oui" },
              { id: "non", label: "Non" },
            ].map(({ id, label }) => {
              const active = form.siteExists === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, siteExists: id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Zone géographique visée
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Plus la zone est large, plus le travail SEO est important.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {geoOptions.map(({ id, label }) => {
              const active = form.geoZone === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, geoZone: id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  function Step2Contenu() {
    return (
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Type de contenu souhaité
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Sélectionnez un ou plusieurs types de contenu.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contentTypeOptions.map(({ id, label }) => {
            const active = form.contentTypes.includes(id)
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleContentType(id)}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                }`}
              >
                {label}
                {active && (
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  function Step2Autre() {
    return (
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Décrivez votre projet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Nous pourrons affiner l&apos;estimation après échange.
        </p>
        <textarea
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          rows={4}
          placeholder="Décrivez brièvement votre projet..."
          className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none transition-colors resize-none"
        />
      </div>
    )
  }

  function Step2() {
    return (
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Détails du projet
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Précisez vos besoins pour affiner l&apos;estimation.
        </p>

        {isSiteProject && <Step2Site />}
        {form.projectType === "seo" && <Step2Seo />}
        {form.projectType === "contenu" && <Step2Contenu />}
        {form.projectType === "autre" && <Step2Autre />}
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────────────────
     Step 3 — Budget & Délais
     ──────────────────────────────────────────────────────────────────────── */

  function Step3() {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Budget & Délais
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Aidez-nous à calibrer notre proposition.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Budget estimé
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Quel budget envisagez-vous pour ce projet ?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {budgetOptions.map(({ id, label }) => {
              const active = form.budget === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, budget: id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            Délai souhaité
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Quand aimeriez-vous que le projet soit livré ?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timelineOptions.map(({ id, label }) => {
              const active = form.timeline === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, timeline: id }))}
                  className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-500 dark:text-indigo-400"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────────────────
     Step 4 — Résultat & Contact
     ──────────────────────────────────────────────────────────────────────── */

  function Step4() {
    if (submitted) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Demande envoyée !
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Merci {form.name ? form.name.split(" ")[0] : ""} ! Nous reviendrons
            vers vous dans les 24h avec un devis détaillé et personnalisé.
          </p>
        </motion.div>
      )
    }

    return (
      <div className="space-y-8">
        {/* Estimate display */}
        <div className="rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/40 dark:to-slate-900 p-6 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Estimation personnalisée
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {fmt(estimate.min)} – {fmt(estimate.max)}
            {estimate.monthly && (
              <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                {" "}
                / mois
              </span>
            )}
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Cette estimation est indicative. Le prix final dépend des
            spécificités de votre projet.
          </p>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            Recevez un devis détaillé
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Laissez-nous vos coordonnées et nous vous enverrons une proposition
            personnalisée sous 24h.
          </p>

          <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 sm:col-span-1">
              <label
                htmlFor="est-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Nom complet *
              </label>
              <input
                id="est-name"
                type="text"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Jean Dupont"
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="est-email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Email *
              </label>
              <input
                id="est-email"
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="jean@exemple.fr"
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="est-phone"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Téléphone
              </label>
              <input
                id="est-phone"
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="06 12 34 56 78"
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="est-message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Message (optionnel)
              </label>
              <textarea
                id="est-message"
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Précisions sur votre projet..."
                className="w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!form.name || !form.email || submitting}
          className="w-full sm:w-auto"
          size="lg"
        >
          {submitting ? (
            "Envoi en cours..."
          ) : (
            <>
              <Send className="h-4 w-4" />
              Recevoir mon devis gratuit
            </>
          )}
        </Button>
      </div>
    )
  }

  /* ────────────────────────────────────────────────────────────────────────
     Main render
     ──────────────────────────────────────────────────────────────────────── */

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/30">
        <ProgressBar />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fadeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step < 4 || (!submitted && step === 4) ? (
          <div className="mt-8 flex items-center justify-between gap-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep((s) => s - 1)}
                size="md"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            ) : (
              <div />
            )}

            {step < 4 && (
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canGoNext()}
                size="md"
              >
                Suivant
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

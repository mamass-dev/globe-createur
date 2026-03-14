"use client"

import { useEffect, useState, useCallback } from "react"
import { X, ArrowRight, CheckCircle, Gift } from "lucide-react"

/**
 * Contextual lead magnet slide-in.
 * Appears after 50% scroll, once per session, with a page-aware offer.
 */

type Offer = {
  title: string
  description: string
  cta: string
  tag: string
}

const DEFAULT_OFFER: Offer = {
  tag: "Guide gratuit",
  title: "Checklist SEO pour PME",
  description: "21 points à vérifier pour améliorer votre visibilité sur Google. Téléchargement immédiat.",
  cta: "Recevoir la checklist",
}

const PAGE_OFFERS: Record<string, Offer> = {
  "/services/seo-local-dijon": {
    tag: "Outil gratuit",
    title: "Audit SEO local offert",
    description: "Recevez un diagnostic complet de votre présence sur Google Maps et Google Search.",
    cta: "Recevoir mon audit",
  },
  "/services/creation-site-internet-dijon": {
    tag: "Guide gratuit",
    title: "Cahier des charges type",
    description: "Le template prêt à remplir pour définir votre projet web sans rien oublier.",
    cta: "Télécharger le template",
  },
  "/blog": {
    tag: "Newsletter",
    title: "Conseils marketing PME",
    description: "1 email par semaine avec des stratégies concrètes pour développer votre entreprise.",
    cta: "S'inscrire gratuitement",
  },
  "/tarifs": {
    tag: "Offre spéciale",
    title: "Audit digital offert",
    description: "Prenez RDV et recevez un audit complet de votre présence en ligne — sans engagement.",
    cta: "Réserver mon audit",
  },
}

function getOffer(pathname: string): Offer {
  // Exact match
  if (PAGE_OFFERS[pathname]) return PAGE_OFFERS[pathname]
  // Prefix match (e.g., /blog/any-article → /blog offer)
  for (const [key, offer] of Object.entries(PAGE_OFFERS)) {
    if (pathname.startsWith(key)) return offer
  }
  // SEO/city pages
  if (pathname.includes("agence-communication")) {
    return {
      tag: "Guide gratuit",
      title: "Guide du SEO local",
      description: "Comment apparaître dans le top 3 Google Maps dans votre ville. Méthode pas à pas.",
      cta: "Recevoir le guide",
    }
  }
  return DEFAULT_OFFER
}

export function LeadMagnet() {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [hp, setHp] = useState("")
  const [renderTime] = useState(() => Date.now())
  const [offer, setOffer] = useState<Offer>(DEFAULT_OFFER)

  // Set contextual offer based on current page
  useEffect(() => {
    setOffer(getOffer(window.location.pathname))
  }, [])

  // Show after 50% scroll, only once per session
  const handleScroll = useCallback(() => {
    if (dismissed || submitted) return
    const alreadyShown = sessionStorage.getItem("lead-magnet-shown")
    if (alreadyShown) return

    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight
    if (scrollPercent > 0.5) {
      setShow(true)
      sessionStorage.setItem("lead-magnet-shown", "1")
    }
  }, [dismissed, submitted])

  useEffect(() => {
    // Don't show if already dismissed or submitted previously
    const alreadyDismissed = sessionStorage.getItem("lead-magnet-dismissed")
    if (alreadyDismissed) {
      setDismissed(true)
      return
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  function handleDismiss() {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem("lead-magnet-dismissed", "1")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || loading || hp) return
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "lead-magnet",
          offer: offer.title,
          page: window.location.pathname,
          _hp: hp,
          _t: renderTime,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Erreur lors de l'envoi")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi")
    } finally {
      setLoading(false)
    }
  }

  if (dismissed && !show) return null
  if (!show) return null

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 w-[340px] max-w-[calc(100vw-3rem)] transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-600" />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-5">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto" />
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                C&apos;est envoy&eacute; !
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                V&eacute;rifiez votre bo&icirc;te mail dans quelques minutes.
              </p>
            </div>
          ) : (
            <>
              {/* Tag */}
              <div className="flex items-center gap-1.5 mb-3">
                <Gift className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  {offer.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug mb-1.5">
                {offer.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                {offer.description}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute opacity-0 h-0 w-0 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
                />
                {error && (
                  <p className="text-xs text-red-500">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Envoi..." : offer.cta}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="text-[11px] text-slate-400 mt-3 text-center">
                Pas de spam. D&eacute;sabonnement en 1 clic.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

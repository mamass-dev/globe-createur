import type { Metadata } from "next"
import { Check } from "lucide-react"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { TrustSignals } from "@/components/sections/trust-signals"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { DevisForm } from "@/components/forms/devis-form"
import { AnimateOnScroll } from "@/components/ui/animate"

/* ═══════════════════════════════════════════════════
   TEMPLATE 5 — LANDING PAGE CONVERSION
   ═══════════════════════════════════════════════════

   Structure :
   ┌─────────────────────────────────────────────────┐
   │ 1. Breadcrumb              Navigation simple     │
   │ 2. Trust signals           Barre de réassurance   │
   │ 3. Hero conversion         H1 + promesse claire  │
   │ 4. Formulaire + Sidebar    2 cols : form + raisons│
   │ 5. Testimonial inline      1 citation forte       │
   │ 6. Garanties               3 blocs de réassurance │
   └─────────────────────────────────────────────────┘

   Objectifs :
   - Maximiser le taux de conversion du formulaire
   - Réduire la friction (pas de distraction)
   - Lever les dernières objections via la sidebar
   - Rassurer avec preuve sociale et garanties
   ═══════════════════════════════════════════════════ */

export const metadata: Metadata = buildMetadata({
  title: "Demander un devis gratuit — Projet web & communication",
  description: "Demandez votre devis gratuit pour un projet web, SEO ou communication. Réponse personnalisée sous 48h.",
  path: "/devis",
})

const reasons = [
  "Devis détaillé et transparent",
  "Réponse personnalisée sous 48h",
  "Sans engagement de votre part",
  "Audit gratuit de votre situation",
  "Recommandations concrètes incluses",
  "Interlocuteur unique dédié",
]

export default function DevisPage() {
  return (
    <>
      {/* 1. NAVIGATION */}
      <Breadcrumb items={[{ name: "Devis gratuit", href: "/devis" }]} />

      {/* 2. RÉASSURANCE — Trust signals */}
      <TrustSignals />

      {/* 3. HERO — Promesse claire */}
      <Container className="pt-12 lg:pt-16 max-w-4xl">
        <AnimateOnScroll>
          <div className="text-center">
            <h1 className="text-[2rem] sm:text-4xl font-bold tracking-tight text-foreground">
              Demander un devis gratuit
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              D&eacute;crivez votre projet en 2 minutes. Nous vous envoyons un devis d&eacute;taill&eacute;
              avec des recommandations personnalis&eacute;es sous 48h.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* 4. CONVERSION — Formulaire + Sidebar raisons */}
      <Container className="py-12 lg:py-16 max-w-4xl">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Formulaire — 3/5 */}
            <div className="lg:col-span-3">
              <Card className="p-6 sm:p-8">
                <DevisForm />
              </Card>
            </div>

            {/* Sidebar — 2/5 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Raisons */}
              <div>
                <h2 className="text-base font-semibold text-foreground mb-4">
                  Ce que vous obtenez
                </h2>
                <ul className="space-y-3">
                  {reasons.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. PREUVE — Testimonial inline */}
              <div className="rounded-xl border border-gray-100 bg-white p-5">
                <blockquote className="text-sm text-gray-500 leading-relaxed italic">
                  &ldquo;Globe Cr&eacute;ateur a transform&eacute; notre pr&eacute;sence en ligne.
                  Notre nouveau site g&eacute;n&egrave;re 3 fois plus de r&eacute;servations directes.&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-semibold text-foreground">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Marie Dupont</p>
                    <p className="text-xs text-gray-400">H&ocirc;tel Le Bourguignon</p>
                  </div>
                </div>
              </div>

              {/* 6. GARANTIES */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="h-4 w-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  Vos donn&eacute;es restent confidentielles
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="h-4 w-4 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Aucun spam, jamais
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </>
  )
}

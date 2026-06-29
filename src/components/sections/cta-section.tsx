"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ArrowRight } from "lucide-react"

type CtaSectionProps = {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
  variant?: "default" | "primary"
}

export function CtaSection({
  title,
  subtitle,
  ctaLabel = "Demander un devis gratuit",
  ctaHref = "/devis",
  variant = "default",
}: CtaSectionProps) {
  const isPrimary = variant === "primary"

  // ─── Variante PRIMARY : bandeau rouge plein ───
  if (isPrimary) {
    return (
      <section className="relative overflow-hidden bg-signal py-24 lg:py-32">
        <Container className="relative">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-white/70">— Devis gratuit</span>
              <h2 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-7xl text-white">{title}</h2>
              {subtitle && <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">{subtitle}</p>}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href={ctaHref} size="lg" className="group bg-noir text-ivory hover:bg-[#1c1c1c] transition-colors">
                  {ctaLabel}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <p className="mt-6 font-mono-accent text-xs uppercase tracking-widest text-white/60">Sans engagement · Réponse sous 24h</p>
            </div>
          </AnimateOnScroll>
          <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-white/10 leading-none pointer-events-none select-none uppercase tracking-tighter">
            Globe
          </div>
        </Container>
      </section>
    )
  }

  // ─── Variante DEFAULT : sombre, titre impact ───
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#0f0f0f] border-y border-[#1c1c1c]">
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-50" aria-hidden="true" />
      <Container className="relative z-10">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-impact text-3xl sm:text-4xl lg:text-6xl text-ivory">{title}</h2>
            {subtitle && (
              <p className="mt-6 text-lg lg:text-xl max-w-xl mx-auto leading-relaxed text-aluminium">{subtitle}</p>
            )}
            <div className="mt-10 flex justify-center">
              <Button href={ctaHref} size="lg" className="group">
                {ctaLabel}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

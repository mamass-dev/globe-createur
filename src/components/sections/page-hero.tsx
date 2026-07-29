"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Kicker } from "@/components/ui/kicker"
import { AnimateOnScroll } from "@/components/ui/animate"

type PageHeroProps = {
  badge?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  align?: "center" | "left"
  /** Micro-arguments de réassurance affichés sous les CTA (landing pages). */
  reassurance?: string[]
}

export function PageHero({
  badge,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  align = "left",
  reassurance,
}: PageHeroProps) {
  const isCenter = align === "center"

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#0a0a0a] overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="mesh-gradient absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />

      <Container className={`relative ${isCenter ? "text-center" : ""}`}>
        <AnimateOnScroll>
          {badge && (
            <div className={`mb-6 ${isCenter ? "flex justify-center" : ""}`}>
              <Kicker>{badge}</Kicker>
            </div>
          )}
          <h1
            className={`text-impact text-4xl sm:text-6xl lg:text-7xl text-ivory ${
              isCenter ? "max-w-4xl mx-auto" : "max-w-3xl"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-6 text-lg lg:text-xl text-aluminium leading-relaxed ${
              isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
            }`}
          >
            {subtitle}
          </p>
          {(ctaLabel || secondaryLabel) && (
            <div
              className={`mt-8 flex flex-col sm:flex-row gap-3 ${
                isCenter ? "items-center justify-center" : "items-start"
              }`}
            >
              {ctaLabel && ctaHref && (
                <Button href={ctaHref} size="lg">
                  {ctaLabel}
                </Button>
              )}
              {secondaryLabel && secondaryHref && (
                <Button href={secondaryHref} variant="outline" size="lg">
                  {secondaryLabel}
                </Button>
              )}
            </div>
          )}
          {reassurance && reassurance.length > 0 && (
            <ul
              className={`mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-aluminium ${
                isCenter ? "justify-center" : ""
              }`}
            >
              {reassurance.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-ivory" aria-hidden="true">
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

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
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

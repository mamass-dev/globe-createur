"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
    <section className="relative py-16 lg:py-24">
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <Container className={`relative ${isCenter ? "text-center" : ""}`}>
        <AnimateOnScroll>
          {badge && (
            <Badge variant="mono" className="mb-4">
              {badge}
            </Badge>
          )}
          <h1
            className={`text-[2rem] sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] ${
              isCenter ? "max-w-4xl mx-auto" : "max-w-2xl"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-5 text-lg text-gray-400 leading-relaxed ${
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

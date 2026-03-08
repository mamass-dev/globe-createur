"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"

type HeroProps = {
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function Hero({
  title,
  subtitle,
  ctaLabel = "Demander un devis",
  ctaHref = "/devis",
  secondaryLabel,
  secondaryHref,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <Container className="relative text-center">
        <AnimateOnScroll>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] max-w-4xl mx-auto">
            {title}
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href={ctaHref} size="lg">
              {ctaLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} variant="outline" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"

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
  return (
    <section
      className={`py-20 lg:py-28 ${
        variant === "primary" ? "bg-primary" : "bg-gray-50"
      }`}
    >
      <Container className="text-center">
        <AnimateOnScroll>
          <h2
            className={`text-[1.875rem] sm:text-4xl font-bold tracking-tight ${
              variant === "primary" ? "text-white" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 text-lg max-w-2xl mx-auto leading-relaxed ${
                variant === "primary" ? "text-white/70" : "text-gray-400"
              }`}
            >
              {subtitle}
            </p>
          )}
          <div className="mt-8">
            <Button
              href={ctaHref}
              variant={variant === "primary" ? "secondary" : "primary"}
              size="lg"
            >
              {ctaLabel}
            </Button>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

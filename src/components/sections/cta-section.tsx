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
      className={`py-24 lg:py-32 relative overflow-hidden ${
        variant === "primary" 
          ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200" 
          : "bg-slate-50 border-t border-slate-100"
      }`}
    >
      <Container className="relative z-10 text-center">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto space-y-8">
            <h2
              className={`text-4xl lg:text-6xl font-black tracking-tight leading-tight ${
                variant === "primary" ? "text-white" : "text-slate-900"
              }`}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`text-xl max-w-2xl mx-auto leading-relaxed ${
                  variant === "primary" ? "text-indigo-100" : "text-slate-600"
                }`}
              >
                {subtitle}
              </p>
            )}
            <div className="pt-4 flex justify-center">
              <Button
                href={ctaHref}
                variant={variant === "primary" ? "outline" : "primary"}
                className={`px-10 h-16 rounded-2xl text-xl font-bold shadow-xl ${
                  variant === "primary" 
                    ? "bg-white text-indigo-600 border-none hover:bg-indigo-50 shadow-indigo-700/20" 
                    : "bg-indigo-600 text-white shadow-indigo-200"
                }`}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

"use client"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ArrowRight, Sparkles } from "lucide-react"

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

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-slate-950">
      {isPrimary && (
        <Container>
          {/* Outer glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 p-px">
              <div className="absolute inset-px rounded-[calc(1.5rem-1px)] bg-white dark:bg-slate-900" />
            </div>

            {/* Background decorations inside card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50 dark:from-indigo-950/50 to-transparent rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-50 dark:from-violet-950/30 to-transparent rounded-full translate-y-1/3 -translate-x-1/3" />

            {/* Content */}
            <div className="relative z-10 px-8 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center">
              <AnimateOnScroll>
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="h-3.5 w-3.5" />
                    Devis gratuit
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                    {title}
                  </h2>

                  {subtitle && (
                    <p className="text-lg max-w-xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                      {subtitle}
                    </p>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      href={ctaHref}
                      variant="primary"
                      className="group px-8 h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white border-none shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:shadow-indigo-500/30 transition-all"
                    >
                      {ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>

                  <p className="text-sm text-slate-400">
                    Sans engagement · Réponse sous 24h
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </Container>
      )}

      {!isPrimary && (
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                {title}
              </h2>

              {subtitle && (
                <p className="text-lg lg:text-xl max-w-xl mx-auto leading-relaxed text-slate-500 dark:text-slate-400">
                  {subtitle}
                </p>
              )}

              <div className="pt-2 flex justify-center">
                <Button
                  href={ctaHref}
                  variant="primary"
                  className="group px-8 h-14 rounded-2xl text-base font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30 transition-all"
                >
                  {ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      )}
    </section>
  )
}

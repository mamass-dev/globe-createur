"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
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
    <section className="relative min-h-[90dvh] flex items-center pt-24 pb-32 overflow-hidden bg-[#0a0a0a]">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
          {/* Left Side - Massive Typography */}
          <div className="lg:col-span-8">
            <AnimateOnScroll>
              <div className="flex flex-col">
                <span className="text-signal font-bold tracking-[0.25em] uppercase text-xs mb-6 flex items-center gap-3">
                  <span className="h-[3px] w-12 bg-signal" /> Creative House — Dijon
                </span>
                <h1 className="text-impact text-6xl sm:text-8xl lg:text-[9.5rem] text-ivory">
                  {title.split(" ").slice(0, 2).join(" ")}
                  <br />
                  <span className="text-stroke">{title.split(" ").slice(2).join(" ")}</span>
                </h1>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right Side - Minimal Description & CTA */}
          <div className="lg:col-span-4 lg:pb-8">
            <AnimateOnScroll delay={0.2}>
              <p className="text-xl sm:text-2xl text-aluminium leading-tight mb-12 max-w-sm">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link href={ctaHref} className="group relative text-sm font-bold uppercase tracking-widest flex items-center gap-4 text-ivory">
                  <span className="h-14 w-14 rounded-none bg-signal text-white flex items-center justify-center text-xl group-hover:bg-ivory group-hover:text-noir transition-colors duration-300">
                    →
                  </span>
                  <span className="group-hover:text-signal transition-colors duration-300">{ctaLabel}</span>
                </Link>
                {secondaryLabel && (
                  <Link href={secondaryHref || "#"} className="text-aluminium font-bold uppercase tracking-widest text-xs hover:text-ivory transition-colors">
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-[25vw] font-bold text-[#101010] leading-none pointer-events-none select-none -z-0 uppercase tracking-tighter">
        Globe
      </div>
    </section>
  )
}

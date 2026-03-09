"use client"

import Link from "next/link"
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
    <section className="relative min-h-[90dvh] flex items-center pt-24 pb-32 overflow-hidden bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
          {/* Left Side - Massive Typography */}
          <div className="lg:col-span-8">
            <AnimateOnScroll>
              <div className="flex flex-col">
                <span className="text-accent font-black tracking-widest uppercase text-sm mb-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-accent" /> Studio Créatif Dijon
                </span>
                <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-black uppercase">
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
              <p className="text-xl sm:text-2xl text-gray-500 leading-tight mb-12 max-w-sm">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <Link href={ctaHref} className="group relative text-lg font-black uppercase tracking-widest flex items-center gap-4">
                  <span className="h-16 w-16 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                    →
                  </span>
                  <span className="group-hover:text-accent transition-colors duration-500">{ctaLabel}</span>
                </Link>
                {secondaryLabel && (
                  <Link href={secondaryHref || "#"} className="text-gray-400 font-bold hover:text-black transition-colors">
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 text-[25vw] font-black text-gray-100/50 leading-none pointer-events-none select-none -z-10 uppercase tracking-tighter">
        Studio
      </div>
    </section>
  )
}

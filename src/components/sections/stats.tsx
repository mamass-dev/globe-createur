"use client"

import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { AnimatedCounter } from "@/components/ui/animated-counter"

type Stat = {
  value: number
  suffix?: string
  label: string
}

export function Stats({
  stats,
  title,
}: {
  stats: Stat[]
  title?: string
}) {
  return (
    <section className="py-24 bg-indigo-600 dark:bg-indigo-950 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden relative mb-24">
      <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
      <Container className="relative z-10">
        <AnimateOnScroll>
          {title && (
            <h2 className="text-center text-3xl lg:text-5xl font-black text-white mb-16 tracking-tight">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight tabular-nums"
                />
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-100 opacity-80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

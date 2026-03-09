"use client"

import { useEffect, useRef, useState } from "react"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"

type Stat = {
  value: number
  suffix?: string
  label: string
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight tabular-nums">
      {count}{suffix}
    </span>
  )
}

export function Stats({
  stats,
  title,
}: {
  stats: Stat[]
  title?: string
}) {
  return (
    <section className="py-24 bg-indigo-600 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden relative mb-24">
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
                <CountUp target={stat.value} suffix={stat.suffix} />
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

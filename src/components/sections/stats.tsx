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
          const duration = 1200
          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-mono-accent text-4xl sm:text-5xl font-bold text-foreground tabular-nums">
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
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <AnimateOnScroll>
          {title && (
            <h2 className="text-center text-[1.875rem] sm:text-4xl font-bold tracking-tight text-foreground mb-14">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <CountUp target={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

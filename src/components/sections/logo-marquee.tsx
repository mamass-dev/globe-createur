import Image from "next/image"
import { Container } from "@/components/ui/container"

type LogoMarqueeProps = {
  title?: string
  logos: { name: string; src: string }[]
}

export function LogoMarquee({ title, logos }: LogoMarqueeProps) {
  const doubled = [...logos, ...logos]

  return (
    <section className="py-16 lg:py-24 overflow-hidden bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
          {title || "Ils nous font confiance"}
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee py-4">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center px-8 lg:px-12 shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 dark:invert dark:opacity-40 dark:hover:opacity-90 transition-all duration-500"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={200}
                height={200}
                className="h-16 lg:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

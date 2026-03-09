import { Container } from "@/components/ui/container"

type LogoMarqueeProps = {
  title?: string
  logos: { name: string; width?: number }[]
}

export function LogoMarquee({ title, logos }: LogoMarqueeProps) {
  return (
    <section className="py-16 lg:py-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
         <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
           {title || "Ils nous font confiance"}
         </p>
      </div>

      <div className="relative group">
        <div className="flex animate-marquee py-4">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center px-12 lg:px-20 shrink-0 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default"
            >
              <span className="text-xl lg:text-3xl font-bold text-slate-900 whitespace-nowrap select-none tracking-tight">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

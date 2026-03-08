import { Container } from "@/components/ui/container"

type LogoMarqueeProps = {
  title?: string
  logos: { name: string; width?: number }[]
}

export function LogoMarquee({ title, logos }: LogoMarqueeProps) {
  return (
    <section className="py-12 lg:py-16 border-y border-gray-100 overflow-hidden">
      <Container>
        {title && (
          <p className="text-center text-xs font-medium text-gray-300 uppercase tracking-wider mb-8">
            {title}
          </p>
        )}
      </Container>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center px-8 lg:px-12 shrink-0 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            >
              <span className="text-sm font-medium text-gray-500 whitespace-nowrap select-none">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { cn } from "@/lib/utils"

type MarqueeProps = {
  items: string[]
  /** Vitesse en secondes pour une boucle complète */
  speed?: number
  className?: string
  /** Séparateur entre les mots */
  separator?: React.ReactNode
}

/**
 * Bandeau défilant de mots-clés (DESIGN · PHOTO · VIDEO · WEB · BRANDING).
 * Esprit "ticker" éditorial de la DA.
 */
export function Marquee({
  items,
  speed = 30,
  className,
  separator,
}: MarqueeProps) {
  const sep = separator ?? <span className="mx-8 text-signal">/</span>
  const sequence = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          {item}
          {sep}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={cn("relative flex w-full overflow-hidden whitespace-nowrap", className)}
      aria-hidden="true"
    >
      <div className="flex animate-marquee" style={{ animationDuration: `${speed}s` }}>
        {sequence}
        {sequence}
      </div>
    </div>
  )
}

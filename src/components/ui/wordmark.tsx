import { cn } from "@/lib/utils"

type WordmarkProps = {
  className?: string
  /** Texte de la signature sous le mot GLOBE */
  tagline?: string
  /** Taille du mot GLOBE */
  size?: "sm" | "md" | "lg"
  showBar?: boolean
}

const sizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
}

/**
 * Lockup de marque GLOBE — Creative House.
 * Wordmark typographique (Monument Grotesk Bold) + barre rouge signature.
 */
export function Wordmark({
  className,
  tagline = "CREATIVE HOUSE",
  size = "md",
  showBar = true,
}: WordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display font-bold uppercase tracking-tight text-ivory",
          sizes[size]
        )}
      >
        Globe
      </span>
      <span className="mt-1 flex items-center gap-2">
        {showBar && <span className="h-[3px] w-6 bg-signal" />}
        {tagline && (
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-aluminium">
            {tagline}
          </span>
        )}
      </span>
    </span>
  )
}

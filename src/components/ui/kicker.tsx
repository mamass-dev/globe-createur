import { cn } from "@/lib/utils"

type KickerProps = {
  /** Numéro de section, ex. "01" */
  number?: string
  children: React.ReactNode
  className?: string
}

/**
 * Libellé de section éditorial : "01 — EXPERTISES" avec barre rouge.
 * Reprend la numérotation de projet de la planche DA.
 */
export function Kicker({ number, children, className }: KickerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal",
        className
      )}
    >
      {number && <span className="text-aluminium">{number}</span>}
      <span className="h-[2px] w-8 bg-signal" />
      <span className="text-ivory">{children}</span>
    </span>
  )
}

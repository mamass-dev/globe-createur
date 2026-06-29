import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  subtitle?: string
  badge?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 lg:mb-24 space-y-4",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 text-signal text-xs font-bold uppercase tracking-[0.2em] font-mono-accent">
          <span className="h-[3px] w-6 bg-signal" />
          {badge}
        </span>
      )}
      <h2 className="text-impact text-3xl lg:text-5xl text-ivory leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg lg:text-xl text-aluminium leading-relaxed",
            align === "center" && "max-w-3xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

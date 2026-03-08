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
        "mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block font-mono-accent text-xs font-medium text-primary tracking-wider uppercase mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-[1.875rem] sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-gray-400 leading-relaxed",
            align === "center" && "max-w-2xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

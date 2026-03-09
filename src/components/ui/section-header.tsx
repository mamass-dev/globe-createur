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
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest">
          {badge}
        </span>
      )}
      <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg lg:text-xl text-slate-600 leading-relaxed",
            align === "center" && "max-w-3xl mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

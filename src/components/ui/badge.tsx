import { cn } from "@/lib/utils"

type BadgeProps = {
  variant?: "default" | "primary" | "outline" | "mono"
  className?: string
  children: React.ReactNode
}

const variants = {
  default: "bg-[#1c1c1c] text-aluminium border border-[#2a2a2a]",
  primary: "bg-primary-light text-signal border border-signal/30",
  outline: "border border-[#2a2a2a] text-aluminium",
  mono: "text-signal font-mono-accent tracking-[0.2em] uppercase",
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-none px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

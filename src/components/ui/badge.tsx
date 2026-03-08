import { cn } from "@/lib/utils"

type BadgeProps = {
  variant?: "default" | "primary" | "outline" | "mono"
  className?: string
  children: React.ReactNode
}

const variants = {
  default: "bg-gray-50 text-gray-600",
  primary: "bg-primary-light text-primary",
  outline: "border border-gray-100 text-gray-500",
  mono: "bg-gray-50 text-gray-600 font-mono-accent tracking-wider uppercase",
}

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

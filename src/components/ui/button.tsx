import Link from "next/link"
import { cn } from "@/lib/utils"

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  href?: string
  className?: string
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variants = {
  primary:
    "bg-signal text-white hover:bg-[#d62e20] transition-colors",
  secondary:
    "bg-ivory text-noir hover:bg-white transition-colors",
  outline:
    "border border-[#2a2a2a] text-ivory hover:border-signal hover:text-signal transition-colors",
  ghost:
    "text-aluminium hover:text-signal transition-colors",
}

const sizes = {
  sm: "h-10 px-5 text-xs font-bold uppercase tracking-widest rounded-none",
  md: "h-12 px-7 text-sm font-bold uppercase tracking-widest rounded-none",
  lg: "h-14 px-9 text-sm font-bold uppercase tracking-widest rounded-none",
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

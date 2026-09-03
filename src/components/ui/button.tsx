import Link from "next/link"
import { cn } from "@/lib/utils"
import { trackAttrs } from "@/lib/analytics"

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  href?: string
  /** Événement Rybbit émis au clic (ex. { event: "cta_click", props: { cta: "devis", location: "header" } }) */
  track?: { event: string; props?: Record<string, string> }
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
  track,
  className,
  children,
  ...props
}: ButtonProps) {
  const dataAttrs = track ? trackAttrs(track.event, track.props) : {}
  const classes = cn(
    "inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...dataAttrs}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...dataAttrs} {...props}>
      {children}
    </button>
  )
}

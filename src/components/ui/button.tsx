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
    "bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 transition-all",
  outline:
    "border border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all",
  ghost:
    "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all",
}

const sizes = {
  sm: "h-10 px-5 text-sm font-semibold rounded-xl",
  md: "h-12 px-6 text-base font-bold rounded-2xl",
  lg: "h-14 px-8 text-lg font-bold rounded-2xl",
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

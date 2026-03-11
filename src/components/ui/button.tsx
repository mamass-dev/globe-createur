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
    "bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-100 dark:shadow-indigo-950 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:-translate-y-0.5 transition-all",
  secondary:
    "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 hover:-translate-y-0.5 transition-all",
  outline:
    "border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all",
  ghost:
    "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all",
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

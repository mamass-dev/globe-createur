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
    "bg-primary text-white shadow-sm hover:bg-primary-dark hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 active:shadow-sm",
  secondary:
    "bg-foreground text-surface hover:bg-gray-700 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0",
  outline:
    "border border-gray-100 text-foreground hover:border-primary hover:bg-primary-light hover:text-primary",
  ghost:
    "text-gray-500 hover:text-foreground hover:bg-gray-50",
}

const sizes = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2",
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
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
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

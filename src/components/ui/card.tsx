import { cn } from "@/lib/utils"

type CardProps = {
  className?: string
  children: React.ReactNode
  hover?: boolean
}

export function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 bg-white p-6",
        hover &&
          "transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={cn("text-lg font-semibold tracking-tight text-foreground", className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("text-sm text-gray-400 mt-1.5 leading-relaxed", className)}>
      {children}
    </p>
  )
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(className)}>{children}</div>
}

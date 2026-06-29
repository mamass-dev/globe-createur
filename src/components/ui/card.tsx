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
        "rounded-sm border border-[#1c1c1c] bg-[#141414] p-8 lg:p-10",
        hover &&
          "transition-colors duration-300 hover:border-signal",
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mb-8", className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={cn("text-2xl font-bold tracking-tight text-slate-900 dark:text-white", className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("text-lg text-slate-500 dark:text-slate-400 mt-3 leading-relaxed", className)}>
      {children}
    </p>
  )
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn(className)}>{children}</div>
}

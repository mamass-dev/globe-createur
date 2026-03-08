import { cn } from "@/lib/utils"

type ContainerProps = {
  className?: string
  children: React.ReactNode
  as?: "div" | "section" | "article" | "main"
}

export function Container({ className, children, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  )
}

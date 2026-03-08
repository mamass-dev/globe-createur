import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-foreground placeholder:text-gray-300 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none",
          error && "border-error focus:border-error focus:ring-error/10",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-foreground placeholder:text-gray-300 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none resize-y min-h-32",
          error && "border-error focus:border-error focus:ring-error/10",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}

import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="group space-y-2">
      {label && (
        <label htmlFor={id} className="block text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-accent transition-colors">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full border-b border-black/10 bg-transparent py-4 text-xl font-bold text-black placeholder:text-gray-200 transition-all duration-500 focus:border-accent focus:outline-none",
          error && "border-error",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-bold text-error uppercase tracking-widest mt-2">{error}</p>}
    </div>
  )
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="group space-y-2">
      {label && (
        <label htmlFor={id} className="block text-xs font-black uppercase tracking-widest text-gray-400 group-focus-within:text-accent transition-colors">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          "w-full border-b border-black/10 bg-transparent py-4 text-xl font-bold text-black placeholder:text-gray-200 transition-all duration-500 focus:border-accent focus:outline-none resize-none min-h-32",
          error && "border-error",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs font-bold text-error uppercase tracking-widest mt-2">{error}</p>}
    </div>
  )
}

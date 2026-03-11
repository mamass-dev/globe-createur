import { LucideIcon } from "./lucide-icon"

const colorSchemes: Record<string, {
  gradient: string
  glow: string
  accent: string
  accentMuted: string
  ring: string
  dot: string
}> = {
  Globe: {
    gradient: "from-indigo-500 via-indigo-600 to-violet-700",
    glow: "bg-indigo-500/20",
    accent: "bg-indigo-400/20",
    accentMuted: "bg-indigo-300/10",
    ring: "border-indigo-400/20",
    dot: "bg-indigo-300",
  },
  RefreshCw: {
    gradient: "from-teal-500 via-emerald-600 to-cyan-700",
    glow: "bg-teal-500/20",
    accent: "bg-teal-400/20",
    accentMuted: "bg-teal-300/10",
    ring: "border-teal-400/20",
    dot: "bg-teal-300",
  },
  Search: {
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    glow: "bg-amber-500/20",
    accent: "bg-amber-400/20",
    accentMuted: "bg-amber-300/10",
    ring: "border-amber-400/20",
    dot: "bg-amber-300",
  },
  Building2: {
    gradient: "from-violet-500 via-purple-600 to-fuchsia-700",
    glow: "bg-violet-500/20",
    accent: "bg-violet-400/20",
    accentMuted: "bg-violet-300/10",
    ring: "border-violet-400/20",
    dot: "bg-violet-300",
  },
  Zap: {
    gradient: "from-rose-500 via-red-500 to-pink-600",
    glow: "bg-rose-500/20",
    accent: "bg-rose-400/20",
    accentMuted: "bg-rose-300/10",
    ring: "border-rose-400/20",
    dot: "bg-rose-300",
  },
  Camera: {
    gradient: "from-pink-500 via-rose-500 to-fuchsia-600",
    glow: "bg-pink-500/20",
    accent: "bg-pink-400/20",
    accentMuted: "bg-pink-300/10",
    ring: "border-pink-400/20",
    dot: "bg-pink-300",
  },
  Megaphone: {
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    glow: "bg-emerald-500/20",
    accent: "bg-emerald-400/20",
    accentMuted: "bg-emerald-300/10",
    ring: "border-emerald-400/20",
    dot: "bg-emerald-300",
  },
}

const defaultScheme = colorSchemes.Globe

export function ServiceVisual({
  icon,
  className = "",
  size = "lg",
}: {
  icon: string
  className?: string
  size?: "sm" | "lg"
}) {
  const scheme = colorSchemes[icon] ?? defaultScheme
  const isSmall = size === "sm"

  return (
    <div className={`relative overflow-hidden rounded-2xl ${isSmall ? "aspect-square" : "aspect-[4/3]"} ${className}`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.gradient}`} />

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: isSmall ? "20px 20px" : "40px 40px",
      }} />

      {/* Floating orbs */}
      <div className={`absolute ${isSmall ? "-top-6 -right-6 w-20 h-20" : "-top-10 -right-10 w-40 h-40"} rounded-full ${scheme.accent} blur-2xl`} />
      <div className={`absolute ${isSmall ? "-bottom-8 -left-8 w-24 h-24" : "-bottom-16 -left-16 w-48 h-48"} rounded-full ${scheme.accentMuted} blur-3xl`} />

      {/* Decorative rings */}
      {!isSmall && (
        <>
          <div className={`absolute top-8 right-8 w-24 h-24 rounded-full border ${scheme.ring}`} />
          <div className={`absolute top-12 right-12 w-16 h-16 rounded-full border ${scheme.ring}`} />
          <div className={`absolute bottom-12 left-10 w-20 h-20 rounded-full border ${scheme.ring}`} />
        </>
      )}

      {/* Floating dots */}
      <div className={`absolute ${isSmall ? "top-3 left-3" : "top-6 left-6"} flex gap-1.5`}>
        <div className={`${isSmall ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full ${scheme.dot} opacity-40`} />
        <div className={`${isSmall ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full ${scheme.dot} opacity-25`} />
        <div className={`${isSmall ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full ${scheme.dot} opacity-15`} />
      </div>

      {!isSmall && (
        <div className="absolute bottom-8 right-8 flex flex-col gap-1.5">
          <div className={`w-2 h-2 rounded-full ${scheme.dot} opacity-15`} />
          <div className={`w-2 h-2 rounded-full ${scheme.dot} opacity-25`} />
          <div className={`w-2 h-2 rounded-full ${scheme.dot} opacity-40`} />
        </div>
      )}

      {/* Glass card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`
          ${isSmall ? "w-14 h-14 rounded-xl" : "w-28 h-28 rounded-3xl"}
          bg-white/10 backdrop-blur-md border border-white/20
          flex items-center justify-center
          shadow-lg shadow-black/5
        `}>
          <LucideIcon
            name={icon}
            className={`${isSmall ? "w-7 h-7" : "w-12 h-12"} text-white drop-shadow-sm`}
          />
        </div>
      </div>

      {/* Decorative lines */}
      {!isSmall && (
        <>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </>
      )}
    </div>
  )
}

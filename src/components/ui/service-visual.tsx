import { LucideIcon } from "./lucide-icon"

/* Déclinaisons mono-palette GC — rouge signal / noir, variation de dégradé
   par service pour garder du rythme sans sortir de la charte. */
const sharedAccents = {
  glow: "bg-[#e63a2b]/20",
  accent: "bg-[#e63a2b]/25",
  accentMuted: "bg-[#e63a2b]/10",
  ring: "border-[#e63a2b]/25",
  dot: "bg-[#f47c6d]",
}

const colorSchemes: Record<string, {
  gradient: string
  glow: string
  accent: string
  accentMuted: string
  ring: string
  dot: string
}> = {
  Globe: { gradient: "from-[#e63a2b] via-[#b5251a] to-[#0a0a0a]", ...sharedAccents },
  RefreshCw: { gradient: "from-[#1c1c1c] via-[#6b1610] to-[#e63a2b]", ...sharedAccents },
  Search: { gradient: "from-[#ee5340] via-[#e63a2b] to-[#8e1d15]", ...sharedAccents },
  Building2: { gradient: "from-[#e63a2b] via-[#6b1610] to-[#0a0a0a]", ...sharedAccents },
  Zap: { gradient: "from-[#ee5340] via-[#d62e20] to-[#3d0c09]", ...sharedAccents },
  Camera: { gradient: "from-[#b5251a] via-[#e63a2b] to-[#0a0a0a]", ...sharedAccents },
  Megaphone: { gradient: "from-[#0a0a0a] via-[#8e1d15] to-[#e63a2b]", ...sharedAccents },
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

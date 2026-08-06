import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { ArrowRight } from "lucide-react"

type CtaIaProps = {
  /** discret : pied d'article · moyen : milieu de page · fort : fin de parcours */
  intensity: "discret" | "moyen" | "fort"
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaHref?: string
}

export function CtaIa({
  intensity,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/services/diagnostic-ia-pme",
}: CtaIaProps) {
  if (intensity === "discret") {
    return (
      <aside className="my-10 border-l-2 border-signal pl-6">
        <p className="text-sm text-aluminium leading-relaxed">
          {title ?? "Vous vous demandez ce que l'IA changerait concrètement dans votre entreprise ?"}
        </p>
        <Link
          href={ctaHref}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-signal hover:text-[#d62e20] transition-colors"
        >
          {ctaLabel ?? "Découvrir le diagnostic IA"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </aside>
    )
  }

  if (intensity === "moyen") {
    return (
      <AnimateOnScroll>
        <div className="my-12 rounded-sm border border-[#2a2a2a] bg-[#141414] p-8 lg:p-10">
          <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
            — Diagnostic IA
          </span>
          <h3 className="mt-4 text-2xl lg:text-3xl font-bold text-ivory leading-tight">
            {title ?? "Par où commencer avec l'IA dans votre entreprise ?"}
          </h3>
          {subtitle && (
            <p className="mt-3 text-aluminium leading-relaxed max-w-2xl">{subtitle}</p>
          )}
          <div className="mt-6">
            <Button href={ctaHref} size="md" className="group">
              {ctaLabel ?? "Voir la méthode"}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </AnimateOnScroll>
    )
  }

  /* ─── fort : fin de parcours ─── */
  return (
    <section className="relative overflow-hidden bg-signal py-24 lg:py-32">
      <Container className="relative">
        <AnimateOnScroll>
          <div className="max-w-3xl">
            <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              — Premier échange offert
            </span>
            <h2 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-7xl text-white">
              {title ?? "Parlons de votre projet IA"}
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed">
              {subtitle ??
                "30 minutes pour comprendre votre contexte, vos processus et vous dire honnêtement si un diagnostic IA a du sens pour vous — et lequel."}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href={ctaHref} size="lg" className="group bg-noir text-ivory hover:bg-[#1c1c1c] transition-colors">
                {ctaLabel ?? "Prendre rendez-vous"}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="mt-6 font-mono-accent text-xs uppercase tracking-widest text-white/60">
              Sans engagement · Réponse sous 24h
            </p>
          </div>
        </AnimateOnScroll>
        <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-white/10 leading-none pointer-events-none select-none uppercase tracking-tighter">
          IA
        </div>
      </Container>
    </section>
  )
}

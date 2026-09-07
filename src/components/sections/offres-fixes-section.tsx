import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { OFFRES_FIXES_VITRINE } from "@/lib/data/offres-fixes"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { trackAttrs } from "@/lib/analytics"

/**
 * Vitrine des offres à prix fixe (home, tarifs). `variant="light"` pour les pages
 * qui utilisent encore l'ancienne palette (tarifs).
 */
export function OffresFixesSection({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dark = variant === "dark"
  return (
    <section className={dark ? "py-24 lg:py-32 bg-[#0f0f0f] border-y border-[#1c1c1c]" : "py-16 lg:py-24"}>
      <Container>
        {dark ? (
          <SectionHeader
            badge="Prix fixe, délai fixe"
            title="Un besoin précis ? Un prix annoncé, un délai tenu."
            subtitle="Quatre prestations courtes, réalisées à distance pour toute la France. Vous savez ce que vous payez et quand vous êtes livré, avant de commander."
          />
        ) : (
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Prix fixe, délai fixe</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Les offres à prix fixe</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Un besoin court et bien délimité : le prix et le délai sont annoncés avant de commander.</p>
            </div>
          </AnimateOnScroll>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {OFFRES_FIXES_VITRINE.map((o, i) => (
            <AnimateOnScroll key={o.slug} delay={i * 0.06}>
              <Link
                href={o.href}
                {...trackAttrs("cta_click", { cta: o.slug, location: dark ? "home-offres-fixes" : "tarifs-offres-fixes" })}
                className={
                  dark
                    ? "group flex h-full flex-col border border-[#1c1c1c] bg-[#141414] p-6 hover:border-signal/60 transition-colors"
                    : "group flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg transition-all"
                }
              >
                <LucideIcon name={o.icon} className={dark ? "h-6 w-6 text-signal" : "h-6 w-6 text-indigo-600 dark:text-indigo-400"} />
                <h3 className={dark ? "mt-4 text-lg font-bold text-ivory group-hover:text-signal transition-colors" : "mt-4 text-lg font-extrabold text-slate-900 dark:text-white"}>{o.nom}</h3>
                <p className={dark ? "mt-2 flex-1 text-sm text-aluminium leading-relaxed" : "mt-2 flex-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"}>{o.accroche}</p>
                <p className={dark ? "mt-5 text-2xl font-bold text-ivory" : "mt-5 text-2xl font-extrabold text-slate-900 dark:text-white"}>
                  <span className="text-base font-normal">{o.prefix}</span>{o.prix}
                </p>
                <p className={dark ? "mt-1 text-xs uppercase tracking-widest text-aluminium" : "mt-1 text-xs uppercase tracking-widest text-slate-400"}>Livré sous {o.delai}</p>
                <span className={dark ? "mt-5 inline-flex items-center gap-2 text-sm font-bold text-signal" : "mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400"}>
                  Voir l&apos;offre <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}

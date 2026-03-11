import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Container } from "@/components/ui/container"
import { secteurs } from "@/lib/data/secteurs"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"

export const metadata: Metadata = buildMetadata({
  title: "Nos Secteurs d'activité - Globe Créateur",
  description:
    "Découvrez nos expertises par secteur : hôtels, restaurants, lieux événementiels, artisans, professions libérales. Solutions digitales adaptées à votre métier.",
  path: "/secteurs",
})

export default function SecteursPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 dark:bg-slate-950">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
            Nos Secteurs
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Une expertise adaptée à{" "}
            <span className="text-gradient">votre secteur.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Chaque métier a ses enjeux. Nous concevons des solutions digitales
            qui répondent aux besoins spécifiques de votre activité.
          </p>
        </div>

        {/* Secteurs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secteurs.map((secteur) => (
            <Link
              key={secteur.slug}
              href={`/secteurs/${secteur.slug}`}
              className="group p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <LucideIcon name={secteur.icon} className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {secteur.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                {secteur.excerpt}
              </p>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                Découvrir
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 p-12 lg:p-20 bg-indigo-600 dark:bg-indigo-500 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">
                Votre secteur n&apos;est pas listé ?
                <br />
                Parlons-en.
              </h2>
              <p className="text-indigo-100 text-lg">
                Notre approche s&apos;adapte à tous les métiers. Contactez-nous
                pour discuter de vos besoins spécifiques.
              </p>
            </div>
            <Button
              href="/devis"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 h-16 rounded-2xl text-xl font-bold transition-all shadow-xl shrink-0"
            >
              Demander un devis
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

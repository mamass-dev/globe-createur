import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Container } from "@/components/ui/container"
import { services } from "@/lib/data/services"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { ServiceVisual } from "@/components/ui/service-visual"

export const metadata: Metadata = buildMetadata({
  title: "Nos Services - Globe Créateur",
  description: "Découvrez nos expertises : Création de site internet, SEO, Stratégie Digitale et Automatisation No-code.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 dark:bg-slate-950">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
            Nos Expertises
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Des solutions pour chaque <br />
            <span className="text-gradient">étape de votre croissance.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            Nous combinons design, technologie et marketing pour créer des expériences digitales qui génèrent des résultats concrets.
          </p>
        </div>

        {/* Services — alternating layout */}
        <div className="space-y-8">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl transition-all duration-500"
            >
              {/* Visual */}
              <div className={`lg:col-span-4 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ServiceVisual
                  icon={service.icon}
                  className="group-hover:scale-[1.02] transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className={`lg:col-span-8 flex flex-col justify-center space-y-4 py-2 ${i % 2 === 1 ? "lg:order-1 lg:pl-4" : "lg:pl-6"}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <LucideIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {service.keyword}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                  {service.excerpt}
                </p>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm pt-2">
                  Découvrir l&apos;expertise
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
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
                Un projet en tête ?<br />Parlons-en ensemble.
              </h2>
              <p className="text-indigo-100 text-lg">
                Chaque entreprise est unique. Nous concevons des solutions sur-mesure adaptées à vos enjeux.
              </p>
            </div>
            <Button href="/devis" className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 h-16 rounded-2xl text-xl font-bold transition-all shadow-xl shrink-0">
              Demander un devis
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

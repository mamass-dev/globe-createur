import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { services } from "@/lib/data/services"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = buildMetadata({
  title: "Nos Services - Globe Créateur",
  description: "Découvrez nos expertises : Création de site internet, SEO, Stratégie Digitale et Automatisation No-code.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <section className="bg-slate-50 pt-32 pb-24 lg:pt-48 lg:pb-32">
      <Container>
        <div className="max-w-3xl mb-20 space-y-4">
           <h1 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">Nos Expertises</h1>
           <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Des solutions pour chaque <br /> <span className="text-gradient">étape de votre croissance.</span>
           </h2>
           <p className="text-xl text-slate-600 leading-relaxed">
              Nous combinons design, technologie et marketing pour créer des expériences digitales qui génèrent des résultats concrets.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <AnimateOnScroll key={service.slug}>
              <Link 
                href={`/services/${service.slug}`} 
                className="group block p-10 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
              >
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                   <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed flex-1 mb-8">
                  {service.excerpt}
                </p>
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  D&eacute;couvrir l'expertise <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-32 p-12 lg:p-20 bg-indigo-600 rounded-[3rem] text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
              <div className="space-y-6 max-w-2xl">
                 <h3 className="text-3xl lg:text-5xl font-black leading-tight">Un projet complexe ? <br /> Parlons-en ensemble.</h3>
                 <p className="text-indigo-100 text-lg">
                    Chaque entreprise est unique. Nous concevons des solutions sur-mesure adaptées à vos enjeux spécifiques.
                 </p>
              </div>
              <Button href="/contact" className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 h-16 rounded-2xl text-xl font-bold transition-all shadow-xl">
                 Nous contacter
              </Button>
           </div>
        </div>
      </Container>
    </section>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { buildMetadata } from "@/lib/metadata"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = buildMetadata({
  title: "À propos - Globe Créateur",
  description: "Découvrez l'équipe et la mission de Globe Créateur. Studio digital basé à Dijon spécialisé dans la croissance des PME.",
  path: "/a-propos",
})

const stats = [
  { value: "110+", label: "Projets" },
  { value: "30+", label: "Partenaires" },
  { value: "97%", label: "Satisfaction" },
  { value: "350+", label: "Shootings" },
]

export default function AProposPage() {
  return (
    <section className="bg-white pt-32 pb-24 lg:pt-48 lg:pb-32">
      <Container>
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
           <div className="space-y-8">
              <h1 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">Notre Mission</h1>
              <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                 Propulser le potentiel <br /> <span className="text-gradient">de chaque PME.</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                 Globe Cr&eacute;ateur est n&eacute; d'une conviction simple : chaque entreprise m&eacute;rite une pr&eacute;sence digitale d'excellence pour exprimer son plein potentiel.
              </p>
           </div>
           <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 aspect-square">
                 <Image 
                    src="/images/team.webp" 
                    alt="L'équipe Globe Créateur" 
                    width={800} 
                    height={800} 
                    className="object-cover h-full w-full"
                 />
              </div>
           </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
           {stats.map((s, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl text-center space-y-2">
                 <p className="text-4xl lg:text-5xl font-black text-indigo-600">{s.value}</p>
                 <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
              </div>
           ))}
        </div>

        {/* PHILOSOPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-32">
           <div className="lg:col-span-5 space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Pourquoi nous faisons ce que nous faisons.</h2>
              <div className="h-2 w-20 bg-indigo-600 rounded-full" />
           </div>
           <div className="lg:col-span-7 space-y-8 text-lg text-slate-600 leading-relaxed">
              <p>
                 Le paysage digital &eacute;volue &agrave; une vitesse fulgurante. Pour une PME, rester comp&eacute;titive demande plus qu'un simple site web ; cela demande une vision, une strat&eacute;gie coh&eacute;rente et une ex&eacute;cution technique irr&eacute;prochable.
              </p>
              <p>
                 Nous avons fond&eacute; Globe Cr&eacute;ateur pour offrir aux entreprises un partenaire digital unique, capable de g&eacute;rer l'int&eacute;gralit&eacute; de leur communication, de la capture visuelle &agrave; l'automatisation de leurs processus de vente.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                 {[
                    "Transparence radicale",
                    "Obsession du r&eacute;sultat",
                    "Innovation continue",
                    "Proximit&eacute; humaine"
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                       <span className="font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: item }} />
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 lg:p-24 bg-slate-50 rounded-[4rem] space-y-8">
           <h2 className="text-3xl lg:text-5xl font-black text-slate-900">Pr&ecirc;t &agrave; rejoindre l'aventure ?</h2>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Nous sommes toujours &agrave; la recherche de nouveaux d&eacute;fis. Parlons du v&ocirc;tre d&egrave;s aujourd'hui.
           </p>
           <div className="flex justify-center pt-4">
              <Button href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-xl shadow-indigo-100 transition-all">
                 Nous contacter
              </Button>
           </div>
        </div>
      </Container>
    </section>
  )
}

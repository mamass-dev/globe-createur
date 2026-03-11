import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { getProjetPages } from "@/lib/content"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PortfolioGrid } from "@/components/sections/portfolio-grid"

export const metadata: Metadata = buildMetadata({
  title: "Nos Projets - Globe Créateur",
  description: "Découvrez nos réalisations : sites internet, SEO et stratégies digitales haute performance.",
  path: "/projets",
})

export default function ProjetsPage() {
  const projets = getProjetPages()

  return (
    <section className="bg-white dark:bg-slate-950 pt-32 pb-24 lg:pt-48 lg:pb-32">
      <Container>
        <div className="max-w-3xl mb-20 space-y-4">
           <h1 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">Portfolio</h1>
           <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Des r&eacute;alisations <br /> <span className="text-gradient">qui parlent d'elles-m&ecirc;mes.</span>
           </h2>
           <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              D&eacute;couvrez comment nous aidons nos clients &agrave; transformer leur pr&eacute;sence digitale et &agrave; atteindre leurs objectifs business.
           </p>
        </div>

        {projets.length === 0 ? (
          <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <p className="text-xl font-bold text-slate-400">De nouveaux projets arrivent bient&ocirc;t.</p>
          </div>
        ) : (
          <PortfolioGrid projets={projets} />
        )}

        <div className="mt-40 p-12 lg:p-24 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 pointer-events-none" />
           <div className="relative z-10 space-y-10 max-w-2xl mx-auto">
              <h3 className="text-4xl lg:text-6xl font-black leading-tight">Votre projet mérite l'excellence.</h3>
              <p className="text-slate-300 text-lg">
                 Discutons de vos objectifs et voyons comment nous pouvons ensemble créer votre prochaine réussite digitale.
              </p>
              <div className="flex justify-center pt-4">
                 <Button href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-16 rounded-2xl text-xl font-bold transition-all shadow-2xl shadow-indigo-500/20">
                    D&eacute;marrer un projet
                 </Button>
              </div>
           </div>
        </div>
      </Container>
    </section>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getProjetPages, getProjetPage } from "@/lib/content"
import { MdxContent } from "@/components/mdx/mdx-content"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { CheckCircle2, TrendingUp, Users, Target } from "lucide-react"

export function generateStaticParams() {
  return getProjetPages().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getProjetPage(slug)
  if (!page) return {}

  const fm = page.frontmatter as Record<string, string>
  return buildMetadata({
    title: fm.metaTitle ?? fm.title,
    description: fm.metaDescription ?? fm.excerpt ?? "",
    path: `/projets/${slug}`,
  })
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getProjetPage(slug)
  if (!page) notFound()

  const fm = page.frontmatter as Record<string, string>

  return (
    <section className="bg-white pt-32 lg:pt-48 pb-32">
      <Container>
        {/* HERO */}
        <header className="mb-20 space-y-10">
           <div className="flex flex-wrap items-center gap-4">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full">
                 Case Study
              </span>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{fm.category}</span>
           </div>

           <h1 className="text-4xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl">
              {fm.title}
           </h1>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100">
              <div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Client</p>
                 <p className="text-lg font-bold text-slate-900">{fm.client || "Confidentiel"}</p>
              </div>
              <div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Ann&eacute;e</p>
                 <p className="text-lg font-bold text-slate-900">{fm.year || "2025"}</p>
              </div>
              <div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Service</p>
                 <p className="text-lg font-bold text-slate-900">{fm.category || "Digital Strategy"}</p>
              </div>
              <div>
                 <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">R&eacute;sultat</p>
                 <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <p className="text-lg font-bold text-slate-900">Succ&egrave;s</p>
                 </div>
              </div>
           </div>
        </header>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
           <div className="lg:col-span-8 prose prose-indigo prose-xl max-w-none prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 prose-p:text-slate-600 prose-img:rounded-[2.5rem] prose-img:shadow-2xl">
              <MdxContent source={page.content} />
           </div>
           
           <div className="lg:col-span-4 space-y-8">
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-8 sticky top-32">
                 <h3 className="text-xl font-bold text-slate-900">Indicateurs de performance</h3>
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                          <TrendingUp className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-2xl font-black text-slate-900">+45%</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Taux de conversion</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                          <Users className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-2xl font-black text-slate-900">x2.5</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trafic organique</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                          <Target className="h-5 w-5" />
                       </div>
                       <div>
                          <p className="text-2xl font-black text-slate-900">-30%</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Taux de rebond</p>
                       </div>
                    </div>
                 </div>
                 <Button href="/contact" className="w-full bg-indigo-600 text-white font-bold h-12 rounded-xl">
                    Obtenir des r&eacute;sultats
                 </Button>
              </div>
           </div>
        </div>

        {/* CTA */}
        <div className="p-12 lg:p-24 bg-slate-900 rounded-[4rem] text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 pointer-events-none" />
           <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-black leading-tight">Envie de r&eacute;aliser un projet similaire ?</h2>
              <p className="text-slate-300 text-lg">
                 Chaque projet est une opportunit&eacute; de d&eacute;passer vos objectifs. Discutons de la mani&egrave;re dont nous pouvons vous aider.
              </p>
              <div className="flex justify-center pt-4">
                 <Button href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-16 rounded-2xl text-xl font-bold transition-all shadow-2xl shadow-indigo-500/20">
                    D&eacute;marrer une &eacute;tude
                 </Button>
              </div>
           </div>
        </div>
      </Container>
    </section>
  )
}

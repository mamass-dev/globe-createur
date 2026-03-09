import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { buildMetadata } from "@/lib/metadata"
import { getServicePages, getServicePage } from "@/lib/content"
import { services, getServiceBySlug } from "@/lib/data/services"
import { MdxContent } from "@/components/mdx/mdx-content"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { faqGenerales } from "@/lib/data/faq"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return getServicePages().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  const page = getServicePage(slug)
  if (!service && !page) return {}

  const title = service?.metaTitle ?? (page?.frontmatter as Record<string, string>).metaTitle ?? ""
  const description = service?.metaDescription ?? (page?.frontmatter as Record<string, string>).metaDescription ?? ""

  return buildMetadata({ title, description, path: `/services/${slug}` })
}

const defaultBenefits = [
  { title: "Sur-mesure", description: "Chaque solution est adaptée à vos objectifs, votre secteur et votre budget." },
  { title: "Optimis&eacute; SEO", description: "Tout est conçu pour être visible sur Google et générer du trafic qualifié." },
  { title: "R&eacute;sultats mesurables", description: "Reporting mensuel avec des indicateurs concrets et actionnables." },
]

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getServicePage(slug)
  if (!page) notFound()

  const service = getServiceBySlug(slug)
  const fm = page.frontmatter as Record<string, string>
  const title = service?.title ?? fm.title ?? slug
  const h1 = fm.h1 ?? title
  const subtitle = fm.metaDescription ?? service?.metaDescription ?? service?.excerpt ?? ""

  const pageFaq = faqGenerales.slice(0, 5)

  return (
    <section className="bg-white pt-32 lg:pt-48 overflow-hidden">
      <ServiceSchema name={title} description={subtitle} url={`/services/${slug}`} />
      {pageFaq.length > 0 && <FaqSchema items={pageFaq} />}

      <Container>
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest">
                 Expertise
              </div>
              <h1 className="text-4xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                 {h1}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                 {subtitle}
              </p>
              <div className="flex gap-4">
                 <Button href="/devis" className="bg-indigo-600 text-white px-8 h-14 rounded-2xl font-bold">
                    D&eacute;marrer un projet
                 </Button>
              </div>
           </div>
           <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 aspect-video lg:aspect-square bg-slate-50 flex items-center justify-center">
                 <Image 
                    src="/images/web.webp"
                    alt={`Globe Créateur — ${title}`} 
                    width={800} 
                    height={800} 
                    className="object-cover h-full w-full opacity-90"
                 />
              </div>
           </div>
        </div>

        {/* BENEFITS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {defaultBenefits.map((b, i) => (
              <div key={i} className="p-10 bg-slate-50 rounded-[2.5rem] space-y-4">
                 <CheckCircle2 className="h-8 w-8 text-indigo-600" />
                 <h3 className="text-xl font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: b.title }} />
                 <p className="text-slate-500 leading-relaxed">{b.description}</p>
              </div>
           ))}
        </div>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto py-24 border-t border-slate-100">
           <div className="prose prose-indigo prose-lg max-w-none prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
              <MdxContent source={page.content} />
           </div>
        </div>

        {/* FAQ */}
        <div className="py-24 bg-slate-50 rounded-[4rem] px-8 lg:px-20 mb-32">
           <FaqAccordion
             items={pageFaq}
             title="Questions fr&eacute;quentes"
           />
        </div>

        {/* CTA */}
        <div className="text-center pb-32">
           <AnimateOnScroll>
              <h2 className="text-3xl lg:text-6xl font-black text-slate-900 mb-12">Pr&ecirc;t &agrave; booster votre activit&eacute; ?</h2>
              <Button href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-100 transition-all">
                 Obtenir un devis gratuit
              </Button>
           </AnimateOnScroll>
        </div>
      </Container>
    </section>
  )
}

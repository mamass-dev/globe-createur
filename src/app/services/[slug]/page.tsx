import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getServicePages, getServicePage } from "@/lib/content"
import { services, getServiceBySlug } from "@/lib/data/services"
import { MdxContent } from "@/components/mdx/mdx-content"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { faqGenerales } from "@/lib/data/faq"
import { serviceFaqs } from "@/lib/data/service-faqs"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { ServiceVisual } from "@/components/ui/service-visual"
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
  { title: "Optimisé SEO", description: "Tout est conçu pour être visible sur Google et générer du trafic qualifié." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des indicateurs concrets et actionnables." },
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
  const specificFaqs = serviceFaqs[slug] ?? []
  const generalFaqs = faqGenerales.slice(0, 5)
  const pageFaq = [...specificFaqs, ...generalFaqs]

  // Related services
  const related = service?.relatedServices
    ?.map((s) => services.find((srv) => srv.slug === s))
    .filter(Boolean) ?? []

  return (
    <article className="dark:bg-slate-950 overflow-hidden">
      <ServiceSchema name={title} description={subtitle} url={`/services/${slug}`} />
      {pageFaq.length > 0 && <FaqSchema items={pageFaq} />}

      {/* HERO */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest">
                {service?.icon && <LucideIcon name={service.icon} className="h-3.5 w-3.5" />}
                Expertise
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1]">
                {h1}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/devis" className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 h-14 rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950">
                  Démarrer un projet
                </Button>
                <Button href="/contact" className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-8 h-14 rounded-2xl font-bold">
                  Nous contacter
                </Button>
              </div>
            </div>
            <div className="relative">
              <ServiceVisual
                icon={service?.icon ?? "Globe"}
                className="rounded-3xl shadow-2xl aspect-square"
              />
              {/* Glow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-600/10 dark:bg-indigo-400/5 blur-3xl rounded-full pointer-events-none" />
            </div>
          </div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {defaultBenefits.map((b, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{b.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="py-24 dark:bg-slate-950">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-indigo prose-lg dark:prose-invert max-w-none prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-slate-900 dark:prose-h2:text-white prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400">
              <MdxContent source={page.content} />
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <Container>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-4">
              Services complémentaires
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-12">
              Ces expertises pourraient vous intéresser.
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r!.slug}
                  href={`/services/${r!.slug}`}
                  className="group flex gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg transition-all duration-300"
                >
                  <ServiceVisual
                    icon={r!.icon}
                    size="sm"
                    className="w-24 h-24 shrink-0"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                      {r!.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{r!.excerpt}</p>
                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-2">
                      Découvrir <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 dark:bg-slate-950">
        <Container>
          <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 lg:p-16 border border-slate-100 dark:border-slate-800">
            <FaqAccordion
              items={pageFaq}
              title="Questions fréquentes"
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <Container className="text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              Prêt à booster votre activité ?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Discutons de vos objectifs lors d&apos;un premier échange gratuit de 20 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/devis" className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-10 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-200 dark:shadow-indigo-950 transition-all">
                Obtenir un devis gratuit
              </Button>
              <Button href="/contact" className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-10 h-14 rounded-2xl text-lg font-bold">
                Nous contacter
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}

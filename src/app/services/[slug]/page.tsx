import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getServicePages, getServicePage } from "@/lib/content"
import { services, getServiceBySlug } from "@/lib/data/services"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { ProcessSteps } from "@/components/sections/process-steps"
import { MdxContent } from "@/components/mdx/mdx-content"
import { RelatedServices } from "@/components/sections/related-services"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { faqGenerales } from "@/lib/data/faq"

/* ═══════════════════════════════════════════════════
   TEMPLATE 2 — PAGE SERVICE
   ═══════════════════════════════════════════════════

   Structure :
   ┌─────────────────────────────────────────────────┐
   │ 1. Breadcrumb              Navigation contextuelle│
   │ 2. Hero service            H1 + sous-titre + CTA │
   │ 3. Bénéfices               Grille 3 cols checkmark│
   │ 4. Process                 4 étapes numérotées    │
   │ 5. Contenu MDX             Corps SEO détaillé     │
   │ 6. Services liés           Cross-sell 3 cards     │
   │ 7. FAQ                     5 questions accordion  │
   │ 8. CTA final               Bleu, conversion      │
   └─────────────────────────────────────────────────┘

   Objectifs :
   - Convertir un visiteur en lead qualifié
   - Démontrer l'expertise sur le service
   - Fournir suffisamment de contenu pour le SEO
   - Mailler vers les services complémentaires
   ═══════════════════════════════════════════════════ */

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
  { title: "Interlocuteur unique", description: "Un seul point de contact qui coordonne toutes les compétences." },
  { title: "Résultats mesurables", description: "Reporting mensuel avec des indicateurs concrets et actionnables." },
  { title: "Support réactif", description: "Réponse sous 24h et accompagnement continu après la livraison." },
  { title: "Tarif transparent", description: "Devis détaillé sans surprise. Vous savez exactement ce que vous payez." },
]

const defaultSteps = [
  { number: "01", title: "Audit & Brief", description: "Analyse de votre situation actuelle et définition de vos objectifs." },
  { number: "02", title: "Proposition", description: "Stratégie sur-mesure, planning et devis détaillé." },
  { number: "03", title: "Réalisation", description: "Production avec validations à chaque étape clé." },
  { number: "04", title: "Livraison & Suivi", description: "Mise en ligne, formation et suivi de performance." },
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

  // Services liés
  const relatedSlugs = service?.relatedServices ?? []
  const relatedServices = relatedSlugs
    .map((s) => services.find((svc) => svc.slug === s))
    .filter(Boolean) as typeof services

  // FAQ contextuelle
  const pageFaq = faqGenerales.slice(0, 5)

  return (
    <>
      {/* Schema.org */}
      <ServiceSchema name={title} description={subtitle} url={`/services/${slug}`} />
      {pageFaq.length > 0 && <FaqSchema items={pageFaq} />}

      {/* 1. NAVIGATION — Breadcrumb */}
      <Breadcrumb
        items={[
          { name: "Services", href: "/services" },
          { name: title, href: `/services/${slug}` },
        ]}
      />

      {/* 2. ATTENTION — Hero service */}
      <PageHero
        badge={service?.keyword ?? fm.keyword}
        title={h1}
        subtitle={subtitle}
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Voir nos projets"
        secondaryHref="/projets"
      />

      {/* 3. RASSURER — Bénéfices */}
      <BenefitsGrid
        title="Pourquoi choisir Globe Créateur"
        badge="Avantages"
        benefits={defaultBenefits}
      />

      {/* 4. CLARIFIER — Process */}
      <ProcessSteps
        title="Notre méthode"
        subtitle="Un processus transparent, du premier échange à la livraison."
        badge="Comment ça marche"
        steps={defaultSteps}
      />

      {/* 5. CONVAINCRE — Contenu SEO détaillé */}
      <Container as="article" className="py-20 lg:py-28 max-w-3xl">
        <AnimateOnScroll>
          <MdxContent source={page.content} />
        </AnimateOnScroll>
      </Container>

      {/* 6. CROSS-SELL — Services liés */}
      <RelatedServices services={relatedServices} />

      {/* 7. OBJECTIONS — FAQ */}
      <FaqAccordion
        items={pageFaq}
        title="Questions fréquentes"
        badge="FAQ"
      />

      {/* 8. ACTION — CTA final */}
      <CtaSection
        title="Ce service vous intéresse ?"
        subtitle="Discutons de votre projet. Devis gratuit sous 48h."
        variant="primary"
      />
    </>
  )
}

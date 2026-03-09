import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getSecteurPages, getSecteurPage } from "@/lib/content"
import { services } from "@/lib/data/services"
import { getSecteurBySlug } from "@/lib/data/secteurs"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { BenefitsGrid } from "@/components/sections/benefits-grid"
import { MdxContent } from "@/components/mdx/mdx-content"
import { RelatedServices } from "@/components/sections/related-services"
import { Testimonials } from "@/components/sections/testimonials"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { temoignages } from "@/lib/data/temoignages"
import { faqGenerales } from "@/lib/data/faq"

/* ═══════════════════════════════════════════════════
   TEMPLATE 3 - PAGE VERTICALE MÉTIER
   ═══════════════════════════════════════════════════

   Structure :
   ┌─────────────────────────────────────────────────┐
   │ 1. Breadcrumb              Navigation contextuelle│
   │ 2. Hero secteur            H1 secteur + CTA      │
   │ 3. Défis du secteur        Bénéfices inversés     │
   │ 4. Contenu MDX             Corps SEO spécialisé   │
   │ 5. Témoignage              Preuve sociale ciblée  │
   │ 6. Services recommandés    Cross-sell pertinent    │
   │ 7. FAQ                     Questions du secteur   │
   │ 8. CTA final               Personnalisé secteur   │
   └─────────────────────────────────────────────────┘

   Objectifs :
   - Montrer la compréhension des enjeux du secteur
   - Positionner Globe Créateur comme expert du vertical
   - Convertir via la spécialisation (pas la généralité)
   - Capter la longue traîne SEO sectorielle
   ═══════════════════════════════════════════════════ */

export function generateStaticParams() {
  return getSecteurPages().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const secteur = getSecteurBySlug(slug)
  const page = getSecteurPage(slug)
  if (!secteur && !page) return {}

  const title = secteur?.metaTitle ?? (page?.frontmatter as Record<string, string>).metaTitle ?? ""
  const description = secteur?.metaDescription ?? (page?.frontmatter as Record<string, string>).metaDescription ?? ""

  return buildMetadata({ title, description, path: `/secteurs/${slug}` })
}

const sectorChallenges = [
  { title: "Visibilité en ligne insuffisante", description: "Vos concurrents captent le trafic local pendant que votre site stagne en page 2." },
  { title: "Image qui ne reflète pas la qualité", description: "Votre site ne montre pas le niveau de service que vous offrez réellement." },
  { title: "Peu de demandes via le digital", description: "Votre site génère des visites mais pas de contacts qualifiés ni de réservations." },
  { title: "Pas de temps pour communiquer", description: "Vous êtes concentré sur votre métier et la communication passe au second plan." },
]

export default async function SecteurPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getSecteurPage(slug)
  if (!page) notFound()

  const secteur = getSecteurBySlug(slug)
  const fm = page.frontmatter as Record<string, string>
  const title = secteur?.title ?? fm.title ?? slug
  const h1 = fm.h1 ?? title
  const subtitle = fm.metaDescription ?? secteur?.metaDescription ?? secteur?.excerpt ?? ""

  // Services recommandés pour ce secteur
  const relatedSlugs = secteur?.relatedServices ?? []
  const relatedServices = relatedSlugs
    .map((s) => services.find((svc) => svc.slug === s))
    .filter(Boolean) as typeof services

  const pageFaq = faqGenerales.slice(0, 4)

  return (
    <>
      {pageFaq.length > 0 && <FaqSchema items={pageFaq} />}

      {/* 1. NAVIGATION */}
      <Breadcrumb
        items={[
          { name: "Secteurs", href: "#" },
          { name: title, href: `/secteurs/${slug}` },
        ]}
      />

      {/* 2. ATTENTION - Hero secteur */}
      <PageHero
        badge={secteur?.keyword ?? fm.keyword}
        title={h1}
        subtitle={subtitle}
        ctaLabel="Discuter de mon projet"
        ctaHref="/devis"
        secondaryLabel="Découvrir nos services"
        secondaryHref="/services"
      />

      {/* 3. PROBLÈME - Défis du secteur */}
      <BenefitsGrid
        title="Les défis de votre secteur"
        subtitle="Vous vous reconnaissez ? Nous avons les solutions."
        badge="Constat"
        benefits={sectorChallenges}
        columns={2}
      />

      {/* 4. SOLUTION - Contenu SEO spécialisé */}
      <Container as="article" className="py-20 lg:py-28 max-w-3xl">
        <AnimateOnScroll>
          <MdxContent source={page.content} />
        </AnimateOnScroll>
      </Container>

      {/* 5. PREUVE - Témoignage */}
      <Testimonials
        items={temoignages.slice(0, 2)}
        title="Ils nous ont fait confiance"
        badge="Témoignages"
      />

      {/* 6. CROSS-SELL - Services recommandés */}
      <RelatedServices
        services={relatedServices}
        title="Services recommandés pour votre secteur"
        badge="Solutions"
      />

      {/* 7. OBJECTIONS - FAQ */}
      <FaqAccordion
        items={pageFaq}
        title="Questions fréquentes"
        badge="FAQ"
      />

      {/* 8. ACTION - CTA personnalisé */}
      <CtaSection
        title="Prêt à transformer votre présence digitale ?"
        subtitle="Audit gratuit de votre communication actuelle. Sans engagement."
        ctaLabel="Demander un audit gratuit"
        variant="primary"
      />
    </>
  )
}

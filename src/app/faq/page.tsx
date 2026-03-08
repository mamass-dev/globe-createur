import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { PageHero } from "@/components/sections/page-hero"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { faqGenerales, faqSeo, faqContenu, faqAutomatisation, faqCollaboration } from "@/lib/data/faq"

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Questions fréquentes sur nos services | Globe Créateur Dijon",
  description: "Réponses aux questions fréquentes sur la création de site internet, le SEO local, les forfaits communication, la production de contenu et nos services à Dijon.",
  path: "/faq",
})

export default function FaqPage() {
  const allFaq = [...faqGenerales, ...faqSeo, ...faqContenu, ...faqAutomatisation, ...faqCollaboration]

  return (
    <>
      <FaqSchema items={allFaq} />

      <Breadcrumb items={[{ name: "FAQ", href: "/faq" }]} />

      <PageHero
        title="Questions fréquentes"
        subtitle="Tout ce que vous devez savoir avant de travailler avec Globe Créateur. Si votre question n'est pas ici, contactez-nous."
      />

      <FaqAccordion
        items={faqGenerales}
        title="Questions générales"
        subtitle="Sur nos services, nos tarifs et notre fonctionnement."
        badge="Général"
      />

      <FaqAccordion
        items={faqSeo}
        title="Questions sur le SEO"
        subtitle="Référencement naturel, SEO local et visibilité Google."
        badge="SEO"
      />

      <FaqAccordion
        items={faqContenu}
        title="Questions sur le contenu"
        subtitle="Photo, vidéo, réseaux sociaux et production de contenu."
        badge="Contenu"
      />

      <FaqAccordion
        items={faqAutomatisation}
        title="Questions sur l'automatisation"
        subtitle="CRM, workflows et outils no-code pour gagner du temps."
        badge="Automatisation"
      />

      <FaqAccordion
        items={faqCollaboration}
        title="Collaboration & fonctionnement"
        subtitle="Rencontres, délais, tournages et protection des données."
        badge="Collaboration"
      />

      <CtaSection
        title="D'autres questions ?"
        subtitle="Contactez-nous directement. Réponse sous 24h, c'est garanti."
        ctaLabel="Nous contacter"
        ctaHref="/contact"
      />
    </>
  )
}

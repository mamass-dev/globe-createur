import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Testimonials } from "@/components/sections/testimonials"
import { CtaSection } from "@/components/sections/cta-section"
import { temoignages } from "@/lib/data/temoignages"

export const metadata: Metadata = buildMetadata({
  title: "Témoignages clients - Avis et retours d'expérience",
  description: "Découvrez les témoignages de nos clients : PME, hôtels et indépendants en Bourgogne qui nous font confiance pour leur communication.",
  path: "/temoignages",
})

export default function TemoignagesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Témoignages", href: "/temoignages" }]} />

      <Testimonials
        items={temoignages}
        title="Témoignages clients"
        subtitle="Ce que nos clients disent de leur expérience avec Globe Créateur."
      />

      <CtaSection
        title="Rejoignez nos clients satisfaits"
        subtitle="Discutons de votre projet. Premier échange gratuit."
        variant="primary"
      />
    </>
  )
}

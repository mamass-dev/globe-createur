import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { ServiceGrid } from "@/components/sections/service-grid"
import { CtaSection } from "@/components/sections/cta-section"
import { services } from "@/lib/data/services"

export const metadata: Metadata = buildMetadata({
  title: "Services de communication digitale pour PME | Globe Créateur",
  description: "Découvrez tous nos services : création de site, refonte, SEO local, création de contenu, support communication et automatisation no-code pour PME à Dijon.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Services", href: "/services" }]} />

      <ServiceGrid
        services={services}
        title="Nos services"
        subtitle="Un accompagnement complet pour construire et développer votre présence digitale."
      />

      <CtaSection
        title="Un projet en tête ?"
        subtitle="Chaque projet est unique. Parlons du vôtre."
      />
    </>
  )
}

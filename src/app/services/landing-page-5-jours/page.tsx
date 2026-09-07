import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { getOffreFixe } from "@/lib/data/offres-fixes"
import { OffreFixePage } from "@/components/sections/offre-fixe-page"

const offre = getOffreFixe("landing-page-5-jours")!

export const metadata: Metadata = buildMetadata({
  title: offre.metaTitle,
  description: offre.metaDescription,
  path: "/services/landing-page-5-jours",
  keywords: offre.keywords,
})

export default function Page() {
  return <OffreFixePage offre={offre} />
}

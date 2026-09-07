import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { getOffreFixe } from "@/lib/data/offres-fixes"
import { OffreFixePage } from "@/components/sections/offre-fixe-page"

const offre = getOffreFixe("fiche-google-business-optimisee")!

export const metadata: Metadata = buildMetadata({
  title: offre.metaTitle,
  description: offre.metaDescription,
  path: "/services/fiche-google-business-optimisee",
  keywords: offre.keywords,
})

export default function Page() {
  return <OffreFixePage offre={offre} />
}

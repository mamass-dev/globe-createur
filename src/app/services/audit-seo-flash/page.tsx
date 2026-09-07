import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { getOffreFixe } from "@/lib/data/offres-fixes"
import { OffreFixePage } from "@/components/sections/offre-fixe-page"

const offre = getOffreFixe("audit-seo-flash")!

export const metadata: Metadata = buildMetadata({
  title: offre.metaTitle,
  description: offre.metaDescription,
  path: "/services/audit-seo-flash",
  keywords: offre.keywords,
})

export default function Page() {
  return <OffreFixePage offre={offre} />
}

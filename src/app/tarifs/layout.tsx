import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Tarifs agence communication PME — Dijon & Bourgogne | Globe Créateur",
  description: "Projets ponctuels ou forfaits mensuels : tarifs agence communication transparents pour PME à Dijon et en Bourgogne-Franche-Comté. Devis gratuit sous 24h, sans engagement.",
  path: "/tarifs",
  keywords: ["tarifs agence communication", "prix forfait communication PME", "tarif site internet Dijon", "tarif agence web Bourgogne", "pack communication entreprise"],
})

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

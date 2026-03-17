import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Nos offres - Agence web & communication a Dijon | Globe Createur",
  description: "Projets ponctuels ou accompagnement mensuel : decouvrez nos offres adaptees aux PME. Devis gratuit sous 24h, sans engagement. Agence web a Dijon.",
  path: "/tarifs",
})

export default function TarifsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

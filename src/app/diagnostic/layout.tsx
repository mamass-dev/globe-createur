import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Diagnostic communication gratuit | Globe Createur",
  description: "Decouvrez en 2 minutes ce que vous perdez chaque mois sans communication digitale. Diagnostic personnalise, recommandations concretes. Zero bullshit.",
  path: "/diagnostic",
})

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

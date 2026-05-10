import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"

export const metadata: Metadata = buildMetadata({
  title: "Diagnostic communication gratuit pour PME | Globe Créateur",
  description: "Découvrez en 2 minutes ce que vous perdez chaque mois sans communication digitale. Diagnostic personnalisé, recommandations concrètes pour PME à Dijon et en Bourgogne.",
  path: "/diagnostic",
  keywords: ["diagnostic communication gratuit", "diagnostic digital PME", "audit communication Dijon", "diagnostic numérique gratuit"],
})

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

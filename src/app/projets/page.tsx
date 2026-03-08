import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getProjetPages } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = buildMetadata({
  title: "Nos projets — Réalisations web et communication",
  description: "Découvrez nos réalisations : sites internet, identités visuelles et stratégies de communication pour PME en Bourgogne.",
  path: "/projets",
})

export default function ProjetsPage() {
  const projets = getProjetPages()

  return (
    <>
      <Breadcrumb items={[{ name: "Projets", href: "/projets" }]} />

      <Container className="py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Nos projets</h1>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Des réalisations concrètes pour des entreprises qui nous font confiance.
          </p>
        </div>

        {projets.length === 0 ? (
          <p className="text-center text-gray-500">Nos projets arrivent bientôt. Restez connecté !</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projets.map((projet) => {
              const fm = projet.frontmatter as Record<string, string>
              return (
                <Link key={projet.slug} href={`/projets/${projet.slug}`}>
                  <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all group">
                    <Badge>{fm.category ?? "Projet"}</Badge>
                    <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {fm.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">{fm.client}</p>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{fm.excerpt}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </Container>
    </>
  )
}

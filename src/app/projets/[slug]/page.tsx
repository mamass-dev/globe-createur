import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getProjetPages, getProjetPage } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { MdxContent } from "@/components/mdx/mdx-content"
import { CtaSection } from "@/components/sections/cta-section"
import { Container } from "@/components/ui/container"

export function generateStaticParams() {
  return getProjetPages().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getProjetPage(slug)
  if (!page) return {}

  const fm = page.frontmatter as Record<string, string>
  return buildMetadata({
    title: fm.metaTitle ?? fm.title,
    description: fm.metaDescription ?? fm.excerpt ?? "",
    path: `/projets/${slug}`,
  })
}

export default async function ProjetPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getProjetPage(slug)
  if (!page) notFound()

  const fm = page.frontmatter as Record<string, string>

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Projets", href: "/projets" },
          { name: fm.title ?? slug, href: `/projets/${slug}` },
        ]}
      />

      <Container as="article" className="py-12 lg:py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{fm.title}</h1>
        {fm.client && <p className="text-gray-500 mb-8">Client : {fm.client}</p>}
        <MdxContent source={page.content} />
      </Container>

      <CtaSection
        title="Un projet similaire ?"
        subtitle="Discutons de vos objectifs. Devis gratuit sous 48h."
        variant="primary"
      />
    </>
  )
}

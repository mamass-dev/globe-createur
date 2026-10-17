import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProspect } from "@/lib/prospects/store"
import { getProjetPage } from "@/lib/content"
import { ProspectView, type PublicProspect, type CaseCard } from "@/components/prospects/prospect-view"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getProspect(slug)
  return {
    title: p ? `${p.company} × Globe Créateur` : "Page introuvable",
    robots: { index: false, follow: false, nocache: true },
  }
}

/** Ce que le prospect peut voir : jamais les notes internes, les codes, les relances ni le journal brut. */
function toPublic(p: NonNullable<Awaited<ReturnType<typeof getProspect>>>): PublicProspect {
  return {
    slug: p.slug,
    company: p.company,
    contactName: p.contactName,
    state: p.state,
    constat: p.constat,
    proposition: p.proposition,
    acceptance: p.acceptance
      ? { name: p.acceptance.name, acceptedAt: p.acceptance.acceptedAt, version: p.acceptance.version, hash: p.acceptance.hash, totalOnce: p.acceptance.totalOnce, totalMonthly: p.acceptance.totalMonthly }
      : undefined,
    questions: p.questions,
    projet: p.projet,
    rapports: p.rapports,
    parrainageCode: p.parrainageCode,
    shares: p.shares.map((s) => s.name),
  }
}

export default async function ProspectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getProspect(slug)
  if (!p) notFound()
  const cases: CaseCard[] = p.proposition.cases
    .map((s) => {
      const page = getProjetPage(s)
      if (!page) return null
      const fm = page.frontmatter as Record<string, string>
      return { slug: s, title: fm.title ?? s, client: fm.client ?? "", category: fm.category ?? "", excerpt: fm.excerpt ?? "", image: fm.image ?? "" }
    })
    .filter((c): c is CaseCard => c !== null)
  return <ProspectView prospect={toPublic(p)} cases={cases} />
}

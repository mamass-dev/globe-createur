import type { Metadata } from "next"
import { isAdmin } from "@/lib/prospects/auth"
import { getProjetPages } from "@/lib/content"
import { AdminLogin } from "@/components/prospects/admin-login"
import { ProspectEditor } from "@/components/prospects/prospect-editor"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Dossier prospect · admin", robots: { index: false, follow: false } }

export default async function AdminProspectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!(await isAdmin())) return <AdminLogin />
  const cases = getProjetPages().map((p) => ({ slug: p.slug, title: (p.frontmatter as Record<string, string>).title ?? p.slug }))
  return <ProspectEditor slug={slug} cases={cases} />
}

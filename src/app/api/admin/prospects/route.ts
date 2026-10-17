import { NextResponse } from "next/server"
import { z } from "zod"
import { requireAdmin } from "@/lib/prospects/auth"
import { listProspects, createProspect } from "@/lib/prospects/store"
import { lastActivity, lastChapter } from "@/lib/prospects/relances"

export async function GET() {
  const denied = await requireAdmin()
  if (denied) return denied
  const all = await listProspects()
  return NextResponse.json(
    all.map((p) => ({
      slug: p.slug,
      company: p.company,
      contactName: p.contactName ?? "",
      state: p.state,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      opens: p.events.filter((e) => e.type === "open").length,
      lastActivity: lastActivity(p),
      lastChapter: lastChapter(p),
      openQuestions: p.questions.filter((q) => !q.answer).length,
      pendingRelances: p.relances.filter((r) => r.status === "proposee").length,
    }))
  )
}

const createSchema = z.object({
  company: z.string().min(2).max(100).trim(),
  website: z.string().max(200).trim().optional(),
  contactName: z.string().max(100).trim().optional(),
  contactEmail: z.string().email().max(255).trim().optional().or(z.literal("")),
  contactPhone: z.string().max(30).trim().optional(),
  sector: z.string().max(80).trim().optional(),
  city: z.string().max(80).trim().optional(),
})

export async function POST(request: Request) {
  const denied = await requireAdmin()
  if (denied) return denied
  const body = createSchema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ error: "Données invalides", details: body.error.flatten().fieldErrors }, { status: 400 })
  const { company, ...rest } = body.data
  const p = await createProspect(company, { ...rest, contactEmail: rest.contactEmail || undefined })
  return NextResponse.json({ ok: true, slug: p.slug })
}

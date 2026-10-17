import { NextResponse } from "next/server"
import { z } from "zod"
import { updateProspect } from "@/lib/prospects/store"
import { rateLimit, getClientIp } from "@/lib/security"

const schema = z.object({ selected: z.array(z.string().max(60)).max(50) })

/** Le prospect compose sa proposition : on mémorise ses choix (les modules obligatoires restent). */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ip = getClientIp(request)
  if (!rateLimit(`p-sel:${ip}`, { maxRequests: 200, windowMs: 3_600_000 }).success) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }
  const body = schema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ ok: false }, { status: 400 })
  const set = new Set(body.data.selected)
  const p = await updateProspect(slug, (p) => {
    if (p.state !== "proposition") return false
    let changed = false
    for (const m of p.proposition.modules) {
      const next = m.required ? true : set.has(m.id)
      if (next !== m.selected) { m.selected = next; changed = true }
    }
    if (!changed) return false
    p.events.push({ type: "selection", at: new Date().toISOString(), meta: { selected: [...set].join(",") } })
  })
  if (!p) return NextResponse.json({ ok: false }, { status: 404 })
  return NextResponse.json({ ok: true })
}

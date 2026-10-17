import { NextResponse, after } from "next/server"
import { z } from "zod"
import { updateProspect } from "@/lib/prospects/store"
import { alertOpened } from "@/lib/prospects/mail"
import { rateLimit, getClientIp } from "@/lib/security"

const schema = z.object({
  type: z.enum(["open", "chapter", "share"]),
  chapter: z.string().max(40).optional(),
  name: z.string().max(80).trim().optional(),
  device: z.string().max(40).optional(),
})

/** Signaux côté prospect : ouverture, chapitre atteint, partage nominatif. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ip = getClientIp(request)
  if (!rateLimit(`p-event:${ip}`, { maxRequests: 120, windowMs: 3_600_000 }).success) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }
  const body = schema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ ok: false }, { status: 400 })
  const { type, chapter, name, device } = body.data
  const now = new Date().toISOString()
  let notify: { first: boolean } | null = null

  const p = await updateProspect(slug, (p) => {
    if (type === "open") {
      const lastOpen = [...p.events].reverse().find((e) => e.type === "open")
      const first = !lastOpen
      const quiet = !lastOpen || Date.now() - new Date(lastOpen.at).getTime() > 24 * 3600e3
      p.events.push({ type: "open", at: now, meta: { device: device ?? "", state: p.state } })
      if (quiet && p.state !== "clos") notify = { first }
    } else if (type === "chapter" && chapter) {
      // Un seul événement par chapitre et par ouverture (dernière heure)
      const recent = p.events.some((e) => e.type === "chapter" && e.meta?.chapter === chapter && Date.now() - new Date(e.at).getTime() < 3600e3)
      if (recent) return false
      p.events.push({ type: "chapter", at: now, meta: { chapter } })
    } else if (type === "share" && name) {
      p.shares.push({ name, at: now })
      p.events.push({ type: "share", at: now, meta: { name } })
    }
    // Garder les 500 derniers événements
    if (p.events.length > 500) p.events = p.events.slice(-500)
  })
  if (!p) return NextResponse.json({ ok: false }, { status: 404 })
  if (notify) {
    const n = notify as { first: boolean }
    after(() => alertOpened(p, { first: n.first, device: device ?? "appareil inconnu" }))
  }
  return NextResponse.json({ ok: true })
}

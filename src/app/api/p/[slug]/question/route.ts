import { NextResponse, after } from "next/server"
import { z } from "zod"
import { updateProspect, randomSuffix } from "@/lib/prospects/store"
import { alertQuestion } from "@/lib/prospects/mail"
import { rateLimit, getClientIp } from "@/lib/security"

const schema = z.object({
  text: z.string().min(2).max(2000).trim(),
  quote: z.string().max(600).trim().optional(),
  chapter: z.string().max(40).optional(),
  _hp: z.string().max(0).optional(),
})

/** Question ou commentaire du prospect (avec passage surligné éventuel). */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ip = getClientIp(request)
  if (!rateLimit(`p-question:${ip}`, { maxRequests: 30, windowMs: 3_600_000 }).success) {
    return NextResponse.json({ error: "Trop de messages, réessayez dans un moment." }, { status: 429 })
  }
  const body = schema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ error: "Message invalide" }, { status: 400 })
  const { text, quote, chapter } = body.data
  const id = randomSuffix(8)
  const p = await updateProspect(slug, (p) => {
    p.questions.push({ id, text, quote: quote || undefined, chapter, createdAt: new Date().toISOString() })
    p.events.push({ type: "question", at: new Date().toISOString(), meta: { id, chapter: chapter ?? "" } })
  })
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  after(() => alertQuestion(p, text, quote))
  return NextResponse.json({ ok: true, id })
}

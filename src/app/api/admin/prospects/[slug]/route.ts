import { NextResponse, after } from "next/server"
import { z } from "zod"
import { requireAdmin } from "@/lib/prospects/auth"
import { getProspect, updateProspect, deleteProspect, randomSuffix } from "@/lib/prospects/store"
import { notifyAnswer, sendRelance } from "@/lib/prospects/mail"
import type { Prospect, ProspectState } from "@/lib/prospects/types"

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { slug } = await params
  const p = await getProspect(slug)
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  return NextResponse.json(p, { headers: { "Cache-Control": "no-store" } })
}

const moduleSchema = z.object({
  id: z.string().min(1).max(60),
  title: z.string().min(1).max(200),
  desc: z.string().max(1000).default(""),
  price: z.number().min(0).max(1_000_000),
  monthly: z.boolean().optional(),
  required: z.boolean().optional(),
  selected: z.boolean(),
  estimate: z.boolean().optional(),
})
const checklist = z.array(z.object({ label: z.string().max(200), done: z.boolean(), when: z.string().max(40).optional() })).max(60)

const putSchema = z.object({
  company: z.string().min(2).max(100).trim(),
  contactName: z.string().max(100).trim().nullish(),
  contactEmail: z.string().max(255).trim().nullish(),
  contactPhone: z.string().max(30).trim().nullish(),
  sector: z.string().max(80).trim().nullish(),
  city: z.string().max(80).trim().nullish(),
  website: z.string().max(200).trim().nullish(),
  internalNotes: z.string().max(5000).nullish(),
  constat: z.object({
    screenshotUrl: z.string().max(500).optional(),
    score: z.number().min(0).max(100).nullable().optional(),
    points: z.array(z.object({ title: z.string().max(200), text: z.string().max(2000) })).max(10),
    whois: z.object({ domain: z.string().max(200).optional(), registrar: z.string().max(200).optional(), holder: z.string().max(200).optional(), expires: z.string().max(40).optional() }).optional(),
    mystere: z.object({ channel: z.string().max(60).optional(), sentAt: z.string().max(40).optional(), repliedAt: z.string().max(40).nullable().optional(), note: z.string().max(1000).optional() }).optional(),
    googleFiche: z.object({ note: z.string().max(1000).optional(), reviews: z.number().nullable().optional(), rating: z.number().nullable().optional(), unanswered: z.number().nullable().optional() }).optional(),
    videoUrl: z.string().max(500).optional(),
    pitch: z.string().max(3000).optional(),
    bookingUrl: z.string().max(500).optional(),
  }),
  proposition: z.object({
    intro: z.string().max(3000).optional(),
    modules: z.array(moduleSchema).max(50),
    minTotal: z.number().min(0).optional(),
    startDate: z.string().max(40).optional(),
    validUntil: z.string().max(40).optional(),
    cases: z.array(z.string().max(80)).max(10),
    planning: z.array(z.object({ label: z.string().max(200), when: z.string().max(80) })).max(30).optional(),
    depositPct: z.number().min(0).max(100).optional(),
    terms: z.string().max(3000).optional(),
  }),
  projet: z.object({ acces: checklist, planning: checklist, livrables: checklist, note: z.string().max(3000).optional() }),
  rapports: z.array(z.object({ month: z.string().max(20), text: z.string().max(5000), metrics: z.array(z.object({ label: z.string().max(80), value: z.string().max(80) })).max(20) })).max(60),
  parrainageCode: z.string().max(40).nullish(),
})

function propositionKey(p: Prospect["proposition"]) {
  return JSON.stringify({ i: p.intro, m: p.modules.map((m) => [m.id, m.title, m.desc, m.price, m.monthly, m.required, m.estimate]), min: p.minTotal, s: p.startDate, v: p.validUntil, pl: p.planning, d: p.depositPct, t: p.terms })
}

/** Enregistrement complet depuis l'éditeur admin. La version de la proposition s'incrémente si son contenu change. */
export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { slug } = await params
  const body = putSchema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ error: "Données invalides", details: body.error.flatten().fieldErrors }, { status: 400 })
  const d = body.data
  const p = await updateProspect(slug, (p) => {
    const before = propositionKey(p.proposition)
    p.company = d.company
    p.contactName = d.contactName ?? undefined
    p.contactEmail = d.contactEmail || undefined
    p.contactPhone = d.contactPhone ?? undefined
    p.sector = d.sector ?? undefined
    p.city = d.city ?? undefined
    p.website = d.website ?? undefined
    p.internalNotes = d.internalNotes ?? undefined
    p.constat = d.constat
    // Le prospect peut avoir modifié sa sélection entre-temps : on garde ses choix sur les modules non obligatoires conservés
    const prevSel = new Map(p.proposition.modules.map((m) => [m.id, m.selected]))
    p.proposition = { ...p.proposition, ...d.proposition, modules: d.proposition.modules.map((m) => ({ ...m, selected: m.required ? true : (prevSel.get(m.id) ?? m.selected) })) }
    if (propositionKey(p.proposition) !== before && p.state !== "accepte") p.proposition.version += 1
    p.projet = d.projet
    p.rapports = d.rapports
    p.parrainageCode = d.parrainageCode ?? undefined
  })
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  return NextResponse.json({ ok: true, version: p.proposition.version })
}

const actionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("state"), state: z.enum(["constat", "proposition", "accepte", "projet", "rapport", "clos"]) }),
  z.object({ action: z.literal("answer"), id: z.string().max(20), answer: z.string().min(1).max(5000) }),
  z.object({ action: z.literal("relance"), id: z.string().max(20), op: z.enum(["send", "cancel"]), subject: z.string().max(200).optional(), draft: z.string().max(5000).optional() }),
  z.object({ action: z.literal("relance_new"), topic: z.string().max(40), subject: z.string().max(200), draft: z.string().max(5000) }),
  z.object({ action: z.literal("note"), text: z.string().max(2000) }),
])

/** Actions ponctuelles : changement d'état, réponse à une question, envoi ou annulation d'une relance, note. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { slug } = await params
  const body = actionSchema.safeParse(await request.json().catch(() => ({})))
  if (!body.success) return NextResponse.json({ error: "Action invalide" }, { status: 400 })
  const a = body.data
  const now = new Date().toISOString()
  let side: (() => Promise<void>) | null = null
  let error: string | null = null

  const p = await updateProspect(slug, (p) => {
    if (a.action === "state") {
      p.state = a.state as ProspectState
      p.events.push({ type: "note", at: now, meta: { state: a.state } })
      if (a.state === "clos" || a.state === "accepte") for (const r of p.relances) if (r.status === "proposee") r.status = "annulee"
      if (a.state === "rapport" && !p.parrainageCode) p.parrainageCode = randomSuffix(8)
    } else if (a.action === "answer") {
      const q = p.questions.find((q) => q.id === a.id)
      if (!q) { error = "Question introuvable"; return false }
      q.answer = a.answer
      q.answeredAt = now
      const question = q.text
      side = () => notifyAnswer(p, question, a.answer)
    } else if (a.action === "relance") {
      const r = p.relances.find((r) => r.id === a.id)
      if (!r) { error = "Relance introuvable"; return false }
      if (a.op === "cancel") { r.status = "annulee"; return }
      if (!p.contactEmail) { error = "Pas d'e-mail de contact"; return false }
      r.subject = a.subject ?? r.subject
      r.draft = a.draft ?? r.draft
      r.status = "envoyee"
      r.sentAt = now
      p.events.push({ type: "relance", at: now, meta: { id: r.id, topic: r.topic, status: "envoyee" } })
      const { subject, draft } = r
      side = () => sendRelance(p, subject, draft)
    } else if (a.action === "relance_new") {
      if (!p.contactEmail) { error = "Pas d'e-mail de contact"; return false }
      const r = { id: randomSuffix(8), dueAt: now, topic: a.topic, subject: a.subject, draft: a.draft, status: "envoyee" as const, sentAt: now }
      p.relances.push(r)
      p.events.push({ type: "relance", at: now, meta: { id: r.id, topic: r.topic, status: "envoyee" } })
      side = () => sendRelance(p, a.subject, a.draft)
    } else if (a.action === "note") {
      p.events.push({ type: "note", at: now, meta: { text: a.text } })
    }
  })
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  if (error) return NextResponse.json({ error }, { status: 400 })
  if (side) {
    const fn = side as () => Promise<void>
    try { await fn() } catch (e) { return NextResponse.json({ error: `Enregistré, mais l'e-mail n'est pas parti : ${(e as Error).message}` }, { status: 502 }) }
  }
  after(() => {})
  return NextResponse.json({ ok: true, state: p.state })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { slug } = await params
  await deleteProspect(slug)
  return NextResponse.json({ ok: true })
}

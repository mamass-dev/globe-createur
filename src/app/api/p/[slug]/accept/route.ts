import { NextResponse, after } from "next/server"
import { z } from "zod"
import { randomInt } from "node:crypto"
import { updateProspect, sha256 } from "@/lib/prospects/store"
import { sendCode, sendAcceptance } from "@/lib/prospects/mail"
import { totals } from "@/lib/prospects/types"
import { rateLimit, getClientIp } from "@/lib/security"

const startSchema = z.object({
  step: z.literal("start"),
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim().toLowerCase(),
  _hp: z.string().max(0).optional(),
})
const confirmSchema = z.object({
  step: z.literal("confirm"),
  code: z.string().regex(/^\d{6}$/),
})

/*
 * Acceptation en deux temps : (1) nom + e-mail → code à 6 chiffres envoyé par e-mail ;
 * (2) code → la proposition est figée (snapshot + SHA-256 + horodatage + IP), l'état passe
 * à « accepte », les deux parties reçoivent la confirmation avec le lien du document figé.
 */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ip = getClientIp(request)
  if (!rateLimit(`p-accept:${ip}`, { maxRequests: 20, windowMs: 3_600_000 }).success) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 })
  }
  const raw = await request.json().catch(() => ({}))

  if (raw?.step === "start") {
    const body = startSchema.safeParse(raw)
    if (!body.success) return NextResponse.json({ error: "Nom ou e-mail invalide" }, { status: 400 })
    const { name, email } = body.data
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0")
    const p = await updateProspect(slug, (p) => {
      if (p.state !== "proposition") return false
      p.pendingCode = { hash: sha256(`${code}:${email}`), email, name, expiresAt: new Date(Date.now() + 15 * 60e3).toISOString() }
      p.events.push({ type: "accept_start", at: new Date().toISOString(), meta: { email } })
    })
    if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
    if (p.state !== "proposition") return NextResponse.json({ error: "Cette proposition n'est plus ouverte à l'acceptation." }, { status: 409 })
    try {
      await sendCode(email, name, p, code)
    } catch {
      return NextResponse.json({ error: "L'e-mail de confirmation n'a pas pu partir. Réessayez ou écrivez-nous." }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  }

  const body = confirmSchema.safeParse(raw)
  if (!body.success) return NextResponse.json({ error: "Code invalide" }, { status: 400 })
  let error: string | null = null
  const p = await updateProspect(slug, (p) => {
    if (p.state !== "proposition" || !p.pendingCode) { error = "Aucune acceptation en cours."; return false }
    if (new Date(p.pendingCode.expiresAt).getTime() < Date.now()) { error = "Code expiré. Recommencez."; return false }
    if (sha256(`${body.data.code}:${p.pendingCode.email}`) !== p.pendingCode.hash) { error = "Code incorrect."; return false }
    const snapshot = structuredClone(p.proposition)
    const { once, monthly } = totals(snapshot)
    const acceptedAt = new Date().toISOString()
    const payload = JSON.stringify({ slug: p.slug, version: snapshot.version, snapshot, acceptedAt, email: p.pendingCode.email })
    p.acceptance = {
      name: p.pendingCode.name,
      email: p.pendingCode.email,
      acceptedAt,
      ip,
      userAgent: request.headers.get("user-agent")?.slice(0, 200) ?? "",
      version: snapshot.version,
      hash: sha256(payload),
      snapshot,
      totalOnce: once,
      totalMonthly: monthly,
    }
    if (!p.contactEmail) p.contactEmail = p.pendingCode.email
    if (!p.contactName) p.contactName = p.pendingCode.name
    p.pendingCode = undefined
    p.state = "accepte"
    p.events.push({ type: "accept", at: acceptedAt, meta: { version: snapshot.version, once, monthly } })
    for (const r of p.relances) if (r.status === "proposee") r.status = "annulee"
  })
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  if (error) return NextResponse.json({ error }, { status: 400 })
  after(() => sendAcceptance(p))
  return NextResponse.json({ ok: true, version: p.acceptance?.version, hash: p.acceptance?.hash })
}

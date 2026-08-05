import { NextResponse } from "next/server"
import { Resend } from "resend"
import { escapeHtml, rateLimit, getClientIp, checkSpam } from "@/lib/security"
import { clRacingReservationSchema, ROULAGES, FORMULE_CHOICES } from "@/lib/cl-racing"

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 5, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json(
        { error: "Trop de requêtes. Réessayez plus tard." },
        { status: 429 },
      )
    }

    const body = await request.json()
    if (checkSpam(body)) {
      return NextResponse.json({ success: true })
    }

    const parsed = clRacingReservationSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data
    const roulage = ROULAGES.find((r) => r.id === data.roulageId)
    const formuleMeta = FORMULE_CHOICES.find((f) => f.id === data.formule)
    const formuleLabel = formuleMeta
      ? `${formuleMeta.label} (${formuleMeta.price}€${formuleMeta.oldPrice ? ` au lieu de ${formuleMeta.oldPrice}€` : ""})`
      : data.formule

    await resend.emails.send({
      from: "Globe Créateur × CL RACING <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: data.email,
      subject: `[GC × CL RACING] Réservation — ${data.firstName} ${data.lastName} · ${roulage?.dateLabel ?? data.roulageId}`,
      html: renderEmailHTML({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        roulageLabel: roulage?.dateLabel ?? data.roulageId,
        roulageType: roulage?.type ?? "",
        formuleLabel,
      }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[cl-racing/reservation] error:", error)
    return NextResponse.json(
      { error: "Erreur serveur. Réessayez ou écrivez à contact@globecreateur.fr." },
      { status: 500 },
    )
  }
}

function renderEmailHTML(ctx: {
  firstName: string
  lastName: string
  email: string
  phone: string
  roulageLabel: string
  roulageType: string
  formuleLabel: string
}) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#6b6b78;font-size:12px;text-transform:uppercase;letter-spacing:0.06em;width:160px;vertical-align:top">${label}</td><td style="padding:8px 12px;color:#101015;font-size:14px;line-height:1.5">${escapeHtml(value)}</td></tr>`
      : ""

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f7;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;border:1px solid #e5e5ea">
      <div style="background:#4f46e5;color:white;padding:24px 28px">
        <div style="font-size:11px;letter-spacing:0.2em;color:#c7d2fe;text-transform:uppercase">Globe Créateur × CL RACING · Nouvelle demande</div>
        <div style="font-size:22px;margin-top:6px;font-weight:700">${escapeHtml(ctx.firstName)} ${escapeHtml(ctx.lastName)}</div>
        <div style="font-size:13px;color:#c7d2fe;margin-top:4px">${escapeHtml(ctx.roulageLabel)}${ctx.roulageType ? ` · ${escapeHtml(ctx.roulageType)}` : ""}</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        ${row("Email", ctx.email)}
        ${row("Téléphone", ctx.phone)}
        ${row("Formule", ctx.formuleLabel)}
      </table>
      <div style="padding:16px 28px;background:#fef3c7;color:#92400e;font-size:13px;border-top:1px solid #e5e5ea;font-weight:600">
        → À rappeler sous 24h pour confirmer (créneau vidéo, véhicule, etc.)
      </div>
      <div style="padding:12px 28px;background:#f5f5f7;color:#6b6b78;font-size:11px;border-top:1px solid #e5e5ea">
        Répondez directement à cet email pour recontacter le pilote.
      </div>
    </div>
  </div>
  `
}

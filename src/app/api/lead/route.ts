import { NextResponse } from "next/server"
import { Resend } from "resend"
import { leadSchema, escapeHtml, rateLimit, getClientIp, checkSpam } from "@/lib/security"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 10, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    if (checkSpam(body)) {
      return NextResponse.json({ success: true })
    }
    const result = leadSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Données invalides", details: result.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, phone, source, context } = result.data

    const contextRows = context
      ? Object.entries(context)
          .map(([key, val]) => {
            const safeKey = escapeHtml(String(key))
            const safeVal = escapeHtml(typeof val === "object" ? JSON.stringify(val) : String(val ?? ""))
            return `<tr><td style="padding:6px 12px;font-weight:bold;color:#64748b;">${safeKey}</td><td style="padding:6px 12px;">${safeVal}</td></tr>`
          })
          .join("")
      : ""

    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Nouveau lead ${escapeHtml(source || "site")} — ${escapeHtml(name)}`,
      html: `
        <h2>Nouveau lead depuis ${escapeHtml(source || "site")}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Nom</td><td style="padding:8px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Téléphone</td><td style="padding:8px 12px;">${escapeHtml(phone || "—")}</td></tr>
        </table>
        ${contextRows ? `
        <hr style="margin:20px 0;border:none;border-top:1px solid #e2e8f0;" />
        <h3 style="color:#6366f1;">Données du ${escapeHtml(source || "formulaire")}</h3>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          ${contextRows}
        </table>
        ` : ""}
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead form error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

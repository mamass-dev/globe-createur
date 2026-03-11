import { NextResponse } from "next/server"
import { Resend } from "resend"
import { leadMagnetSchema, escapeHtml, rateLimit, getClientIp } from "@/lib/security"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 5, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    const result = leadMagnetSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 })
    }

    const { email, source, offer, page } = result.data

    // 1. Notify you about the new lead
    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      subject: `Nouveau lead magnet — ${escapeHtml(offer || "Checklist SEO")}`,
      html: `
        <h2 style="color:#6366f1;">Nouveau lead magnet</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Offre</td><td style="padding:8px 12px;">${escapeHtml(offer || "—")}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Page</td><td style="padding:8px 12px;">${escapeHtml(page || "—")}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Source</td><td style="padding:8px 12px;">${escapeHtml(source || "lead-magnet")}</td></tr>
        </table>
      `,
    })

    // 2. Send confirmation email to the lead
    await resend.emails.send({
      from: "Axel de Globe Créateur <noreply@globecreateur.fr>",
      to: email,
      subject: `Votre ressource gratuite — ${escapeHtml(offer || "Checklist SEO")}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;">
          <img src="https://globecreateur.fr/images/logo/logo-main.webp" alt="Globe Créateur" style="height:32px;margin-bottom:24px;" />
          <h1 style="font-size:24px;color:#0f172a;">Merci pour votre intérêt !</h1>
          <p style="color:#475569;line-height:1.6;">
            Vous avez demandé : <strong>${escapeHtml(offer || "Checklist SEO pour PME")}</strong>
          </p>
          <p style="color:#475569;line-height:1.6;">
            Je reviens vers vous très rapidement avec votre ressource. En attendant, n'hésitez pas à découvrir nos services ou à me contacter directement.
          </p>
          <div style="margin:24px 0;">
            <a href="https://globecreateur.fr/services" style="display:inline-block;background:#4f46e5;color:white;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:bold;">Découvrir nos services</a>
          </div>
          <p style="color:#475569;line-height:1.6;">
            À très vite,<br/>
            <strong>Axel Masson</strong><br/>
            <span style="color:#64748b;">Co-fondateur · Globe Créateur</span>
          </p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
          <p style="font-size:12px;color:#94a3b8;">
            Globe Créateur · 13 Rue du Professeur Louis Néel, 21600 Longvic<br/>
            <a href="https://globecreateur.fr" style="color:#6366f1;">globecreateur.fr</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead magnet error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

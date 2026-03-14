import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactSchema, escapeHtml, sanitizeForEmail, rateLimit, getClientIp, checkSpam } from "@/lib/security"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 5, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    if (checkSpam(body)) {
      return NextResponse.json({ success: true }) // silent reject
    }
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Données invalides", details: result.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, message } = result.data

    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Nouveau message de ${escapeHtml(name)}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <hr />
        <p>${sanitizeForEmail(message)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

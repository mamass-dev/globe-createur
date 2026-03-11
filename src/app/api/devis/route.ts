import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, budget, message } = body

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Demande de devis — ${service} — ${name}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Nom</td><td style="padding:8px 12px;">${name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${email}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Entreprise</td><td style="padding:8px 12px;">${company || "—"}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Service</td><td style="padding:8px 12px;">${service}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Budget</td><td style="padding:8px 12px;">${budget || "—"}</td></tr>
        </table>
        <hr style="margin:20px 0;border:none;border-top:1px solid #e2e8f0;" />
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Devis form error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

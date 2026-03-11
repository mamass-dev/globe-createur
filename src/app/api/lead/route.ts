import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, source, context } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    const contextRows = context
      ? Object.entries(context)
          .map(([key, val]) => `<tr><td style="padding:6px 12px;font-weight:bold;color:#64748b;">${key}</td><td style="padding:6px 12px;">${typeof val === "object" ? JSON.stringify(val) : val}</td></tr>`)
          .join("")
      : ""

    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Nouveau lead ${source} — ${name}`,
      html: `
        <h2>Nouveau lead depuis ${source}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Nom</td><td style="padding:8px 12px;">${name}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${email}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Téléphone</td><td style="padding:8px 12px;">${phone || "—"}</td></tr>
        </table>
        ${contextRows ? `
        <hr style="margin:20px 0;border:none;border-top:1px solid #e2e8f0;" />
        <h3 style="color:#6366f1;">Données du ${source}</h3>
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

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { escapeHtml, rateLimit, getClientIp, checkSpam } from "@/lib/security"

const resend = new Resend(process.env.RESEND_API_KEY)

const freelanceSubmitSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  title: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim(),
  phone: z.string().max(20).trim().optional().default(""),
  website: z.string().max(500).trim().optional().default(""),
  linkedin: z.string().max(500).trim().optional().default(""),
  instagram: z.string().max(500).trim().optional().default(""),
  location: z.string().min(2).max(100).trim(),
  category: z.string().min(1).max(50).trim(),
  bio: z.string().min(20).max(1000).trim(),
  skills: z.string().min(2).max(500).trim(),
})

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 3, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    if (checkSpam(body)) {
      return NextResponse.json({ success: true })
    }

    const result = freelanceSubmitSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Données invalides", details: result.error.flatten().fieldErrors }, { status: 400 })
    }

    const d = result.data

    await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: d.email,
      subject: `Nouvelle inscription freelance : ${d.name}`,
      html: `
        <h2>Nouvelle demande d'inscription à l'annuaire freelances</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Nom</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Métier</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.title)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.email)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Téléphone</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.phone)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Localisation</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.location)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Catégorie</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.category)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Site web</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.website)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">LinkedIn</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.linkedin)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Instagram</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.instagram)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Compétences</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(d.skills)}</td></tr>
        </table>
        <h3 style="margin-top:20px">Bio</h3>
        <p>${escapeHtml(d.bio)}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Freelance submit error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

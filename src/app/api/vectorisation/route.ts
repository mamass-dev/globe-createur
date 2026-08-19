import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { escapeHtml, sanitizeForEmail, rateLimit, getClientIp } from "@/lib/security"
import {
  VECTO_ACCEPT_MIME,
  VECTO_MAX_FILE_MB,
  VECTO_OFFRES,
  VECTO_DELAI_HEURES,
  formatPrixVecto,
} from "@/lib/data/vectorisation"

const vectorisationSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(100, "Nom trop long").trim(),
  email: z.string().email("Email invalide").max(255).trim(),
  company: z.string().max(150).trim().optional().or(z.literal("")),
  offre: z.enum(["simple", "complet", "reprise"]),
  usage: z.string().max(2000).trim().optional().or(z.literal("")),
  message: z.string().max(3000).trim().optional().or(z.literal("")),
})

const MAX_BYTES = VECTO_MAX_FILE_MB * 1024 * 1024
const MAX_FILES = 3

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 5, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const form = await request.formData()

    // Honeypot + délai minimal de remplissage (mêmes règles que checkSpam, version multipart)
    if (form.get("_hp")) return NextResponse.json({ success: true })
    const t = Number(form.get("_t") ?? 0)
    if (t > 0 && Date.now() - t < 2_000) return NextResponse.json({ success: true })

    const parsed = vectorisationSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company") ?? "",
      offre: form.get("offre"),
      usage: form.get("usage") ?? "",
      message: form.get("message") ?? "",
    })
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0)
    if (files.length === 0) {
      return NextResponse.json({ error: "Ajoutez au moins un fichier (votre logo)." }, { status: 400 })
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `${MAX_FILES} fichiers maximum.` }, { status: 400 })
    }
    let total = 0
    for (const f of files) {
      total += f.size
      if (!VECTO_ACCEPT_MIME.includes(f.type)) {
        return NextResponse.json(
          { error: `Format non pris en charge : ${f.name}. Envoyez un PNG, JPG, WEBP, PDF ou SVG.` },
          { status: 400 }
        )
      }
    }
    if (total > MAX_BYTES) {
      return NextResponse.json(
        { error: `Fichiers trop lourds (${VECTO_MAX_FILE_MB} Mo maximum au total). Envoyez-nous un lien de téléchargement dans le message.` },
        { status: 400 }
      )
    }

    const attachments = await Promise.all(
      files.map(async (f) => ({
        filename: f.name.replace(/[^\w.\-() ]/g, "_").slice(0, 120),
        content: Buffer.from(await f.arrayBuffer()),
      }))
    )

    const { name, email, company, offre, usage, message } = parsed.data
    const offreData = VECTO_OFFRES.find((o) => o.id === offre)!
    const offreLabel = `${offreData.nom} — ${formatPrixVecto(offreData)}`

    const { error: sendError } = await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Vectorisation logo — ${escapeHtml(offreData.nom)} — ${escapeHtml(name)}`,
      html: `
        <h2>Nouvelle demande de vectorisation de logo</h2>
        <table style="border-collapse:collapse;width:100%;max-width:520px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Nom</td><td style="padding:8px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Entreprise</td><td style="padding:8px 12px;">${escapeHtml(company || "-")}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Forfait</td><td style="padding:8px 12px;">${escapeHtml(offreLabel)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Usage prévu</td><td style="padding:8px 12px;">${escapeHtml(usage || "-")}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Fichiers</td><td style="padding:8px 12px;">${attachments.map((a) => escapeHtml(a.filename)).join(", ")}</td></tr>
        </table>
        <hr style="margin:20px 0;border:none;border-top:1px solid #e2e8f0;" />
        <p><strong>Message :</strong></p>
        <p>${sanitizeForEmail(message || "-")}</p>
        <p style="margin-top:24px;color:#64748b;font-size:13px;">Rappel du process : vérifier le fichier → envoyer le lien de paiement → livrer sous ${VECTO_DELAI_HEURES} h après paiement.</p>
      `,
      attachments,
    })

    if (sendError) {
      console.error("Vectorisation form Resend error:", sendError)
      return NextResponse.json(
        { error: "L'envoi a échoué. Réessayez ou écrivez-nous à contact@globecreateur.fr avec votre logo en pièce jointe." },
        { status: 502 }
      )
    }

    // Accusé de réception client — non bloquant
    resend.emails
      .send({
        from: "Globe Créateur <noreply@globecreateur.fr>",
        to: email,
        replyTo: "contact@globecreateur.fr",
        subject: "Votre logo est bien reçu — vectorisation Globe Créateur",
        html: `
          <p>Bonjour ${escapeHtml(name)},</p>
          <p>Nous avons bien reçu votre logo (${attachments.length} fichier${attachments.length > 1 ? "s" : ""}) et votre demande : <strong>${escapeHtml(offreLabel)}</strong>.</p>
          <p>Voici la suite :</p>
          <ol>
            <li>Un designer vérifie votre fichier et vous confirme par email que le forfait choisi convient (si ce n'est pas le cas, on vous le dit avant toute facturation).</li>
            <li>Vous recevez un lien de paiement sécurisé.</li>
            <li>Vos fichiers vectoriels (AI, EPS, SVG, PDF, PNG HD) vous sont livrés sous ${VECTO_DELAI_HEURES} h ouvrées après paiement.</li>
          </ol>
          <p>Une question entre-temps ? Répondez simplement à cet email.</p>
          <p>— L'équipe Globe Créateur<br /><a href="https://globecreateur.fr/services/vectorisation-logo">globecreateur.fr/services/vectorisation-logo</a></p>
        `,
      })
      .catch((e) => console.error("Vectorisation ack email error:", e))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Vectorisation form error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

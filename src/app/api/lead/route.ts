import { NextResponse, after } from "next/server"
import { Resend } from "resend"
import { leadSchema, escapeHtml, rateLimit, getClientIp, checkSpam } from "@/lib/security"

/** Relance envoyée 24 h après le lead (Resend accepte une date ISO jusqu'à 30 jours) */
const followUpDate = () => new Date(Date.now() + 24 * 3600 * 1000).toISOString()

/**
 * Email J+1 envoyé au lead d'un outil (analyseur, ROI, audit digital…).
 * Analyseur SEO : reprend les 3 corrections prioritaires calculées côté client (`context.topIssues`)
 * et propose l'audit flash. Autres outils : simple proposition d'échange.
 */
async function scheduleFollowUp({
  name,
  email,
  source,
  context,
}: {
  name: string
  email: string
  source: string
  context?: Record<string, unknown>
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const firstName = escapeHtml(name.split(" ")[0] || name)
  const issues = Array.isArray(context?.topIssues)
    ? (context!.topIssues as unknown[]).filter((i): i is string => typeof i === "string").slice(0, 3)
    : []
  const url = typeof context?.url === "string" ? escapeHtml(context.url) : ""
  const score = typeof context?.score === "number" ? context.score : null
  const isAnalyzer = source === "Analyseur SEO" && issues.length > 0

  const subject = isAnalyzer
    ? `Vos 3 corrections prioritaires${url ? ` pour ${url}` : ""}`
    : `Suite à votre passage sur ${escapeHtml(source)}`

  const intro = isAnalyzer
    ? `<p>Bonjour ${firstName},</p>
       <p>Hier vous avez analysé ${url ? `<a href="${url}">${url}</a>` : "votre site"} avec notre outil${score !== null ? ` (score ${score}/100)` : ""}. Voici, tirées de ce rapport, les trois corrections qui pèsent le plus :</p>
       <ol>${issues.map((i) => `<li style="margin-bottom:8px;">${escapeHtml(i)}</li>`).join("")}</ol>
       <p>Ce rapport reste automatique : il vérifie 13 critères techniques, pas votre marché ni vos concurrents. Si vous voulez savoir <em>quoi corriger en premier et pourquoi</em>, l'audit SEO flash est fait par un consultant, livré sous 48 h en vidéo commentée + PDF des 10 priorités, pour 249 € HT, à distance.</p>
       <p><a href="https://globecreateur.fr/services/audit-seo-flash" style="display:inline-block;padding:10px 18px;background:#e63a2b;color:#fff;text-decoration:none;font-weight:bold;">Voir l'audit SEO flash</a></p>`
    : `<p>Bonjour ${firstName},</p>
       <p>Hier vous avez utilisé notre outil « ${escapeHtml(source)} ». Si vous voulez en discuter dix minutes, il suffit de répondre à cet email ou de m'écrire sur WhatsApp : <a href="https://wa.me/33678978705">wa.me/33678978705</a>.</p>
       <p>Et si votre besoin est court et bien délimité, nos offres à prix fixe sont ici : <a href="https://globecreateur.fr/tarifs">globecreateur.fr/tarifs</a>.</p>`

  await resend.emails.send({
    from: "Axel de Globe Créateur <noreply@globecreateur.fr>",
    to: email,
    replyTo: "contact@globecreateur.fr",
    subject,
    scheduledAt: followUpDate(),
    html: `${intro}
      <p>Pas d'autre email après celui-ci : vous avez les infos, vous décidez.</p>
      <p>Axel Masson<br />Globe Créateur, Dijon · <a href="https://globecreateur.fr">globecreateur.fr</a></p>`,
  })
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const ip = getClientIp(request)
    const { success } = rateLimit(ip, { maxRequests: 10, windowMs: 3_600_000 })
    if (!success) {
      return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 })
    }

    const body = await request.json()
    if (checkSpam(body)) {
      return NextResponse.json({ success: true, filtered: true })
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

    const { error: sendError } = await resend.emails.send({
      from: "Globe Créateur <noreply@globecreateur.fr>",
      to: "contact@globecreateur.fr",
      replyTo: email,
      subject: `Nouveau lead ${escapeHtml(source || "site")} - ${escapeHtml(name)}`,
      html: `
        <h2>Nouveau lead depuis ${escapeHtml(source || "site")}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Nom</td><td style="padding:8px 12px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Email</td><td style="padding:8px 12px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:bold;color:#64748b;">Téléphone</td><td style="padding:8px 12px;">${escapeHtml(phone || "-")}</td></tr>
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

    if (sendError) {
      console.error("Lead form Resend error:", sendError)
      return NextResponse.json({ error: "L'envoi a échoué. Réessayez ou écrivez-nous à contact@globecreateur.fr." }, { status: 502 })
    }

    // Relance J+1 au lead (programmée côté Resend). `after()` : exécutée après l'envoi de la réponse,
    // sans être gelée par Vercel (un simple appel non attendu serait interrompu).
    after(() => scheduleFollowUp({ name, email, source, context }).catch((e) => console.error("Lead follow-up error:", e)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Lead form error:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

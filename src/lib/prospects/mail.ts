import { Resend } from "resend"
import { escapeHtml } from "@/lib/security"
import { SITE_URL } from "@/lib/constants"
import type { Prospect } from "./types"

/*
 * Tous les e-mails du tunnel. Les alertes internes partent vers ALERT_EMAIL
 * (par défaut axel@globecreateur.fr). Les e-mails au prospect sont courts et signés Axel.
 */

const FROM = "Axel de Globe Créateur <noreply@globecreateur.fr>"
const REPLY_TO = "contact@globecreateur.fr"
export const ALERT_EMAIL = process.env.PROSPECTS_ALERT_EMAIL || "axel@globecreateur.fr"

/** Sans clé Resend (développement local), rien ne part : le contenu est journalisé. */
const DRY = !process.env.RESEND_API_KEY

function client() {
  if (DRY) {
    return { emails: { send: async (msg: { to: string | string[]; subject: string; html?: string }) => { console.log(`[mail dry-run] → ${msg.to} · ${msg.subject}\n${(msg.html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 300)}`); return { data: { id: "dry" }, error: null } } } } as unknown as Resend
  }
  return new Resend(process.env.RESEND_API_KEY)
}

export function prospectUrl(p: Prospect) {
  return `${SITE_URL}/p/${p.slug}`
}
export function adminUrl(p: Prospect) {
  return `${SITE_URL}/admin/prospects/${p.slug}`
}

function layout(body: string) {
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;max-width:600px;">${body}</div>`
}

function signature() {
  return `<p style="margin-top:24px;">Axel Masson<br />Globe Créateur · <a href="${SITE_URL}">globecreateur.fr</a> · <a href="https://wa.me/33678978705">WhatsApp</a></p>`
}

export async function alertInternal(subject: string, html: string) {
  try {
    await client().emails.send({ from: FROM, to: ALERT_EMAIL, subject, html: layout(html) })
  } catch (e) {
    console.error("alertInternal", e)
  }
}

/** Première ouverture (ou ouverture après 24 h de silence) : rappel en 5 minutes. */
export async function alertOpened(p: Prospect, meta: { first: boolean; device: string; chapter?: string }) {
  const subject = meta.first
    ? `🔔 ${p.company} vient d'ouvrir sa page (première fois) : rappel dans 5 min`
    : `${p.company} est de retour sur sa page`
  await alertInternal(
    subject,
    `<p><strong>${escapeHtml(p.company)}</strong> (${escapeHtml(p.contactName ?? "contact inconnu")}) est sur <a href="${prospectUrl(p)}">sa page</a> à l'instant, depuis ${escapeHtml(meta.device)}.</p>
     <p>État du dossier : ${escapeHtml(p.state)}.${p.contactPhone ? ` Téléphone : <a href="tel:${escapeHtml(p.contactPhone)}">${escapeHtml(p.contactPhone)}</a>.` : ""}</p>
     <p><a href="${adminUrl(p)}">Ouvrir le dossier</a></p>`
  )
}

export async function alertQuestion(p: Prospect, text: string, quote?: string) {
  await alertInternal(
    `❓ ${p.company} pose une question`,
    `${quote ? `<blockquote style="border-left:3px solid #e63a2b;padding-left:12px;color:#555;">${escapeHtml(quote)}</blockquote>` : ""}
     <p>${escapeHtml(text)}</p>
     <p><a href="${adminUrl(p)}#questions">Répondre depuis le dossier</a> : la réponse s'affiche sur sa page.</p>`
  )
}

export async function notifyAnswer(p: Prospect, question: string, answer: string) {
  if (!p.contactEmail) return
  try {
    await client().emails.send({
      from: FROM,
      to: p.contactEmail,
      replyTo: REPLY_TO,
      subject: `Réponse à votre question · ${p.company}`,
      html: layout(
        `<p>Bonjour${p.contactName ? ` ${escapeHtml(p.contactName.split(" ")[0])}` : ""},</p>
         <p>Vous nous demandiez : <em>${escapeHtml(question)}</em></p>
         <p>${escapeHtml(answer).replace(/\n/g, "<br />")}</p>
         <p>La réponse est aussi sur votre page : <a href="${prospectUrl(p)}#questions">${prospectUrl(p)}</a></p>${signature()}`
      ),
    })
  } catch (e) {
    console.error("notifyAnswer", e)
  }
}

export async function sendCode(email: string, name: string, p: Prospect, code: string) {
  await client().emails.send({
    from: FROM,
    to: email,
    replyTo: REPLY_TO,
    subject: `Votre code pour accepter la proposition · ${p.company}`,
    html: layout(
      `<p>Bonjour ${escapeHtml(name.split(" ")[0] || name)},</p>
       <p>Voici votre code de confirmation, valable 15 minutes :</p>
       <p style="font-size:28px;letter-spacing:6px;font-weight:bold;">${code}</p>
       <p>Il sert à vérifier que c'est bien vous qui acceptez la proposition sur <a href="${prospectUrl(p)}#accepter">votre page</a>. Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>${signature()}`
    ),
  })
}

export async function sendAcceptance(p: Prospect) {
  const a = p.acceptance
  if (!a) return
  const docUrl = `${prospectUrl(p)}/document?v=${a.version}`
  const body = `<p>Proposition acceptée le ${new Date(a.acceptedAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} par ${escapeHtml(a.name)} (${escapeHtml(a.email)}).</p>
    <p>Montant : ${a.totalOnce.toLocaleString("fr-FR")} € HT${a.totalMonthly ? ` + ${a.totalMonthly.toLocaleString("fr-FR")} € HT par mois` : ""}.</p>
    <p>Version ${a.version}, empreinte SHA-256 : <code style="font-size:12px;">${a.hash}</code></p>
    <p>Document figé : <a href="${docUrl}">${docUrl}</a> (imprimable en PDF).</p>`
  try {
    await client().emails.send({
      from: FROM,
      to: a.email,
      replyTo: REPLY_TO,
      subject: `Proposition acceptée · ${p.company} × Globe Créateur`,
      html: layout(`<p>Bonjour ${escapeHtml(a.name.split(" ")[0] || a.name)},</p><p>Merci pour votre confiance. Voici la confirmation de votre acceptation.</p>${body}<p>Prochaine étape : nous vous appelons pour caler le démarrage, et votre page devient le tableau de bord du projet.</p>${signature()}`),
    })
  } catch (e) {
    console.error("sendAcceptance client", e)
  }
  await alertInternal(`✅ ${p.company} a accepté la proposition`, `${body}<p><a href="${adminUrl(p)}">Dossier</a></p>`)
}

export async function sendRelance(p: Prospect, subject: string, text: string) {
  if (!p.contactEmail) throw new Error("Pas d'e-mail de contact")
  await client().emails.send({
    from: FROM,
    to: p.contactEmail,
    replyTo: REPLY_TO,
    subject,
    html: layout(`${escapeHtml(text).replace(/\n/g, "<br />")}<p><a href="${prospectUrl(p)}">${prospectUrl(p)}</a></p>${signature()}`),
  })
}

export async function alertRelancesDue(items: { p: Prospect; topic: string; subject: string }[]) {
  if (items.length === 0) return
  await alertInternal(
    `${items.length} relance${items.length > 1 ? "s" : ""} à valider aujourd'hui`,
    `<ul>${items
      .map((i) => `<li><strong>${escapeHtml(i.p.company)}</strong> · ${escapeHtml(i.topic)} · « ${escapeHtml(i.subject)} » · <a href="${adminUrl(i.p)}#relances">valider ou modifier</a></li>`)
      .join("")}</ul><p>Rien ne part sans votre clic.</p>`
  )
}

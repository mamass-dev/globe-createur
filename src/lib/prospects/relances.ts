import type { Prospect, Relance } from "./types"
import { totals } from "./types"
import { randomSuffix } from "./store"

/*
 * Relances cadrées : le signal choisit le sujet, jamais le message ne le dit.
 * Cadence J+2, J+7, J+14, puis clôture à J+21, comptée depuis l'entrée dans l'état.
 * Une seule relance « proposée » à la fois ; rien ne part sans validation dans l'admin.
 */

const STEPS = [2, 7, 14, 21]

export type Topic = "silence" | "prix" | "planning" | "questions" | "cas" | "cloture"

function daysBetween(a: string, b = new Date().toISOString()) {
  return (new Date(b).getTime() - new Date(a).getTime()) / 864e5
}

/** Date d'entrée dans l'état courant (dernier événement `note` de changement d'état, sinon création). */
export function stateSince(p: Prospect): string {
  const e = [...p.events].reverse().find((e) => e.type === "note" && e.meta?.state === p.state)
  return e?.at ?? p.createdAt
}

export function lastActivity(p: Prospect): string | null {
  const e = [...p.events].reverse().find((e) => ["open", "chapter", "question", "selection", "accept_start"].includes(e.type))
  return e?.at ?? null
}

export function lastChapter(p: Prospect): string | null {
  const e = [...p.events].reverse().find((e) => e.type === "chapter")
  return (e?.meta?.chapter as string) ?? null
}

export function chooseTopic(p: Prospect, step: number): Topic {
  if (step === 3) return "cloture"
  const opened = p.events.some((e) => e.type === "open")
  if (!opened) return step === 0 ? "silence" : "cas"
  const open = p.questions.some((q) => !q.answer)
  if (open) return "questions"
  const ch = lastChapter(p)
  if (p.state === "proposition") {
    if (ch === "proposition" || ch === "accepter") return "prix"
    if (ch === "planning") return "planning"
  }
  return step === 0 ? "silence" : "cas"
}

export function draftRelance(p: Prospect, topic: Topic): { subject: string; draft: string } {
  const first = p.contactName?.split(" ")[0] || "Bonjour"
  const hello = p.contactName ? `Bonjour ${first},` : "Bonjour,"
  const { once, monthly } = totals(p.proposition)
  const company = p.company
  switch (topic) {
    case "silence":
      return {
        subject: `${company} : la page que nous vous avons préparée`,
        draft: `${hello}\n\nNous avons préparé une page pour ${company} : ce que nous avons vu de votre présence en ligne, et ce qu'on ferait en premier. Elle se lit en trois minutes, sur téléphone aussi.\n\nSi un point vous parle, vous pouvez poser votre question directement sur la page, nous répondons dans la journée.\n\nBonne journée,`,
      }
    case "prix":
      return {
        subject: `${company} : deux variantes de budget`,
        draft: `${hello}\n\nJ'ai ajouté sur votre page une version plus légère de la proposition, et vous pouvez vous-même retirer ou ajouter des briques pour voir le montant bouger${once ? ` (aujourd'hui ${once.toLocaleString("fr-FR")} € HT${monthly ? ` + ${monthly.toLocaleString("fr-FR")} € HT par mois` : ""})` : ""}.\n\nSi c'est le rythme qui pose question, on peut aussi étaler le démarrage. Dites-moi ce qui vous arrangerait.\n\nBonne journée,`,
      }
    case "planning":
      return {
        subject: `${company} : un créneau de démarrage plus proche`,
        draft: `${hello}\n\nUn créneau s'est libéré dans notre planning. Si le calendrier était le point qui bloquait, on peut démarrer plus tôt que la date indiquée sur votre page. Je vous laisse me dire si ça change quelque chose.\n\nBonne journée,`,
      }
    case "questions":
      return {
        subject: `${company} : réponse à votre question`,
        draft: `${hello}\n\nJ'ai répondu à votre question sur votre page. Si la réponse en appelle une autre, même endroit, même rapidité.\n\nBonne journée,`,
      }
    case "cas":
      return {
        subject: `${company} : un cas qui ressemble au vôtre`,
        draft: `${hello}\n\nJ'ai ajouté sur votre page un cas client proche de votre situation${p.sector ? ` (${p.sector})` : ""}, avec ce qu'on a fait et ce que ça a changé. Trois minutes de lecture, et vous saurez si ça vaut un échange.\n\nBonne journée,`,
      }
    case "cloture":
      return {
        subject: `${company} : je classe le dossier ?`,
        draft: `${hello}\n\nSans retour de votre part, je vais classer le dossier pour ne pas vous relancer inutilement. Votre page reste accessible si le sujet revient dans quelques mois.\n\nSi au contraire c'est juste une question de timing, un mot suffit et on reprend quand vous voulez.\n\nBonne journée,`,
      }
  }
}

/** Calcule la relance due aujourd'hui, ou null. Ne crée rien si une relance est déjà proposée. */
export function computeDueRelance(p: Prospect): Relance | null {
  if (!["constat", "proposition"].includes(p.state)) return null
  if (!p.contactEmail) return null
  if (p.relances.some((r) => r.status === "proposee")) return null
  const sent = p.relances.filter((r) => r.status === "envoyee").length
  if (sent >= STEPS.length) return null
  const since = stateSince(p)
  const days = daysBetween(since)
  if (days < STEPS[sent]) return null
  // Le prospect a réagi dans les dernières 48 h : on laisse respirer
  const act = lastActivity(p)
  if (act && daysBetween(act) < 2 && sent > 0) return null
  const topic = chooseTopic(p, sent)
  const { subject, draft } = draftRelance(p, topic)
  return { id: randomSuffix(8), dueAt: new Date().toISOString(), topic, subject, draft, status: "proposee" }
}

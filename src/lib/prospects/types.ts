/**
 * Tunnel de prospection : un seul lien `/p/<slug>` par prospect, du constat au rapport mensuel.
 * Le document ci-dessous est stocké tel quel (JSON) dans Vercel Blob, en accès privé.
 * Référence : docs/strategie/tunnel-prospection-2026-10.md
 */

export type ProspectState = "constat" | "proposition" | "accepte" | "projet" | "rapport" | "clos"

export const STATE_LABELS: Record<ProspectState, string> = {
  constat: "Constat envoyé",
  proposition: "Proposition en lecture",
  accepte: "Acceptée",
  projet: "Projet en cours",
  rapport: "Client (rapports mensuels)",
  clos: "Dossier classé",
}

export type ConstatPoint = { title: string; text: string }

export type Constat = {
  /** Capture mobile du site du prospect (URL Blob publique ou /images/...) */
  screenshotUrl?: string
  /** Score de l'analyseur SEO (0-100) */
  score?: number | null
  /** Trois choses qui coûtent, rédigées à la main ou proposées par le script */
  points: ConstatPoint[]
  whois?: { domain?: string; registrar?: string; holder?: string; expires?: string }
  /** Test client mystère : demande réelle envoyée, réponse reçue ou non */
  mystere?: { channel?: string; sentAt?: string; repliedAt?: string | null; note?: string }
  googleFiche?: { note?: string; reviews?: number | null; rating?: number | null; unanswered?: number | null }
  /** Vidéo d'une minute : mp4 (lecture native) ou lien YouTube/Loom (intégration) */
  videoUrl?: string
  /** Texte d'accroche écrit pour ce prospect */
  pitch?: string
  /** Lien de prise de rendez-vous (créneaux réels) */
  bookingUrl?: string
}

export type Module = {
  id: string
  title: string
  desc: string
  /** Prix HT ; pour un abonnement, prix mensuel */
  price: number
  monthly?: boolean
  /** Le prospect ne peut pas le retirer */
  required?: boolean
  /** Sélectionné par défaut / par le prospect */
  selected: boolean
  /** Prix à confirmer par Axel (affiché « estimation ») */
  estimate?: boolean
}

export type Proposition = {
  intro?: string
  modules: Module[]
  /** Minimum HT ponctuel en dessous duquel la proposition n'est plus valable */
  minTotal?: number
  /** Date de démarrage réelle possible (ISO date) */
  startDate?: string
  validUntil?: string
  /** Slugs de content/projets à afficher comme cas clients */
  cases: string[]
  planning?: { label: string; when: string }[]
  /** Acompte demandé à l'acceptation (en % du ponctuel) */
  depositPct?: number
  /** Conditions courtes affichées avant acceptation */
  terms?: string
  version: number
}

export type Acceptance = {
  name: string
  email: string
  acceptedAt: string
  ip: string
  userAgent: string
  version: number
  /** SHA-256 du snapshot JSON accepté */
  hash: string
  /** Copie figée de la proposition au moment du oui */
  snapshot: Proposition
  totalOnce: number
  totalMonthly: number
}

export type Question = {
  id: string
  /** Passage surligné par le prospect, s'il y en a un */
  quote?: string
  chapter?: string
  text: string
  createdAt: string
  answer?: string
  answeredAt?: string
}

export type EventType = "open" | "chapter" | "question" | "share" | "selection" | "accept_start" | "accept" | "relance" | "note"

export type ProspectEvent = {
  type: EventType
  at: string
  meta?: Record<string, string | number | boolean | null>
}

export type RelanceStatus = "proposee" | "envoyee" | "annulee"

export type Relance = {
  id: string
  dueAt: string
  /** Sujet choisi d'après les signaux : prix, planning, silence, cas, cloture */
  topic: string
  subject: string
  draft: string
  status: RelanceStatus
  sentAt?: string
}

export type Checklist = { label: string; done: boolean; when?: string }[]

export type Projet = {
  acces: Checklist
  planning: Checklist
  livrables: Checklist
  note?: string
}

export type Rapport = {
  month: string
  text: string
  metrics: { label: string; value: string }[]
}

export type Prospect = {
  id: string
  slug: string
  company: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  sector?: string
  city?: string
  website?: string
  state: ProspectState
  createdAt: string
  updatedAt: string
  constat: Constat
  proposition: Proposition
  acceptance?: Acceptance
  questions: Question[]
  events: ProspectEvent[]
  relances: Relance[]
  shares: { name: string; at: string }[]
  projet: Projet
  rapports: Rapport[]
  parrainageCode?: string
  /** Code de vérification e-mail en cours (haché) */
  pendingCode?: { hash: string; email: string; name: string; expiresAt: string }
  /** Notes internes, jamais affichées au prospect */
  internalNotes?: string
}

export function emptyProspect(partial: Pick<Prospect, "id" | "slug" | "company"> & Partial<Prospect>): Prospect {
  const now = new Date().toISOString()
  return {
    state: "constat",
    createdAt: now,
    updatedAt: now,
    constat: { points: [] },
    proposition: { modules: [], cases: [], version: 1 },
    questions: [],
    events: [],
    relances: [],
    shares: [],
    projet: { acces: [], planning: [], livrables: [] },
    rapports: [],
    ...partial,
  }
}

export function totals(p: Proposition) {
  let once = 0
  let monthly = 0
  for (const m of p.modules) {
    if (!m.selected && !m.required) continue
    if (m.monthly) monthly += m.price
    else once += m.price
  }
  return { once, monthly }
}

export const CHAPTERS = [
  { id: "constat", label: "Le constat" },
  { id: "proposition", label: "La proposition" },
  { id: "planning", label: "Le planning" },
  { id: "cas", label: "Cas clients" },
  { id: "questions", label: "Vos questions" },
  { id: "accepter", label: "Accepter" },
] as const

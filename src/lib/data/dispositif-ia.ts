/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DISPOSITIF « OSEZ L'IA » — SOURCE UNIQUE DE VÉRITÉ
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ AVERTISSEMENT — deux niveaux de fiabilité :
 *
 * BLOC A (constantes ci-dessous) : faits stables, publiables, sourcés depuis
 * les communications officielles Bpifrance / DGE / France 2030.
 *
 * BLOC B (`parametresInstables`) : durée, coût et taux de prise en charge du
 * Diag Data IA. Les sources publiques divergent fortement (millésimes
 * successifs du dispositif) : durée 3 à 10 jours, coût 3 000 à 13 000 € HT,
 * prise en charge 25 à 80 % selon les sources. AUCUNE de ces valeurs ne doit
 * apparaître sur le site tant qu'elle n'a pas été confirmée par la direction
 * régionale Bpifrance Bourgogne-Franche-Comté. Chaque valeur reste à `null`
 * jusqu'à confirmation ; le rendu bascule alors automatiquement sur la
 * formulation chiffrée. Ne JAMAIS mettre de valeur de repli.
 *
 * Les critères d'éligibilité (`eligibiliteDiagDataIA`) sont relevés dans les
 * sources publiques et restent À FAIRE CONFIRMER avant toute publication.
 * Aucun seuil ne doit être codé en dur dans les composants : tout vient d'ici.
 */

export const SOURCES_OFFICIELLES = {
  portailDepot: "https://diag.bpifrance.fr/",
  catalogueBpifrance: "https://www.bpifrance.fr/catalogue-offres/osez-lia-france-2030",
  dge: "https://www.entreprises.gouv.fr",
  franceNum: "https://www.francenum.gouv.fr",
} as const

/* ─── BLOC A — Faits stables, publiables ─── */

export const PLAN_OSEZ_IA = {
  nom: "Osez l'IA",
  porteurs: ["Bpifrance", "Direction Générale des Entreprises (DGE)", "Secrétariat Général pour l'Investissement (SGPI)"],
  cadre: "France 2030",
  enveloppeAnnoncee: "200 M€",
  objectif: "80 % des PME et ETI adoptant l'IA à l'horizon 2030",
  predecesseur: "IA Booster",
} as const

/** Nom officiel du dispositif de diagnostic — toujours employer cette dénomination exacte. */
export const DIAG_DATA_IA = {
  nom: "Diag Data IA",
  description:
    "Prestation de conseil réalisée par un expert habilité par Bpifrance, étalée sur 3 mois maximum : état des lieux technique et opérationnel, identification de cas d'usage concrets et applicables, priorisation selon leur valeur ajoutée.",
  dureeMaxMois: 3,
  selectionExperts: "Les experts sont sélectionnés par un Comité de Sélection Bpifrance sur critères d'expérience.",
} as const

export const ACCELERATEUR_IA = {
  nom: "Accélérateur IA",
  dureeMois: 18,
  eligibilite: {
    caMinEuros: 8_000_000,
    effectifMin: 50,
    ancienneteMinAnnees: 3,
  },
} as const

export const AUTRES_BRIQUES = [
  { nom: "Autodiag IA", description: "Outil d'auto-évaluation en ligne, gratuit, environ 15 minutes." },
  { nom: "Académie de l'IA", description: "Plateforme de formations et tutoriels." },
  { nom: "Fonds de garantie bancaire", description: "Garantie bancaire pour les projets d'IA structurants." },
  { nom: "Pionniers de l'IA", description: "Appel à projets, soutien à l'innovation de rupture." },
] as const

/* ─── Critères d'éligibilité Diag Data IA — relevés, À FAIRE CONFIRMER ─── */

export const ELIGIBILITE_DIAG_DATA_IA = {
  effectifMin: 10,
  effectifMax: 2000, // ETP
  caMinEuros: 1_000_000, // sur un bilan de 12 mois
  ancienneteMinAnnees: 1,
  conditions: [
    "PME ou ETI de 10 à 2 000 salariés (ETP)",
    "Au moins 1 M€ de chiffre d'affaires sur un bilan de 12 mois",
    "Plus d'un an d'existence",
    "Entreprise indépendante, immatriculée en France au RCS, localisée sur le territoire national (DROM-COM inclus)",
    "Cliente ou non cliente de Bpifrance",
  ],
} as const

/* ─── BLOC B — Paramètres instables : null tant que non confirmés ─── */

export type ParametresInstables = {
  /** Durée de la prestation Diag Data IA en jours — sources divergentes (3 à 10 j). */
  dureeJours: number | null
  /** Coût de la prestation en € HT — sources divergentes (3 000 à 13 000 € HT). */
  coutHT: number | null
  /** Taux de prise en charge en % — sources divergentes (25 à 80 %). */
  tauxPriseEnChargePct: number | null
}

export const parametresInstables: ParametresInstables = {
  dureeJours: null,
  coutHT: null,
  tauxPriseEnChargePct: null,
}

/* ─── Tarifs Globe Créateur — [À VÉRIFIER] tant que null ─── */

export type TarifsGlobeCreateur = {
  /** Prix TTC ou HT du Diagnostic Flash IA (offre d'appel, hors dispositif). */
  diagnosticFlashEuros: number | null
  /** Prix ou fourchette de l'Accompagnement Diag Data IA (montage et suivi de dossier). */
  accompagnementEuros: number | null
}

export const tarifsGlobeCreateur: TarifsGlobeCreateur = {
  diagnosticFlashEuros: null,
  accompagnementEuros: null,
}

/* ─── Helpers d'affichage — jamais de chiffre de repli, jamais de tiret ─── */

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })

/** Prise en charge : chiffrée si confirmée, sinon formulation qualitative. */
export function formatPriseEnCharge(): string {
  const taux = parametresInstables.tauxPriseEnChargePct
  if (taux !== null) return `une prise en charge de ${taux} % dans le cadre de France 2030`
  return "une prise en charge partielle dans le cadre de France 2030"
}

/** Coût du Diag Data IA : chiffré si confirmé, sinon formulation qualitative. */
export function formatCoutDiag(): string {
  const cout = parametresInstables.coutHT
  if (cout !== null) return `${euros.format(cout)} HT`
  return "nous vous communiquons le montant et le taux en vigueur lors du premier échange"
}

/** Durée de la prestation : chiffrée si confirmée, sinon cadrage stable (3 mois max, Bloc A). */
export function formatDureeDiag(): string {
  const jours = parametresInstables.dureeJours
  if (jours !== null) return `${jours} jours d'expertise, étalés sur ${DIAG_DATA_IA.dureeMaxMois} mois maximum`
  return `une prestation étalée sur ${DIAG_DATA_IA.dureeMaxMois} mois maximum`
}

/** Tarif Globe Créateur : chiffré si renseigné, sinon null (le composant affiche le placeholder [À VÉRIFIER]). */
export function formatTarifGC(value: number | null): string | null {
  return value !== null ? euros.format(value) : null
}

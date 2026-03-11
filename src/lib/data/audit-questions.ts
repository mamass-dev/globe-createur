export type AuditCategory = "website" | "seo" | "social" | "content" | "google-business" | "automation"

export type AuditOption = {
  label: string
  score: number
}

export type AuditQuestion = {
  id: number
  category: AuditCategory
  question: string
  options: AuditOption[]
}

export const categoryLabels: Record<AuditCategory, string> = {
  website: "Site internet",
  seo: "SEO / Référencement",
  social: "Réseaux sociaux",
  content: "Contenu visuel",
  "google-business": "Google Business",
  automation: "Automatisation",
}

export const categoryIcons: Record<AuditCategory, string> = {
  website: "Globe",
  seo: "Search",
  social: "Megaphone",
  content: "Camera",
  "google-business": "MapPin",
  automation: "Zap",
}

export const auditQuestions: AuditQuestion[] = [
  {
    id: 1,
    category: "website",
    question: "Avez-vous un site internet professionnel ?",
    options: [
      { label: "Non, aucun site", score: 0 },
      { label: "Oui, mais il date de plus de 3 ans", score: 5 },
      { label: "Oui, un site récent mais basique", score: 10 },
      { label: "Oui, un site moderne, rapide et optimisé", score: 17 },
    ],
  },
  {
    id: 2,
    category: "website",
    question: "Votre site est-il adapté aux mobiles et rapide à charger ?",
    options: [
      { label: "Je ne sais pas / Pas de site", score: 0 },
      { label: "Il s'affiche mal sur mobile", score: 4 },
      { label: "Il est responsive mais un peu lent", score: 10 },
      { label: "Parfaitement responsive et rapide (< 2s)", score: 16 },
    ],
  },
  {
    id: 3,
    category: "seo",
    question: "Apparaissez-vous sur Google quand on cherche votre activité + votre ville ?",
    options: [
      { label: "Non, je suis introuvable", score: 0 },
      { label: "Je suis en page 2 ou au-delà", score: 5 },
      { label: "Je suis en page 1 mais pas dans le top 3", score: 11 },
      { label: "Je suis dans le top 3", score: 17 },
    ],
  },
  {
    id: 4,
    category: "seo",
    question: "Publiez-vous du contenu régulier (blog, articles, actualités) ?",
    options: [
      { label: "Jamais", score: 0 },
      { label: "Rarement (quelques articles par an)", score: 5 },
      { label: "Régulièrement (1 à 2 fois par mois)", score: 11 },
      { label: "Fréquemment avec une stratégie SEO", score: 16 },
    ],
  },
  {
    id: 5,
    category: "social",
    question: "Êtes-vous actif sur les réseaux sociaux ?",
    options: [
      { label: "Pas de compte ou comptes inactifs", score: 0 },
      { label: "Je publie de temps en temps (1-2 fois/mois)", score: 4 },
      { label: "Je publie 1 à 2 fois par semaine", score: 9 },
      { label: "Présence active avec une stratégie claire", score: 17 },
    ],
  },
  {
    id: 6,
    category: "google-business",
    question: "Votre fiche Google Business Profile est-elle optimisée ?",
    options: [
      { label: "Je n'ai pas de fiche ou elle n'est pas revendiquée", score: 0 },
      { label: "Elle existe mais elle est incomplète", score: 4 },
      { label: "Elle est à jour avec quelques photos", score: 9 },
      { label: "Complète, avec photos pro, avis gérés et publications", score: 17 },
    ],
  },
  {
    id: 7,
    category: "content",
    question: "Disposez-vous de photos et vidéos professionnelles de votre activité ?",
    options: [
      { label: "Non, juste des photos smartphone", score: 0 },
      { label: "Quelques photos correctes mais pas pro", score: 4 },
      { label: "Des photos pro mais pas de vidéo", score: 9 },
      { label: "Photos et vidéos pro, mises à jour régulièrement", score: 17 },
    ],
  },
  {
    id: 8,
    category: "automation",
    question: "Automatisez-vous certaines tâches de votre communication ?",
    options: [
      { label: "Tout est fait manuellement", score: 0 },
      { label: "J'utilise quelques outils basiques (Mailchimp, Buffer...)", score: 5 },
      { label: "J'ai des workflows automatisés (emails, CRM, publications)", score: 11 },
      { label: "Système complet connecté (CRM, emailing, réseaux, reporting)", score: 17 },
    ],
  },
  {
    id: 9,
    category: "social",
    question: "Vos réseaux sociaux génèrent-ils des clients ou des demandes ?",
    options: [
      { label: "Non, aucun retour concret", score: 0 },
      { label: "Rarement, quelques contacts par an", score: 4 },
      { label: "De temps en temps, quelques leads par mois", score: 9 },
      { label: "Oui, c'est un canal d'acquisition régulier", score: 16 },
    ],
  },
]

// Max possible scores per category
export function getCategoryMaxScores(): Record<AuditCategory, number> {
  const maxes: Record<string, number> = {}
  for (const q of auditQuestions) {
    const maxScore = Math.max(...q.options.map((o) => o.score))
    maxes[q.category] = (maxes[q.category] ?? 0) + maxScore
  }
  return maxes as Record<AuditCategory, number>
}

export const totalMaxScore = auditQuestions.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.score)),
  0
)

export type AuditRecommendation = {
  title: string
  text: string
  serviceSlug: string
  serviceLabel: string
}

export const recommendations: Record<AuditCategory, AuditRecommendation> = {
  website: {
    title: "Votre site internet a besoin d'attention",
    text: "Un site moderne et rapide est la base de votre présence digitale. Il doit inspirer confiance et convertir vos visiteurs en clients.",
    serviceSlug: "creation-site-internet-dijon",
    serviceLabel: "Création de site internet",
  },
  seo: {
    title: "Votre référencement peut être amélioré",
    text: "Être invisible sur Google, c'est laisser vos concurrents capter vos clients potentiels. Le SEO local vous place devant eux.",
    serviceSlug: "seo-local-dijon",
    serviceLabel: "SEO local",
  },
  social: {
    title: "Vos réseaux sociaux manquent d'impact",
    text: "Une présence régulière et stratégique sur les réseaux sociaux renforce votre marque et génère des contacts qualifiés.",
    serviceSlug: "support-communication-pme",
    serviceLabel: "Support communication",
  },
  content: {
    title: "Votre contenu visuel mérite un upgrade",
    text: "Des photos et vidéos professionnelles font la différence entre un prospect qui passe et un prospect qui vous contacte.",
    serviceSlug: "creation-contenu-pme",
    serviceLabel: "Création de contenu",
  },
  "google-business": {
    title: "Votre fiche Google Business est sous-exploitée",
    text: "Une fiche Google complète et active est le levier le plus rapide pour attirer des clients locaux.",
    serviceSlug: "seo-local-dijon",
    serviceLabel: "SEO local",
  },
  automation: {
    title: "Vous perdez du temps sur des tâches automatisables",
    text: "Les automatisations no-code libèrent des heures chaque semaine pour vous concentrer sur votre métier.",
    serviceSlug: "automatisation-nocode-dijon",
    serviceLabel: "Automatisation no-code",
  },
}

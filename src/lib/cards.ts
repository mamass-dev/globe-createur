import { SITE_URL, SITE_NAME } from "@/lib/constants"

/**
 * Cartes de visite numériques (NFC).
 * Chaque carte est atteignable via /carte/[slug] au flash d'une puce NFC.
 * Ajouter un membre = ajouter une entrée ici.
 */
export type BusinessCard = {
  slug: string
  firstName: string
  lastName: string
  fullName: string
  /** Rôle affiché (peut contenir des séparateurs typographiques) */
  role: string
  org: string
  /** Phrase d'accroche courte */
  tagline: string
  /** Chemin public de la photo (webp) */
  photo: string
  email: string
  /** Numéro affiché, format FR lisible */
  phoneDisplay?: string
  /** Numéro au format E.164 pour tel:/sms:/wa.me */
  phoneE164?: string
  linkedin?: string
  instagram?: string
  website: string
}

export const cards: Record<string, BusinessCard> = {
  adrien: {
    slug: "adrien",
    firstName: "Adrien",
    lastName: "Lecrivain",
    fullName: "Adrien Lecrivain",
    role: "Co-fondateur · Photo & Vidéo",
    org: SITE_NAME,
    tagline:
      "Photographe & vidéaste. Je capture l'essence de votre marque, avec un œil créatif et une exigence technique.",
    photo: "/images/team/adrien-lecrivain.webp",
    email: "adrien@globecreateur.fr",
    phoneDisplay: "07 81 20 09 65",
    phoneE164: "+33781200965",
    linkedin: "https://www.linkedin.com/in/adrien-lecrivain-b54a692b6/",
    instagram: "https://www.instagram.com/globecreateur/",
    website: SITE_URL,
  },
  axel: {
    slug: "axel",
    firstName: "Axel",
    lastName: "Masson",
    fullName: "Axel Masson",
    role: "Co-fondateur · Stratégie & Web",
    org: SITE_NAME,
    tagline:
      "Stratège digital & web. Je conçois les stratégies et pilote chaque projet de A à Z, pour transformer chaque euro investi en résultat concret.",
    photo: "/images/team/axel-masson.webp",
    email: "axel@globecreateur.fr",
    phoneDisplay: "06 78 97 87 05",
    phoneE164: "+33678978705",
    linkedin: "https://www.linkedin.com/in/axelmasson/",
    instagram: "https://www.instagram.com/globecreateur/",
    website: SITE_URL,
  },
}

export function getCard(slug: string): BusinessCard | undefined {
  return cards[slug]
}

export function allCardSlugs(): string[] {
  return Object.keys(cards)
}

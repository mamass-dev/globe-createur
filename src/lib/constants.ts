export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://globecreateur.fr"
export const SITE_NAME = "Globe Créateur"
export const SITE_DESCRIPTION = "Studio de communication 360° à Dijon. Équipe complète externalisée pour PME : photo, vidéo, web, design, réseaux sociaux."
export const SITE_LOCALE = "fr_FR"

export const CONTACT = {
  email: "contact@globecreateur.fr",
  address: {
    street: "13 Rue du Professeur Louis Néel",
    city: "Longvic",
    zip: "21600",
    region: "Bourgogne-Franche-Comté",
    country: "FR",
  },
  socials: {
    instagram: "https://www.instagram.com/globecreateur/",
    linkedin: "https://www.linkedin.com/company/globecreateur/",
  },
  geo: { lat: 47.297, lng: 5.063 },
} as const

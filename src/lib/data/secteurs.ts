import type { Secteur } from "../types"

export const secteurs: Secteur[] = [
  {
    slug: "hotels-lieux-evenementiels",
    title: "Sites internet pour hôtels et lieux événementiels",
    metaTitle: "Site internet pour hôtels et lieux événementiels | Globe Créateur",
    metaDescription: "Création de sites internet pour hôtels et lieux événementiels à Dijon. Design immersif, réservation en ligne et SEO local.",
    keyword: "site internet pour hôtels",
    keywords: ["site web hôtel", "site lieu événementiel", "réservation en ligne hôtel"],
    icon: "Hotel",
    excerpt: "Sites immersifs et optimisés pour hôtels, gîtes et lieux de réception en Bourgogne.",
    relatedServices: ["creation-site-internet-dijon", "seo-local-dijon"],
    relatedProjects: [],
  },
  {
    slug: "lieux-evenementiels",
    title: "Sites internet pour lieux événementiels",
    metaTitle: "Site internet pour lieux événementiels | Globe Créateur",
    metaDescription: "Création de sites internet pour salles de réception, domaines et lieux événementiels. Galerie photo, demande de devis, SEO local.",
    keyword: "site internet lieux événementiels",
    keywords: ["site web salle de réception", "site domaine événementiel", "communication lieu événementiel"],
    icon: "PartyPopper",
    excerpt: "Valorisez votre lieu de réception avec un site qui convertit les demandes de devis.",
    relatedServices: ["creation-site-internet-dijon", "creation-contenu-pme"],
    relatedProjects: [],
  },
]

export function getSecteurBySlug(slug: string): Secteur | undefined {
  return secteurs.find((s) => s.slug === slug)
}

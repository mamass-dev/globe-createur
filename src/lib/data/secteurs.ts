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
  {
    slug: "restaurants-food",
    title: "Sites internet pour restaurants",
    metaTitle: "Site internet pour restaurants - Design & SEO local | Globe Créateur",
    metaDescription: "Création de site internet pour restaurants à Dijon. Menu en ligne, réservation, photos culinaires, SEO local.",
    keyword: "site internet pour restaurants",
    keywords: ["site web restaurant", "création site restaurant Dijon", "menu en ligne restaurant"],
    icon: "UtensilsCrossed",
    excerpt: "Attirez plus de clients avec un site qui met en valeur votre cuisine et facilite la réservation.",
    relatedServices: ["creation-site-internet-dijon", "creation-contenu-pme"],
    relatedProjects: [],
  },
  {
    slug: "artisans-btp",
    title: "Sites internet pour artisans et BTP",
    metaTitle: "Site internet pour artisans et BTP - Visibilité locale | Globe Créateur",
    metaDescription: "Création de site internet pour artisans et entreprises du BTP à Dijon. Portfolio, demande de devis, SEO local.",
    keyword: "site internet pour artisans",
    keywords: ["site web artisan", "création site BTP Dijon", "site internet plombier"],
    icon: "Hammer",
    excerpt: "Générez des demandes de devis grâce à un site qui montre vos réalisations et votre savoir-faire.",
    relatedServices: ["creation-site-internet-dijon", "seo-local-dijon"],
    relatedProjects: [],
  },
  {
    slug: "professions-liberales",
    title: "Sites internet pour professions libérales",
    metaTitle: "Site internet pour professions libérales | Globe Créateur",
    metaDescription: "Création de site internet pour professions libérales à Dijon. Avocats, experts-comptables, kinés, architectes. Design sobre, SEO local.",
    keyword: "site internet professions libérales",
    keywords: ["site web avocat", "création site cabinet Dijon", "site internet médecin"],
    icon: "Briefcase",
    excerpt: "Un site sobre et crédible qui reflète votre expertise et facilite la prise de rendez-vous.",
    relatedServices: ["creation-site-internet-dijon", "seo-local-dijon"],
    relatedProjects: [],
  },
]

export function getSecteurBySlug(slug: string): Secteur | undefined {
  return secteurs.find((s) => s.slug === slug)
}

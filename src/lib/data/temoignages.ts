export type Temoignage = {
  name: string
  role: string
  company: string
  content: string
  rating: number
  source: "google" | "internal"
  date?: string
  featured?: boolean
}

// — Avis Google (vrais avis de la fiche Google Business)
export const googleReviews: Temoignage[] = [
  {
    name: "Axel Rose",
    role: "Client",
    company: "",
    content: "Rien à dire, tout a été parfait du début à la fin. Je sais à qui je ferais appel lors de mon prochain projet !",
    rating: 5,
    source: "google",
    date: "Décembre 2025",
  },
  {
    name: "Loïs",
    role: "Client",
    company: "",
    content: "Merci à Globe Créateur pour leur expertise et leur créativité. Je les recommande non seulement pour leur compréhension de mes besoins, mais aussi pour leur création visuelle cohérente avec ces derniers.",
    rating: 5,
    source: "google",
    date: "Septembre 2025",
    featured: true,
  },
  {
    name: "Nedlow Beats",
    role: "Client",
    company: "",
    content: "Une équipe au top, ultra pro, à l'écoute et créative ! Ils ont compris mon projet et ont su me proposer des solutions auxquelles je ne m'attendais pas.",
    rating: 5,
    source: "google",
    date: "Novembre 2025",
  },
  {
    name: "F-18 Events",
    role: "Client",
    company: "F-18 Events",
    content: "Nous travaillons avec eux sur tous nos évènements et le rendu est vraiment incroyable, aussi bien sur l'aspect photos que vidéos. Allez-y les yeux fermés !",
    rating: 5,
    source: "google",
    date: "Août 2025",
    featured: true,
  },
  {
    name: "Le Millésime",
    role: "Client",
    company: "Le Millésime",
    content: "J'ai fait appel à eux pour une création de logo et je suis ravi. Équipe très professionnelle.",
    rating: 5,
    source: "google",
    date: "Juin 2025",
  },
  {
    name: "Spire Music",
    role: "Client",
    company: "Spire Music",
    content: "J'ai fait appel à leurs services pour des photos dans le cadre de mon projet musical. Le rendu est vraiment au top !",
    rating: 5,
    source: "google",
    date: "Novembre 2025",
  },
  {
    name: "Collectif 21mesures",
    role: "Client",
    company: "Collectif 21mesures",
    content: "Vidéo au top avec AD !",
    rating: 5,
    source: "google",
    date: "Juin 2025",
  },
  {
    name: "Lucas Fouquet",
    role: "Client",
    company: "",
    content: "Service impeccable, équipe créative et très professionnelle. Les photos et vidéos reçues sont d'une qualité exceptionnelle. Je recommande cette agence les yeux fermés !",
    rating: 5,
    source: "google",
    date: "Novembre 2025",
    featured: true,
  },
  {
    name: "Mathilde Hisbergues",
    role: "Cliente",
    company: "",
    content: "Équipe très professionnelle et réactive. La qualité est au rendez-vous.",
    rating: 5,
    source: "google",
    date: "Novembre 2025",
  },
  {
    name: "Martine Arnaut",
    role: "Cliente",
    company: "",
    content: "",
    rating: 5,
    source: "google",
    date: "Septembre 2025",
  },
]

// — Témoignages internes (récoltés directement auprès des clients)
export const internalReviews: Temoignage[] = [
  {
    name: "Aurélie Marchand",
    role: "Gérante",
    company: "Body Chérie",
    content: "Depuis la refonte de notre site et le travail SEO, on est passé en première position Google sur « institut beauté Dijon ». Les réservations en ligne ont augmenté de 150% en 4 mois. Je ne pensais pas que le digital pouvait avoir un tel impact sur mon activité.",
    rating: 5,
    source: "internal",
    featured: true,
  },
  {
    name: "Julien Arnaut-Boué",
    role: "Propriétaire",
    company: "Domaine Arnaut Boué",
    content: "Le site qu'ils ont créé pour notre domaine a transformé notre visibilité. On reçoit aujourd'hui 3 fois plus de demandes de privatisation qu'avant, et les clients nous disent souvent que les photos du site les ont convaincus. Un vrai retour sur investissement.",
    rating: 5,
    source: "internal",
    featured: true,
  },
  {
    name: "Kevin Prost",
    role: "Fondateur",
    company: "NovApp Solutions",
    content: "On perdait un temps fou sur l'administratif. Globe Créateur a mis en place des automatisations avec Make et Airtable qui nous font gagner 70% du temps sur la facturation et le reporting. En plus, l'app web qu'ils ont développée est exactement ce qu'il nous fallait.",
    rating: 5,
    source: "internal",
  },
  {
    name: "Sophie Renard",
    role: "Directrice communication",
    company: "Groupe Bourgogne Industrie",
    content: "Travailler avec Globe Créateur, c'est avoir une équipe réactive et force de proposition. Ils gèrent nos réseaux sociaux et nos shootings événementiels avec un professionnalisme remarquable. Le reporting mensuel nous donne une visibilité claire sur les résultats.",
    rating: 5,
    source: "internal",
  },
  {
    name: "Marc Levasseur",
    role: "Organisateur",
    company: "MotorFest Dijon",
    content: "Pour notre festival, il nous fallait une communication complète : site, vidéo, réseaux, photos le jour J. Globe Créateur a tout géré. Résultat : 12 000 visiteurs au lieu des 8 000 prévus, et un aftermovie qui a dépassé les 8 500 vues.",
    rating: 5,
    source: "internal",
    featured: true,
  },
  {
    name: "Camille Durand",
    role: "Responsable marketing",
    company: "Altitude Protect",
    content: "Le shooting produit pour notre nouvelle gamme d'équipements a été impeccable. Direction artistique soignée, photos utilisables immédiatement pour notre catalogue et nos réseaux. On a senti une vraie compréhension de notre univers technique.",
    rating: 5,
    source: "internal",
  },
  {
    name: "Thomas Girard",
    role: "Gérant",
    company: "Le Comptoir Dijonnais",
    content: "En tant que restaurateur, je n'avais ni le temps ni les compétences pour gérer ma communication. Avec le forfait Essentiel, Globe Créateur s'occupe de tout : photos de plats, posts Instagram, mise à jour de la fiche Google. Mes réservations ont doublé.",
    rating: 5,
    source: "internal",
  },
  {
    name: "Élodie Chauveau",
    role: "Co-fondatrice",
    company: "Atelier Noma",
    content: "Ce qui nous a plu, c'est leur approche 360°. Pas besoin de jongler entre un freelance pour le site, un autre pour les photos et un troisième pour le SEO. Une seule équipe, un seul interlocuteur, et des résultats concrets dès le premier mois.",
    rating: 5,
    source: "internal",
  },
]

// — Tous les avis combinés (pour le badge hero + la section témoignages)
export const temoignages: Temoignage[] = [...googleReviews, ...internalReviews]

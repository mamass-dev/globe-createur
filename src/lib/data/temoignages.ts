export type Temoignage = {
  name: string
  role: string
  company: string
  content: string
  rating: number
  sector?: string
}

export const temoignages: Temoignage[] = [
  {
    name: "Marie Dupont",
    role: "Gérante",
    company: "Hôtel Le Bourguignon",
    content: "Depuis la refonte de notre site, les réservations directes ont triplé. On a réduit notre commission Booking de 40%. Le shooting photo a fait toute la différence — les clients nous disent qu'ils ont réservé « grâce aux photos ». Axel comprend l'hôtellerie, c'est rare.",
    rating: 5,
    sector: "Hôtellerie",
  },
  {
    name: "Thomas Martin",
    role: "Directeur",
    company: "Domaine des Tilleuls",
    content: "On avait un site qui datait de 2019, zéro demande via le web. En 3 mois avec Globe Créateur : nouveau site, fiche Google optimisée, 15 demandes de privatisation par mois. Le shooting sur place a capturé exactement l'ambiance qu'on voulait transmettre.",
    rating: 5,
    sector: "Événementiel",
  },
  {
    name: "Sophie Laurent",
    role: "Fondatrice",
    company: "Atelier Déco SL",
    content: "Je gérais mes réseaux sociaux le soir après le boulot, sans résultat. Avec le forfait Croissance, je n'y touche plus — et paradoxalement, ça marche 10 fois mieux. Notre visibilité locale a doublé en 4 mois. Pas de jargon, juste des résultats.",
    rating: 5,
    sector: "Commerce",
  },
  {
    name: "Pierre Moreau",
    role: "Gérant",
    company: "Moreau & Fils BTP",
    content: "Dans le BTP, on pensait que la communication en ligne, c'était pas pour nous. Globe Créateur nous a prouvé le contraire : un site pro, une fiche Google avec des photos de nos chantiers, et maintenant on reçoit 3-4 demandes de devis par semaine via le site.",
    rating: 5,
    sector: "BTP",
  },
  {
    name: "Claire Fontaine",
    role: "Avocate associée",
    company: "Cabinet Fontaine & Associés",
    content: "On avait besoin de crédibilité en ligne sans faire « too much ». Le site est sobre, professionnel et on apparaît maintenant dans le top 3 Google pour « avocat droit des affaires Dijon ». Le reporting mensuel nous permet de suivre l'évolution sans y passer du temps.",
    rating: 5,
    sector: "Profession libérale",
  },
  {
    name: "Laurent Berthier",
    role: "Chef propriétaire",
    company: "Le Bistrot du Marché",
    content: "Les photos de nos plats ont changé la donne sur Instagram. On est passé de 200 à 2 400 abonnés en 6 mois et les clients nous parlent de nos posts. Le forfait Essentiel est pile ce qu'il nous fallait : efficace et dans notre budget.",
    rating: 5,
    sector: "Restauration",
  },
]

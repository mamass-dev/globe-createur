/**
 * Bloc « En bref » des pages services (GEO : réponse directe lisible par Google et les assistants IA).
 * Chaque valeur reprend un fait déjà publié dans le contenu MDX du service — rien n'est inventé ici.
 * Si un chiffre change dans le MDX, il doit changer ici aussi.
 */
export type ServiceEnBref = {
  /** 2-3 phrases qui répondent directement à « c'est quoi, pour qui, combien, en combien de temps » */
  reponse: string
  prix: string
  delai: string
  pourQui: string
  zone: string
}

export const serviceEnBref: Record<string, ServiceEnBref> = {
  "creation-site-internet-dijon": {
    reponse:
      "Globe Créateur crée des sites internet sur mesure pour les PME et indépendants de Dijon et de Bourgogne-Franche-Comté : design propre, responsive, référencement intégré dès la conception, formulaire de contact, hébergement la première année et formation à la prise en main. Un site vitrine est livré en 3 à 5 semaines, de la première réunion à la mise en ligne.",
    prix: "Site vitrine sur mesure : 2 000 à 6 000 € selon pages, contenus et photos. Devis détaillé sous 24 h.",
    delai: "3 à 5 semaines (site vitrine), 6 à 8 semaines pour un site complexe",
    pourQui: "PME, artisans, professions libérales et commerces qui veulent un site qui ramène des clients, pas seulement une carte de visite",
    zone: "Dijon, Côte-d'Or et Bourgogne-Franche-Comté, rendez-vous sur place possible",
  },
  "refonte-site-internet-dijon": {
    reponse:
      "La refonte de site internet chez Globe Créateur consiste à moderniser un site existant sans perdre son référencement : audit SEO de l'existant, redirections 301 sur chaque URL, migration vers des technologies modernes, nouveau design, textes réécrits et nouvelles photos. Comptez 4 à 6 semaines pour un site vitrine, jusqu'à 8 si le contenu est entièrement réécrit.",
    prix: "Sur devis sous 24 h. Aussi incluse dans les forfaits communication.",
    delai: "4 à 6 semaines, jusqu'à 8 semaines si les contenus sont réécrits",
    pourQui: "Entreprises dont le site est lent, daté, impossible à mettre à jour ou invisible sur Google",
    zone: "Dijon et Bourgogne-Franche-Comté, migration réalisable à distance",
  },
  "seo-local-dijon": {
    reponse:
      "Globe Créateur est une agence SEO à Dijon spécialisée dans le référencement local des PME : optimisation de la fiche Google Business, corrections techniques du site, contenus locaux et suivi mensuel des positions, appels et demandes d'itinéraire. Les forfaits démarrent à 600 € par mois, l'audit initial est offert, et les premières remontées locales apparaissent généralement dans les deux premiers mois.",
    prix: "Forfaits SEO à partir de 600 €/mois, audit initial offert",
    delai: "Fiche Google et corrections en semaines 1-2, premières remontées mois 1-2, Pack Local stable mois 3-6",
    pourQui: "Commerces, artisans, cabinets et restaurants qui veulent apparaître dans le bloc Maps et les résultats locaux",
    zone: "Dijon, Côte-d'Or et villes de Bourgogne-Franche-Comté",
  },
  "agence-web-dijon": {
    reponse:
      "Globe Créateur est une agence web à Dijon pour les PME : création et refonte de sites, référencement local, contenu photo et vidéo, automatisation. Un site vitrine standard est livré entre 3 et 5 semaines, un projet plus complexe entre 6 et 8 semaines, avec un référencement technique intégré dès la conception et un site que vous pouvez mettre à jour vous-même.",
    prix: "Sur devis sous 24 h, forfaits mensuels pour faire vivre le site ensuite",
    delai: "3 à 5 semaines (site vitrine), 6 à 8 semaines (e-commerce, fonctionnalités sur mesure)",
    pourQui: "PME dijonnaises qui veulent un site rapide, crédible et qui ramène des clients, sans projet qui traîne",
    zone: "Dijon et Bourgogne-Franche-Comté",
  },
  "automatisation-nocode-dijon": {
    reponse:
      "Globe Créateur automatise les tâches répétitives des PME avec des outils no-code (Make, Airtable, Notion) : saisie des contacts dans le CRM, relances de devis, emails de confirmation, publication sur les réseaux, reporting. L'audit de vos process est offert ; il identifie ce qui peut être automatisé et le temps que cela libère chaque semaine.",
    prix: "Audit des process offert, automatisations sur devis",
    delai: "Cadrage puis mise en place progressive, process par process",
    pourQui: "PME où quelqu'un recopie encore des données à la main, relance les devis manuellement ou publie trois fois le même contenu",
    zone: "Dijon et toute la France (prestation à distance)",
  },
  "creation-contenu-pme": {
    reponse:
      "Globe Créateur produit le contenu des PME : shooting photo, vidéo, design et supports imprimés, réalisés par l'équipe du studio à Dijon. Les photos retouchées sont livrées sous 5 à 7 jours ouvrés, une vidéo sous 2 à 3 semaines, un travail de design sous 1 à 2 semaines avec une boucle de validation. Ces prestations sont incluses dans les forfaits communication à partir du forfait Croissance.",
    prix: "Shooting photo sur devis ; inclus dans les forfaits communication dès Croissance",
    delai: "Photos sous 5 à 7 jours ouvrés, vidéo 2 à 3 semaines, design 1 à 2 semaines",
    pourQui: "Entreprises qui veulent remplacer les images de banque par leurs vrais lieux, produits et équipes",
    zone: "Dijon, Bourgogne-Franche-Comté, déplacements sur site",
  },
  "support-communication-pme": {
    reponse:
      "Le support communication de Globe Créateur est une équipe communication externalisée pour PME : calendrier de contenu sur 1 à 3 mois, publication sur les réseaux, mise à jour du site et de la fiche Google, réponses aux avis, et un bilan chiffré chaque mois avec les recommandations du mois suivant. Le premier mois sert au cadrage : audit de l'existant, objectifs, positionnement et calendrier éditorial.",
    prix: "Forfaits mensuels Essentiel, Croissance et Performance (détail sur la page Tarifs)",
    delai: "Mois 1 : cadrage et calendrier éditorial ; puis publication et bilan chaque mois",
    pourQui: "Dirigeants qui savent qu'il faudrait communiquer mais pour qui ça passe toujours en dernier",
    zone: "Dijon et Bourgogne-Franche-Comté, pilotage à distance possible",
  },
}

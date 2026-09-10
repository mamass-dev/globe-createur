/**
 * Pages Photo et Vidéo (2026-09-10) — source de vérité. Prix : « sur devis » tant qu'Axel n'a pas
 * fixé de grille ; délais et périmètres repris de content/services/creation-contenu-pme.mdx.
 * Aucun cas client ni résultat chiffré inventé.
 */
import type { FaqItem } from "../types"

export type MediaService = {
  slug: string
  nom: string
  h1: string
  reponseDirecte: string
  prix: string
  delai: string
  zone: string
  pourQui: string
  prestations: { titre: string; texte: string }[]
  inclus: string[]
  etapes: { title: string; description: string }[]
  faq: FaqItem[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  icon: string
  formService: string
  ctaLabel: string
  relatedServices: string[]
}

export const MEDIA_SERVICES: MediaService[] = [
  {
    slug: "photographe-entreprise-dijon",
    nom: "Photographe d'entreprise",
    h1: "Photographe d'entreprise à Dijon : vos lieux, vos équipes, vos produits, vos événements",
    reponseDirecte:
      "Globe Créateur réalise des reportages photo pour les entreprises à Dijon et en Bourgogne-Franche-Comté : locaux, équipes, produits, chantiers, événements, portraits de dirigeants et prises de vue par drone. Le shooting se fait sur place, les photos retouchées sont livrées sous 5 à 7 jours ouvrés, prêtes pour le site, la fiche Google, les réseaux et l'impression. Devis sous 24 h, à la demi-journée ou à la journée.",
    prix: "Sur devis : demi-journée ou journée de shooting, retouche et livraison incluses. Réponse sous 24 h.",
    delai: "Photos retouchées livrées sous 5 à 7 jours ouvrés",
    zone: "Dijon, Côte-d'Or, Bourgogne-Franche-Comté ; déplacements plus loin sur demande",
    pourQui: "Restaurants, hôtels et lieux, artisans et industriels, commerces, professions libérales, clubs et organisateurs d'événements : toute entreprise qui veut montrer la vraie version d'elle-même plutôt qu'une banque d'images.",
    prestations: [
      { titre: "Reportage d'entreprise", texte: "Locaux, ateliers, chantiers, coulisses : les images qui montrent comment vous travaillez, pour le site, LinkedIn et le recrutement." },
      { titre: "Portraits d'équipe et de dirigeants", texte: "Portraits cohérents pour la page équipe, les signatures email, la presse et les réseaux, en lumière naturelle ou en studio mobile." },
      { titre: "Culinaire et lieux", texte: "Assiettes, salles, terrasses, chambres : la photo qui déclenche la réservation, calée sur la lumière du lieu." },
      { titre: "Produits et savoir-faire", texte: "Packshots sur fond neutre ou mises en situation, gestes d'artisans, détails de fabrication." },
      { titre: "Événementiel et sport", texte: "Salons, inaugurations, soirées, compétitions, concerts : couverture complète, images livrées vite pour vos réseaux." },
      { titre: "Drone", texte: "Vues aériennes de sites, chantiers, domaines et événements, dans le respect de la réglementation et des zones autorisées." },
    ],
    inclus: [
      "Brief avant le shooting : usages prévus, formats, lieux, personnes à photographier",
      "Prise de vue sur place, direction des personnes photographiées",
      "Sélection et retouche des images (couleur, lumière, recadrage)",
      "Livraison en haute définition pour l'impression et en version web optimisée",
      "Cession des droits d'utilisation pour votre communication (site, réseaux, print)",
      "Galerie privée en ligne pour récupérer et partager les images",
    ],
    etapes: [
      { title: "Brief", description: "On liste ensemble les images dont vous avez besoin, et pour quels usages. Un plan de prise de vue est établi." },
      { title: "Shooting", description: "Sur place, à la demi-journée ou à la journée. On dirige, vous validez au fur et à mesure sur l'écran." },
      { title: "Livraison", description: "Sélection, retouche, export pour chaque usage. Galerie privée sous 5 à 7 jours ouvrés." },
    ],
    faq: [
      { question: "Combien coûte un shooting photo d'entreprise ?", answer: "Le tarif dépend de la durée (demi-journée ou journée), du nombre de lieux et du nombre d'images retouchées à livrer. Le devis est gratuit et détaillé, sous 24 h. Les shootings sont aussi inclus dans nos forfaits communication à partir du forfait Croissance." },
      { question: "Pouvez-vous photographier plusieurs sites ou plusieurs équipes ?", answer: "Oui. On organise la journée en fonction des déplacements et de la lumière. Au-delà d'un certain nombre de sites, on planifie plusieurs sessions." },
      { question: "Que se passe-t-il avec les droits sur les photos ?", answer: "Vous recevez une cession de droits pour votre communication : site, réseaux sociaux, fiche Google, supports imprimés, presse. On indique clairement ce qui est couvert dans le devis." },
      { question: "Faites-vous du drone ?", answer: "Oui, pour les sites, chantiers, domaines et événements, dans les zones où le vol est autorisé. On vérifie les contraintes réglementaires avant chaque prise de vue aérienne." },
      { question: "Intervenez-vous hors de Dijon ?", answer: "Oui, dans toute la Bourgogne-Franche-Comté et au-delà sur demande. Les frais de déplacement sont indiqués dans le devis." },
      { question: "Quel est le délai pour recevoir les photos ?", answer: "Les photos retouchées sont livrées sous 5 à 7 jours ouvrés. Pour un événement, une première sélection peut être livrée plus vite pour vos réseaux." },
    ],
    metaTitle: "Photographe d'entreprise à Dijon : reportage, portraits, culinaire, événements, drone",
    metaDescription:
      "Photographe d'entreprise à Dijon et en Bourgogne : reportages de locaux et d'équipes, portraits, photo culinaire, produits, événements, drone. Livraison sous 5 à 7 jours ouvrés, droits inclus, devis sous 24 h.",
    keywords: ["photographe entreprise dijon", "photographe professionnel dijon", "photographe corporate dijon", "shooting photo entreprise", "photographe événementiel dijon", "photographe culinaire dijon", "photo drone dijon", "photographe bourgogne"],
    icon: "Camera",
    formService: "Shooting photo d'entreprise",
    ctaLabel: "Demander un devis photo",
    relatedServices: ["video-entreprise-dijon", "creation-contenu-pme", "support-communication-pme"],
  },
  {
    slug: "video-entreprise-dijon",
    nom: "Vidéo d'entreprise",
    h1: "Vidéo d'entreprise à Dijon : film de présentation, reels, captation d'événement, drone",
    reponseDirecte:
      "Globe Créateur produit des vidéos pour les entreprises à Dijon et en Bourgogne-Franche-Comté : films de présentation de 1 à 2 minutes, reels et formats courts pour les réseaux, captations d'événements, témoignages clients filmés et images aériennes par drone. Scénario, tournage, montage et déclinaisons aux formats de chaque plateforme sont réalisés en interne. Une vidéo est livrée sous 2 à 3 semaines selon le montage. Devis sous 24 h.",
    prix: "Sur devis selon le format, la durée de tournage et le montage. Réponse sous 24 h.",
    delai: "Vidéo livrée sous 2 à 3 semaines selon la complexité du montage",
    zone: "Dijon, Côte-d'Or, Bourgogne-Franche-Comté ; déplacements plus loin sur demande",
    pourQui: "Entreprises qui recrutent, lieux qui se réservent en ligne, marques qui vendent sur les réseaux, organisateurs d'événements, domaines et sites industriels qui gagnent à être vus du ciel.",
    prestations: [
      { titre: "Film de présentation", texte: "1 à 2 minutes pour dire qui vous êtes, ce que vous faites et pour qui. Pour la home du site, LinkedIn, les salons et le recrutement." },
      { titre: "Reels et formats courts", texte: "15 à 60 secondes, verticaux, pensés pour Instagram, TikTok, LinkedIn et YouTube Shorts. Tournés en série pour alimenter plusieurs semaines." },
      { titre: "Captation d'événement", texte: "Salons, inaugurations, soirées, compétitions, concerts : aftermovie et extraits courts livrés vite." },
      { titre: "Témoignages clients", texte: "Interviews filmées, éclairées et montées, avec sous-titres : la preuve sociale la plus forte pour une page service." },
      { titre: "Drone", texte: "Plans aériens de sites, domaines, chantiers et événements, intégrés au film ou livrés seuls." },
      { titre: "Déclinaisons", texte: "Chaque tournage est décliné aux bons formats et durées, avec sous-titres, pour être utilisé partout." },
    ],
    inclus: [
      "Scénario ou déroulé validé avec vous avant le tournage",
      "Tournage sur place avec caméra, son et éclairage adaptés",
      "Montage, étalonnage, habillage aux couleurs de votre marque, musique libre de droits",
      "Sous-titres et déclinaisons par plateforme (horizontal, vertical, carré)",
      "Fichiers livrés dans les formats et résolutions de chaque usage",
      "Une série de modifications après la première version",
    ],
    etapes: [
      { title: "Cadrage", description: "Objectif de la vidéo, message, personnes filmées, lieux, durée. On écrit le déroulé et on planifie le tournage." },
      { title: "Tournage", description: "Une demi-journée à une journée sur place selon le format, drone compris si le lieu s'y prête." },
      { title: "Montage et livraison", description: "Première version sous 2 à 3 semaines, une série de retours, puis les déclinaisons pour chaque plateforme." },
    ],
    faq: [
      { question: "Combien coûte une vidéo d'entreprise ?", answer: "Le tarif dépend du format (film de présentation, série de reels, captation), du temps de tournage et du montage. Le devis est gratuit et détaillé, sous 24 h. La production vidéo est aussi incluse dans nos forfaits communication à partir du forfait Croissance." },
      { question: "Combien de temps dure une production ?", answer: "Comptez 2 à 3 semaines entre le tournage et la livraison de la première version, selon la complexité du montage. Les extraits courts d'un événement peuvent être livrés en quelques jours." },
      { question: "Pouvez-vous filmer avec un drone ?", answer: "Oui, dans les zones où le vol est autorisé. On vérifie les contraintes réglementaires du lieu avant le tournage." },
      { question: "Nous n'avons jamais été filmés, ça se passe comment ?", answer: "On prépare les questions ou le déroulé à l'avance, on tourne en plusieurs prises et on garde les meilleures. Personne n'a besoin d'être à l'aise devant une caméra : c'est notre travail de le rendre naturel." },
      { question: "Livrez-vous les fichiers sources ?", answer: "Vous recevez les vidéos finales dans tous les formats utiles. Les rushs peuvent être livrés sur demande, c'est précisé dans le devis." },
      { question: "Intervenez-vous hors de Dijon ?", answer: "Oui, dans toute la Bourgogne-Franche-Comté et au-delà sur demande, frais de déplacement indiqués dans le devis." },
    ],
    metaTitle: "Vidéo d'entreprise à Dijon : film de présentation, reels, captation, drone",
    metaDescription:
      "Production vidéo pour entreprises à Dijon et en Bourgogne : film de présentation, reels et formats courts, captation d'événement, témoignages clients, drone. Scénario, tournage et montage en interne, livraison sous 2 à 3 semaines, devis sous 24 h.",
    keywords: ["vidéo entreprise dijon", "agence vidéo dijon", "vidéaste dijon", "production vidéo dijon", "film d'entreprise dijon", "captation événement dijon", "drone dijon", "reels entreprise"],
    icon: "Video",
    formService: "Vidéo d'entreprise",
    ctaLabel: "Demander un devis vidéo",
    relatedServices: ["photographe-entreprise-dijon", "creation-contenu-pme", "support-communication-pme"],
  },
]

export function getMediaService(slug: string): MediaService | undefined {
  return MEDIA_SERVICES.find((s) => s.slug === slug)
}

/** Showreel drone (YouTube), fourni par Axel le 2026-09-10 */
export const SHOWREEL_VIDEO_ID = "56KVxVaWeEw"

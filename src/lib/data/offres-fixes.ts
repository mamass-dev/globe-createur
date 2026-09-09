/**
 * Offres à prix fixe, délai fixe, périmètre fixe — le modèle de la vectorisation de logo
 * appliqué à trois autres besoins courts. Source de vérité unique : prix, délais, contenus,
 * FAQ. Les pages `src/app/services/<slug>/page.tsx` ne font que rendre ces données.
 *
 * ⚠ Prix fixés par délégation le 2026-09-07 (HT). À ajuster ici uniquement.
 * Règle éditoriale : aucun cas client, aucun chiffre de résultat inventé.
 */
import type { FaqItem } from "../types"

export type OffreFixe = {
  slug: string
  nom: string
  /** Formulation courte, réponse directe à la requête (utilisée en H1 et dans le bloc « En bref ») */
  promesse: string
  prixHT: number
  delai: string
  delaiDetail: string
  pourQui: string
  /** Réponse directe de 2-3 phrases, lisible telle quelle par un moteur ou une IA */
  reponseDirecte: string
  inclus: string[]
  livrables: string[]
  etapes: { title: string; description: string }[]
  faq: FaqItem[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  icon: string
  /** Valeur envoyée dans `service` du formulaire de devis */
  formService: string
  ctaLabel: string
  relatedServices: string[]
  /** Slugs des offres à afficher en « Autres offres à prix fixe » */
  related: string[]
}

export const OFFRES_FIXES: OffreFixe[] = [
  {
    slug: "audit-seo-flash",
    nom: "Audit SEO flash",
    promesse: "Les 10 corrections qui comptent sur votre site, en vidéo, sous 48 h",
    prixHT: 249,
    delai: "48 h ouvrées",
    delaiDetail: "Livré sous 48 h ouvrées après paiement, partout en France (100 % à distance).",
    pourQui:
      "Un site déjà en ligne qui ne décolle pas sur Google, et un dirigeant qui veut savoir quoi corriger en premier sans s'engager sur un accompagnement mensuel.",
    reponseDirecte:
      "L'audit SEO flash est une analyse manuelle de votre site par un consultant, livrée sous 48 h ouvrées sous forme d'une vidéo commentée de 15 à 20 minutes et d'un PDF listant les 10 corrections prioritaires, classées par impact et par effort. Prix fixe : 249 € HT. Il se fait entièrement à distance, pour n'importe quel site français.",
    inclus: [
      "Analyse manuelle par un consultant (pas un rapport automatique)",
      "Vidéo commentée de 15 à 20 minutes, écran partagé, réutilisable par votre prestataire",
      "PDF des 10 corrections prioritaires, classées impact / effort",
      "Vérification technique : indexation, vitesse mobile, balises, structure, maillage",
      "Positionnement sur vos 5 requêtes les plus importantes (Search Console si vous nous donnez l'accès)",
      "Réponse à vos questions par email pendant 7 jours après la livraison",
    ],
    livrables: ["Vidéo commentée (lien privé)", "PDF « 10 priorités »", "Liste des pages à corriger en premier"],
    etapes: [
      { title: "Vous commandez", description: "Formulaire d'une minute, lien de paiement sécurisé dans la foulée." },
      { title: "On analyse", description: "Un consultant passe votre site au crible : technique, contenu, autorité, concurrence locale." },
      { title: "Vous recevez", description: "Vidéo + PDF sous 48 h ouvrées. Vous corrigez vous-même, ou on chiffre les corrections." },
    ],
    faq: [
      {
        question: "Quelle différence avec l'analyseur SEO gratuit du site ?",
        answer:
          "L'analyseur gratuit vérifie 13 critères techniques automatiquement en quelques secondes. L'audit flash est fait par une personne : elle regarde votre marché, vos concurrents, vos contenus, et vous dit quoi corriger en premier et pourquoi.",
      },
      {
        question: "Faut-il être à Dijon ou en Bourgogne ?",
        answer:
          "Non. L'audit se fait à distance et vaut pour n'importe quel site français. Les recommandations locales (fiche Google, citations) sont adaptées à votre ville.",
      },
      {
        question: "Que se passe-t-il après l'audit ?",
        answer:
          "Rien d'obligatoire. Vous pouvez appliquer les corrections vous-même ou avec votre prestataire actuel. Si vous préférez qu'on s'en charge, on vous chiffre les corrections à part, sans engagement mensuel imposé.",
      },
      {
        question: "Quels accès dois-je fournir ?",
        answer:
          "Aucun pour l'audit de base. Un accès lecture à la Search Console permet d'ajouter vos vraies positions et requêtes ; on vous explique comment le donner en deux minutes.",
      },
      {
        question: "Et si mon site n'a aucun problème ?",
        answer:
          "Ça arrive rarement, mais si l'audit ne révèle rien d'actionnable, on vous le dit et on vous rembourse.",
      },
    ],
    metaTitle: "Audit SEO flash : 10 corrections prioritaires en vidéo sous 48 h, 249 € HT",
    metaDescription:
      "Audit SEO manuel de votre site, livré sous 48 h ouvrées : vidéo commentée de 15-20 min + PDF des 10 corrections prioritaires. Prix fixe 249 € HT, 100 % à distance, sans engagement.",
    keywords: ["audit seo", "audit seo prix", "audit seo pas cher", "audit seo site internet", "audit référencement", "audit seo en ligne", "audit seo pme"],
    icon: "Search",
    formService: "Audit SEO flash (249 € HT)",
    ctaLabel: "Commander mon audit flash",
    relatedServices: ["seo-local-dijon", "refonte-site-internet-dijon"],
    related: ["fiche-google-business-optimisee", "vectorisation-logo", "landing-page-5-jours"],
  },
  {
    slug: "fiche-google-business-optimisee",
    nom: "Fiche Google Business optimisée",
    promesse: "Votre fiche Google Business complète, optimisée et prête à ramener des appels, en 5 jours",
    prixHT: 349,
    delai: "5 jours ouvrés",
    delaiDetail: "Livrée sous 5 jours ouvrés après paiement et accès à la fiche.",
    pourQui:
      "Un commerce, un artisan, un cabinet ou un restaurant qui a une fiche Google incomplète, mal catégorisée ou jamais mise à jour, et qui veut apparaître dans le bloc Maps sans y passer ses soirées.",
    reponseDirecte:
      "L'offre Fiche Google Business optimisée consiste à reprendre entièrement votre fiche Google (catégories, description, services, horaires, photos, attributs, questions-réponses) selon les critères qui font remonter une entreprise dans le bloc Maps de Google. Prix fixe : 349 € HT, livrée sous 5 jours ouvrés, avec un guide d'une page pour l'entretenir ensuite.",
    inclus: [
      "Audit de la fiche existante et des 3 concurrents qui vous précèdent sur Maps",
      "Catégorie principale et catégories secondaires corrigées",
      "Description, services et produits rédigés avec vos mots-clés locaux",
      "Horaires, attributs, zone desservie, liens de rendez-vous ou de réservation",
      "Sélection et optimisation de vos photos (nommage, ordre, couverture)",
      "5 questions-réponses pré-remplies et un premier post Google",
      "Guide d'entretien d'une page : quoi publier, comment répondre aux avis",
    ],
    livrables: ["Fiche mise à jour en ligne", "Rapport avant / après", "Guide d'entretien PDF"],
    etapes: [
      { title: "Vous commandez", description: "Formulaire, paiement, puis vous nous ajoutez comme gestionnaire de la fiche (on vous guide)." },
      { title: "On optimise", description: "Audit, corrections, rédaction, photos : tout est fait en 5 jours ouvrés." },
      { title: "Vous entretenez", description: "Avec le guide d'une page, 15 minutes par mois suffisent pour garder la fiche vivante." },
    ],
    faq: [
      {
        question: "Est-ce que ça garantit la première place sur Google Maps ?",
        answer:
          "Non, personne ne peut le garantir. Ce qu'on garantit, c'est une fiche complète à 100 % et conforme aux critères connus de Google. C'est la condition d'entrée ; la suite dépend des avis, de la distance et de la concurrence.",
      },
      {
        question: "Je n'ai pas encore de fiche, ou elle n'est pas vérifiée",
        answer:
          "On la crée et on lance la vérification avec vous (vidéo ou courrier selon ce que Google impose). Le délai de 5 jours court à partir de la vérification.",
      },
      {
        question: "Faut-il me donner vos identifiants Google ?",
        answer:
          "Jamais. Vous nous ajoutez comme gestionnaire depuis votre compte, et vous pouvez retirer l'accès à tout moment.",
      },
      {
        question: "Fonctionne-t-elle pour une entreprise hors Bourgogne ?",
        answer:
          "Oui. L'optimisation se fait à distance, pour toute la France. Les recommandations photos peuvent nécessiter que vous preniez quelques clichés vous-même ; on vous dit lesquels.",
      },
    ],
    metaTitle: "Fiche Google Business optimisée en 5 jours, 349 € HT | Globe Créateur",
    metaDescription:
      "Reprise complète de votre fiche Google Business : catégories, description, services, photos, questions-réponses, selon les critères du bloc Maps. Prix fixe 349 € HT, livrée sous 5 jours ouvrés, guide d'entretien inclus.",
    keywords: ["optimiser fiche google business", "optimisation google my business", "fiche google business prix", "apparaître sur google maps", "référencement google maps", "google business profile pme"],
    icon: "MapPin",
    formService: "Fiche Google Business optimisée (349 € HT)",
    ctaLabel: "Commander l'optimisation",
    relatedServices: ["seo-local-dijon", "creation-site-internet-dijon", "creation-contenu-pme"],
    related: ["audit-seo-flash", "landing-page-5-jours", "vectorisation-logo"],
  },
  {
    slug: "landing-page-5-jours",
    nom: "Landing page en 5 jours",
    promesse: "Une page qui présente votre offre et récolte des demandes, en ligne en 5 jours ouvrés",
    prixHT: 990,
    delai: "5 jours ouvrés",
    delaiDetail: "En ligne sous 5 jours ouvrés après réception de vos textes et visuels.",
    pourQui:
      "Un lancement, une offre saisonnière, une campagne publicitaire ou une activité qui n'a pas encore de site : une seule page, bien construite, suffit souvent pour commencer à recevoir des demandes.",
    reponseDirecte:
      "La landing page en 5 jours est une page unique conçue pour convertir : structure éprouvée (promesse, preuves, offre, formulaire), rédaction de vos textes à partir d'un questionnaire, design aux couleurs de votre marque, formulaire de contact, suivi des conversions et hébergement inclus la première année. Prix fixe : 990 € HT, mise en ligne sous 5 jours ouvrés, nom de domaine à votre nom.",
    inclus: [
      "Structure de conversion : promesse, preuves, offre, réassurance, formulaire",
      "Rédaction des textes à partir de votre questionnaire (vous validez avant mise en ligne)",
      "Design responsive aux couleurs de votre marque, sans template visible",
      "Formulaire de contact ou de demande de devis, notifications par email",
      "Suivi des conversions (analytics sans cookie, compatible RGPD)",
      "Nom de domaine à votre nom, hébergement et certificat HTTPS inclus la première année",
      "Une série de modifications après mise en ligne",
    ],
    livrables: ["Page en ligne sur votre domaine", "Accès aux statistiques", "Fichiers sources"],
    etapes: [
      { title: "Jour 1 : questionnaire", description: "Vous répondez à 12 questions et déposez logo, photos, éléments de marque." },
      { title: "Jours 2-4 : conception", description: "Textes, design et intégration. Une version de relecture vous est envoyée le jour 4." },
      { title: "Jour 5 : mise en ligne", description: "Corrections, domaine, formulaire testé, suivi activé. C'est en ligne." },
    ],
    faq: [
      {
        question: "Que dois-je fournir pour tenir les 5 jours ?",
        answer:
          "Vos réponses au questionnaire le jour 1, votre logo et quelques photos. Si vous n'avez pas de photos, on utilise des visuels de banque en attendant les vôtres, et on les remplace ensuite.",
      },
      {
        question: "Pourrai-je faire évoluer la page ensuite ?",
        answer:
          "Oui. Les petites modifications de texte se font sur demande, et la page peut devenir la première d'un vrai site multi-pages sans repartir de zéro.",
      },
      {
        question: "Est-ce que la page sera référencée sur Google ?",
        answer:
          "Elle est construite proprement (balises, vitesse, données structurées) et soumise à Google. Une seule page ne peut pas viser beaucoup de requêtes : elle sert surtout à convertir le trafic que vous lui envoyez (publicité, réseaux, fiche Google, QR code).",
      },
      {
        question: "Et après la première année ?",
        answer:
          "L'hébergement et le domaine se renouvellent à prix coûtant, sans obligation de passer par nous.",
      },
    ],
    metaTitle: "Landing page en 5 jours ouvrés, 990 € HT tout compris | Globe Créateur",
    metaDescription:
      "Une page unique conçue pour convertir : textes rédigés, design à vos couleurs, formulaire, suivi des conversions, domaine et hébergement inclus. Prix fixe 990 € HT, en ligne sous 5 jours ouvrés.",
    keywords: ["landing page prix", "création landing page", "landing page pas cher", "page de vente", "site une page", "site one page prix", "landing page pme"],
    icon: "Rocket",
    formService: "Landing page en 5 jours (990 € HT)",
    ctaLabel: "Lancer ma landing page",
    relatedServices: ["creation-site-internet-dijon", "creation-contenu-pme"],
    related: ["audit-seo-flash", "fiche-google-business-optimisee", "vectorisation-logo"],
  },
]

export function getOffreFixe(slug: string): OffreFixe | undefined {
  return OFFRES_FIXES.find((o) => o.slug === slug)
}

export function formatPrixHT(prixHT: number): string {
  return `${prixHT.toLocaleString("fr-FR")} € HT`
}

/** Vitrine commune (home, tarifs) : les 3 offres + la vectorisation. */
export const OFFRES_FIXES_VITRINE = [
  ...OFFRES_FIXES.map((o) => ({
    slug: o.slug,
    href: `/services/${o.slug}`,
    nom: o.nom,
    prix: formatPrixHT(o.prixHT),
    prefix: "",
    delai: o.delai,
    accroche: o.promesse,
    icon: o.icon,
  })),
  {
    slug: "vectorisation-logo",
    href: "/services/vectorisation-logo",
    nom: "Vectorisation de logo",
    prix: "69 € HT",
    prefix: "dès ",
    delai: "24 h ouvrées",
    accroche: "Votre logo PNG ou JPG redessiné en vecteurs, prêt pour l'imprimeur",
    icon: "PenTool",
  },
]

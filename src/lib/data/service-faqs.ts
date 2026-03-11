import type { FaqItem } from "../types"

/**
 * Service-specific FAQs, keyed by service slug.
 * These are shown BEFORE the general FAQs on each service page.
 */
export const serviceFaqs: Record<string, FaqItem[]> = {
  "creation-site-internet-dijon": [
    {
      question: "Combien de temps faut-il pour créer un site internet ?",
      answer:
        "En moyenne 4 à 8 semaines selon la complexité. Un site vitrine simple peut être livré en 3 semaines, un site avec fonctionnalités avancées en 8 à 12 semaines.",
    },
    {
      question: "Puis-je modifier mon site moi-même après la livraison ?",
      answer:
        "Oui, tous nos sites sont livrés avec une interface d'administration simple. On vous forme à son utilisation et on reste disponible pour vous accompagner.",
    },
    {
      question: "Mon site sera-t-il optimisé pour le mobile ?",
      answer:
        "Absolument. Tous nos sites sont responsive et testés sur mobile, tablette et desktop. C'est un standard, pas une option.",
    },
  ],

  "seo-local-dijon": [
    {
      question: "Combien de temps avant de voir des résultats en SEO ?",
      answer:
        "Les premiers résultats apparaissent généralement entre 3 et 6 mois. Le SEO est un investissement à moyen terme, mais les résultats sont durables contrairement à la publicité.",
    },
    {
      question: "Garantissez-vous la première position sur Google ?",
      answer:
        "Non, et méfiez-vous de ceux qui le font. Google seul décide du classement. On optimise tous les facteurs sous notre contrôle pour maximiser vos chances.",
    },
    {
      question:
        "Quelle est la différence entre SEO local et SEO national ?",
      answer:
        "Le SEO local cible les recherches géolocalisées (ex: 'plombier Dijon'). Il s'appuie sur Google Business Profile, les avis clients et les citations locales. Le SEO national vise des mots-clés sans intention locale.",
    },
  ],

  "refonte-site-internet-dijon": [
    {
      question:
        "Vais-je perdre mon référencement lors d'une refonte ?",
      answer:
        "Non, si c'est bien fait. On met en place des redirections 301 pour chaque URL modifiée et on préserve votre structure SEO. C'est notre spécialité.",
    },
    {
      question: "Puis-je garder mon nom de domaine actuel ?",
      answer:
        "Bien sûr, votre nom de domaine vous appartient. On fait simplement pointer le DNS vers le nouveau site.",
    },
    {
      question: "Combien coûte une refonte de site ?",
      answer:
        "À partir de 1 200 € pour un site vitrine simple. Le tarif dépend du nombre de pages, des fonctionnalités et du contenu à migrer. Demandez un devis gratuit pour un chiffrage précis.",
    },
  ],

  "automatisation-nocode-dijon": [
    {
      question:
        "Faut-il des compétences techniques pour utiliser les automatisations ?",
      answer:
        "Non. On configure tout pour vous et on vous forme. Les outils comme Make et Zapier sont visuels et ne nécessitent aucune ligne de code.",
    },
    {
      question:
        "Combien de temps peut-on gagner avec l'automatisation ?",
      answer:
        "En moyenne 5 à 15 heures par semaine sur les tâches répétitives : envoi d'emails, synchronisation de données, relances clients, publication sur les réseaux sociaux.",
    },
    {
      question: "Quels outils utilisez-vous ?",
      answer:
        "Principalement Make (ex-Integromat) et Zapier, connectés à vos outils existants : CRM, email, réseaux sociaux, facturation, etc.",
    },
  ],

  "creation-contenu-pme": [
    {
      question:
        "Fournissez-vous les photos et vidéos ou faut-il les avoir ?",
      answer:
        "On s'occupe de tout. Notre studio intégré réalise les shootings photo et vidéo directement chez vous ou dans notre studio.",
    },
    {
      question: "Combien coûte une séance photo professionnelle ?",
      answer:
        "À partir de 350 € pour une demi-journée (portraits, locaux, produits). Les tarifs varient selon la durée et le nombre de clichés retouchés.",
    },
    {
      question: "Gérez-vous aussi les réseaux sociaux ?",
      answer:
        "Oui, c'est inclus dans nos forfaits communication. Stratégie éditoriale, création de contenu, planification et publication sur vos réseaux.",
    },
  ],

  "support-communication-pme": [
    {
      question:
        "Quelle est la différence entre un forfait et une prestation ponctuelle ?",
      answer:
        "Le forfait vous donne un accompagnement continu (réseaux sociaux, contenu, suivi SEO) à tarif préférentiel. Les prestations ponctuelles conviennent pour des besoins spécifiques et limités dans le temps.",
    },
    {
      question: "Puis-je résilier mon forfait à tout moment ?",
      answer:
        "Oui, nos forfaits sont sans engagement après les 3 premiers mois. On mise sur la qualité, pas sur les contrats qui enchaînent.",
    },
    {
      question:
        "Comment se passe la communication au quotidien ?",
      answer:
        "Vous avez un interlocuteur dédié joignable par email, téléphone et WhatsApp. On fait un point mensuel pour ajuster la stratégie et vous envoyer un rapport de performance.",
    },
  ],
}

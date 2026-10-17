import type { Module } from "./types"

/*
 * Briques de proposition proposées par défaut dans l'admin. Les prix publics du site
 * sont repris tels quels ; ceux marqués `estimate` n'ont pas encore de grille validée
 * par Axel et s'affichent au prospect comme « estimation, à confirmer ».
 */

export const CATALOG: Omit<Module, "selected">[] = [
  // Agents
  { id: "agent-relais", title: "Agent Relais : réponse aux demandes en moins de 5 minutes", desc: "Accusé immédiat (SMS, e-mail, WhatsApp), qualification, alerte, relances J+1/3/7, prise de rendez-vous. Installation dans vos outils.", price: 2990, estimate: true },
  { id: "agent-relais-abo", title: "Agent Relais : supervision mensuelle", desc: "Surveillance, corrections, rapport mensuel des demandes traitées et du temps de réponse.", price: 290, monthly: true, estimate: true },
  { id: "agent-devis", title: "Agent Devis : du vocal au devis prêt à relire", desc: "Message vocal ou photos depuis le chantier → devis structuré dans votre outil, à valider d'un clic.", price: 1990, estimate: true },
  { id: "agent-avis", title: "Agent Avis et fiche Google", desc: "Demande d'avis après prestation, réponses rédigées, surveillance des modifications suspectes.", price: 790, estimate: true },
  { id: "agent-avis-abo", title: "Agent Avis : suivi mensuel", desc: "Réponses aux avis, alertes, rapport.", price: 190, monthly: true, estimate: true },
  { id: "agent-facture", title: "Agent Facture et relance", desc: "Tri des factures reçues, préparation à la plateforme agréée, relances d'impayés graduées.", price: 1490, estimate: true },
  { id: "audit-temps-perdu", title: "Audit temps perdu (diagnostic flash)", desc: "Une heure chez vous, les tâches répétitives chiffrées, les trois à automatiser en premier.", price: 690 },
  // Contenu
  { id: "photo-reportage", title: "Reportage photo d'entreprise (demi-journée)", desc: "Équipe, atelier, produits, locaux. Fichiers HD livrés avec cession de droits écrite.", price: 690, estimate: true },
  { id: "video-equipe", title: "Vidéo d'équipe ou de présentation (1 à 2 min)", desc: "Tournage sur place, montage, sous-titres, formats site et réseaux.", price: 1900, estimate: true },
  { id: "contenu-mensuel", title: "Création et diffusion de contenu (mensuel)", desc: "Posts, photos, vidéos courtes, publication après validation, bilan mensuel.", price: 890, monthly: true, estimate: true },
  { id: "forfait-com", title: "Forfait communication PME (mensuel)", desc: "Communication globale externalisée : contenu, réseaux, fiche Google, site compris selon la durée. Tout vous appartient, résiliable.", price: 890, monthly: true, estimate: true },
  // Prix fixes du site
  { id: "landing-5j", title: "Landing page en 5 jours", desc: "Page unique conçue pour convertir, livrée en 5 jours ouvrés.", price: 990 },
  { id: "fiche-google", title: "Fiche Google Business optimisée", desc: "Audit, corrections, rédaction, photos, sécurisation des accès, en 5 jours ouvrés.", price: 349 },
  { id: "audit-seo-flash", title: "Audit SEO flash", desc: "Vidéo commentée + PDF des 10 priorités, sous 48 h ouvrées.", price: 249 },
  { id: "vectorisation", title: "Vectorisation de logo", desc: "Logo redessiné en vecteurs, fichiers AI, EPS, SVG, PDF, PNG, sous 24 h.", price: 69 },
  { id: "deplacement", title: "Déplacement hors Bourgogne", desc: "Forfait aller-retour pour une journée sur place, partout en France.", price: 290, estimate: true },
]

export function moduleFromCatalog(id: string, selected = true): Module | null {
  const m = CATALOG.find((c) => c.id === id)
  return m ? { ...m, selected } : null
}

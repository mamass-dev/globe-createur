import type { NavItem } from "../types"
import { isCityPublished } from "../scheduled-pages"

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Création de site internet", href: "/services/creation-site-internet-dijon", icon: "Globe", description: "Sites performants, optimisés SEO" },
      { label: "Refonte de site internet", href: "/services/refonte-site-internet-dijon", icon: "RefreshCw", description: "Modernisez sans perdre votre SEO" },
      { label: "SEO local", href: "/services/seo-local-dijon", icon: "Search", description: "Dominez les résultats Google" },
      { label: "Automatisation no-code", href: "/services/automatisation-nocode-dijon", icon: "Zap", description: "Gagnez du temps avec Make & Zapier" },
      { label: "Création de contenu", href: "/services/creation-contenu-pme", icon: "Camera", description: "Photo, vidéo et design pro" },
      { label: "Support communication", href: "/services/support-communication-pme", icon: "Megaphone", description: "Réseaux sociaux et pilotage" },
    ],
  },
  {
    label: "Secteurs",
    href: "/secteurs",
    children: [
      { label: "Hôtels & hébergements", href: "/secteurs/hotels-lieux-evenementiels", icon: "Hotel", description: "Sites immersifs et réservation" },
      { label: "Lieux événementiels", href: "/secteurs/lieux-evenementiels", icon: "PartyPopper", description: "Valorisez votre lieu de réception" },
      { label: "Restaurants", href: "/secteurs/restaurants-food", icon: "UtensilsCrossed", description: "Menu, réservation et SEO local" },
      { label: "Artisans & BTP", href: "/secteurs/artisans-btp", icon: "Hammer", description: "Portfolio et demandes de devis" },
      { label: "Professions libérales", href: "/secteurs/professions-liberales", icon: "Briefcase", description: "Crédibilité et prise de RDV" },
      { label: "Immobilier", href: "/secteurs/immobilier", icon: "Building", description: "Mandats, acquéreurs et visibilité" },
      { label: "Bien-être & santé", href: "/secteurs/bien-etre-sante", icon: "Heart", description: "RDV en ligne et confiance" },
      { label: "E-commerce local", href: "/secteurs/e-commerce-local", icon: "ShoppingBag", description: "Click & collect, boutique en ligne" },
    ],
  },
  {
    label: "Outils gratuits",
    href: "/audit-digital",
    children: [
      { label: "Audit digital", href: "/audit-digital", icon: "Target", description: "Votre score sur 100 en 2 minutes" },
      { label: "Calculateur ROI", href: "/calculateur-roi", icon: "TrendingUp", description: "Combien vous coûte votre invisibilité" },
      { label: "Analyseur SEO", href: "/analyseur-seo", icon: "Search", description: "Audit SEO instantané de votre site" },
      { label: "Mentions légales", href: "/generateur-mentions-legales", icon: "FileText", description: "Générez vos mentions légales gratuitement" },
      { label: "Signature email", href: "/generateur-signature-email", icon: "Mail", description: "Signature pro compatible tous clients" },
    ],
  },
  { label: "Freelances", href: "/annuaire-freelances" },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/a-propos" },
]

export const footerNav = {
  services: [
    { label: "Création de site", href: "/services/creation-site-internet-dijon" },
    { label: "Refonte de site", href: "/services/refonte-site-internet-dijon" },
    { label: "SEO local", href: "/services/seo-local-dijon" },
    { label: "Google Business", href: "/google-business-profile-dijon" },
    { label: "Création de contenu", href: "/services/creation-contenu-pme" },
    { label: "Automatisation", href: "/services/automatisation-nocode-dijon" },
  ],
  agence: [
    { label: "À propos", href: "/a-propos" },
    { label: "Projets", href: "/projets" },
    { label: "Blog", href: "/blog" },
    { label: "Témoignages", href: "/temoignages" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Forfaits", href: "/forfait-communication-pme" },
  ],
  outils: [
    { label: "Audit digital", href: "/audit-digital" },
    { label: "Calculateur ROI", href: "/calculateur-roi" },
    { label: "Analyseur SEO", href: "/analyseur-seo" },
    { label: "Mentions légales", href: "/generateur-mentions-legales" },
    { label: "Signature email", href: "/generateur-signature-email" },
    { label: "Annuaire freelances", href: "/annuaire-freelances" },
  ],
  villes: [
    { label: "Dijon", href: "/agence-communication-dijon" },
    { label: "Beaune", href: "/agence-communication-beaune" },
    { label: "Lyon", href: "/agence-communication-lyon" },
    { label: "Chalon-sur-Saône", href: "/agence-communication-chalon-sur-saone" },
    { label: "Besançon", href: "/agence-communication-besancon" },
    { label: "Auxerre", href: "/agence-communication-auxerre" },
    { label: "Mâcon", href: "/agence-communication-macon" },
    { label: "Clermont-Ferrand", href: "/agence-communication-clermont-ferrand" },
    { label: "Nevers", href: "/agence-communication-nevers" },
    { label: "Dole", href: "/agence-communication-dole" },
  ].filter((item) => isCityPublished(item.href.replace("/", ""))),
  informations: [
    { label: "Contact", href: "/contact" },
    { label: "Devis gratuit", href: "/devis" },
    { label: "FAQ", href: "/faq" },
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/politique-confidentialite" },
  ],
}

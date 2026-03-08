import type { NavItem } from "../types"

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Création de site internet", href: "/services/creation-site-internet-dijon" },
      { label: "Refonte de site internet", href: "/services/refonte-site-internet-dijon" },
      { label: "SEO local", href: "/services/seo-local-dijon" },
      { label: "Automatisation no-code", href: "/services/automatisation-nocode-dijon" },
      { label: "Création de contenu", href: "/services/creation-contenu-pme" },
      { label: "Support communication", href: "/services/support-communication-pme" },
    ],
  },
  {
    label: "Secteurs",
    href: "#",
    children: [
      { label: "Hôtels & hébergements", href: "/secteurs/hotels-lieux-evenementiels" },
      { label: "Lieux événementiels", href: "/secteurs/lieux-evenementiels" },
    ],
  },
  { label: "Projets", href: "/projets" },
  { label: "Blog", href: "/blog" },
  { label: "Forfaits", href: "/forfait-communication-pme" },
  { label: "À propos", href: "/a-propos" },
]

export const footerNav = {
  services: [
    { label: "Création de site internet", href: "/services/creation-site-internet-dijon" },
    { label: "Refonte de site internet", href: "/services/refonte-site-internet-dijon" },
    { label: "SEO local", href: "/services/seo-local-dijon" },
    { label: "Automatisation no-code", href: "/services/automatisation-nocode-dijon" },
    { label: "Création de contenu", href: "/services/creation-contenu-pme" },
    { label: "Support communication", href: "/services/support-communication-pme" },
  ],
  entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Projets", href: "/projets" },
    { label: "Blog", href: "/blog" },
    { label: "Forfaits", href: "/forfait-communication-pme" },
    { label: "FAQ", href: "/faq" },
    { label: "Témoignages", href: "/temoignages" },
  ],
  contact: [
    { label: "Contact", href: "/contact" },
    { label: "Demander un devis", href: "/devis" },
  ],
}

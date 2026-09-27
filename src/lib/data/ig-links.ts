/**
 * Page de liens Instagram (/ig) — source de vérité.
 * Ordre = ordre d'affichage. `pinnedUntil` : la carte passe en tête jusqu'à cette date
 * (ISO) puis reprend sa place ; `until` : la carte disparaît après cette date.
 * Mise à jour à chaque reel : changer `pinned`, `hook`, `pinnedUntil`. Hermes peut le faire.
 */
export type IgLink = {
  id: string
  /** Accroche affichée en gros (le hook du reel, pas un libellé générique) */
  hook: string
  /** Sous-titre court */
  sub: string
  href: string
  /** Visuel plein écran de la carte */
  image: string
  /** Libellé du bouton */
  cta: string
  /** Étiquette en haut de carte */
  tag: string
  pinnedUntil?: string
  until?: string
  external?: boolean
}

export const IG_HANDLE = "@globecreateur"
export const IG_TAGLINE = "2 associés. 1 studio créatif. Tout est filmé."

export const IG_LINKS: IgLink[] = [
  {
    id: "photo",
    tag: "Dernier reel",
    hook: "Tout le monde génère. Personne ne filme.",
    sub: "Nos vraies images : événements, lieux, sport, drone.",
    href: "/services/photographe-entreprise-dijon?utm_source=ig&utm_medium=bio&utm_campaign=photo",
    image: "/images/portfolio-photo/13-evenementiel-vue-drone-d-un-festival-en-plein-air-au-.webp",
    cta: "Voir le portfolio",
    pinnedUntil: "2026-10-15",
  },
  {
    id: "contact",
    tag: "Parlons-en",
    hook: "Un projet ? On en parle.",
    sub: "Rendez-vous de 20 minutes, gratuit et sans engagement.",
    href: "/devis?utm_source=ig&utm_medium=bio&utm_campaign=contact",
    image: "/images/team/axel-masson-portrait.webp",
    cta: "Prendre rendez-vous",
  },
  {
    id: "video",
    tag: "Showreel",
    hook: "Ce qu'on filme du ciel.",
    sub: "Films, reels, captations, drone. Tournage et montage en interne.",
    href: "/services/video-entreprise-dijon?utm_source=ig&utm_medium=bio&utm_campaign=video",
    image: "/images/video-cover.webp",
    cta: "Regarder le showreel",
  },
  {
    id: "vecto",
    tag: "Offre à prix fixe",
    hook: "Votre logo refusé par l'imprimeur ?",
    sub: "Redessiné en vecteurs, livré sous 24 h. Dès 69 € HT.",
    href: "/services/vectorisation-logo?utm_source=ig&utm_medium=bio&utm_campaign=vecto",
    image: "/images/portfolio-photo/28-corporate-vitrine-de-montres-sur-un-stand-salon-ha.webp",
    cta: "Envoyer mon logo",
  },
  {
    id: "analyseur",
    tag: "Outil gratuit",
    hook: "Votre site, noté sur 100 en 5 secondes.",
    sub: "13 critères vérifiés, sans inscription.",
    href: "/analyseur-seo?utm_source=ig&utm_medium=bio&utm_campaign=analyseur",
    image: "/images/blog/comment-analyser-seo-site-gratuitement.webp",
    cta: "Tester mon site",
  },
  {
    id: "equipe",
    tag: "Qui on est",
    hook: "Deux associés, un studio à Dijon.",
    sub: "Axel (stratégie & web) et Adrien (photo & vidéo). On filme tout.",
    href: "/a-propos?utm_source=ig&utm_medium=bio&utm_campaign=equipe",
    image: "/images/team/adrien-lecrivain-portrait.webp",
    cta: "Faire connaissance",
  },
]

/** Tri : épinglés encore valides en tête, expirés retirés. Déterministe (date passée en argument). */
export function orderedIgLinks(now: Date): IgLink[] {
  const t = now.getTime()
  const live = IG_LINKS.filter((l) => !l.until || new Date(l.until).getTime() > t)
  const pinned = live.filter((l) => l.pinnedUntil && new Date(l.pinnedUntil).getTime() > t)
  const rest = live.filter((l) => !pinned.includes(l))
  return [...pinned, ...rest]
}

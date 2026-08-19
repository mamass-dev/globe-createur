/**
 * Source de vérité de l'offre « Vectorisation de logo ».
 * Prestation manuelle (redessin, pas de tracé automatique), livrée sous 24 h
 * après validation du paiement. Les prix sont en euros HT.
 */

export const VECTO_DELAI_HEURES = 24
export const VECTO_MAX_FILE_MB = 4

export const VECTO_FORMATS_ACCEPTES = ["PNG", "JPG", "JPEG", "WEBP", "PDF", "SVG", "GIF", "HEIC"] as const
export const VECTO_ACCEPT_MIME = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/heic",
  "application/pdf",
]

export type VectoOffre = {
  id: "simple" | "complet" | "reprise"
  nom: string
  prixHT: number | null
  prefix?: string
  accroche: string
  inclus: string[]
  pourQui: string
  populaire?: boolean
}

export const VECTO_OFFRES: VectoOffre[] = [
  {
    id: "simple",
    nom: "Vectorisation",
    prixHT: 69,
    accroche: "Votre logo redessiné proprement en vecteurs, prêt à imprimer à n'importe quelle taille.",
    inclus: [
      "Redessin manuel des formes (pas de tracé automatique)",
      "Typographie identifiée et recomposée, ou vectorisée telle quelle",
      "Fichiers AI, EPS, SVG et PDF vectoriel",
      "PNG haute définition sur fond transparent",
      "Couleurs du logo d'origine conservées",
      "Livraison sous 24 h après paiement",
    ],
    pourQui: "Un logo net (Canva, IA, JPG d'un ancien prestataire) dont il faut juste un fichier propre pour l'imprimeur.",
  },
  {
    id: "complet",
    nom: "Vectorisation + déclinaisons",
    prixHT: 149,
    populaire: true,
    accroche: "Le logo vectorisé, plus toutes les versions qu'un imprimeur, un brodeur ou un enseigniste vous réclamera un jour.",
    inclus: [
      "Tout le forfait Vectorisation",
      "Versions noir, blanc et négatif (fond sombre)",
      "Références couleurs CMJN, RVB, HEX et équivalent Pantone",
      "Version horizontale et version compacte (icône seule) si le logo s'y prête",
      "Mini-guide d'utilisation d'une page : tailles minimales, zone de protection",
      "Livraison sous 24 h après paiement",
    ],
    pourQui: "Textile, enseigne, véhicule, goodies : dès que le logo sort du papier, il vous faut ces déclinaisons.",
  },
  {
    id: "reprise",
    nom: "Reprise de logo",
    prixHT: null,
    prefix: "sur devis",
    accroche: "Votre logo est trop dégradé, trop chargé, ou il a besoin d'être corrigé avant d'être gravé dans le marbre.",
    inclus: [
      "Diagnostic honnête : ce qui se vectorise tel quel, ce qui doit être corrigé",
      "Correction des défauts typiques des logos IA (lettres déformées, symétries fausses, détails illisibles)",
      "Simplification pour la broderie, la gravure ou la petite taille",
      "Toutes les déclinaisons du forfait complet",
      "Devis sous 24 h, avant tout engagement",
    ],
    pourQui: "Logo généré par IA avec des défauts, ancien logo scanné, ou logo que vous voulez garder mais nettoyer.",
  },
]

export const VECTO_LIVRABLES = [
  { ext: "AI", desc: "Le fichier source Adobe Illustrator, celui que demandent imprimeurs et graphistes." },
  { ext: "EPS", desc: "Le format d'échange universel des ateliers de marquage : sérigraphie, broderie, flocage, gravure." },
  { ext: "SVG", desc: "Le vectoriel du web : net sur tous les écrans, léger, parfait pour votre site." },
  { ext: "PDF", desc: "Un PDF vectoriel qui s'ouvre partout et s'agrandit sans perte." },
  { ext: "PNG HD", desc: "Pour les usages du quotidien : fond transparent, haute définition, prêt pour Word, Canva ou vos réseaux." },
]

export function formatPrixVecto(offre: VectoOffre): string {
  if (offre.prixHT === null) return offre.prefix ?? "sur devis"
  return `${offre.prixHT.toLocaleString("fr-FR")} € HT`
}

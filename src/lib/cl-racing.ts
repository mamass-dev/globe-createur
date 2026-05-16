import { z } from "zod"

// ─── ROULAGES ───

export type RoulageStatus = "open" | "limited" | "soon" | "full"

export type Roulage = {
  id: string
  date: string
  dateLabel: string
  day: string
  month: string
  weekday: string
  type: string
  status: RoulageStatus
  videoSlotsLeft?: number
}

const STATUS_LABEL: Record<RoulageStatus, string> = {
  open: "Ouvert",
  limited: "Places limitées",
  soon: "Bientôt",
  full: "Complet",
}

export function statusLabel(status: RoulageStatus) {
  return STATUS_LABEL[status]
}

export const ROULAGES: Roulage[] = [
  {
    id: "2026-05-24",
    date: "2026-05-24",
    dateLabel: "Dimanche 24 mai 2026",
    day: "24",
    month: "MAI",
    weekday: "DIM.",
    type: "Roulage CL RACING — Pentecôte",
    status: "open",
    videoSlotsLeft: 4,
  },
  {
    id: "2026-05-25",
    date: "2026-05-25",
    dateLabel: "Lundi 25 mai 2026",
    day: "25",
    month: "MAI",
    weekday: "LUN.",
    type: "Roulage CL RACING — Lundi de Pentecôte",
    status: "open",
    videoSlotsLeft: 4,
  },
]

// ─── FORMULES ───

export type FormuleId = "photo" | "video" | "combo"

export type Formule = {
  id: FormuleId
  name: string
  tagline: string
  price: number
  oldPrice?: number
  unit: string
  highlight?: string
  description: string
  includes: string[]
  notes?: string
}

export const FORMULES: Formule[] = [
  {
    id: "photo",
    name: "Pack Photo",
    tagline: "Toutes vos trajectoires en HD",
    price: 50,
    unit: "/ pilote / journée",
    highlight: "Le plus demandé",
    description:
      "Photos illimitées prises pendant vos sessions de roulage. Toutes les images réussies vous sont livrées en haute définition, prêtes à partager.",
    includes: [
      "Photos illimitées sur vos sessions",
      "Livraison digitale sous 5 jours ouvrés",
      "Galerie privée avec lien personnel",
      "Téléchargement HD sans filigrane",
      "Droits d'usage personnel inclus",
    ],
    notes: "Quantité variable selon le nombre de tours et la qualité de la lumière.",
  },
  {
    id: "video",
    name: "Pack Vidéo",
    tagline: "Votre session filmée bord de piste",
    price: 140,
    unit: "/ créneau",
    description:
      "Une captation vidéo dédiée de votre session, montée et étalonnée. 4 créneaux disponibles par journée — réservation obligatoire à l'avance.",
    includes: [
      "1 session filmée intégralement",
      "Montage clip 60–90 secondes",
      "Étalonnage et habillage léger",
      "Format vertical + horizontal (réseaux sociaux)",
      "Livraison sous 7 jours ouvrés",
    ],
    notes: "Seulement 4 créneaux disponibles par journée — premier inscrit, premier servi.",
  },
]

// Choix dans le formulaire de réservation (Photo / Vidéo / Combo)
export type FormuleChoiceMeta = {
  id: FormuleId
  label: string
  price: number
  oldPrice?: number
  sub: string
  badge?: string
}

export const FORMULE_CHOICES: FormuleChoiceMeta[] = [
  { id: "photo", label: "Photo", price: 50, sub: "Photos illimitées" },
  { id: "video", label: "Vidéo", price: 140, sub: "1 session filmée" },
  {
    id: "combo",
    label: "Combo",
    price: 162,
    oldPrice: 190,
    sub: "Photo + Vidéo, -20% sur la vidéo",
    badge: "−28€",
  },
]

// ─── GALERIE ───

export type GalleryPhoto = {
  src: string
  alt: string
  width: number
  height: number
  orientation: "portrait" | "landscape"
  tag: "Action" | "Détail" | "Paddock"
}

export const HERO_PHOTO: GalleryPhoto = {
  src: "/cl-racing/3143.webp",
  alt: "Streetfighter aux couleurs CL RACING sur le circuit de Vaison",
  width: 1600,
  height: 901,
  orientation: "landscape",
  tag: "Détail",
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/cl-racing/2617-2.webp",
    alt: "Sportive orange et blanche prise d'angle en virage",
    width: 1600,
    height: 2843,
    orientation: "portrait",
    tag: "Action",
  },
  {
    src: "/cl-racing/3159.webp",
    alt: "Panning d'une sportive blanche en sortie de virage, lumière de fin de journée",
    width: 1600,
    height: 2845,
    orientation: "portrait",
    tag: "Action",
  },
  {
    src: "/cl-racing/2747.webp",
    alt: "Sportive blanche en sortie de virage, vue latérale",
    width: 1600,
    height: 901,
    orientation: "landscape",
    tag: "Action",
  },
  {
    src: "/cl-racing/3100.webp",
    alt: "Pilote orange en virage serré, prise d'angle marquée",
    width: 1600,
    height: 2844,
    orientation: "portrait",
    tag: "Action",
  },
  {
    src: "/cl-racing/3067.webp",
    alt: "Sportive bleue suivie en courbe de piste",
    width: 1600,
    height: 901,
    orientation: "landscape",
    tag: "Action",
  },
  {
    src: "/cl-racing/2560-3.webp",
    alt: "Sportive carénage orange et blanc en virage incliné",
    width: 1600,
    height: 2844,
    orientation: "portrait",
    tag: "Action",
  },
  {
    src: "/cl-racing/2495.webp",
    alt: "Sportive bleue à pleine vitesse en ligne droite",
    width: 1600,
    height: 2844,
    orientation: "portrait",
    tag: "Action",
  },
  {
    src: "/cl-racing/3186.webp",
    alt: "Détail réservoir et arrière d'une sportive blanche au paddock",
    width: 1600,
    height: 901,
    orientation: "landscape",
    tag: "Détail",
  },
  {
    src: "/cl-racing/3194.webp",
    alt: "Vue arrière d'une sportive blanche avec spectateurs au paddock",
    width: 1600,
    height: 2844,
    orientation: "portrait",
    tag: "Paddock",
  },
]

// ─── VALIDATION (zod) ───

const ROULAGE_IDS = ROULAGES.map((r) => r.id) as [string, ...string[]]

export const clRacingReservationSchema = z.object({
  firstName: z.string().trim().min(1, "Prénom requis").max(100),
  lastName: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(200),
  phone: z
    .string()
    .trim()
    .min(8, "Téléphone invalide")
    .max(30)
    .regex(/^[0-9+\s().-]+$/, "Téléphone invalide"),
  roulageId: z.enum(ROULAGE_IDS, { message: "Choisissez une date de roulage" }),
  formule: z.enum(["photo", "video", "combo"], { message: "Choisissez une formule" }),
  consent: z.literal(true, { message: "Vous devez accepter les conditions" }),
})

export type ClRacingReservation = z.infer<typeof clRacingReservationSchema>

// ─── FAQ ───

export const FAQ_ITEMS = [
  {
    q: "Comment se passe la réservation ?",
    a: "Vous remplissez le formulaire en ligne en choisissant votre date de roulage et votre formule. Vous recevez un email de confirmation sous 24h. Aucun paiement en ligne — le règlement se fait sur place le jour J ou à la livraison des photos.",
  },
  {
    q: "Quand recevrai-je mes photos ?",
    a: "Les photos sont livrées dans les 5 jours ouvrés suivant le roulage. Les vidéos prennent généralement 7 jours en raison du temps de montage et d'étalonnage. Vous recevez un lien privé vers votre galerie ou vos fichiers.",
  },
  {
    q: "Le pack Photo est-il vraiment illimité ?",
    a: "Oui — vous recevez toutes les photos réussies prises pendant vos sessions, sans limite de quantité. Le nombre dépendra du temps passé en piste, des conditions de lumière et des angles disponibles.",
  },
  {
    q: "Combien y a-t-il de créneaux vidéo par jour ?",
    a: "Seulement 4 créneaux vidéo sont disponibles par journée de roulage afin de garantir la qualité de la captation. Réservez tôt pour avoir le créneau qui correspond à votre session.",
  },
  {
    q: "Quels sont mes droits sur les images ?",
    a: "Vous bénéficiez d'un droit d'usage personnel illimité (réseaux sociaux, impression personnelle, partage privé). Un usage commercial nécessite un accord écrit préalable. Globe Créateur et CL RACING conservent le droit d'utiliser certaines images pour leur communication.",
  },
  {
    q: "Que se passe-t-il si le roulage est annulé ?",
    a: "En cas d'annulation du roulage par CL RACING (météo, sécurité), votre réservation est automatiquement reportée sur la date de remplacement ou annulée sans frais.",
  },
  {
    q: "Puis-je offrir une prestation à un pilote ?",
    a: "Bien sûr ! Indiquez-le dans le message du formulaire de réservation : on s'occupe d'envoyer un bon cadeau personnalisé au format PDF.",
  },
]

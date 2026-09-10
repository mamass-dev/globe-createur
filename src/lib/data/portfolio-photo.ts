/**
 * Portfolio photo (2026-09-10) — exports web depuis le Lightroom d'Axel (disque T7).
 * `client` n'est renseigné que pour les clients déjà cités publiquement sur le site.
 */
export type PortfolioUnivers = "sport" | "evenementiel" | "lieux" | "corporate"

export const PORTFOLIO_UNIVERS: { id: PortfolioUnivers | "tous" | "drone"; label: string }[] = [
  { id: "tous", label: "Tout" },
  { id: "sport", label: "Sport & mécanique" },
  { id: "evenementiel", label: "Événementiel" },
  { id: "lieux", label: "Restauration & lieux" },
  { id: "corporate", label: "Corporate & industrie" },
  { id: "drone", label: "Drone" },
]

export type PortfolioPhoto = { src: string; alt: string; univers: PortfolioUnivers; client: string | null; drone: boolean; width: number; height: number }

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {"src": "/images/portfolio-photo/01-sport-porsche-911-gt3-rs-exposee-salon-automob.webp", "alt": "Porsche 911 GT3 RS exposée, salon automobile à Beaune", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/02-sport-mercedes-300-sl-papillon-sous-chapiteau-.webp", "alt": "Mercedes 300 SL papillon sous chapiteau, salon automobile", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/03-sport-mercedes-amg-gt-verte-et-velos-sur-un-st.webp", "alt": "Mercedes-AMG GT verte et vélos sur un stand de salon", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/04-sport-motard-en-gilet-airbag-helite-file-sur-r.webp", "alt": "Motard en gilet airbag Helite, filé sur route de campagne", "univers": "sport", "client": "Helite", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/05-sport-moto-sportive-rouge-sur-route-pilote-equ.webp", "alt": "Moto sportive rouge sur route, pilote équipé Helite", "univers": "sport", "client": "Helite", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/06-sport-cheval-et-cavaliere-au-saut-d-obstacle-c.webp", "alt": "Cheval et cavalière au saut d'obstacle, concours hippique", "univers": "sport", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/07-sport-coucher-de-soleil-sur-un-stade-de-footba.webp", "alt": "Coucher de soleil sur un stade de football, bord de pelouse", "univers": "sport", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/08-sport-porsche-944-en-mouvement-sur-une-route-b.webp", "alt": "Porsche 944 en mouvement sur une route bordée d'arbres", "univers": "sport", "client": null, "drone": false, "width": 2000, "height": 1333},
  {"src": "/images/portfolio-photo/09-sport-pilote-sur-simulateur-de-course-volant-e.webp", "alt": "Pilote sur simulateur de course, volant et écran", "univers": "sport", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/10-sport-bass-boat-lance-a-pleine-vitesse-pecheur.webp", "alt": "Bass boat lancé à pleine vitesse, pêcheurs à bord", "univers": "sport", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/11-evenementiel-vue-drone-d-un-festival-en-plein-air-au-.webp", "alt": "Vue drone d'un festival en plein air au bord de l'eau", "univers": "evenementiel", "client": "F-18 Events", "drone": true, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/12-evenementiel-dj-en-performance-sous-les-voutes-d-un-c.webp", "alt": "DJ en performance sous les voûtes d'un cellier", "univers": "evenementiel", "client": "F-18 Events", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/13-evenementiel-public-sous-les-voutes-eclairees-d-une-s.webp", "alt": "Public sous les voûtes éclairées d'une soirée électro", "univers": "evenementiel", "client": "F-18 Events", "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/14-evenementiel-grande-scene-de-festival-au-coucher-du-s.webp", "alt": "Grande scène de festival au coucher du soleil", "univers": "evenementiel", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/15-evenementiel-scene-et-faisceaux-lumineux-concert-de-n.webp", "alt": "Scène et faisceaux lumineux, concert de nuit", "univers": "evenementiel", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/16-evenementiel-foule-costumee-d-un-evenement-etudiant.webp", "alt": "Foule costumée d'un événement étudiant", "univers": "evenementiel", "client": null, "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/17-evenementiel-invites-et-micro-lors-d-une-inauguration.webp", "alt": "Invités et micro lors d'une inauguration de salon", "univers": "evenementiel", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/18-evenementiel-concert-acoustique-en-plein-air-parc-de-.webp", "alt": "Concert acoustique en plein air, parc de loisirs", "univers": "evenementiel", "client": "Parc Évasion", "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/19-lieux-saint-jacques-dressees-a-l-assiette-rest.webp", "alt": "Saint-jacques dressées à l'assiette, restaurant gastronomique", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/20-lieux-chef-en-cuisine-preparation-d-un-plat.webp", "alt": "Chef en cuisine, préparation d'un plat", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/21-lieux-table-dressee-dans-une-prairie-reception.webp", "alt": "Table dressée dans une prairie, réception champêtre", "univers": "lieux", "client": null, "drone": false, "width": 1333, "height": 2000},
  {"src": "/images/portfolio-photo/22-lieux-pieces-de-viande-sur-la-plancha-cuisine-.webp", "alt": "Pièces de viande sur la plancha, cuisine au feu", "univers": "lieux", "client": null, "drone": false, "width": 1333, "height": 2000},
  {"src": "/images/portfolio-photo/23-lieux-terrasse-d-epicerie-fine-animee-en-fin-d.webp", "alt": "Terrasse d'épicerie fine animée en fin de journée", "univers": "lieux", "client": null, "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/24-lieux-cookies-sous-cloche-comptoir-d-epicerie-.webp", "alt": "Cookies sous cloche, comptoir d'épicerie fine", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/25-lieux-salle-de-bar-avec-neon-et-banquettes-amb.webp", "alt": "Salle de bar avec néon et banquettes, ambiance chaleureuse", "univers": "lieux", "client": null, "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/26-lieux-bouteille-de-bourgogne-et-verre-de-vin-r.webp", "alt": "Bouteille de bourgogne et verre de vin rouge, cave", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/27-corporate-site-industriel-de-recyclage-vu-du-ciel-.webp", "alt": "Site industriel de recyclage vu du ciel, drone", "univers": "corporate", "client": null, "drone": true, "width": 2000, "height": 1124},
  {"src": "/images/portfolio-photo/28-corporate-chantier-de-tri-de-dechets-vue-aerienne-.webp", "alt": "Chantier de tri de déchets, vue aérienne rapprochée", "univers": "corporate", "client": null, "drone": true, "width": 2000, "height": 1124},
  {"src": "/images/portfolio-photo/29-corporate-portrait-d-un-vigneron-dans-ses-vignes-a.webp", "alt": "Portrait d'un vigneron dans ses vignes au coucher du soleil", "univers": "corporate", "client": "Domaine Arnaut Boué", "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/30-corporate-interview-filmee-dans-une-cave-a-vin.webp", "alt": "Interview filmée dans une cave à vin", "univers": "corporate", "client": "Domaine Arnaut Boué", "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/31-corporate-artisan-sur-un-chantier-de-resine-de-sol.webp", "alt": "Artisan sur un chantier de résine de sol", "univers": "corporate", "client": null, "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/33-corporate-touche-en-rugby-feminin-ballon-en-l-air.webp", "alt": "Touche en rugby féminin, ballon en l'air", "univers": "corporate", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/34-corporate-frappe-d-un-joueur-de-football-amateur-m.webp", "alt": "Frappe d'un joueur de football amateur, maillot d'équipe", "univers": "corporate", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/35-corporate-lever-de-soleil-sur-un-monument-vue-dron.webp", "alt": "Lever de soleil sur un monument, vue drone", "univers": "corporate", "client": "Wake up", "drone": true, "width": 2000, "height": 1125},
]

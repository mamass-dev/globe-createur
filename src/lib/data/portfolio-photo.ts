/**
 * Portfolio photo (sélection prestige, 2026-09-10) — exports web depuis le Lightroom d'Axel (disque T7).
 * 30 images (divisible par 2 et 3 : grille complète sans rangée étirée). `client` uniquement s'il est déjà cité sur le site.
 */
export type PortfolioUnivers = "sport" | "evenementiel" | "lieux" | "corporate"

export const PORTFOLIO_UNIVERS: { id: PortfolioUnivers | "tous" | "drone"; label: string }[] = [
  { id: "tous", label: "Tout" },
  { id: "sport", label: "Automobile & prestige" },
  { id: "evenementiel", label: "Événementiel" },
  { id: "lieux", label: "Gastronomie & lieux" },
  { id: "corporate", label: "Corporate & vignoble" },
  { id: "drone", label: "Drone" },
]

export type PortfolioPhoto = { src: string; alt: string; univers: PortfolioUnivers; client: string | null; drone: boolean; width: number; height: number }

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {"src": "/images/portfolio-photo/01-sport-aston-martin-bleue-de-face-eclairage-de-.webp", "alt": "Aston Martin bleue de face, éclairage de stand, salon automobile", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/02-sport-bugatti-veyron-rouge-et-noire-sous-le-ch.webp", "alt": "Bugatti Veyron rouge et noire sous le chapiteau d'un salon", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/03-sport-ford-gt-blanche-a-bandes-bleues-detail-d.webp", "alt": "Ford GT blanche à bandes bleues, détail de calandre", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/04-sport-supercar-bleue-de-dos-aileron-et-diffuse.webp", "alt": "Supercar bleue de dos, aileron et diffuseur, salon automobile", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/05-sport-stand-maserati-mc20-bleue-et-jaune-cote-.webp", "alt": "Stand Maserati, MC20 bleue et jaune côte à côte", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/06-sport-porsche-911-classique-noire-phares-allum.webp", "alt": "Porsche 911 classique noire, phares allumés, salon automobile", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/07-sport-morgan-bleu-ciel-de-trois-quarts-exposit.webp", "alt": "Morgan bleu ciel de trois quarts, exposition de classiques", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/08-sport-mercedes-190-sl-verte-presentation-sur-s.webp", "alt": "Mercedes 190 SL verte, présentation sur stand", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/09-sport-porsche-911-gt3-rs-en-exterieur-paddock-.webp", "alt": "Porsche 911 GT3 RS en extérieur, paddock du salon", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/10-sport-porsche-944-blanche-en-mouvement-sur-une.webp", "alt": "Porsche 944 blanche en mouvement sur une route de campagne", "univers": "sport", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/11-sport-motard-en-gilet-airbag-helite-file-sur-r.webp", "alt": "Motard en gilet airbag Helite, filé sur route de campagne", "univers": "sport", "client": "Helite", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/12-sport-jante-bronze-et-pneu-michelin-detail-de-.webp", "alt": "Jante bronze et pneu Michelin, détail de supercar", "univers": "sport", "client": "Prestige Auto Beaune", "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/13-evenementiel-vue-drone-d-un-festival-en-plein-air-au-.webp", "alt": "Vue drone d'un festival en plein air au bord de l'eau", "univers": "evenementiel", "client": "F-18 Events", "drone": true, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/14-evenementiel-dj-en-performance-sous-les-voutes-d-un-c.webp", "alt": "DJ en performance sous les voûtes d'un cellier", "univers": "evenementiel", "client": "F-18 Events", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/15-evenementiel-foule-du-salon-automobile-vue-en-plongee.webp", "alt": "Foule du salon automobile vue en plongée", "univers": "evenementiel", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/16-evenementiel-remise-de-trophee-sur-scene-salon-automo.webp", "alt": "Remise de trophée sur scène, salon automobile", "univers": "evenementiel", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/17-evenementiel-champagne-au-frais-et-coupes-reception-d.webp", "alt": "Champagne au frais et coupes, réception de salon", "univers": "evenementiel", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/18-evenementiel-grande-scene-de-festival-au-coucher-du-s.webp", "alt": "Grande scène de festival au coucher du soleil", "univers": "evenementiel", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/19-lieux-entree-dressee-dans-une-assiette-bleue-r.webp", "alt": "Entrée dressée dans une assiette bleue, restaurant gastronomique", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/20-lieux-saint-jacques-dressees-a-l-assiette-rest.webp", "alt": "Saint-jacques dressées à l'assiette, restaurant gastronomique", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/21-lieux-plat-dresse-sur-porcelaine-bleue-restaur.webp", "alt": "Plat dressé sur porcelaine bleue, restaurant gastronomique", "univers": "lieux", "client": null, "drone": false, "width": 1125, "height": 2000},
  {"src": "/images/portfolio-photo/22-lieux-tasses-en-porcelaine-a-lisere-dore-align.webp", "alt": "Tasses en porcelaine à liseré doré alignées, réception champêtre", "univers": "lieux", "client": null, "drone": false, "width": 1333, "height": 2000},
  {"src": "/images/portfolio-photo/23-lieux-table-dressee-dans-une-prairie-reception.webp", "alt": "Table dressée dans une prairie, réception champêtre", "univers": "lieux", "client": null, "drone": false, "width": 1333, "height": 2000},
  {"src": "/images/portfolio-photo/24-lieux-assiette-et-verres-graves-dressage-d-une.webp", "alt": "Assiette et verres gravés, dressage d'une table champêtre", "univers": "lieux", "client": null, "drone": false, "width": 1333, "height": 2000},
  {"src": "/images/portfolio-photo/25-corporate-interieur-cuir-creme-et-volant-detail-d-.webp", "alt": "Intérieur cuir crème et volant, détail d'un véhicule de collection", "univers": "corporate", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/26-corporate-portrait-de-famille-de-vignerons-vignes-.webp", "alt": "Portrait de famille de vignerons, vignes d'automne", "univers": "corporate", "client": "Domaine Arnaut Boué", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/27-corporate-tournage-d-interview-dans-les-vignes-cam.webp", "alt": "Tournage d'interview dans les vignes, caméra sur pied", "univers": "corporate", "client": "Domaine Arnaut Boué", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/28-corporate-vitrine-de-montres-sur-un-stand-salon-ha.webp", "alt": "Vitrine de montres sur un stand, salon haut de gamme", "univers": "corporate", "client": "Prestige Auto Beaune", "drone": false, "width": 2000, "height": 1125},
  {"src": "/images/portfolio-photo/29-corporate-site-industriel-de-recyclage-vu-du-ciel-.webp", "alt": "Site industriel de recyclage vu du ciel, drone", "univers": "corporate", "client": null, "drone": true, "width": 2000, "height": 1124},
  {"src": "/images/portfolio-photo/30-corporate-lever-de-soleil-sur-un-monument-vue-dron.webp", "alt": "Lever de soleil sur un monument, vue drone", "univers": "corporate", "client": "Wake up", "drone": true, "width": 2000, "height": 1125},
]

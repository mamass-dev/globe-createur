export type FreelanceCategory =
  | "developpement-web"
  | "design-graphique"
  | "seo-marketing"
  | "photo-video"
  | "redaction-contenu"
  | "community-management"
  | "automatisation"
  | "consulting"

export type Freelance = {
  slug: string
  name: string
  title: string
  location: string
  bio: string
  skills: string[]
  website?: string
  linkedin?: string
  instagram?: string
  email: string
  category: FreelanceCategory
  featured: boolean
}

export const categoryLabels: Record<FreelanceCategory, { label: string; icon: string; description: string }> = {
  "developpement-web": { label: "Développement Web", icon: "Code", description: "Sites, apps et solutions web sur-mesure" },
  "design-graphique": { label: "Design Graphique", icon: "Palette", description: "Identité visuelle, UI/UX et print" },
  "seo-marketing": { label: "SEO & Marketing", icon: "Search", description: "Référencement, ads et stratégie digitale" },
  "photo-video": { label: "Photo & Vidéo", icon: "Camera", description: "Shooting, montage et production" },
  "redaction-contenu": { label: "Rédaction & Contenu", icon: "PenTool", description: "Copywriting, blog et stratégie éditoriale" },
  "community-management": { label: "Community Management", icon: "Users", description: "Réseaux sociaux et engagement" },
  "automatisation": { label: "Automatisation", icon: "Zap", description: "No-code, workflows et intégrations" },
  "consulting": { label: "Consulting", icon: "Briefcase", description: "Conseil en stratégie digitale et transformation" },
}

export const freelances: Freelance[] = [
  {
    slug: "camille-moreau-dev-web",
    name: "Camille Moreau",
    title: "Développeuse Web Full-Stack",
    location: "Dijon, Côte-d'Or",
    bio: "Développeuse passionnée spécialisée en React et Next.js. J'accompagne les PME bourguignonnes dans la création de sites performants et accessibles. 5 ans d'expérience en agence puis en freelance.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    website: "https://camillemoreau.dev",
    linkedin: "https://linkedin.com/in/camille-moreau-dev",
    email: "contact@camillemoreau.dev",
    category: "developpement-web",
    featured: true,
  },
  {
    slug: "thomas-petit-seo",
    name: "Thomas Petit",
    title: "Consultant SEO & Google Ads",
    location: "Beaune, Côte-d'Or",
    bio: "Expert en référencement naturel et payant depuis 7 ans. J'aide les commerces locaux à dominer les résultats Google sur leur zone de chalandise. Certifié Google Partner.",
    skills: ["SEO local", "Google Ads", "Analytics", "Search Console", "Content Marketing"],
    website: "https://thomas-petit-seo.fr",
    linkedin: "https://linkedin.com/in/thomas-petit-seo",
    email: "thomas@thomas-petit-seo.fr",
    category: "seo-marketing",
    featured: true,
  },
  {
    slug: "julie-lambert-design",
    name: "Julie Lambert",
    title: "Directrice Artistique & UI Designer",
    location: "Dijon, Côte-d'Or",
    bio: "Créative de formation avec un oeil pour le détail. Je conçois des identités visuelles mémorables et des interfaces intuitives. Ancienne DA en agence parisienne, installée à Dijon depuis 2023.",
    skills: ["Figma", "Branding", "UI/UX Design", "Motion Design", "Illustration"],
    linkedin: "https://linkedin.com/in/julie-lambert-da",
    instagram: "https://instagram.com/julielambert.design",
    email: "hello@julielambert.design",
    category: "design-graphique",
    featured: true,
  },
  {
    slug: "romain-duval-photo",
    name: "Romain Duval",
    title: "Photographe & Vidéaste",
    location: "Chalon-sur-Saône, Saône-et-Loire",
    bio: "Spécialisé en photo corporate, événementiel et food. Je raconte l'histoire de votre entreprise en images. Travail soigné, rendu rapide, tarifs adaptés aux PME.",
    skills: ["Photo corporate", "Vidéo drone", "Food photography", "Montage vidéo", "Réseaux sociaux"],
    website: "https://romainduval-photo.fr",
    instagram: "https://instagram.com/romainduval.photo",
    email: "romain@romainduval-photo.fr",
    category: "photo-video",
    featured: false,
  },
  {
    slug: "sarah-bonnet-redaction",
    name: "Sarah Bonnet",
    title: "Rédactrice Web SEO",
    location: "Besançon, Doubs",
    bio: "Rédactrice spécialisée en contenu B2B et SEO. J'écris des articles de blog, pages de vente et newsletters qui convertissent. Plus de 500 articles publiés pour des clients en France.",
    skills: ["Rédaction SEO", "Copywriting", "Stratégie éditoriale", "Newsletter", "LinkedIn"],
    website: "https://sarahbonnet-redac.fr",
    linkedin: "https://linkedin.com/in/sarah-bonnet-redac",
    email: "sarah@sarahbonnet-redac.fr",
    category: "redaction-contenu",
    featured: false,
  },
  {
    slug: "maxime-girard-automation",
    name: "Maxime Girard",
    title: "Expert Automatisation No-Code",
    location: "Dijon, Côte-d'Or",
    bio: "Je connecte vos outils et automatise vos processus avec Make, Zapier et Notion. Spécialisé dans les workflows CRM, facturation et onboarding. Gain moyen : 10h/semaine pour mes clients.",
    skills: ["Make (Integromat)", "Zapier", "Notion", "Airtable", "n8n"],
    linkedin: "https://linkedin.com/in/maxime-girard-nocode",
    email: "maxime@girard-automation.fr",
    category: "automatisation",
    featured: false,
  },
  {
    slug: "lea-martinez-cm",
    name: "Léa Martinez",
    title: "Community Manager & Social Media",
    location: "Mâcon, Saône-et-Loire",
    bio: "J'anime les communautés de PME et commerces locaux sur Instagram, Facebook et LinkedIn. Création de contenu, planning éditorial et reporting mensuel. Votre présence sociale clé en main.",
    skills: ["Instagram", "Facebook Ads", "LinkedIn", "Création de contenu", "Planning éditorial"],
    instagram: "https://instagram.com/lea.socialmedia",
    linkedin: "https://linkedin.com/in/lea-martinez-cm",
    email: "lea@martinez-social.fr",
    category: "community-management",
    featured: false,
  },
  {
    slug: "antoine-bernard-consulting",
    name: "Antoine Bernard",
    title: "Consultant Stratégie Digitale",
    location: "Dijon, Côte-d'Or",
    bio: "15 ans d'expérience en transformation digitale. J'accompagne les dirigeants de PME dans leur stratégie web, leur choix d'outils et la montée en compétences de leurs équipes.",
    skills: ["Stratégie digitale", "Transformation numérique", "Formation", "Gestion de projet", "CRM"],
    website: "https://antoine-bernard.consulting",
    linkedin: "https://linkedin.com/in/antoine-bernard-consulting",
    email: "antoine@antoine-bernard.consulting",
    category: "consulting",
    featured: true,
  },
  {
    slug: "emma-rousseau-ux",
    name: "Emma Rousseau",
    title: "UX Researcher & Designer",
    location: "Auxerre, Yonne",
    bio: "Spécialisée en recherche utilisateur et design d'interfaces centrées humain. Je réalise des audits UX, tests utilisateurs et prototypes pour améliorer vos taux de conversion.",
    skills: ["UX Research", "Tests utilisateurs", "Prototypage", "Figma", "Design System"],
    website: "https://emmarousseau-ux.fr",
    linkedin: "https://linkedin.com/in/emma-rousseau-ux",
    email: "emma@emmarousseau-ux.fr",
    category: "design-graphique",
    featured: false,
  },
  {
    slug: "nicolas-faure-wordpress",
    name: "Nicolas Faure",
    title: "Développeur WordPress & WooCommerce",
    location: "Nevers, Nièvre",
    bio: "Expert WordPress depuis 8 ans, je crée des sites vitrines et e-commerce sur-mesure. Spécialisé en WooCommerce, migration et optimisation de performance. Plus de 120 sites livrés.",
    skills: ["WordPress", "WooCommerce", "PHP", "Elementor", "Optimisation vitesse"],
    website: "https://nicolasfaure-wp.fr",
    linkedin: "https://linkedin.com/in/nicolas-faure-wp",
    email: "nicolas@nicolasfaure-wp.fr",
    category: "developpement-web",
    featured: false,
  },
]

export function getFreelanceBySlug(slug: string): Freelance | undefined {
  return freelances.find((f) => f.slug === slug)
}

export function getFreelancesByCategory(category: FreelanceCategory): Freelance[] {
  return freelances.filter((f) => f.category === category)
}

export function getAllCategories(): FreelanceCategory[] {
  return [...new Set(freelances.map((f) => f.category))]
}

export function getAllLocations(): string[] {
  return [...new Set(freelances.map((f) => f.location))].sort()
}

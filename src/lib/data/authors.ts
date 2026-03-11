export type Author = {
  name: string
  role: string
  bio: string
  avatar: string
  socials?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

const authors: Record<string, Author> = {
  "Axel Masson": {
    name: "Axel Masson",
    role: "Fondateur & Directeur Créatif",
    bio: "Passionné de stratégie digitale et de design, Axel accompagne les PME dans leur croissance en ligne depuis plus de 5 ans.",
    avatar: "/images/logo/logo-couleur-scaled.webp",
    socials: {
      linkedin: "https://www.linkedin.com/in/axelmasson",
    },
  },
}

export function getAuthor(name: string): Author {
  return authors[name] ?? {
    name,
    role: "Contributeur",
    bio: "",
    avatar: "/images/logo/logo-couleur-scaled.webp",
  }
}

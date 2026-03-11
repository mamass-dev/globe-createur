export type Service = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keyword: string
  keywords: string[]
  icon: string
  excerpt: string
  relatedProjects: string[]
  relatedServices: string[]
  parentSlug: string | null
  children: string[]
}

export type Secteur = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keyword: string
  keywords: string[]
  icon: string
  excerpt: string
  relatedServices: string[]
  relatedProjects: string[]
}

export type Projet = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  client: string
  category: string
  excerpt: string
  image: string
  imageAlt: string
  relatedServices: string[]
}

export type FaqItem = {
  question: string
  answer: string
}

export type BlogFrontmatter = {
  title: string
  metaTitle: string
  metaDescription: string
  keyword: string
  keywords: string[]
  publishedAt: string
  updatedAt: string
  author: string
  category: string
  readingTime: number
  image: string
  imageAlt: string
  relatedServices: string[]
  relatedArticles: string[]
}

export type NavItem = {
  label: string
  href: string
  icon?: string
  description?: string
  children?: NavItem[]
}

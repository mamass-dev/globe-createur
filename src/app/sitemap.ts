import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { getBlogPosts, getServicePages, getSecteurPages, getProjetPages } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projets`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/forfait-communication-pme`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/agence-communication-dijon`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/devis`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/temoignages`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = getServicePages().map((p) => ({
    url: `${SITE_URL}/services/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const secteurPages: MetadataRoute.Sitemap = getSecteurPages().map((p) => ({
    url: `${SITE_URL}/secteurs/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const projetPages: MetadataRoute.Sitemap = getProjetPages().map((p) => ({
    url: `${SITE_URL}/projets/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.frontmatter.updatedAt ?? p.frontmatter.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...secteurPages, ...projetPages, ...blogPages]
}

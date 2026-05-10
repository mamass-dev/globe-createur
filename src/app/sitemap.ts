import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { getBlogPosts, getServicePages, getSecteurPages, getProjetPages } from "@/lib/content"
import { getPublishedCitySlugs } from "@/lib/scheduled-pages"

export const revalidate = 3600

const BUILD_DATE = new Date().toISOString()

function pickDate(fm: Record<string, unknown>, fallback: string = BUILD_DATE): string {
  const updated = fm.updatedAt as string | undefined
  const published = fm.publishedAt as string | undefined
  return updated ?? published ?? fallback
}

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages: MetadataRoute.Sitemap = getPublishedCitySlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projets`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/forfait-communication-pme`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tarifs`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/google-business-profile-dijon`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/devis`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/temoignages`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/audit-digital`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculateur-roi`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/analyseur-seo`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/generateur-signature-email`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/diagnostic`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/estimateur`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/secteurs`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politique-confidentialite`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = getServicePages().map((p) => ({
    url: `${SITE_URL}/services/${p.slug}`,
    lastModified: pickDate(p.frontmatter as Record<string, unknown>),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const secteurPages: MetadataRoute.Sitemap = getSecteurPages().map((p) => ({
    url: `${SITE_URL}/secteurs/${p.slug}`,
    lastModified: pickDate(p.frontmatter as Record<string, unknown>),
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  const projetPages: MetadataRoute.Sitemap = getProjetPages().map((p) => ({
    url: `${SITE_URL}/projets/${p.slug}`,
    lastModified: pickDate(p.frontmatter as Record<string, unknown>),
    changeFrequency: "monthly",
    priority: 0.65,
  }))

  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.frontmatter.updatedAt ?? p.frontmatter.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...cityPages, ...servicePages, ...secteurPages, ...projetPages, ...blogPages]
}

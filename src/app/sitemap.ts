import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"
import { getBlogPosts, getServicePages, getSecteurPages, getProjetPages } from "@/lib/content"
import { getPublishedCitySlugs } from "@/lib/scheduled-pages"

export const revalidate = 3600

// Date fixe de la dernière mise à jour significative du site (rebrand + refonte éditoriale).
// À incrémenter manuellement lors d'un changement de contenu réel : un lastModified qui
// bouge à chaque build apprend à Google à ignorer le sitemap.
const LAST_SITE_UPDATE = "2026-07-24"

function pickDate(fm: Record<string, unknown>, fallback: string = LAST_SITE_UPDATE): string {
  const updated = fm.updatedAt as string | undefined
  const published = fm.publishedAt as string | undefined
  return updated ?? published ?? fallback
}

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages: MetadataRoute.Sitemap = getPublishedCitySlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: LAST_SITE_UPDATE,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projets`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: LAST_SITE_UPDATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/forfait-communication-pme`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/tarifs`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/google-business-profile-dijon`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/devis`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/temoignages`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/outils`, lastModified: "2026-07-29", changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/audit-digital`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculateur-roi`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/analyseur-seo`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/generateur-signature-email`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/diagnostic`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/estimateur`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    // Offre IA : page pilier hors MDX (route statique) + outil dédié
    { url: `${SITE_URL}/services/diagnostic-ia-pme`, lastModified: "2026-08-06", changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculateur-roi-ia`, lastModified: "2026-08-06", changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/secteurs`, lastModified: LAST_SITE_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: LAST_SITE_UPDATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/politique-confidentialite`, lastModified: LAST_SITE_UPDATE, changeFrequency: "yearly", priority: 0.3 },
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

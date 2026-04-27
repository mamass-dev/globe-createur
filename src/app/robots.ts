import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      // AI crawlers - explicitly allowed for GEO
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/api/", "/wp-content/", "/wp-json/", "/wp-admin/", "/wp-includes/", "/elementor-*"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

import type { Metadata } from "next"
import { SITE_URL, SITE_NAME, SITE_LOCALE } from "./constants"

type PageMeta = {
  title: string
  description: string
  path: string
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

export function buildMetadata(page: PageMeta): Metadata {
  const url = `${SITE_URL}${page.path}`
  const image = page.image ?? `${SITE_URL}/og/default.jpg`

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type: page.type ?? "website",
      images: [{ url: image, width: 1200, height: 630 }],
      ...(page.publishedTime && {
        publishedTime: page.publishedTime,
        modifiedTime: page.modifiedTime ?? page.publishedTime,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
    },
    ...(page.noIndex && { robots: { index: false, follow: false } }),
  }
}

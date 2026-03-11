import { SITE_URL, SITE_NAME } from "@/lib/constants"
import { JsonLd } from "./json-ld"
import type { FaqItem } from "@/lib/types"

export function AggregateRatingSchema({
  ratingValue,
  reviewCount,
}: {
  ratingValue: number
  reviewCount: number
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue,
          bestRating: 5,
          worstRating: 1,
          reviewCount,
        },
      }}
    />
  )
}

export function ServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${SITE_URL}${url}`,
        provider: {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        areaServed: {
          "@type": "City",
          name: "Dijon",
        },
      }}
    />
  )
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  )
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
  author,
}: {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  updatedAt: string
  author: string
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${url}`,
        image,
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: {
          "@type": "Person",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
      }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[]
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.href}`,
        })),
      }}
    />
  )
}

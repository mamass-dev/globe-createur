import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/constants"
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

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/logo/logo-main.webp`,
          width: 512,
          height: 512,
        },
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address.street,
          addressLocality: CONTACT.address.city,
          postalCode: CONTACT.address.zip,
          addressRegion: CONTACT.address.region,
          addressCountry: CONTACT.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CONTACT.geo.lat,
          longitude: CONTACT.geo.lng,
        },
        sameAs: [CONTACT.socials.instagram, CONTACT.socials.linkedin],
        founder: {
          "@type": "Person",
          name: "Axel Masson",
          jobTitle: "Fondateur & Directeur Créatif",
          url: "https://www.linkedin.com/in/axelmasson",
        },
        foundingLocation: {
          "@type": "Place",
          name: "Dijon, France",
        },
        areaServed: [
          { "@type": "City", name: "Dijon" },
          { "@type": "City", name: "Beaune" },
          { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" },
        ],
        knowsAbout: [
          "Création de site internet",
          "SEO local",
          "Référencement naturel",
          "Communication digitale",
          "Photographie professionnelle",
          "Production vidéo",
          "Automatisation no-code",
          "Community management",
          "Google Business Profile",
          "Design graphique",
        ],
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 2,
          maxValue: 10,
        },
        slogan: "Votre équipe communication externalisée",
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
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        areaServed: [
          { "@type": "City", name: "Dijon" },
          { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" },
        ],
        serviceType: name,
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
  keywords,
}: {
  title: string
  description: string
  url: string
  image: string
  publishedAt: string
  updatedAt: string
  author: string
  keywords?: string[]
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: `${SITE_URL}${url}`,
        image: {
          "@type": "ImageObject",
          url: image,
          width: 1200,
          height: 630,
        },
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: {
          "@type": "Person",
          name: author,
          url: "https://www.linkedin.com/in/axelmasson",
          jobTitle: "Fondateur & Directeur Créatif",
          worksFor: {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            name: SITE_NAME,
          },
        },
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/logo/logo-main.webp`,
          },
        },
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: SITE_NAME,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}${url}`,
        },
        inLanguage: "fr-FR",
        ...(keywords &&
          keywords.length > 0 && {
            keywords: keywords.join(", "),
            about: keywords.slice(0, 3).map((k) => ({
              "@type": "Thing",
              name: k,
            })),
          }),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["article h1", "article > header p", ".prose h2", ".prose p"],
        },
      }}
    />
  )
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        publisher: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: SITE_NAME,
        },
        inLanguage: "fr-FR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  )
}

export function CityLocalBusinessSchema({
  city,
  description,
  slug,
  geo,
}: {
  city: string
  description: string
  slug: string
  geo: { lat: number; lng: number }
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/${slug}#localbusiness`,
        name: `${SITE_NAME} — ${city}`,
        description,
        url: `${SITE_URL}/${slug}`,
        logo: `${SITE_URL}/images/logo/logo-main.webp`,
        image: `${SITE_URL}/og/default.jpg`,
        email: "contact@globecreateur.fr",
        address: {
          "@type": "PostalAddress",
          addressLocality: city,
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.lat,
          longitude: geo.lng,
        },
        areaServed: {
          "@type": "City",
          name: city,
        },
        priceRange: "€€",
        parentOrganization: {
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

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT } from "@/lib/constants"
import { JsonLd } from "./json-ld"

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo/logo-main.webp`,
        image: `${SITE_URL}/og/default.jpg`,
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
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: CONTACT.email,
          availableLanguage: "French",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [CONTACT.socials.instagram, CONTACT.socials.linkedin],
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: CONTACT.geo.lat,
            longitude: CONTACT.geo.lng,
          },
          geoRadius: "50000",
        },
        priceRange: "€€",
      }}
    />
  )
}

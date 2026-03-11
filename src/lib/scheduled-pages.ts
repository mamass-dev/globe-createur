/**
 * Scheduled publication dates for city pages.
 * Pages return 404 and are excluded from sitemap/navigation until their date.
 */

const scheduledCities: Record<string, string> = {
  // Already live
  "agence-communication-dijon": "2025-01-01",
  "agence-communication-beaune": "2025-01-01",
  "agence-communication-chalon-sur-saone": "2025-01-01",
  "agence-communication-auxerre": "2025-01-01",
  // Scheduled — week of March 18
  "agence-communication-besancon": "2026-03-18",
  "agence-communication-dole": "2026-03-20",
  // Scheduled — week of March 25
  "agence-communication-macon": "2026-03-25",
  "agence-communication-nevers": "2026-03-27",
  // Scheduled — week of April 1
  "agence-communication-lyon": "2026-04-01",
  "agence-communication-clermont-ferrand": "2026-04-03",
}

export function isCityPublished(slug: string): boolean {
  const date = scheduledCities[slug]
  if (!date) return true // unknown slug = always visible
  return new Date(date) <= new Date()
}

export function getPublishedCitySlugs(): string[] {
  return Object.entries(scheduledCities)
    .filter(([, date]) => new Date(date) <= new Date())
    .map(([slug]) => slug)
}

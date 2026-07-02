import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BusinessCardView } from "@/components/carte/business-card"
import { getCard, allCardSlugs } from "@/lib/cards"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allCardSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const card = getCard(slug)
  if (!card) return { title: "Carte introuvable" }

  const title = `${card.fullName} — ${card.org}`
  return {
    title,
    description: card.tagline,
    alternates: { canonical: `/carte/${card.slug}` },
    // Carte de visite personnelle : hors index pour ne pas diluer le SEO du site.
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: card.tagline,
      type: "profile",
      url: `/carte/${card.slug}`,
      locale: "fr_FR",
      images: [{ url: card.photo, width: 400, height: 400, alt: card.fullName }],
    },
  }
}

export default async function CartePage({ params }: Props) {
  const { slug } = await params
  const card = getCard(slug)
  if (!card) notFound()

  return <BusinessCardView card={card} />
}

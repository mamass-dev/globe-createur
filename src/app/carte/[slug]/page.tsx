import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BusinessCardView } from "@/components/carte/business-card"
import { getCard, allCardSlugs } from "@/lib/cards"
import { SITE_URL } from "@/lib/constants"
import QRCode from "qrcode"

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

  // QR code de la carte (dos de la carte) : ivoire sur fond transparent, généré au build
  const qrSvg = await QRCode.toString(`${SITE_URL}/carte/${card.slug}`, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#f5f2ec", light: "#00000000" },
  })

  return <BusinessCardView card={card} qrSvg={qrSvg} />
}

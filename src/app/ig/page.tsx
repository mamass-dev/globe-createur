import type { Metadata } from "next"
import { IgStories } from "@/components/ig/ig-stories"
import { IG_HANDLE, IG_TAGLINE, orderedIgLinks } from "@/lib/data/ig-links"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Globe Créateur — liens",
  description: IG_TAGLINE,
  robots: { index: false, follow: true },
  alternates: { canonical: "/ig" },
  openGraph: { title: "Globe Créateur", description: IG_TAGLINE, url: "/ig", images: [{ url: "/og/default.jpg", width: 1200, height: 630 }] },
}

export default function IgPage() {
  const links = orderedIgLinks(new Date())
  return <IgStories links={links} handle={IG_HANDLE} tagline={IG_TAGLINE} />
}

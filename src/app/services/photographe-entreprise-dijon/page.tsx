import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { getMediaService } from "@/lib/data/media-services"
import { MediaServicePage } from "@/components/sections/media-service-page"

const service = getMediaService("photographe-entreprise-dijon")!

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/photographe-entreprise-dijon",
  keywords: service.keywords,
})

export default function Page() {
  return <MediaServicePage service={service} />
}

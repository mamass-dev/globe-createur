"use client"

import { useState } from "react"
import Image from "next/image"
import { PORTFOLIO_PHOTOS, PORTFOLIO_UNIVERS, type PortfolioPhoto } from "@/lib/data/portfolio-photo"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { track } from "@/lib/analytics"

type FilterId = (typeof PORTFOLIO_UNIVERS)[number]["id"]

function matches(p: PortfolioPhoto, f: FilterId) {
  if (f === "tous") return true
  if (f === "drone") return p.drone
  return p.univers === f
}

/**
 * Galerie photo filtrable par univers (colonnes CSS, pas de lightbox : la photo s'ouvre en grand
 * dans un nouvel onglet). `limit` pour un extrait (home), `initial` pour pré-filtrer (page drone).
 */
export function PortfolioGallery({
  title = "Ce qu'on photographie",
  subtitle = "Une sélection de nos images, sans banque d'images ni mise en scène artificielle : de vrais lieux, de vraies équipes, de vrais événements.",
  badge = "Portfolio",
  initial = "tous",
  limit,
  showFilters = true,
}: {
  title?: string
  subtitle?: string
  badge?: string
  initial?: FilterId
  limit?: number
  showFilters?: boolean
}) {
  const [filter, setFilter] = useState<FilterId>(initial)
  const photos = PORTFOLIO_PHOTOS.filter((p) => matches(p, filter)).slice(0, limit ?? PORTFOLIO_PHOTOS.length)

  return (
    <section className="py-20 lg:py-28 bg-[#0a0a0a]">
      <Container>
        <SectionHeader badge={badge} title={title} subtitle={subtitle} />
        {showFilters && (
          <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filtrer le portfolio">
            {PORTFOLIO_UNIVERS.map((u) => (
              <button
                key={u.id}
                type="button"
                role="tab"
                aria-selected={filter === u.id}
                onClick={() => {
                  setFilter(u.id)
                  track("portfolio_filter", { univers: u.id })
                }}
                className={`h-10 px-4 text-xs font-bold uppercase tracking-widest border transition-colors ${
                  filter === u.id ? "border-signal bg-signal text-white" : "border-[#2a2a2a] text-aluminium hover:border-signal hover:text-signal"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {photos.map((p, i) => (
            <a
              key={p.src}
              href={p.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block break-inside-avoid overflow-hidden border border-[#1c1c1c] bg-[#141414]"
              aria-label={`${p.alt} (ouvrir en grand)`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={i < 6 ? "eager" : "lazy"}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-xs text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {p.alt}
                {p.client && <span className="text-aluminium"> · {p.client}</span>}
                {p.drone && <span className="text-signal font-bold"> · Drone</span>}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

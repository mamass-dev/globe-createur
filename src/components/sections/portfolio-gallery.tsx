"use client"

import { useState } from "react"
import Image from "next/image"
import { PORTFOLIO_PHOTOS, PORTFOLIO_UNIVERS, type PortfolioPhoto } from "@/lib/data/portfolio-photo"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { track } from "@/lib/analytics"

type FilterId = (typeof PORTFOLIO_UNIVERS)[number]["id"]

function roundRobin(list: PortfolioPhoto[], n: number): PortfolioPhoto[] {
  const buckets = new Map<string, PortfolioPhoto[]>()
  for (const p of list) buckets.set(p.univers, [...(buckets.get(p.univers) ?? []), p])
  const out: PortfolioPhoto[] = []
  while (out.length < n && [...buckets.values()].some((b) => b.length)) {
    for (const b of buckets.values()) {
      const next = b.shift()
      if (next && out.length < n) out.push(next)
    }
  }
  return out
}

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
  const filtered = PORTFOLIO_PHOTOS.filter((p) => matches(p, filter))
  // Extrait (home) : on alterne les univers pour montrer la variété, au lieu des N premières du tableau
  const photos = limit && filter === "tous" ? roundRobin(filtered, limit) : filtered.slice(0, limit ?? filtered.length)

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
        {/* Grille régulière : 1 / 2 / 3 colonnes sur une trame de 6, tuiles 4:3. La dernière rangée
            s'étire (colonnes + ratio ajustés) pour ne jamais laisser de case vide. */}
        <div className="grid grid-cols-6 gap-4">
          {photos.map((p, i) => {
            const n = photos.length
            const rem3 = n % 3
            const rem2 = n % 2
            const lg = rem3 === 1 && i === n - 1 ? "lg:col-span-6 lg:aspect-[4/1]" : rem3 === 2 && i >= n - 2 ? "lg:col-span-3 lg:aspect-[2/1]" : "lg:col-span-2 lg:aspect-[4/3]"
            const sm = rem2 === 1 && i === n - 1 ? "sm:col-span-6 sm:aspect-[8/3]" : "sm:col-span-3 sm:aspect-[4/3]"
            const portrait = p.height > p.width
            return (
              <a
                key={p.src}
                href={p.src}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block col-span-6 aspect-[4/3] overflow-hidden border border-[#1c1c1c] bg-[#141414] ${sm} ${lg}`}
                aria-label={`${p.alt} (ouvrir en grand)`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 6 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ objectPosition: portrait ? "center 35%" : "center" }}
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-xs text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.alt}
                  {p.client && <span className="text-aluminium"> · {p.client}</span>}
                  {p.drone && <span className="text-signal font-bold"> · Drone</span>}
                </span>
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

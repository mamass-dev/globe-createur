"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ProjetItem = {
  slug: string
  frontmatter: Record<string, string>
}

const filters = [
  { label: "Tous", value: "tous" },
  { label: "Site vitrine", value: "site" },
  { label: "E-commerce", value: "e-commerce" },
  { label: "Refonte", value: "refonte" },
  { label: "SEO", value: "seo" },
  { label: "Contenu", value: "contenu" },
] as const

function matchesFilter(category: string, filter: string): boolean {
  if (filter === "tous") return true
  const lower = category.toLowerCase()
  const map: Record<string, string[]> = {
    site: ["site", "web app", "vitrine"],
    "e-commerce": ["e-commerce", "ecommerce", "boutique"],
    refonte: ["refonte"],
    seo: ["seo", "référencement"],
    contenu: ["contenu", "photo", "vidéo", "communication", "360"],
  }
  return (map[filter] ?? []).some((keyword) => lower.includes(keyword))
}

export function PortfolioGrid({ projets }: { projets: ProjetItem[] }) {
  const [activeFilter, setActiveFilter] = useState("tous")

  const filtered = projets.filter((p) =>
    matchesFilter((p.frontmatter.category as string) ?? "", activeFilter)
  )

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-16">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer",
              activeFilter === f.value
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-950"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-xl font-bold text-slate-400">
            Aucun projet dans cette cat&eacute;gorie pour le moment.
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((projet) => {
              const fm = projet.frontmatter
              return (
                <motion.div
                  key={projet.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/projets/${projet.slug}`}
                    className="group block space-y-6"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-600 font-black text-4xl uppercase tracking-tighter group-hover:scale-110 transition-transform duration-700">
                        {fm.client || "Project"}
                      </div>
                      <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 shadow-sm">
                        {fm.category || "Digital Strategy"}
                      </div>
                    </div>
                    <div className="px-2 space-y-3">
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center justify-between">
                        {fm.title}
                        <ArrowRight className="h-6 w-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-lg line-clamp-2">
                        {fm.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  )
}

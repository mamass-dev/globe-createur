"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, ExternalLink, Mail, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Freelance, FreelanceCategory } from "@/lib/data/freelances"
import { categoryLabels, getAllCategories, getAllLocations } from "@/lib/data/freelances"

function Initials({ name, className }: { name: string; className?: string }) {
  const parts = name.split(" ")
  const initials = parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : name.slice(0, 2)

  const colors = [
    "bg-indigo-500", "bg-violet-500", "bg-pink-500", "bg-rose-500",
    "bg-amber-500", "bg-emerald-500", "bg-cyan-500", "bg-blue-500",
  ]
  const colorIndex = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length

  return (
    <div className={`${colors[colorIndex]} text-white font-bold rounded-2xl flex items-center justify-center shrink-0 ${className}`}>
      {initials.toUpperCase()}
    </div>
  )
}

function FreelanceCard({ freelance, index }: { freelance: Freelance; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/annuaire-freelances/${freelance.slug}`}>
        <Card hover className="p-6 h-full relative">
          {freelance.featured && (
            <div className="absolute top-4 right-4">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            </div>
          )}
          <div className="flex items-start gap-4 mb-4">
            <Initials name={freelance.name} className="h-14 w-14 text-lg" />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">{freelance.name}</h3>
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{freelance.title}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-400">{freelance.location}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
            {freelance.bio}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {freelance.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-slate-50 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 rounded-lg"
              >
                {skill}
              </span>
            ))}
            {freelance.skills.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium text-slate-400">
                +{freelance.skills.length - 4}
              </span>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export function FreelanceDirectory({ freelances }: { freelances: Freelance[] }) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<FreelanceCategory | null>(null)
  const [activeLocation, setActiveLocation] = useState<string | null>(null)

  const categories = getAllCategories()
  const locations = getAllLocations()

  const filtered = useMemo(() => {
    return freelances.filter((f) => {
      const q = search.toLowerCase()
      const matchSearch = !q || f.name.toLowerCase().includes(q) || f.title.toLowerCase().includes(q) || f.skills.some((s) => s.toLowerCase().includes(q)) || f.bio.toLowerCase().includes(q)
      const matchCategory = !activeCategory || f.category === activeCategory
      const matchLocation = !activeLocation || f.location === activeLocation
      return matchSearch && matchCategory && matchLocation
    })
  }, [freelances, search, activeCategory, activeLocation])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [filtered])

  return (
    <div>
      {/* Search & filters */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, compétence, métier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                !activeCategory
                  ? "bg-violet-600 text-white"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-violet-600 text-white"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {categoryLabels[cat].label}
              </button>
            ))}
          </div>

          {/* Location filter */}
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={activeLocation ?? ""}
              onChange={(e) => setActiveLocation(e.target.value || null)}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
            >
              <option value="">Toutes les villes</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <span className="font-bold text-slate-900 dark:text-white">{sorted.length}</span> freelance{sorted.length > 1 ? "s" : ""} trouvé{sorted.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Search className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-2">
            Aucun freelance trouvé
          </p>
          <p className="text-sm text-slate-400">
            Essayez avec d&apos;autres critères de recherche.
          </p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {sorted.map((f, i) => (
              <FreelanceCard key={f.slug} freelance={f} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

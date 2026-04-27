import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Container } from "@/components/ui/container"
import { cities } from "@/lib/data/cities"
import { isCityPublished } from "@/lib/scheduled-pages"

export function CityCrosslinks({
  currentSlug,
  title = "Autres zones d'intervention",
  subtitle = "Globe Créateur accompagne les PME en Bourgogne-Franche-Comté et au-delà.",
}: {
  currentSlug?: string
  title?: string
  subtitle?: string
}) {
  const others = cities
    .filter((c) => c.slug !== currentSlug)
    .filter((c) => isCityPublished(c.slug))

  if (others.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
      <Container>
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Couverture régionale
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">{title}</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {others.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 transition-all hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {city.label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{city.region}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 shrink-0 ml-2 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase } from "lucide-react"
import { Container } from "@/components/ui/container"
import { getProjetPages } from "@/lib/content"

export function ProjectsCrosslinks({
  currentSlug,
  title = "Autres réalisations",
  subtitle = "Des projets concrets, livrés pour des PME comme la vôtre.",
  limit = 3,
}: {
  currentSlug?: string
  title?: string
  subtitle?: string
  limit?: number
}) {
  const others = getProjetPages()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit)

  if (others.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
              <Briefcase className="h-3.5 w-3.5" />
              Réalisations
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">{title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
          </div>
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors shrink-0"
          >
            Voir tous les projets
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {others.map((projet) => {
            const fm = projet.frontmatter as Record<string, string>
            return (
              <Link key={projet.slug} href={`/projets/${projet.slug}`} className="group">
                {fm.image && (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-white dark:bg-slate-800">
                    <Image
                      src={fm.image}
                      alt={fm.imageAlt || fm.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  {fm.category && (
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                      {fm.category}
                    </p>
                  )}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {fm.title}
                  </h3>
                  {fm.excerpt && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {fm.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

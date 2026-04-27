import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"
import { Container } from "@/components/ui/container"
import { getBlogPosts } from "@/lib/content"

export function RelatedBlogPosts({
  title = "Lecture associée",
  subtitle = "Nos derniers articles pour aller plus loin.",
  limit = 3,
  excludeSlugs = [],
}: {
  title?: string
  subtitle?: string
  limit?: number
  excludeSlugs?: string[]
}) {
  const posts = getBlogPosts()
    .filter((p) => !excludeSlugs.includes(p.slug))
    .slice(0, limit)

  if (posts.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Blog
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">{title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors shrink-0"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={post.frontmatter.image}
                  alt={post.frontmatter.imageAlt || post.frontmatter.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {post.frontmatter.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {post.frontmatter.metaDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

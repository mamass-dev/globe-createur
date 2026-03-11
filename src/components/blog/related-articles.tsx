import Image from "next/image"
import Link from "next/link"
import { getBlogPost } from "@/lib/content"

export function RelatedArticles({ slugs }: { slugs: string[] }) {
  const posts = slugs
    .map((slug) => getBlogPost(slug))
    .filter((p): p is NonNullable<typeof p> => p !== null)

  if (posts.length === 0) return null

  return (
    <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-8">
        Articles similaires
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => {
          const fm = post.frontmatter
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              {fm.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={fm.image}
                    alt={fm.imageAlt || fm.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5 space-y-3">
                <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {fm.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {fm.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {fm.metaDescription}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

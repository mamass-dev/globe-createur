import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getBlogPosts } from "@/lib/content"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { formatDate } from "@/lib/utils"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

// Re-generate every hour to publish scheduled articles
export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: "Blog & Insights - Globe Créateur",
  description: "Conseils, stratégies et actualités sur le digital, le SEO et le design pour booster votre présence en ligne.",
  path: "/blog",
})

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <section className="bg-slate-50 dark:bg-slate-900 pt-32 pb-24 lg:pt-48 lg:pb-32">
      <Container>
        <div className="max-w-3xl mb-20 space-y-4">
           <h1 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Blog & Insights</h1>
           <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Explorer le futur <br /> <span className="text-gradient">du digital.</span>
           </h2>
           <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Découvrez nos articles, guides et réflexions pour vous aider à naviguer dans l&apos;écosystème digital en constante évolution.
           </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 text-center bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
             <p className="text-xl font-bold text-slate-400">De nouveaux articles sont en cours de rédaction.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimateOnScroll key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white dark:bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col"
                >
                  <div className="p-8 flex-1 flex flex-col space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {post.frontmatter.category}
                       </span>
                       <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                          <Clock className="h-3.5 w-3.5" />
                          {post.frontmatter.readingTime} min
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                       {post.frontmatter.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-base line-clamp-3 leading-relaxed">
                       {post.frontmatter.metaDescription}
                    </p>
                  </div>

                  <div className="px-8 py-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                     <span>{formatDate(post.frontmatter.publishedAt)}</span>
                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        )}

        <div className="mt-40 text-center space-y-12">
           <AnimateOnScroll>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">Prêt à passer au niveau supérieur ?</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                 Discutons de votre projet et mettons en place une stratégie digitale sur-mesure.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                 <Button href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 h-16 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 dark:shadow-indigo-950">
                    Discuter de mon projet
                 </Button>
                 <Button href="/audit-digital" variant="outline" className="px-10 h-16 rounded-2xl font-bold">
                    Faire mon audit gratuit
                 </Button>
              </div>
           </AnimateOnScroll>
        </div>
      </Container>
    </section>
  )
}

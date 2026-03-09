import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getBlogPosts, getBlogPost } from "@/lib/content"
import { MdxContent } from "@/components/mdx/mdx-content"
import { ReadingProgress } from "@/components/sections/reading-progress"
import { ArticleSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { formatDate } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"
import { Clock, Calendar, User } from "lucide-react"

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return buildMetadata({
    title: post.frontmatter.metaTitle,
    description: post.frontmatter.metaDescription,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.frontmatter.publishedAt,
    modifiedTime: post.frontmatter.updatedAt,
    image: post.frontmatter.image ? `${SITE_URL}${post.frontmatter.image}` : undefined,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { frontmatter: fm, content } = post

  return (
    <article className="bg-white pt-32 lg:pt-48 pb-32">
      <ReadingProgress />
      <ArticleSchema
        title={fm.metaTitle}
        description={fm.metaDescription}
        url={`/blog/${slug}`}
        image={fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/og/default.jpg`}
        publishedAt={fm.publishedAt}
        updatedAt={fm.updatedAt}
        author={fm.author}
      />

      <Container className="max-w-4xl">
        <header className="mb-16 space-y-8 text-center lg:text-left">
           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-full">
                 {fm.category}
              </span>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                 <Clock className="h-4 w-4" />
                 {fm.readingTime} min read
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                 <Calendar className="h-4 w-4" />
                 {formatDate(fm.publishedAt)}
              </div>
           </div>

           <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {fm.title}
           </h1>

           <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              {fm.metaDescription}
           </p>

           <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                 <User className="h-6 w-6" />
              </div>
              <div className="text-left">
                 <p className="text-sm font-bold text-slate-900">{fm.author}</p>
                 <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Auteur</p>
              </div>
           </div>
        </header>

        <div className="prose prose-indigo prose-xl max-w-none prose-h2:text-3xl prose-h2:font-black prose-h2:text-slate-900 prose-p:text-slate-600 prose-blockquote:border-indigo-600 prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-3xl prose-img:rounded-3xl prose-img:shadow-2xl">
           <MdxContent source={content} />
        </div>

        <div className="mt-24 p-10 lg:p-16 bg-slate-50 rounded-[3rem] border border-slate-100 text-center space-y-10">
           <h2 className="text-3xl lg:text-5xl font-black text-slate-900">Vous souhaitez aller plus loin ?</h2>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Nous aidons les PME &agrave; impl&eacute;menter ces strat&eacute;gies pour g&eacute;n&eacute;rer une croissance durable.
           </p>
           <div className="flex justify-center pt-4">
              <Button href="/contact" className="bg-indigo-600 text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-xl shadow-indigo-100">
                 Discuter de mon projet
              </Button>
           </div>
        </div>
      </Container>
    </article>
  )
}

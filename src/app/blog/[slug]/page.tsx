import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getBlogPosts, getBlogPost } from "@/lib/content"
import { MdxContent } from "@/components/mdx/mdx-content"
import { ReadingProgress } from "@/components/sections/reading-progress"
import { ArticleSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"
import { getAuthor } from "@/lib/data/authors"
import { AuthorCard } from "@/components/blog/author-card"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { extractHeadings } from "@/lib/toc"
import { RelatedArticles } from "@/components/blog/related-articles"
import { Clock, Calendar } from "lucide-react"

export const revalidate = 3600

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
  const author = getAuthor(fm.author)
  const headings = extractHeadings(content)

  return (
    <article className="bg-white dark:bg-slate-950 pt-32 lg:pt-44 pb-32">
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

      <Container>
        {/* HEADER */}
        <header className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest rounded-full">
              {fm.category}
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Clock className="h-3.5 w-3.5" />
              {fm.readingTime} min
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(fm.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {fm.title}
          </h1>

          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
            {fm.metaDescription}
          </p>

          {/* Author mini */}
          <div className="flex items-center gap-3 pt-2">
            <Image
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{author.name}</p>
              <p className="text-xs text-slate-400">{author.role}</p>
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        {fm.image && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
              <Image
                src={fm.image}
                alt={fm.imageAlt || fm.title}
                width={1200}
                height={630}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* BODY: TOC sidebar + content */}
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sidebar TOC - sticky */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={headings} />
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-3xl">
            <div className="prose prose-indigo prose-lg dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-slate-900 dark:prose-h2:text-white prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:text-slate-800 dark:prose-h3:text-slate-200 prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-blockquote:border-indigo-600 dark:prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-950/50 prose-blockquote:rounded-2xl prose-img:rounded-2xl prose-img:shadow-lg prose-table:text-sm prose-th:bg-slate-50 dark:prose-th:bg-slate-900">
              <MdxContent source={content} />
            </div>

            {/* Author block */}
            <div className="mt-16 pt-12 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                &Eacute;crit par
              </p>
              <AuthorCard author={author} />
            </div>

            {/* Related Articles */}
            {fm.relatedArticles && fm.relatedArticles.length > 0 && (
              <RelatedArticles slugs={fm.relatedArticles} />
            )}

            {/* CTA */}
            <div className="mt-16 p-8 lg:p-12 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-6">
              <h2 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white">Vous souhaitez aller plus loin ?</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Nous aidons les PME &agrave; impl&eacute;menter ces strat&eacute;gies pour g&eacute;n&eacute;rer une croissance durable.
              </p>
              <Button href="/contact" className="bg-indigo-600 text-white px-10 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-indigo-100 dark:shadow-indigo-950">
                Discuter de mon projet
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

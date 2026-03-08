import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/metadata"
import { getBlogPosts, getBlogPost } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { MdxContent } from "@/components/mdx/mdx-content"
import { ReadingProgress } from "@/components/sections/reading-progress"
import { RelatedArticles } from "@/components/sections/related-articles"
import { CtaSection } from "@/components/sections/cta-section"
import { ArticleSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { formatDate } from "@/lib/utils"
import { SITE_URL } from "@/lib/constants"

/* ═══════════════════════════════════════════════════
   TEMPLATE 4 — ARTICLE SEO / BLOG
   ═══════════════════════════════════════════════════

   Structure :
   ┌─────────────────────────────────────────────────┐
   │ 0. Reading progress        Barre 2px fixe top   │
   │ 1. Breadcrumb              Navigation blog       │
   │ 2. Header article          Badge + H1 + meta     │
   │ 3. Contenu MDX             Corps éditorial       │
   │ 4. Box auteur              E-E-A-T signal        │
   │ 5. CTA inline              Conversion mid-funnel │
   │ 6. Articles liés           Rétention + maillage  │
   │ 7. CTA final               Conversion bottom     │
   └─────────────────────────────────────────────────┘

   Objectifs :
   - Capturer du trafic informationnel longue traîne
   - Démontrer l'expertise (E-E-A-T)
   - Mailler vers les pages commerciales
   - Convertir le lecteur en lead via CTA contextuels
   ═══════════════════════════════════════════════════ */

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

  // Articles liés
  const allPosts = getBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  return (
    <>
      {/* 0. PROGRESSION — Barre de lecture */}
      <ReadingProgress />

      {/* Schema.org */}
      <ArticleSchema
        title={fm.metaTitle}
        description={fm.metaDescription}
        url={`/blog/${slug}`}
        image={fm.image ? `${SITE_URL}${fm.image}` : `${SITE_URL}/og/default.jpg`}
        publishedAt={fm.publishedAt}
        updatedAt={fm.updatedAt}
        author={fm.author}
      />

      {/* 1. NAVIGATION */}
      <Breadcrumb
        items={[
          { name: "Blog", href: "/blog" },
          { name: fm.title, href: `/blog/${slug}` },
        ]}
      />

      {/* 2. HEADER — Accroche éditoriale */}
      <Container as="article" className="pt-8 lg:pt-12 max-w-3xl">
        <AnimateOnScroll>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <Badge variant="primary">{fm.category}</Badge>
              <span className="text-xs text-gray-300 font-mono-accent">
                {fm.readingTime} min de lecture
              </span>
            </div>
            <h1 className="text-[2rem] sm:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-foreground leading-[1.15]">
              {fm.title}
            </h1>
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {fm.metaDescription}
            </p>
            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-100">
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-sm font-semibold text-foreground">
                {fm.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{fm.author}</p>
                <time dateTime={fm.publishedAt} className="text-xs text-gray-400">
                  {formatDate(fm.publishedAt)}
                  {fm.updatedAt !== fm.publishedAt && (
                    <> · Mis à jour le {formatDate(fm.updatedAt)}</>
                  )}
                </time>
              </div>
            </div>
          </header>
        </AnimateOnScroll>

        {/* 3. CONTENU — Corps éditorial MDX */}
        <AnimateOnScroll>
          <MdxContent source={content} />
        </AnimateOnScroll>

        {/* 4. BOX AUTEUR — Signal E-E-A-T */}
        <AnimateOnScroll>
          <div className="mt-16 rounded-2xl border border-gray-100 bg-white p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center text-base font-semibold text-foreground shrink-0">
              {fm.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">
                À propos de {fm.author}
              </p>
              <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                Fondateur de Globe Créateur, studio de communication 360° à Dijon.
                Spécialiste en création web, SEO local et stratégie digitale pour PME.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* 5. CTA INLINE — Conversion mid-funnel */}
        <AnimateOnScroll>
          <div className="mt-12 mb-8 rounded-2xl bg-gray-50 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              Besoin d&apos;aide sur ce sujet ?
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Nous accompagnons les PME de Dijon et de Bourgogne dans leur communication digitale.
            </p>
            <div className="mt-5">
              <Button href="/devis">Demander un devis gratuit</Button>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>

      {/* 6. RÉTENTION — Articles liés */}
      <RelatedArticles posts={relatedPosts} />

      {/* 7. ACTION — CTA final */}
      <CtaSection
        title="Envie de passer à l'action ?"
        subtitle="Discutons de votre projet. Premier échange gratuit et sans engagement."
        variant="primary"
      />
    </>
  )
}

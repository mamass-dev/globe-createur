import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getBlogPosts } from "@/lib/content"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = buildMetadata({
  title: "Blog — Conseils web, SEO et communication pour PME",
  description: "Articles et guides pratiques sur la création de site, le SEO local, la communication digitale et les outils no-code pour PME.",
  path: "/blog",
})

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <Breadcrumb items={[{ name: "Blog", href: "/blog" }]} />

      <Container className="py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Blog</h1>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Conseils, guides et retours d&apos;expérience pour développer votre présence en ligne.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">Aucun article pour le moment. Revenez bientôt !</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary">{post.frontmatter.category}</Badge>
                    <span className="text-xs text-gray-400">{post.frontmatter.readingTime} min</span>
                  </div>
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {post.frontmatter.metaDescription}
                  </p>
                  <p className="mt-4 text-xs text-gray-400">
                    {formatDate(post.frontmatter.publishedAt)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

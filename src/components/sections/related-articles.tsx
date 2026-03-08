"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"
import { formatDate } from "@/lib/utils"
import type { BlogFrontmatter } from "@/lib/types"

type RelatedPost = {
  slug: string
  frontmatter: BlogFrontmatter
}

export function RelatedArticles({
  posts,
  title = "Articles similaires",
}: {
  posts: RelatedPost[]
  title?: string
}) {
  if (posts.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <SectionHeader title={title} badge="Blog" />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary">{post.frontmatter.category}</Badge>
                    <span className="text-xs text-gray-300 font-mono-accent">
                      {post.frontmatter.readingTime} min
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 flex-1">
                    {post.frontmatter.title}
                  </h3>
                  <p className="mt-3 text-xs text-gray-300">
                    {formatDate(post.frontmatter.publishedAt)}
                  </p>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

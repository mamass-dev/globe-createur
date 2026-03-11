import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content")

type ContentItem<T> = {
  slug: string
  frontmatter: T
  content: string
}

/**
 * Check if a content item is published.
 * - If `draft: true` → hidden
 * - If `scheduledAt` is set and in the future → hidden
 * - Otherwise → published
 */
function isPublished(frontmatter: Record<string, unknown>): boolean {
  if (frontmatter.draft === true) return false
  const scheduled = frontmatter.scheduledAt as string | undefined
  if (scheduled) {
    return new Date(scheduled) <= new Date()
  }
  return true
}

function readMdxDir<T>(subdir: string, { includeScheduled = false } = {}): ContentItem<T>[] {
  const dir = path.join(CONTENT_DIR, subdir)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8")
      const { data, content } = matter(raw)
      return {
        slug: file.replace(".mdx", ""),
        frontmatter: data as T,
        content,
      }
    })
    .filter((item) => includeScheduled || isPublished(item.frontmatter as Record<string, unknown>))
}

function readMdxFile<T>(subdir: string, slug: string): ContentItem<T> | null {
  const filePath = path.join(CONTENT_DIR, subdir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  return { slug, frontmatter: data as T, content }
}

// Blog
export function getBlogPosts() {
  return readMdxDir<import("./types").BlogFrontmatter>("blog").sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  )
}

export function getBlogPost(slug: string) {
  return readMdxFile<import("./types").BlogFrontmatter>("blog", slug)
}

// Services (MDX)
export function getServicePages() {
  return readMdxDir<Record<string, string>>("services")
}

export function getServicePage(slug: string) {
  return readMdxFile<Record<string, string>>("services", slug)
}

// Secteurs (MDX)
export function getSecteurPages() {
  return readMdxDir<Record<string, string>>("secteurs")
}

export function getSecteurPage(slug: string) {
  return readMdxFile<Record<string, string>>("secteurs", slug)
}

// Projets (MDX)
export function getProjetPages() {
  return readMdxDir<Record<string, string>>("projets")
}

export function getProjetPage(slug: string) {
  return readMdxFile<Record<string, string>>("projets", slug)
}

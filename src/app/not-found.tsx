import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getBlogPosts } from "@/lib/content"

const popularPages = [
  { label: "Création de site internet", href: "/services/creation-site-internet-dijon" },
  { label: "SEO local à Dijon", href: "/services/seo-local-dijon" },
  { label: "Nos tarifs", href: "/tarifs" },
  { label: "Demander un devis", href: "/devis" },
  { label: "Blog", href: "/blog" },
]

export default function NotFound() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <Container className="py-20 lg:py-32">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-lg text-gray-500">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8">
          <Button href="/">Retour à l&apos;accueil</Button>
        </div>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Pages populaires</h2>
          <ul className="space-y-3">
            {popularPages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Articles récents</h2>
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    {post.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  )
}

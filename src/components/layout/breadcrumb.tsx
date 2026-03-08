import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { BreadcrumbSchema } from "@/components/seo/schemas"

type BreadcrumbItem = {
  name: string
  href: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Accueil", href: "/" }, ...items]

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <Container className="py-3">
        <nav aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-1 text-sm text-gray-500">
            {allItems.map((item, i) => (
              <li key={item.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-gray-400" />}
                {i === allItems.length - 1 ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </>
  )
}

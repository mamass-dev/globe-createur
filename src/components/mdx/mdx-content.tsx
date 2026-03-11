import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MdxFaqAccordion } from "./mdx-faq"

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function Heading({ level, children, ...props }: { level: 2 | 3; children?: React.ReactNode } & React.HTMLAttributes<HTMLHeadingElement>) {
  const text = typeof children === "string" ? children : String(children ?? "")
  const id = slugify(text)
  const Tag = `h${level}` as const
  return <Tag id={id} {...props}>{children}</Tag>
}

const components = {
  FaqAccordion: MdxFaqAccordion,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={2} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading level={3} {...props} />,
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
  Button,
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  )
}

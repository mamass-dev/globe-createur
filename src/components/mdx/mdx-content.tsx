import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MdxFaqAccordion } from "./mdx-faq"

const components = {
  FaqAccordion: MdxFaqAccordion,
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

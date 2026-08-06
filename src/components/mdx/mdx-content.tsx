import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CtaIa } from "@/components/sections/cta-ia"
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
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-sm text-left" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-slate-100 dark:divide-slate-700" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-slate-600 dark:text-slate-400" {...props} />
  ),
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
  CtaIa,
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  )
}

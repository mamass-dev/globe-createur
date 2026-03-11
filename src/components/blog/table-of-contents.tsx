"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { TocItem } from "@/lib/toc"

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="space-y-1">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
        Sommaire
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
          }}
          className={cn(
            "block text-[13px] leading-snug py-1.5 border-l-2 transition-colors duration-200",
            item.level === 3 ? "pl-6" : "pl-4",
            activeId === item.id
              ? "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}

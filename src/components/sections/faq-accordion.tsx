"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import type { FaqItem } from "@/lib/types"

function FaqItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={cn(
      "rounded-3xl border border-slate-100 transition-all duration-500 bg-white mb-4",
      isOpen ? "shadow-xl shadow-indigo-500/5 border-indigo-100" : "hover:border-slate-200"
    )}>
      <button
        className="w-full flex items-center justify-between p-6 lg:p-8 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-lg lg:text-xl font-bold transition-colors duration-300",
          isOpen ? "text-indigo-600" : "text-slate-900 group-hover:text-indigo-600"
        )}>
          {item.question}
        </span>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ml-4",
          isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
        )}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-8 px-6 lg:px-8" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl border-t border-slate-50 pt-6">
             {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FaqAccordion({
  items,
  title,
  subtitle,
  badge,
}: {
  items: FaqItem[]
  title?: string
  subtitle?: string
  badge?: string
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-4xl">
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <AnimateOnScroll>
          <div className="pt-8">
            {items.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

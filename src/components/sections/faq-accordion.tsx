"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import type { FaqItem } from "@/lib/types"

function FaqItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={cn(
      "rounded-sm border border-[#1c1c1c] transition-colors duration-300 bg-[#141414] mb-4",
      isOpen ? "border-signal" : "hover:border-[#2a2a2a]"
    )}>
      <button
        className="w-full flex items-center justify-between p-6 lg:p-8 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-lg lg:text-xl font-bold transition-colors duration-300",
          isOpen ? "text-signal" : "text-ivory group-hover:text-signal"
        )}>
          {item.question}
        </span>
        <div className={cn(
          "h-8 w-8 rounded-none flex items-center justify-center transition-all duration-500 shrink-0 ml-4",
          isOpen ? "bg-signal text-white rotate-180" : "bg-[#1c1c1c] text-aluminium group-hover:bg-signal/15 group-hover:text-signal"
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
          <p className="text-lg text-aluminium leading-relaxed max-w-3xl border-t border-[#1c1c1c] pt-6">
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

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
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-foreground pr-6 group-hover:text-primary transition-colors duration-200">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-300 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-12 text-gray-400 leading-relaxed">{item.answer}</p>
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
    <section className="py-20 lg:py-28">
      <Container className="max-w-3xl">
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <AnimateOnScroll>
          <div>
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

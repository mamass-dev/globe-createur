"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

type FaqItemData = {
  question: string
  answer: string
}

function FaqItem({ item, isOpen, onToggle }: { item: FaqItemData; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-foreground pr-4">{item.question}</span>
        <ChevronDown
          className={cn("h-5 w-5 text-gray-400 shrink-0 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {isOpen && (
        <div className="pb-5 pr-12">
          <p className="text-gray-500 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export function MdxFaqAccordion({ items }: { items?: FaqItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!items || !Array.isArray(items) || items.length === 0) return null

  return (
    <div className="my-8 not-prose">
      {items.map((item, i) => (
        <FaqItem
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}

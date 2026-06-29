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
    <div className={cn(
      "rounded-sm border border-[#1c1c1c] transition-colors duration-300 bg-[#141414] mb-3",
      isOpen ? "border-signal" : "hover:border-[#2a2a2a]"
    )}>
      <button
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-base font-bold transition-colors duration-300",
          isOpen ? "text-signal" : "text-ivory group-hover:text-signal"
        )}>
          {item.question}
        </span>
        <div className={cn(
          "h-7 w-7 rounded-none flex items-center justify-center transition-all duration-500 shrink-0 ml-4",
          isOpen ? "bg-signal text-white rotate-180" : "bg-[#1c1c1c] text-aluminium group-hover:bg-signal/15 group-hover:text-signal"
        )}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      <div
        className={cn(
          "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5 px-5" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-base text-aluminium leading-relaxed border-t border-[#1c1c1c] pt-4">
             {item.answer}
          </p>
        </div>
      </div>
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

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
      "rounded-2xl border border-slate-100 transition-all duration-500 bg-white mb-3",
      isOpen ? "shadow-lg shadow-indigo-500/5 border-indigo-100" : "hover:border-slate-200"
    )}>
      <button
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-base font-bold transition-colors duration-300",
          isOpen ? "text-indigo-600" : "text-slate-900 group-hover:text-indigo-600"
        )}>
          {item.question}
        </span>
        <div className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ml-4",
          isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600"
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
          <p className="text-base text-slate-500 leading-relaxed border-t border-slate-50 pt-4">
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

"use client"

import { Star, Quote } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import type { Temoignage } from "@/lib/data/temoignages"
import Image from "next/image"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  )
}

export function Testimonials({
  items,
  title,
  subtitle,
  badge,
}: {
  items: Temoignage[]
  title?: string
  subtitle?: string
  badge?: string
}) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <Container>
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <AnimateOnScroll key={t.name} delay={i * 0.1}>
              <Card className="flex flex-col h-full relative group">
                <Quote className="absolute top-8 right-8 h-12 w-12 text-indigo-50 opacity-50 group-hover:text-indigo-100 transition-colors" />
                
                <div className="relative z-10 flex flex-col h-full space-y-8">
                   <StarRating rating={t.rating} />
                   
                   <blockquote className="text-lg text-slate-600 leading-relaxed flex-1 italic">
                     &ldquo;{t.content}&rdquo;
                   </blockquote>
                   
                   <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                     <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold overflow-hidden">
                        {/* If we have images for all users we'd use them, otherwise first letter */}
                        {t.name.charAt(0)}
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
                       <p className="text-sm text-slate-400 font-medium">{t.role}, {t.company}</p>
                     </div>
                   </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}

"use client"

import { Star } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"
import type { Temoignage } from "@/lib/data/temoignages"

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-gray-200"}`}
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
    <section className="py-20 lg:py-28">
      <Container>
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((t) => (
            <StaggerItem key={t.name}>
              <Card className="flex flex-col h-full">
                <StarRating rating={t.rating} />
                <blockquote className="mt-5 text-gray-500 leading-relaxed flex-1">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <div className="mt-5 pt-5 border-t border-gray-50 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-sm font-semibold text-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

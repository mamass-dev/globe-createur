"use client"

import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"

type Benefit = {
  title: string
  description: string
}

export function BenefitsGrid({
  title,
  subtitle,
  badge,
  benefits,
  columns = 3,
}: {
  title?: string
  subtitle?: string
  badge?: string
  benefits: Benefit[]
  columns?: 2 | 3
}) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <StaggerContainer
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            columns === 3 ? "lg:grid-cols-3" : ""
          } gap-8`}
        >
          {benefits.map((b) => (
            <StaggerItem key={b.title} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground tracking-tight">{b.title}</h3>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">{b.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

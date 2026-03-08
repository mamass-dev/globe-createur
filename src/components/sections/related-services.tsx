"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"
import type { Service } from "@/lib/types"

export function RelatedServices({
  services,
  title = "Services complémentaires",
  badge = "À découvrir",
}: {
  services: Service[]
  title?: string
  badge?: string
}) {
  if (services.length === 0) return null

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <SectionHeader title={title} badge={badge} />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-0.5"
              >
                <div>
                  <h3 className="font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-400 line-clamp-1">{s.excerpt}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 shrink-0 ml-4 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"
import type { Service } from "@/lib/types"

function getIcon(name: string) {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
  const Icon = icons[name]
  return Icon ? <Icon className="h-7 w-7 text-foreground transition-colors duration-200 group-hover:text-primary" /> : null
}

export function ServiceGrid({
  services,
  title,
  subtitle,
  badge,
}: {
  services: Service[]
  title?: string
  subtitle?: string
  badge?: string
}) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        {title && <SectionHeader title={title} subtitle={subtitle} badge={badge} />}

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block h-full">
                <Card hover className="h-full flex flex-col">
                  <div className="mb-5">{getIcon(service.icon)}</div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed flex-1">
                    {service.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    En savoir plus
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

"use client"

import Link from "next/link"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { Container } from "@/components/ui/container"
import { Card } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"
import type { Service } from "@/lib/types"

function getIcon(name: string) {
  return (
    <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm">
      <LucideIcon name={name} className="h-8 w-8" />
    </div>
  )
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
    <section className="py-32 lg:py-48 bg-gray-50">
      <Container>
        {title && (
          <div className="mb-24 lg:mb-32">
             <SectionHeader title={title} subtitle={subtitle} badge={badge} align="left" className="mb-0" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 lg:gap-y-24 gap-x-12">
          {services.map((service, index) => (
            <StaggerItem key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block relative">
                {/* Background Number */}
                <div className="absolute -top-12 -left-6 text-9xl font-black text-stroke opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative pt-8 border-t border-black/10 group-hover:border-accent transition-colors duration-500">
                  <div className="mb-10 group-hover:translate-x-4 transition-transform duration-700">{getIcon(service.icon)}</div>
                  <h3 className="text-3xl font-black tracking-tight text-black group-hover:text-accent transition-colors duration-500 uppercase">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-lg text-gray-500 leading-tight max-w-sm group-hover:text-black transition-colors duration-500">
                    {service.excerpt}
                  </p>
                  <div className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white border border-black/5 text-black group-hover:bg-accent group-hover:text-white transition-all duration-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                    <LucideIcon name="ArrowRight" className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </Container>
    </section>
  )
}

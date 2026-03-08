"use client"

import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { StaggerContainer, StaggerItem } from "@/components/ui/animate"

type Step = {
  number: string
  title: string
  description: string
}

export function ProcessSteps({
  title,
  subtitle,
  badge,
  steps,
}: {
  title: string
  subtitle?: string
  badge?: string
  steps: Step[]
}) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} badge={badge} />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => (
            <StaggerItem key={step.number} className="relative">
              {/* Connecting line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-gray-200" aria-hidden="true" />
              )}

              <div className="text-center relative">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full border-2 border-foreground text-foreground font-mono-accent text-sm font-bold mb-5">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold tracking-tight text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

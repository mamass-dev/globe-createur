"use client"

import { Shield, Clock, Star, Headphones } from "lucide-react"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"

const signals = [
  { icon: Clock, label: "Réponse sous 48h" },
  { icon: Shield, label: "Devis gratuit, sans engagement" },
  { icon: Star, label: "98% de clients satisfaits" },
  { icon: Headphones, label: "Interlocuteur unique" },
]

export function TrustSignals() {
  return (
    <section className="py-8 border-b border-gray-100 dark:border-slate-800">
      <Container>
        <AnimateOnScroll>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {signals.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500">
                <s.icon className="h-4 w-4 text-gray-300 dark:text-slate-600" />
                {s.label}
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

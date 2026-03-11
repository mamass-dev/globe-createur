import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { EstimateurForm } from "@/components/sections/estimateur-form"

export const metadata: Metadata = buildMetadata({
  title: "Estimateur de projet - Combien coûte votre projet digital ?",
  description:
    "Estimez le coût de votre projet web en 2 minutes. Site vitrine, e-commerce, SEO, création de contenu. Devis gratuit et personnalisé.",
  path: "/estimateur",
})

export default function EstimateurPage() {
  return (
    <>
      <Breadcrumb
        items={[{ name: "Estimateur de projet", href: "/estimateur" }]}
      />

      <section className="relative py-16 lg:py-24">
        <div
          className="dot-grid absolute inset-0 pointer-events-none"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
              Estimateur gratuit
            </p>
            <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Combien coûte votre{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                projet digital
              </span>{" "}
              ?
            </h1>
            <p className="mt-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Répondez à quelques questions et obtenez une estimation
              personnalisée en moins de 2 minutes. Sans engagement.
            </p>
          </div>

          <EstimateurForm />
        </Container>
      </section>
    </>
  )
}

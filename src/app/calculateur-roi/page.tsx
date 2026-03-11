import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { RoiCalculator } from "@/components/tools/roi-calculator"
import { TrendingUp, Calculator, Zap, Eye } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Calculateur ROI site internet - Combien vous coûte votre invisibilité | Globe Créateur",
  description:
    "Estimez gratuitement le chiffre d'affaires que vous perdez chaque mois sans site internet optimisé. Calculateur ROI gratuit pour PME à Dijon et en Bourgogne.",
  path: "/calculateur-roi",
})

const faqItems = [
  {
    question: "Comment les recherches mensuelles sont-elles estimées ?",
    answer:
      "Les volumes de recherche sont basés sur des moyennes observées dans chaque secteur d'activité en zone urbaine française. Ce sont des estimations indicatives qui donnent un ordre de grandeur réaliste du potentiel de votre marché local.",
  },
  {
    question: "Le calcul est-il fiable ?",
    answer:
      "Le calculateur donne un ordre de grandeur réaliste basé sur des données moyennes par secteur. Les résultats réels dépendent de facteurs spécifiques : concurrence locale, qualité du site, intensité de l'effort SEO. Pour une projection précise, un audit personnalisé est recommandé.",
  },
  {
    question: "Que signifie le taux de conversion ?",
    answer:
      "Le taux de conversion représente le pourcentage de personnes qui effectuent une recherche Google et finissent par devenir clients d'une entreprise visible en ligne. Ce taux varie selon le secteur (un artisan avec un bon site convertit ~4 % des recherches locales en devis).",
  },
  {
    question: "Comment un site internet peut-il générer ces résultats ?",
    answer:
      "Un site optimisé SEO vous rend visible sur Google quand vos clients potentiels cherchent votre activité. Combiné à une fiche Google Business optimisée, du contenu régulier et des avis clients, il devient votre meilleur commercial 24h/24.",
  },
  {
    question: "Quel investissement pour obtenir ces résultats ?",
    answer:
      "Un site professionnel avec SEO local démarre à partir de 1 500 € HT en one-shot, ou est inclus dans nos forfaits communication à partir de 890 €/mois. Le retour sur investissement est généralement visible dès les 3 premiers mois.",
  },
]

const stats = [
  { icon: Eye, value: "72%", desc: "des consommateurs cherchent en ligne avant d'acheter local" },
  { icon: Calculator, value: "x3", desc: "plus de contacts avec un site optimisé SEO" },
  { icon: Zap, value: "3 mois", desc: "pour voir les premiers résultats concrets" },
]

export default function CalculateurRoiPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Calculateur ROI", href: "/calculateur-roi" }]}
      />

      {/* Custom Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-red-400/10 dark:bg-red-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-400/10 dark:bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-800 text-red-500 dark:text-red-400 text-sm font-semibold mb-6">
            <TrendingUp className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Combien vous coûte votre{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">invisibilité</span> ?
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Estimez le chiffre d&apos;affaires que vous perdez chaque mois en n&apos;étant pas visible sur Google. Résultats instantanés.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {stats.map((s) => (
              <div
                key={s.value}
                className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <s.icon className="h-5 w-5 text-red-400" />
                <div className="text-left">
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{s.value}</p>
                  <p className="text-[11px] text-slate-400 max-w-[160px]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Calculator */}
      <Container className="py-12 lg:py-20">
        <RoiCalculator />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Prêt à capter ces clients ?"
        subtitle="Discutons de votre projet. Audit gratuit et proposition personnalisée sous 48h."
        ctaLabel="Demander un devis gratuit"
        variant="primary"
      />
    </>
  )
}

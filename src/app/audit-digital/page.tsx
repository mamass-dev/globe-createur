import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AuditQuiz } from "@/components/tools/audit-quiz"
import { Target, Clock, BarChart3, Sparkles } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Audit digital gratuit pour PME - Testez votre présence en ligne | Globe Créateur",
  description:
    "Évaluez gratuitement votre maturité digitale en 2 minutes. Score sur 100, analyse par catégorie et recommandations personnalisées pour votre PME.",
  path: "/audit-digital",
})

const faqItems = [
  {
    question: "L'audit digital est-il vraiment gratuit ?",
    answer:
      "Oui, 100 % gratuit et sans engagement. Vous obtenez votre score et vos recommandations instantanément, sans même avoir à laisser votre email.",
  },
  {
    question: "Comment le score est-il calculé ?",
    answer:
      "Le score est basé sur 9 critères couvrant les 6 piliers d'une présence digitale efficace : site internet, SEO, réseaux sociaux, contenu visuel, Google Business et automatisation. Chaque réponse est pondérée selon son impact réel sur votre visibilité et votre acquisition de clients.",
  },
  {
    question: "Que faire si mon score est faible ?",
    answer:
      "Un score faible est une opportunité, pas une condamnation. Les recommandations personnalisées vous indiquent précisément par où commencer. La plupart des PME que nous accompagnons démarrent avec un score entre 20 et 40 et progressent rapidement avec les bonnes actions.",
  },
  {
    question: "Les résultats sont-ils fiables ?",
    answer:
      "L'audit donne une vue d'ensemble réaliste de votre maturité digitale. Pour une analyse technique approfondie (vitesse du site, positions SEO exactes, audit de contenu), un audit personnalisé par notre équipe est recommandé.",
  },
  {
    question: "Combien de temps prend l'audit ?",
    answer:
      "2 minutes. 9 questions à choix multiples, résultats instantanés. Pas de formulaire interminable, pas d'attente.",
  },
]

const features = [
  { icon: Clock, label: "2 minutes", desc: "Rapide et sans friction" },
  { icon: BarChart3, label: "Score /100", desc: "Analyse par catégorie" },
  { icon: Sparkles, label: "Recommandations", desc: "Plan d'action personnalisé" },
]

export default function AuditDigitalPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Audit digital gratuit", href: "/audit-digital" }]}
      />

      {/* Custom Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <Target className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-3xl mx-auto">
            Quel est votre{" "}
            <span className="text-gradient">score digital</span> ?
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            9 questions, 2 minutes, un diagnostic complet de votre présence en ligne.
            Découvrez vos forces, faiblesses et les actions prioritaires.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-indigo-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{f.label}</p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quiz */}
      <Container className="py-12 lg:py-20">
        <AuditQuiz />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Envie d'aller plus loin ?"
        subtitle="Nos experts analysent votre situation en détail et vous proposent un plan d'action concret."
        ctaLabel="Demander un audit personnalisé"
        variant="primary"
      />
    </>
  )
}

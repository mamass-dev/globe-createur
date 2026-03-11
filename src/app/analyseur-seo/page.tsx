import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { SeoAnalyzer } from "@/components/tools/seo-analyzer"
import { Search, Shield, Zap, BarChart3 } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Analyseur SEO gratuit - Audit SEO en ligne instantané | Globe Créateur",
  description:
    "Analysez gratuitement le référencement de votre site internet. Score SEO, vérification des balises, performance et recommandations personnalisées.",
  path: "/analyseur-seo",
})

const faqItems = [
  {
    question: "L'analyse SEO est-elle vraiment gratuite ?",
    answer:
      "Oui, 100 % gratuite. Entrez votre URL et obtenez instantanément votre score SEO avec des recommandations concrètes.",
  },
  {
    question: "Quels critères sont analysés ?",
    answer:
      "L'outil vérifie 13+ critères répartis en 4 catégories : contenu (title, meta, headings, images), technique (HTTPS, canonical, viewport, données structurées), réseaux sociaux (Open Graph, Twitter Card) et performance (si disponible).",
  },
  {
    question: "Les résultats sont-ils fiables ?",
    answer:
      "L'analyseur donne un aperçu rapide des points clés du SEO on-page. Pour un audit technique complet (crawl profond, analyse des backlinks, positions), un audit professionnel par notre équipe est recommandé.",
  },
  {
    question: "Comment améliorer mon score SEO ?",
    answer:
      "Chaque critère est accompagné d'une recommandation actionnable. Commencez par corriger les erreurs (en rouge), puis les avertissements (en orange). Les optimisations les plus impactantes : balise title, meta description, H1 unique et HTTPS.",
  },
  {
    question: "Puis-je analyser le site d'un concurrent ?",
    answer:
      "Oui ! L'outil analyse n'importe quelle URL publique. C'est un excellent moyen de comparer votre site avec ceux de vos concurrents.",
  },
]

const features = [
  { icon: Search, label: "13+ critères", desc: "Analyse complète" },
  { icon: Shield, label: "Instantané", desc: "Résultats en secondes" },
  { icon: Zap, label: "Actionnable", desc: "Recommandations précises" },
]

export default function AnalyseurSeoPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Analyseur SEO", href: "/analyseur-seo" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-green-400/10 dark:bg-green-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold mb-6">
            <BarChart3 className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Analysez le{" "}
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">SEO</span>{" "}
            de votre site
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Entrez votre URL et obtenez un diagnostic SEO complet en quelques secondes.
            Score, erreurs et recommandations personnalisées.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-green-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{f.label}</p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Analyzer */}
      <Container className="py-12 lg:py-20">
        <SeoAnalyzer />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Un audit SEO plus poussé ?"
        subtitle="Nos experts analysent votre site en profondeur : crawl technique, backlinks, positions et plan d'action."
        ctaLabel="Demander un audit complet"
        variant="primary"
      />
    </>
  )
}

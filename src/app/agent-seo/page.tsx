import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SeoAgent } from "@/components/tools/seo-agent"
import { Bot, Sparkles, Zap } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Agent SEO IA - Générez du contenu optimisé | Globe Créateur",
  description:
    "Générez des balises meta, mots-clés, plans d'articles et optimisez vos contenus grâce à notre agent SEO alimenté par l'intelligence artificielle.",
  path: "/agent-seo",
})

const features = [
  { icon: Bot, label: "IA avancée", desc: "Propulsé par Claude" },
  { icon: Sparkles, label: "5 outils", desc: "Meta, mots-clés, articles..." },
  { icon: Zap, label: "Instantané", desc: "Résultats en secondes" },
]

export default function AgentSeoPage() {
  return (
    <>
      <Breadcrumb
        items={[{ name: "Agent SEO", href: "/agent-seo" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
            <Bot className="h-4 w-4" />
            Intelligence Artificielle
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Votre assistant{" "}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">SEO</span>{" "}
            propulsé par l&apos;IA
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Générez des balises meta, trouvez des mots-clés, créez des plans d&apos;articles
            et optimisez vos contenus en quelques secondes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-violet-500" />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{f.label}</p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Agent */}
      <Container className="py-12 lg:py-20">
        <SeoAgent />
      </Container>
    </>
  )
}

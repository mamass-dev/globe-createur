import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { FaqSchema } from "@/components/seo/schemas"
import { RoiCalculatorIa } from "@/components/tools/roi-calculator-ia"
import { CtaIa } from "@/components/sections/cta-ia"
import { BrainCog } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Calculateur ROI IA — Que rapporterait l'IA à votre PME ? | Globe Créateur",
  description:
    "Estimez gratuitement le gain annuel potentiel de l'IA dans votre entreprise : temps libéré sur les tâches répétitives, valorisé à votre coût horaire réel. Hypothèses affichées et modifiables.",
  path: "/calculateur-roi-ia",
  keywords: ["calculateur ROI IA", "ROI intelligence artificielle", "ROI projet IA", "gain IA entreprise", "rentabilité IA PME"],
})

const faqItems = [
  {
    question: "Comment le gain est-il calculé ?",
    answer:
      "Le calcul est simple et entièrement visible : collaborateurs concernés × heures hebdomadaires sur des tâches répétitives × semaines travaillées × part automatisable × coût horaire chargé. Les deux hypothèses (part automatisable, semaines travaillées) sont affichées et modifiables — c'est vous qui les fixez selon votre réalité.",
  },
  {
    question: "Le résultat est-il fiable ?",
    answer:
      "C'est un ordre de grandeur, pas une promesse. Le calcul valorise le temps libéré, mais ne tient pas compte des coûts de mise en œuvre, du temps d'adoption par les équipes ni des écarts entre processus. Le chiffrage réel, cas d'usage par cas d'usage et avec hypothèses documentées, est précisément un livrable du diagnostic IA.",
  },
  {
    question: "Quelle part de mes tâches est réellement automatisable ?",
    answer:
      "Cela dépend entièrement de vos processus : c'est la question à laquelle répond une cartographie sérieuse. Par prudence, le calculateur démarre avec une hypothèse volontairement basse que vous pouvez ajuster. Méfiez-vous des promesses génériques : personne ne peut annoncer un pourcentage sans avoir regardé vos processus.",
  },
  {
    question: "Et après l'estimation, on fait quoi ?",
    answer:
      "Si l'ordre de grandeur vous interpelle, l'étape suivante est un diagnostic : cartographier vos processus, identifier les cas d'usage applicables et les chiffrer un par un. Selon votre taille, il peut être adossé au dispositif public Diag Data IA (plan Osez l'IA) ou réalisé en direct — notre page dédiée détaille les deux parcours.",
  },
]

export default function CalculateurRoiIaPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[
          { name: "Outils gratuits", href: "/outils" },
          { name: "Calculateur ROI IA", href: "/calculateur-roi-ia" },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-20 pb-10 lg:pt-32 lg:pb-14 overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 text-signal text-xs font-bold uppercase tracking-[0.2em] font-mono-accent mb-6">
            <BrainCog className="h-4 w-4" aria-hidden="true" />
            Outil gratuit
          </div>
          <h1 className="text-impact text-4xl sm:text-5xl lg:text-6xl text-ivory max-w-4xl mx-auto">
            Que rapporterait l&apos;IA à votre entreprise ?
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-aluminium leading-relaxed max-w-2xl mx-auto">
            Estimez le temps qui dort dans vos tâches répétitives et ce qu&apos;il vaut, à partir de
            vos chiffres. Hypothèses affichées, modifiables — résultat instantané.
          </p>
        </Container>
      </section>

      {/* Calculateur */}
      <Container className="py-12 lg:py-20">
        <RoiCalculatorIa />
      </Container>

      <FaqAccordion items={faqItems} title="Questions fréquentes" badge="FAQ" />

      <CtaIa
        intensity="fort"
        title="Envie du chiffrage réel ?"
        subtitle="Le calculateur donne un ordre de grandeur. Le diagnostic cartographie vos processus et chiffre chaque cas d'usage, hypothèses documentées."
        ctaLabel="Découvrir le diagnostic IA"
        ctaHref="/services/diagnostic-ia-pme"
      />
    </>
  )
}

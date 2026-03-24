import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { SignatureGenerator } from "@/components/tools/signature-generator"
import { Mail as MailIcon, Palette, Smartphone, BarChart3 } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Générateur de signature email professionnel gratuit | Globe Créateur",
  description:
    "Créez une signature email professionnelle en 2 minutes. 5 templates métier, preview Gmail/Outlook/Mobile, score de qualité, tracking UTM intégré. 100 % gratuit.",
  path: "/generateur-signature-email",
  keywords: [
    "générateur signature email",
    "signature email professionnelle",
    "créer signature email gratuit",
    "signature mail entreprise",
    "signature email html",
    "générateur signature mail",
  ],
})

const faqItems = [
  {
    question: "Le générateur de signature email est-il gratuit ?",
    answer:
      "Oui, 100 % gratuit et sans engagement. Créez votre signature, prévisualisez-la sur Gmail, Outlook et mobile, puis copiez-la en un clic.",
  },
  {
    question: "Ma signature sera-t-elle compatible avec tous les clients email ?",
    answer:
      "Oui. Les signatures générées utilisent du HTML compatible avec Gmail, Outlook (desktop et web), Apple Mail, Yahoo Mail et Thunderbird. Le format table-based garantit un rendu cohérent partout.",
  },
  {
    question: "Comment fonctionne le tracking UTM ?",
    answer:
      "Chaque lien de votre signature (site web, réseaux sociaux, CTA) est automatiquement enrichi de paramètres UTM. Vous pouvez ainsi voir dans Google Analytics combien de visiteurs et de conversions proviennent de votre signature email.",
  },
  {
    question: "Puis-je ajouter mon logo et ma photo ?",
    answer:
      "Oui. Importez votre logo et votre photo depuis votre ordinateur. L'outil extrait automatiquement les couleurs dominantes de votre logo pour personnaliser votre signature aux couleurs de votre marque.",
  },
  {
    question: "Qu'est-ce que le score de qualité ?",
    answer:
      "Le score /100 évalue la complétude et l'efficacité de votre signature : identité, coordonnées, réseaux sociaux, branding visuel, personnalisation couleurs, call-to-action et adresse. Plus votre score est élevé, plus votre signature inspire confiance et génère des interactions.",
  },
  {
    question: "Comment installer ma signature dans Gmail ?",
    answer:
      "Cliquez sur « Copier la signature », puis allez dans Gmail → Paramètres (⚙️) → Voir tous les paramètres → section Signature → Créer une signature → Collez (Ctrl+V). Enregistrez et c'est terminé.",
  },
  {
    question: "Mes données sont-elles stockées ?",
    answer:
      "Non. Tout se passe dans votre navigateur. Aucune donnée n'est envoyée à un serveur. Vos images sont converties en base64 localement.",
  },
]

const features = [
  { icon: Palette, label: "5 templates", desc: "Designs professionnels" },
  { icon: Smartphone, label: "Preview multi-client", desc: "Gmail, Outlook, Mobile" },
  { icon: BarChart3, label: "Score /100", desc: "Qualité de votre signature" },
]

export default function GenerateurSignatureEmailPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Générateur de signature email", href: "/generateur-signature-email" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <MailIcon className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Créez votre{" "}
            <span className="text-gradient">signature email</span>{" "}
            professionnelle
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            5 templates, preview en temps réel, score de qualité et tracking UTM intégré.
            Votre signature prête en 2 minutes.
          </p>

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

      {/* Generator */}
      <Container className="py-12 lg:py-20">
        <SignatureGenerator />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Besoin d'une identité visuelle complète ?"
        subtitle="Logo, charte graphique, site web et signatures email harmonisées. Nos experts créent votre image de marque."
        ctaLabel="Demander un devis gratuit"
        variant="primary"
      />
    </>
  )
}

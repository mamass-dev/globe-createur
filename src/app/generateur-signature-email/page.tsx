import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { EmailSignatureGenerator } from "@/components/tools/email-signature-generator"
import { Mail, Palette, Smartphone, Sparkles, MousePointerClick } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Générateur de signature email gratuit - 5 templates pro | Globe Créateur",
  description:
    "Créez gratuitement une signature email professionnelle. 5 templates, bouton CTA, aperçu dark mode, compatible Gmail, Outlook et Apple Mail. Personnalisez couleurs, police, photo et réseaux sociaux.",
  path: "/generateur-signature-email",
  keywords: ["générateur signature email", "signature email gratuite", "signature email professionnelle", "créer signature gmail", "signature outlook", "signature email html"],
})

const faqItems = [
  {
    question: "Le générateur de signature est-il gratuit ?",
    answer:
      "Oui, 100 % gratuit et sans limite d'utilisation. Créez autant de signatures que vous le souhaitez pour vous et votre équipe.",
  },
  {
    question: "La signature fonctionne-t-elle avec Gmail et Outlook ?",
    answer:
      "Oui. La signature utilise du HTML avec des styles inline et un layout en tableaux, compatible avec Gmail, Outlook (desktop et web), Apple Mail, Thunderbird et la plupart des clients email.",
  },
  {
    question: "Puis-je ajouter ma photo ou mon logo ?",
    answer:
      "Oui, renseignez l'URL de votre image dans le champ prévu. L'image doit être hébergée en ligne (sur votre site, Google Drive, Imgur, etc.) pour s'afficher correctement dans les emails.",
  },
  {
    question: "Comment personnaliser les couleurs et la police ?",
    answer:
      "Dans l'onglet Style, choisissez parmi 10 couleurs prédéfinies ou utilisez le sélecteur personnalisé. Vous pouvez aussi changer la police (Arial, Verdana, Georgia...) et la taille du texte. Tout se met à jour en temps réel dans l'aperçu.",
  },
  {
    question: "À quoi sert le bouton CTA dans la signature ?",
    answer:
      "Le bouton d'appel à l'action (CTA) permet d'ajouter un lien cliquable dans votre signature, par exemple vers votre page de prise de RDV Calendly, votre portfolio ou une offre en cours. C'est un excellent moyen de convertir chaque email en opportunité.",
  },
  {
    question: "La signature s'affiche-t-elle bien sur mobile et en mode sombre ?",
    answer:
      "Oui. Les signatures utilisent un layout en tableaux HTML compatible avec tous les écrans. L'outil propose aussi un aperçu en mode sombre pour vérifier le rendu dans les clients qui l'utilisent (Gmail, Outlook...).",
  },
]

const features = [
  { icon: Palette, label: "5 templates", desc: "Classique, Moderne, Corporate..." },
  { icon: MousePointerClick, label: "Bouton CTA", desc: "Lien cliquable intégré" },
  { icon: Smartphone, label: "Compatible", desc: "Gmail, Outlook, Apple Mail" },
  { icon: Sparkles, label: "100% gratuit", desc: "Sans limite d'utilisation" },
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
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-cyan-400/10 dark:bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-teal-400/10 dark:bg-teal-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950 border border-cyan-100 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            <Mail className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Créez votre{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">signature email</span>{" "}
            pro
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Remplissez vos informations, choisissez un template et copiez votre signature.
            Compatible Gmail, Outlook et Apple Mail.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-cyan-500" />
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
        <EmailSignatureGenerator />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Besoin d'une identité visuelle complète ?"
        subtitle="Logo, charte graphique, supports de communication : notre équipe crée votre image de marque de A à Z."
        ctaLabel="Découvrir nos services"
        ctaHref="/services"
        variant="primary"
      />
    </>
  )
}

import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { LegalNoticeGenerator } from "@/components/tools/legal-notice-generator"
import { FileText, Shield, Copy } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "G\u00e9n\u00e9rateur de mentions l\u00e9gales gratuit - Conforme RGPD 2025 | Globe Cr\u00e9ateur",
  description:
    "G\u00e9n\u00e9rez gratuitement vos mentions l\u00e9gales conformes \u00e0 la loi fran\u00e7aise (LCEN) et au RGPD. Formulaire simple, copier-coller en un clic. Pour auto-entrepreneurs, soci\u00e9t\u00e9s et associations.",
  path: "/generateur-mentions-legales",
  keywords: [
    "g\u00e9n\u00e9rateur mentions l\u00e9gales",
    "mentions l\u00e9gales gratuit",
    "mentions l\u00e9gales site internet",
    "g\u00e9n\u00e9rateur mentions l\u00e9gales gratuit",
    "mentions obligatoires site web",
    "mentions l\u00e9gales RGPD",
    "mod\u00e8le mentions l\u00e9gales",
  ],
})

const faqItems = [
  {
    question: "Les mentions l\u00e9gales sont-elles obligatoires pour un site internet ?",
    answer:
      "Oui. La loi LCEN (Loi pour la Confiance dans l\u2019\u00c9conomie Num\u00e9rique) du 21 juin 2004 impose \u00e0 tout site internet professionnel ou associatif de publier des mentions l\u00e9gales identifiant l\u2019\u00e9diteur, le responsable de publication et l\u2019h\u00e9bergeur. Le non-respect est passible d\u2019une amende pouvant aller jusqu\u2019\u00e0 75 000 \u20ac pour une personne physique.",
  },
  {
    question: "Ce g\u00e9n\u00e9rateur est-il vraiment gratuit ?",
    answer:
      "Oui, 100 % gratuit et sans inscription. Remplissez le formulaire en 5 \u00e9tapes, copiez le r\u00e9sultat (texte brut ou HTML) et collez-le directement sur votre site. Aucune donn\u00e9e n\u2019est stock\u00e9e.",
  },
  {
    question: "Les mentions g\u00e9n\u00e9r\u00e9es sont-elles conformes au RGPD ?",
    answer:
      "Oui. Le texte g\u00e9n\u00e9r\u00e9 inclut les mentions RGPD de base (droits des utilisateurs, contact DPO, lien CNIL). Pour les sites collectant beaucoup de donn\u00e9es personnelles, nous recommandons de compl\u00e9ter par une politique de confidentialit\u00e9 d\u00e9taill\u00e9e.",
  },
  {
    question: "Quelles informations dois-je pr\u00e9parer avant de g\u00e9n\u00e9rer mes mentions l\u00e9gales ?",
    answer:
      "Vous aurez besoin de : votre raison sociale ou nom, l\u2019adresse du si\u00e8ge social, le num\u00e9ro SIRET, le nom du responsable de publication, un email et t\u00e9l\u00e9phone de contact, ainsi que les coordonn\u00e9es de votre h\u00e9bergeur web (OVH, Ionos, o2switch, Vercel, etc.).",
  },
  {
    question: "Puis-je utiliser ces mentions l\u00e9gales pour un site e-commerce ?",
    answer:
      "Ces mentions couvrent les obligations de base pour tout site internet. Pour un e-commerce, vous devrez \u00e9galement ajouter des CGV (Conditions G\u00e9n\u00e9rales de Vente), le droit de r\u00e9tractation, et les informations sur la m\u00e9diation de la consommation. Contactez-nous si vous avez besoin d\u2019aide.",
  },
]

const features = [
  { icon: FileText, label: "100% gratuit", desc: "Sans inscription" },
  { icon: Shield, label: "Conforme RGPD", desc: "Loi LCEN respect\u00e9e" },
  { icon: Copy, label: "Copier-coller", desc: "Texte ou HTML" },
]

export default function GenerateurMentionsLegalesPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "G\u00e9n\u00e9rateur de mentions l\u00e9gales", href: "/generateur-mentions-legales" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6">
            <FileText className="h-4 w-4" />
            Outil gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            G\u00e9n\u00e9rez vos{" "}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">mentions l\u00e9gales</span>{" "}
            en 2 minutes
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Remplissez le formulaire et obtenez des mentions l\u00e9gales conformes \u00e0 la loi fran\u00e7aise
            (LCEN) et au RGPD. Copiez-collez le r\u00e9sultat sur votre site.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm"
              >
                <f.icon className="h-4 w-4 text-amber-500" />
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
        <LegalNoticeGenerator />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fr\u00e9quentes"
        badge="FAQ"
      />

      <CtaSection
        title="Besoin d\u2019un site internet professionnel ?"
        subtitle="Nos experts cr\u00e9ent votre site web avec toutes les pages l\u00e9gales int\u00e9gr\u00e9es : mentions l\u00e9gales, politique de confidentialit\u00e9, CGV."
        ctaLabel="Demander un devis gratuit"
        variant="primary"
      />
    </>
  )
}

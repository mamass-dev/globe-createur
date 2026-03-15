import type { Metadata } from "next"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FreelanceDirectory } from "@/components/tools/freelance-directory"
import { freelances } from "@/lib/data/freelances"
import { Users, MapPin, Sparkles, UserPlus } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Annuaire Freelances Dijon & Bourgogne - Trouvez un expert digital | Globe Créateur",
  description:
    "Trouvez les meilleurs freelances digitaux à Dijon et en Bourgogne-Franche-Comté. Développeurs, designers, SEO, photographes, rédacteurs : des experts vérifiés près de chez vous.",
  path: "/annuaire-freelances",
  keywords: ["freelance dijon", "freelance bourgogne", "développeur web dijon", "graphiste dijon", "seo freelance dijon", "annuaire freelances"],
})

const faqItems = [
  {
    question: "L'inscription à l'annuaire est-elle gratuite ?",
    answer:
      "Oui, 100 % gratuite et sans engagement. Nous souhaitons mettre en avant les talents locaux de Bourgogne-Franche-Comté et faciliter la mise en relation entre freelances et entreprises.",
  },
  {
    question: "Comment sont sélectionnés les freelances ?",
    answer:
      "Chaque profil est vérifié manuellement par notre équipe. Nous nous assurons que le freelance est bien basé en Bourgogne-Franche-Comté, qu'il exerce réellement et qu'il possède un portfolio ou des références vérifiables.",
  },
  {
    question: "Je suis freelance, comment m'inscrire ?",
    answer:
      "Rendez-vous sur la page d'inscription et remplissez le formulaire. Votre profil sera vérifié et publié sous 48h. Vous recevrez un email de confirmation avec le lien vers votre fiche.",
  },
  {
    question: "Je suis une entreprise, comment contacter un freelance ?",
    answer:
      "Cliquez sur le profil du freelance qui vous intéresse. Vous y trouverez ses coordonnées, son portfolio et un bouton de contact direct. La mise en relation est gratuite.",
  },
  {
    question: "Quelle est la différence avec Globe Créateur ?",
    answer:
      "Globe Créateur est un studio de communication 360° avec une équipe intégrée. Cet annuaire référence des freelances indépendants complémentaires. Si votre projet nécessite une équipe complète, contactez-nous directement.",
  },
]

const features = [
  { icon: Users, label: `${freelances.length}+ freelances`, desc: "Profils vérifiés" },
  { icon: MapPin, label: "Bourgogne-FC", desc: "Talents locaux" },
  { icon: Sparkles, label: "100% gratuit", desc: "Inscription & contact" },
]

export default function AnnuaireFreelancesPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[{ name: "Annuaire Freelances", href: "/annuaire-freelances" }]}
      />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-violet-400/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
            <Users className="h-4 w-4" />
            Annuaire gratuit
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Trouvez un{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">freelance</span>{" "}
            près de chez vous
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Les meilleurs freelances digitaux de Bourgogne-Franche-Comté.
            Développeurs, designers, SEO, photographes — des experts vérifiés et disponibles.
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

          <div className="mt-8">
            <Button href="/annuaire-freelances/inscription" className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white">
              <UserPlus className="h-4 w-4" />
              Inscrire mon profil gratuitement
            </Button>
          </div>
        </Container>
      </section>

      {/* Directory */}
      <Container className="py-12 lg:py-20">
        <FreelanceDirectory freelances={freelances} />
      </Container>

      <FaqAccordion
        items={faqItems}
        title="Questions fréquentes"
        badge="FAQ"
      />

      <CtaSection
        title="Vous êtes freelance en Bourgogne ?"
        subtitle="Rejoignez l'annuaire gratuitement et gagnez en visibilité auprès des PME locales."
        ctaLabel="S'inscrire gratuitement"
        ctaHref="/annuaire-freelances/inscription"
        variant="primary"
      />
    </>
  )
}

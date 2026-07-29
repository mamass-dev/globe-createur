import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { FaqSchema } from "@/components/seo/schemas"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Search, Gauge, Calculator, ClipboardList, Mail, Wrench, ArrowRight } from "lucide-react"

export const metadata: Metadata = buildMetadata({
  title: "Outils gratuits — SEO, audit digital, ROI, signature email | Globe Créateur",
  description:
    "6 outils gratuits pour piloter votre communication : analyse SEO en ligne, audit digital, diagnostic communication, calculateur ROI, estimateur de projet, générateur de signature email. Sans inscription.",
  path: "/outils",
  keywords: ["outil SEO gratuit", "outils SEO gratuits", "outils communication digitale gratuits", "audit digital gratuit", "analyse SEO gratuite", "générateur signature email gratuit", "calculateur ROI site web"],
})

const outils = [
  {
    icon: Search,
    href: "/analyseur-seo",
    name: "Analyseur SEO",
    desc: "Score sur 100 en 5 secondes : 13 critères vérifiés (title, meta, H1, HTTPS, données structurées) avec recommandations concrètes.",
    tag: "Le plus utilisé",
  },
  {
    icon: Gauge,
    href: "/audit-digital",
    name: "Audit digital",
    desc: "Évaluez la maturité digitale de votre PME en 2 minutes : site, SEO, réseaux sociaux, avis. Score par catégorie et plan d'action.",
    tag: null,
  },
  {
    icon: ClipboardList,
    href: "/diagnostic",
    name: "Diagnostic communication",
    desc: "Découvrez ce que votre communication actuelle vous fait perdre chaque mois, et le forfait adapté à votre situation.",
    tag: null,
  },
  {
    icon: Calculator,
    href: "/calculateur-roi",
    name: "Calculateur ROI",
    desc: "Estimez le retour sur investissement d'un site internet ou d'une stratégie SEO à partir de vos chiffres réels.",
    tag: null,
  },
  {
    icon: Wrench,
    href: "/estimateur",
    name: "Estimateur de projet",
    desc: "Obtenez une fourchette de budget réaliste pour votre projet web : site vitrine, refonte, e-commerce ou landing page.",
    tag: null,
  },
  {
    icon: Mail,
    href: "/generateur-signature-email",
    name: "Générateur de signature email",
    desc: "Créez une signature email professionnelle en quelques clics, prête à coller dans Gmail ou Outlook.",
    tag: null,
  },
]

const faqItems = [
  {
    question: "Ces outils sont-ils vraiment gratuits ?",
    answer:
      "Oui, tous. Pas de version d'essai, pas de carte bancaire, et la plupart fonctionnent sans laisser d'email. Ce sont les outils que nous utilisons pour montrer concrètement où en est votre présence en ligne.",
  },
  {
    question: "Pourquoi une agence propose-t-elle des outils gratuits ?",
    answer:
      "Parce qu'un diagnostic honnête est le meilleur point de départ d'une relation de confiance. Certains utilisateurs corrigent eux-mêmes ce que l'outil révèle — parfait. D'autres préfèrent déléguer — ils savent alors exactement pourquoi ils nous contactent.",
  },
  {
    question: "Quel outil utiliser en premier ?",
    answer:
      "Si vous avez déjà un site : l'analyseur SEO, pour vérifier vos fondations techniques en 5 secondes. Si vous partez de zéro ou voulez une vue d'ensemble : l'audit digital, qui balaie site, réseaux, avis et visibilité en 2 minutes.",
  },
  {
    question: "Les résultats remplacent-ils un audit professionnel ?",
    answer:
      "Non. Ces outils mesurent ce qui est mesurable automatiquement. Un audit professionnel ajoute ce qu'aucun outil ne voit : votre positionnement face aux concurrents réels, la qualité de votre contenu, les opportunités locales de votre marché. L'audit initial est offert.",
  },
]

export default function OutilsPage() {
  return (
    <>
      <FaqSchema items={faqItems} />

      <Breadcrumb items={[{ name: "Outils gratuits", href: "/outils" }]} />

      {/* Hero */}
      <section className="relative pt-28 pb-8 lg:pt-40 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient dark:bg-slate-950 pointer-events-none" />
        <Container className="relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <Wrench className="h-4 w-4" />
            100 % gratuits, sans inscription
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
            Nos outils gratuits pour piloter votre{" "}
            <span className="text-gradient">communication</span>
          </h1>
          <p className="mt-5 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Analyse SEO, audit digital, calcul de ROI, estimation de budget :
            six outils pour savoir où vous en êtes — et où agir en priorité.
          </p>
        </Container>
      </section>

      {/* Grille d'outils */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outils.map((o) => (
            <AnimateOnScroll key={o.href}>
              <Link
                href={o.href}
                className="group relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 transition-all hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg"
              >
                {o.tag && (
                  <span className="absolute top-4 right-4 rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    {o.tag}
                  </span>
                )}
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <o.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{o.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{o.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  Utiliser l&apos;outil
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>

      {/* Contenu éditorial */}
      <Container as="article" className="py-12 lg:py-16 max-w-3xl">
        <AnimateOnScroll>
          <div className="prose max-w-none">
            <h2>Des outils SEO et communication gratuits, pourquoi ?</h2>
            <p>
              La plupart des dirigeants de PME savent que leur présence en ligne
              pourrait être meilleure — sans savoir <strong>par où commencer</strong>.
              Les audits payants engagent, les discours d&apos;agences se
              ressemblent, et les outils professionnels (Semrush, Ahrefs) coûtent
              une centaine d&apos;euros par mois pour des fonctions dont une PME
              n&apos;utilisera que 5 %.
            </p>
            <p>
              Ces six outils comblent ce vide : un état des lieux objectif,
              immédiat et gratuit. Chacun mesure une dimension différente —
              fondations techniques SEO, maturité digitale globale, rentabilité
              prévisionnelle, budget projet — et vous repartez avec des
              priorités claires, que vous les traitiez seul ou avec nous.
            </p>
            <h2>Comment les combiner intelligemment</h2>
            <p>
              Le parcours le plus utile pour un dirigeant : commencez par
              l&apos;<Link href="/audit-digital">audit digital</Link> pour la vue
              d&apos;ensemble, puis passez votre site à l&apos;
              <Link href="/analyseur-seo">analyseur SEO</Link> pour le détail
              technique. Si les deux confirment un retard, le{" "}
              <Link href="/calculateur-roi">calculateur ROI</Link> vous dira si
              l&apos;investissement se justifie — et l&apos;
              <Link href="/estimateur">estimateur</Link>, combien il coûterait.
              Quatre outils, un quart d&apos;heure, et vous savez exactement où
              vous en êtes.
            </p>
          </div>
        </AnimateOnScroll>
      </Container>

      <FaqAccordion items={faqItems} title="Questions fréquentes" badge="FAQ" />

      <CtaSection
        title="Vous préférez qu'on regarde ensemble ?"
        subtitle="Audit initial offert : on analyse votre présence en ligne et on vous dit où agir en priorité — avec ou sans nous ensuite."
        ctaLabel="Demander mon audit offert"
        variant="primary"
      />
    </>
  )
}

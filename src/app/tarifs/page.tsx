import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/sections/page-hero"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaSection } from "@/components/sections/cta-section"
import { ContactCard } from "@/components/sections/contact-card"
import { FaqSchema, BreadcrumbSchema } from "@/components/seo/schemas"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/animate"
import {
  Check,
  X,
  ArrowRight,
  Globe,
  RefreshCw,
  Search,
  FileText,
  Zap,
  MessageSquare,
  Shield,
  Clock,
  Star,
  Users,
  TrendingUp,
} from "lucide-react"

const projets = [
  {
    type: "Site vitrine",
    icon: Globe,
    delai: "3-5 semaines",
    description: "Votre vitrine digitale, concue pour convertir vos visiteurs en clients.",
    includes: ["Design sur-mesure", "100% responsive mobile", "SEO integre", "Formulaire de contact", "Hebergement 1 an offert", "Formation a la prise en main"],
  },
  {
    type: "Site multi-pages",
    icon: FileText,
    delai: "5-8 semaines",
    description: "Pour les entreprises qui veulent demontrer leur expertise en detail.",
    includes: ["Tout du site vitrine +", "Blog integre & optimise SEO", "Pages services detaillees", "Maillage interne strategique", "Integrations sur-mesure"],
  },
  {
    type: "Refonte de site",
    icon: RefreshCw,
    delai: "4-8 semaines",
    description: "Modernisez votre site sans perdre une seule position Google.",
    includes: ["Audit SEO de l'existant", "Migration zero perte de trafic", "Nouveau design moderne", "Performance optimisee", "Redirections 301"],
  },
  {
    type: "Landing page",
    icon: Search,
    delai: "1-2 semaines",
    description: "Une page unique, pensee pour transformer chaque visiteur en lead.",
    includes: ["Design oriente conversion", "A/B testing ready", "Formulaire optimise", "Tracking & analytics", "Mobile-first"],
  },
]

const forfaits = [
  {
    name: "Essentiel",
    tagline: "Poser les fondations",
    description: "Ideal pour les PME qui demarrent leur presence en ligne.",
    features: [
      "Site internet offert",
      "Pilotage mensuel",
      "1 reseau social optimise",
      "Contenus adaptes",
      "Support email sous 24h",
    ],
    notIncluded: ["Shooting photo", "Reporting avance"],
  },
  {
    name: "Croissance",
    tagline: "Accelerer la visibilite",
    popular: true,
    description: "Pour generer des demandes regulieres et dominer votre zone.",
    features: [
      "Tout Essentiel +",
      "2 reseaux sociaux geres",
      "Shooting photo mensuel",
      "Plan editorial & contenus",
      "SEO local avance",
      "Reporting mensuel",
    ],
    notIncluded: [],
  },
  {
    name: "Performance",
    tagline: "Dominer le marche",
    description: "La communication complete pour les PME ambitieuses.",
    features: [
      "Tout Croissance +",
      "Video pro mensuelle",
      "Gestion complete reseaux",
      "CRM & automatisations",
      "Campagnes Meta / LinkedIn",
      "Chef de projet dedie",
    ],
    notIncluded: [],
  },
]

const faqTarifs = [
  { question: "Comment connaitre le prix exact de mon projet ?", answer: "Chaque projet est unique. Demandez un devis gratuit : on echange sur vos besoins et on vous envoie un chiffrage detaille sous 24h. Pas de surprise, pas de cout cache." },
  { question: "Pourquoi ne pas afficher de prix fixes ?", answer: "Parce qu'un site vitrine pour un artisan et un site multi-pages pour un hotel n'ont rien a voir. Afficher un prix unique serait soit trop cher pour les projets simples, soit insuffisant pour les projets ambitieux. On prefere vous proposer le juste prix." },
  { question: "Faut-il payer en une fois ?", answer: "Non. Pour les projets ponctuels : 40 % a la commande, 60 % a la livraison. Pour les forfaits : paiement mensuel. On s'adapte." },
  { question: "Le site internet est-il vraiment offert dans les forfaits ?", answer: "Oui. La creation d'un site vitrine est offerte selon la duree d'engagement. Le site vous appartient, meme si vous resiliez." },
  { question: "Puis-je changer de forfait en cours de route ?", answer: "Absolument. Upgrade ou downgrade avec un preavis d'un mois. Beaucoup de nos clients commencent par l'Essentiel et passent en Croissance apres quelques mois." },
  { question: "Que se passe-t-il si je resilie ?", answer: "Votre site internet vous appartient. Si vous resiliez, vous conservez le site et tout le contenu produit. On vous transfere les acces complets." },
]

export default function TarifsPage() {
  return (
    <>
      <FaqSchema items={faqTarifs} />
      <BreadcrumbSchema items={[
        { name: "Accueil", href: "/" },
        { name: "Nos offres", href: "/tarifs" },
      ]} />

      <Breadcrumb items={[{ name: "Nos offres", href: "/tarifs" }]} />

      <PageHero
        badge="Nos offres"
        title="Des solutions adaptees a votre entreprise"
        subtitle="Chaque PME est differente. On construit une offre sur-mesure, adaptee a vos objectifs et votre budget. Devis gratuit sous 24h."
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
        secondaryLabel="Faire le diagnostic gratuit"
        secondaryHref="/diagnostic"
      />

      {/* TRUST BAR */}
      <section className="py-6 border-b border-slate-100 dark:border-slate-800">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {[
              { icon: Clock, label: "Devis sous 24h" },
              { icon: Shield, label: "Sans engagement possible" },
              { icon: Star, label: "5/5 sur Google" },
              { icon: Users, label: "6 expertises en 1" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <s.icon className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* DIAGNOSTIC CTA */}
      <section className="py-16 lg:py-20">
        <Container>
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Nouveau</p>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Vous ne savez pas par ou commencer ?
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Faites notre diagnostic gratuit en 2 minutes. On analyse votre situation et on vous dit exactement ce qu&apos;on ferait pour vous.
                </p>
              </div>
              <Button href="/diagnostic" variant="primary" size="lg">
                Lancer le diagnostic
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* PROJETS PONCTUELS */}
      <section className="py-16 lg:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Projets ponctuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Sites internet & projets web</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Un projet defini, un livrable, un accompagnement de A a Z.</p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projets.map((projet) => (
              <StaggerItem key={projet.type}>
                <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg transition-all flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <projet.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{projet.type}</h3>
                      <p className="text-xs text-slate-400">Delai indicatif : {projet.delai}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{projet.description}</p>
                  <ul className="space-y-2.5 flex-1">
                    {projet.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <Button href="/devis" variant="outline" className="w-full">
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* FORFAITS MENSUELS */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-900">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Forfaits mensuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Votre equipe communication externalisee</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Web, SEO, photo, video, reseaux sociaux : tout inclus. Site internet offert selon engagement.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {forfaits.map((f) => (
              <StaggerItem key={f.name}>
                <div className={`relative flex flex-col h-full rounded-2xl p-8 transition-all ${
                  f.popular
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-950 ring-2 ring-indigo-600 dark:ring-indigo-500"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg"
                }`}>
                  {f.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-indigo-700 shadow-md text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full">
                      Le plus choisi
                    </span>
                  )}

                  <h3 className={`text-xl font-extrabold ${f.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {f.name}
                  </h3>
                  <p className={`text-sm font-medium mt-1 mb-2 ${f.popular ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"}`}>
                    {f.tagline}
                  </p>
                  <p className={`text-sm mb-6 ${f.popular ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"}`}>
                    {f.description}
                  </p>

                  <ul className="space-y-3 flex-1">
                    {f.features.map((feat) => (
                      <li key={feat} className={`flex items-start gap-2 text-sm ${f.popular ? "text-indigo-50" : "text-slate-600 dark:text-slate-400"}`}>
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${f.popular ? "text-amber-300" : "text-green-500"}`} />
                        {feat}
                      </li>
                    ))}
                    {f.notIncluded.map((feat) => (
                      <li key={feat} className={`flex items-start gap-2 text-sm ${f.popular ? "text-indigo-300/60" : "text-slate-400 dark:text-slate-500"}`}>
                        <X className={`h-4 w-4 shrink-0 mt-0.5 ${f.popular ? "text-indigo-300/40" : "text-slate-300 dark:text-slate-600"}`} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      href="/devis"
                      variant={f.popular ? "secondary" : "outline"}
                      className={`w-full ${f.popular ? "bg-white text-indigo-700 hover:bg-indigo-50" : ""}`}
                    >
                      Demander un devis
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll>
            <div className="text-center mt-10">
              <Link
                href="/forfait-communication-pme"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                Comparer les forfaits en detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* GARANTIES */}
      <section className="py-16 lg:py-24">
        <Container className="max-w-4xl">
          <AnimateOnScroll>
            <div className="text-center mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Nos engagements</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">Zero risque de votre cote</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Devis gratuit", desc: "On echange, on chiffre, sans engagement. Vous decidez en toute liberte." },
                { icon: Clock, title: "Reponse sous 24h", desc: "Pas d'attente interminable. Votre projet merite de l'attention." },
                { icon: Star, title: "Satisfaction garantie", desc: "Validations a chaque etape. On ne facture que ce qui vous convient." },
                { icon: Users, title: "Vous etes proprietaire", desc: "Le site, les photos, les textes - tout vous appartient. Toujours." },
                { icon: TrendingUp, title: "Resultats mesurables", desc: "Reporting mensuel avec les vrais chiffres." },
                { icon: MessageSquare, title: "Interlocuteur unique", desc: "Un seul contact qui connait votre dossier sur le bout des doigts." },
              ].map((item) => (
                <div key={item.title} className="text-center space-y-3 p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      <ContactCard />

      <FaqAccordion
        items={faqTarifs}
        title="Questions frequentes"
        subtitle="Tout ce que vous devez savoir sur nos offres."
        badge="FAQ"
      />

      <CtaSection
        title="Parlons de votre projet"
        subtitle="On vous repond sous 24h avec un devis detaille, sans engagement."
        variant="primary"
        ctaLabel="Demander un devis gratuit"
        ctaHref="/devis"
      />
    </>
  )
}

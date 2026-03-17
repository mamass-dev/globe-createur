"use client"

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/animate"
import { AnimatedCounter } from "@/components/ui/animated-counter"
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
  Sparkles,
  Phone,
  ChevronRight,
} from "lucide-react"

const projets = [
  {
    type: "Site vitrine",
    icon: Globe,
    delai: "3-5 semaines",
    description: "Votre vitrine digitale, conçue pour convertir vos visiteurs en clients.",
    includes: ["Design sur-mesure (pas de template)", "100% responsive mobile", "SEO intégré dès le départ", "Formulaire de contact intelligent", "Hébergement 1 an offert", "Formation à la prise en main"],
  },
  {
    type: "Site multi-pages",
    icon: FileText,
    delai: "5-8 semaines",
    description: "Pour les entreprises qui veulent démontrer leur expertise en détail.",
    includes: ["Tout du site vitrine +", "Blog intégré & optimisé SEO", "Pages services détaillées", "Maillage interne stratégique", "Intégrations sur-mesure", "Stratégie de contenu initiale"],
  },
  {
    type: "Refonte de site",
    icon: RefreshCw,
    delai: "4-8 semaines",
    description: "Modernisez votre site sans perdre une seule position Google.",
    includes: ["Audit SEO complet de l'existant", "Migration zéro perte de trafic", "Nouveau design moderne", "Performance optimisée (<1s)", "Redirections 301 automatiques", "Suivi post-migration 30 jours"],
  },
  {
    type: "Landing page",
    icon: Search,
    delai: "1-2 semaines",
    description: "Une page unique, pensée pour transformer chaque visiteur en lead.",
    includes: ["Design orienté conversion", "A/B testing ready", "Formulaire ultra-optimisé", "Tracking & analytics intégrés", "Mobile-first", "Taux de conversion garanti"],
  },
]

const forfaits = [
  {
    name: "Essentiel",
    icon: "🌱",
    tagline: "Poser les fondations",
    description: "Idéal pour les PME qui démarrent leur présence en ligne ou veulent structurer l'existant.",
    features: [
      "Site internet offert",
      "Pilotage mensuel personnalisé",
      "1 réseau social optimisé",
      "Contenus adaptés à vos priorités",
      "Support email sous 24h",
    ],
    notIncluded: ["Shooting photo", "Reporting avancé"],
    cta: "Démarrer avec Essentiel",
  },
  {
    name: "Croissance",
    icon: "🚀",
    tagline: "Accélérer la visibilité",
    popular: true,
    description: "Pour les PME qui veulent générer des demandes régulières et dominer leur zone.",
    features: [
      "Tout Essentiel +",
      "2 réseaux sociaux gérés",
      "Shooting photo mensuel",
      "Plan éditorial & contenus mensuels",
      "SEO local avancé",
      "Reporting mensuel détaillé",
    ],
    notIncluded: [],
    cta: "Passer en Croissance",
  },
  {
    name: "Performance",
    icon: "⚡",
    tagline: "Dominer le marché",
    description: "La communication complète pour les PME ambitieuses qui veulent tout, maintenant.",
    features: [
      "Tout Croissance +",
      "Vidéo pro mensuelle",
      "Gestion complète des réseaux",
      "CRM & automatisations",
      "Campagnes Meta / LinkedIn",
      "Chef de projet dédié",
      "Priorité totale",
    ],
    notIncluded: [],
    cta: "Choisir Performance",
  },
]

const objections = [
  {
    question: "\"Je n'ai pas le budget pour ça\"",
    answer: "Un salarié communication coûte 45 000 à 58 000 euros par an. Nos forfaits représentent une fraction de ce montant, pour 6 compétences au lieu d'une seule. Et le site est offert.",
  },
  {
    question: "\"Je vais y réfléchir\"",
    answer: "Pendant que vous réfléchissez, vos concurrents publient du contenu, collectent des avis Google et grimpent dans les résultats. Chaque mois sans communication, c'est du chiffre d'affaires en moins.",
  },
  {
    question: "\"J'ai déjà un site\"",
    answer: "Avoir un site et avoir un site qui génère des clients, ce n'est pas la même chose. Si votre site ne vous apporte pas de demandes chaque mois, il ne fait pas son travail.",
  },
  {
    question: "\"Je peux le faire moi-même\"",
    answer: "Vous pouvez. Mais est-ce le meilleur usage de votre temps ? Un dirigeant qui passe 10h/semaine sur sa communication, c'est 10h de moins sur son coeur de métier.",
  },
]

export default function TarifsPage() {
  return (
    <>
      {/* HERO - Impact immédiat */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        <div className="absolute inset-0 opacity-20 dot-grid pointer-events-none" />

        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" />
                Site internet offert selon engagement
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
                Arrêtez d&apos;être
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  invisible en ligne
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Votre communication digitale clé en main : site web, SEO, réseaux sociaux, photo, vidéo.
                Un seul interlocuteur. Des résultats mesurables.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button href="/devis" variant="primary" size="lg">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="#forfaits" className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-bold rounded-2xl text-slate-300 border border-white/20 hover:bg-white/10 hover:text-white transition-all">
                  Voir les formules
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* TRUST BAR */}
      <section className="py-6 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
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

      {/* PROBLÈME / SOLUTION */}
      <section className="py-20 lg:py-28">
        <Container className="max-w-4xl">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-red-500">Le problème</p>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  90% des PME perdent des clients chaque jour
                </h2>
                <ul className="space-y-4">
                  {[
                    "Votre site date de 2018 et ne génère aucune demande",
                    "Vos concurrents vous devancent sur Google",
                    "Vous postez sur les réseaux quand vous y pensez (jamais)",
                    "Vous n'avez personne pour gérer votre communication",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-green-600">La solution</p>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Une équipe complète, sans embaucher
                </h2>
                <ul className="space-y-4">
                  {[
                    "Un site moderne qui convertit vos visiteurs en clients",
                    "Le SEO local pour être premier sur votre zone",
                    "Des contenus pro publiés chaque semaine",
                    "Un interlocuteur unique qui pilote tout",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* STATS */}
      <section className="py-24 bg-indigo-600 dark:bg-indigo-950 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { value: 50, suffix: "+", label: "Sites livrés" },
                { value: 97, suffix: "%", label: "Clients satisfaits" },
                { value: 350, suffix: "+", label: "Shootings réalisés" },
                { value: 5, suffix: "/5", label: "Note Google" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight tabular-nums"
                  />
                  <p className="text-sm font-bold uppercase tracking-widest text-indigo-100 opacity-80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* PROJETS PONCTUELS */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Projets ponctuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                Un besoin précis ? On le résout.
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Site internet, refonte, landing page - chaque projet est livré clé en main avec un accompagnement de A à Z.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projets.map((projet) => (
              <StaggerItem key={projet.type}>
                <div className="group h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/50 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <projet.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{projet.type}</h3>
                      <p className="text-xs text-slate-400">Livré en {projet.delai}</p>
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
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
                    <Button href="/devis" variant="outline" className="w-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-300">
                      Demander un devis gratuit
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* FORFAITS MENSUELS */}
      <section id="forfaits" className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900 scroll-mt-20">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Forfaits mensuels</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                Votre équipe communication, sans les charges
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Trois formules. Un site offert. Des résultats chaque mois.
                <br />
                <strong className="text-indigo-600 dark:text-indigo-400">40 à 60% moins cher qu&apos;un salarié.</strong>
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {forfaits.map((f) => (
              <StaggerItem key={f.name}>
                <div className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-300 ${
                  f.popular
                    ? "bg-gradient-to-b from-indigo-600 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 text-white shadow-2xl shadow-indigo-200 dark:shadow-indigo-950 scale-[1.02] lg:scale-105 z-10"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg"
                }`}>
                  {f.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                      Le plus choisi
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <span className="text-3xl mb-2 block">{f.icon}</span>
                    <h3 className={`text-xl font-extrabold ${f.popular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                      {f.name}
                    </h3>
                    <p className={`text-sm font-medium mt-1 ${f.popular ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"}`}>
                      {f.tagline}
                    </p>
                  </div>

                  <p className={`text-sm mb-6 text-center ${f.popular ? "text-indigo-100" : "text-slate-500 dark:text-slate-400"}`}>
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
                      className={`w-full ${f.popular ? "bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg" : ""}`}
                      size="lg"
                    >
                      {f.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {f.popular && (
                    <p className="text-center text-xs text-indigo-200 mt-3">
                      Site internet offert - sans engagement possible
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll>
            <div className="text-center mt-12">
              <Link
                href="/forfait-communication-pme"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                Comparer les forfaits en détail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28">
        <Container>
          <AnimateOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Comment ça marche</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                De l&apos;appel au résultat en 4 étapes
              </h2>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Appel découverte", desc: "20 minutes pour comprendre votre activité, vos objectifs et vos contraintes. Gratuit, sans engagement.", icon: Phone },
              { step: "02", title: "Devis sur-mesure", desc: "Sous 24h, vous recevez une proposition claire et détaillée. Pas de jargon, pas de surprise.", icon: FileText },
              { step: "03", title: "Production", desc: "On lance le projet. Validations à chaque étape, vous gardez le contrôle. Livraison dans les délais.", icon: Zap },
              { step: "04", title: "Résultats", desc: "Votre communication tourne. Reporting mensuel, optimisations continues, résultats mesurables.", icon: TrendingUp },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mb-2">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-widest">{item.step}</div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* OBJECTIONS */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900">
        <Container className="max-w-4xl">
          <AnimateOnScroll>
            <div className="text-center mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">On répond à vos doutes</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                Vous hésitez encore ?
              </h2>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objections.map((obj) => (
              <StaggerItem key={obj.question}>
                <div className="h-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-shadow">
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white mb-3 italic">
                    {obj.question}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {obj.answer}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* GARANTIES */}
      <section className="py-20 lg:py-28">
        <Container className="max-w-4xl">
          <AnimateOnScroll>
            <div className="text-center mb-16 space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Nos engagements</p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
                Zéro risque de votre côté
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Devis gratuit", desc: "On échange, on chiffre, sans engagement. Vous décidez en toute liberté." },
                { icon: Clock, title: "Réponse sous 24h", desc: "Pas d'attente interminable. Votre projet mérite de l'attention." },
                { icon: Star, title: "Satisfaction garantie", desc: "Validations à chaque étape. On ne facture que ce qui vous convient." },
                { icon: Users, title: "Vous êtes propriétaire", desc: "Le site, les photos, les textes - tout vous appartient. Toujours." },
                { icon: TrendingUp, title: "Résultats mesurables", desc: "Reporting mensuel avec les vrais chiffres. Pas de blabla." },
                { icon: MessageSquare, title: "Interlocuteur unique", desc: "Un seul contact qui connaît votre dossier sur le bout des doigts." },
              ].map((item) => (
                <div key={item.title} className="text-center space-y-3 p-6">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
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

      {/* CTA FINAL */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden relative mb-12">
        <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
        <Container className="relative z-10">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Prêt à passer devant vos concurrents ?
              </h2>
              <p className="text-lg text-indigo-100 max-w-xl mx-auto">
                Un appel de 20 minutes suffit pour comprendre vos besoins.
                On vous envoie un devis sous 24h. Gratuit, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button href="/devis" size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl shadow-indigo-900/30 hover:-translate-y-1 transition-all">
                  Demander un devis gratuit
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-bold rounded-2xl text-white border border-white/30 hover:bg-white/10 transition-all">
                  Nous contacter
                </Link>
              </div>
              <p className="text-sm text-indigo-200">
                Rejoignez les 50+ entreprises qui nous font confiance
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  )
}

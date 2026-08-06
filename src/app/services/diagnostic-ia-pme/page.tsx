import type { Metadata } from "next"
import Link from "next/link"
import { buildMetadata } from "@/lib/metadata"
import { getServiceBySlug } from "@/lib/data/services"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProcessSteps } from "@/components/sections/process-steps"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { StickyCta } from "@/components/sections/sticky-cta"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { EligibilitySimulator } from "@/components/tools/eligibility-simulator"
import { RoiCalculatorIa } from "@/components/tools/roi-calculator-ia"
import { CtaIa } from "@/components/sections/cta-ia"
import {
  PLAN_OSEZ_IA,
  DIAG_DATA_IA,
  ACCELERATEUR_IA,
  AUTRES_BRIQUES,
  SOURCES_OFFICIELLES,
  ELIGIBILITE_DIAG_DATA_IA,
  tarifsGlobeCreateur,
  formatTarifGC,
  formatPriseEnCharge,
} from "@/lib/data/dispositif-ia"
import {
  Map,
  Grid3x3,
  TrendingUp,
  Route,
  ShieldCheck,
  Gauge,
  ArrowRight,
  ExternalLink,
  Factory,
  Briefcase,
  Store,
  HardHat,
} from "lucide-react"

const service = getServiceBySlug("diagnostic-ia-pme")!

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: "/services/diagnostic-ia-pme",
  keywords: service.keywords,
})

/* ─── Tarif : chiffre si renseigné, sinon placeholder visible — jamais de chiffre de repli ─── */
function Tarif({ value, prefix }: { value: number | null; prefix?: string }) {
  const formatted = formatTarifGC(value)
  if (formatted)
    return (
      <span className="text-3xl font-bold text-ivory">
        {prefix && <span className="text-base font-medium text-aluminium mr-2">{prefix}</span>}
        {formatted} <span className="text-base font-medium text-aluminium">HT</span>
      </span>
    )
  return (
    <span className="font-mono-accent text-sm font-bold uppercase tracking-widest text-signal">
      [À VÉRIFIER : tarif à confirmer avant publication]
    </span>
  )
}

const livrables = [
  {
    icon: Map,
    title: "Cartographie des processus",
    description:
      "Vos processus clés documentés tels qu'ils fonctionnent réellement : qui fait quoi, avec quels outils, où le temps se perd.",
  },
  {
    icon: Grid3x3,
    title: "Matrice des cas d'usage",
    description:
      "Les usages IA applicables à votre entreprise, croisés valeur ajoutée / effort de mise en œuvre. Pas un catalogue : une sélection.",
  },
  {
    icon: TrendingUp,
    title: "Calcul de ROI par cas d'usage",
    description:
      "Pour chaque cas retenu : temps libéré, coût de mise en œuvre, hypothèses affichées. De quoi décider sur des chiffres, pas des promesses.",
  },
  {
    icon: Route,
    title: "Feuille de route priorisée",
    description:
      "L'ordre dans lequel avancer, ce qui se fait en interne, ce qui se délègue, et les prérequis (données, outils, équipe) de chaque étape.",
  },
  {
    icon: ShieldCheck,
    title: "Analyse de risques",
    description:
      "Données personnelles, confidentialité, dépendance aux outils : ce qu'il faut verrouiller avant de déployer, pas après.",
  },
  {
    icon: Gauge,
    title: "KPI de suivi",
    description:
      "Les indicateurs qui diront si ça marche : temps gagné, qualité, adoption par les équipes. Définis avant le premier déploiement.",
  },
]

const phases = [
  {
    number: "01",
    title: "Immersion & cartographie",
    description:
      "Semaines 1-2. Entretiens avec vos équipes, observation des processus réels. Livrable : cartographie des processus.",
  },
  {
    number: "02",
    title: "Cas d'usage & priorisation",
    description:
      "Semaines 3-4. Identification des usages IA applicables, croisement valeur / effort. Livrable : matrice des cas d'usage.",
  },
  {
    number: "03",
    title: "Chiffrage & feuille de route",
    description:
      "Semaines 5-6. ROI par cas d'usage, analyse de risques, prérequis. Livrables : calculs de ROI, feuille de route, KPI.",
  },
  {
    number: "04",
    title: "Restitution & suite",
    description:
      "Semaine 7. Restitution en direct avec la direction, arbitrages, et si vous le souhaitez : accompagnement de la mise en œuvre.",
  },
]

const casUsageSectoriels = [
  {
    icon: Factory,
    secteur: "Industrie / production",
    exemples:
      "Aide au chiffrage de devis à partir de l'historique, pré-remplissage de documents qualité, analyse des causes de non-conformité.",
  },
  {
    icon: Briefcase,
    secteur: "Services / B2B",
    exemples:
      "Préparation de comptes rendus et de propositions commerciales, qualification des demandes entrantes, veille structurée.",
  },
  {
    icon: Store,
    secteur: "Commerce / distribution",
    exemples:
      "Réponses clients de premier niveau, rédaction de fiches produits, exploitation des avis clients pour améliorer l'offre.",
  },
  {
    icon: HardHat,
    secteur: "BTP / artisanat",
    exemples:
      "Constitution de dossiers d'appels d'offres, suivi des pièces administratives, relances chantiers et sous-traitants.",
  },
]

const faqItems = [
  {
    question: "Qu'est-ce que le Diag Data IA exactement ?",
    answer: `Le ${DIAG_DATA_IA.nom} est un dispositif du plan ${PLAN_OSEZ_IA.nom}, porté par Bpifrance, la DGE et le SGPI dans le cadre de France 2030. C'est une prestation de conseil réalisée par un expert habilité par Bpifrance, étalée sur ${DIAG_DATA_IA.dureeMaxMois} mois maximum : état des lieux technique et opérationnel, identification de cas d'usage concrets, priorisation selon leur valeur ajoutée. La demande se dépose sur le portail officiel diag.bpifrance.fr.`,
  },
  {
    question: "Globe Créateur est-il un expert habilité par Bpifrance ?",
    answer:
      "Non, pas à ce jour. Les experts du Diag Data IA sont sélectionnés par un Comité de Sélection Bpifrance sur critères d'expérience, et nous ne revendiquons aucune habilitation. Ce que nous faisons : nous vous aidons à identifier les dispositifs mobilisables, nous construisons votre dossier avec vous, nous vous orientons vers le bon interlocuteur, et nous accompagnons la mise en œuvre de votre feuille de route. En direct, notre Diagnostic Flash IA est une prestation Globe Créateur indépendante de tout dispositif public.",
  },
  {
    question: "Combien coûte le diagnostic, et quelle est la prise en charge ?",
    answer: `Les paramètres du ${DIAG_DATA_IA.nom} (durée d'intervention, coût, taux de prise en charge) dépendent des conditions en vigueur au moment de votre demande : nous vous communiquons le montant et le taux applicables lors du premier échange, avant tout engagement. Le dispositif bénéficie d'${formatPriseEnCharge()}. Notre Diagnostic Flash IA, lui, est une offre directe dont le tarif est annoncé d'entrée.`,
  },
  {
    question: "Ma TPE de 4 personnes est-elle éligible au Diag Data IA ?",
    answer: `D'après les critères annoncés, non : le dispositif cible les PME et ETI de ${ELIGIBILITE_DIAG_DATA_IA.effectifMin} à ${ELIGIBILITE_DIAG_DATA_IA.effectifMax.toLocaleString("fr-FR")} salariés réalisant au moins ${ELIGIBILITE_DIAG_DATA_IA.caMinEuros / 1_000_000} M€ de chiffre d'affaires. C'est précisément pour les TPE et les structures hors critères que nous proposons le Diagnostic Flash IA : un format court, en direct, sans dossier de financement — un service à part entière, pas une version au rabais.`,
  },
  {
    question: "Combien de temps dure la démarche ?",
    answer: `Le ${DIAG_DATA_IA.nom} est étalé sur ${DIAG_DATA_IA.dureeMaxMois} mois maximum. Notre méthode de diagnostic s'organise sur environ 7 semaines, de l'immersion à la restitution. Le Diagnostic Flash IA est plus court : l'objectif est de vous donner des premiers cas d'usage actionnables rapidement.`,
  },
  {
    question: "Que se passe-t-il après le diagnostic ?",
    answer: `Vous repartez avec une feuille de route priorisée et chiffrée : vous pouvez la mettre en œuvre en interne, avec nous, ou avec un autre prestataire — elle vous appartient. Pour les PME et ETI de plus de ${ACCELERATEUR_IA.eligibilite.effectifMin} collaborateurs réalisant plus de ${ACCELERATEUR_IA.eligibilite.caMinEuros / 1_000_000} M€ de chiffre d'affaires, l'${ACCELERATEUR_IA.nom} (accompagnement individuel sur ${ACCELERATEUR_IA.dureeMois} mois) peut prendre le relais : nous vous orientons vers le bon interlocuteur.`,
  },
  {
    question: "Et la question des données personnelles ?",
    answer:
      "Elle fait partie du diagnostic, pas des angles morts : l'analyse de risques couvre les données personnelles traitées par chaque cas d'usage, les conditions d'utilisation des outils envisagés et les points à verrouiller avant tout déploiement (base légale, sous-traitance, confidentialité des données métier). Aucun cas d'usage n'est recommandé sans cette vérification.",
  },
]

export default function DiagnosticIaPmePage() {
  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        url="/services/diagnostic-ia-pme"
      />
      <FaqSchema items={faqItems} />

      <Breadcrumb
        items={[
          { name: "Services", href: "/services" },
          { name: "Diagnostic & accompagnement IA", href: "/services/diagnostic-ia-pme" },
        ]}
      />

      {/* ─── 1. Hero — le problème du dirigeant, pas la technologie ─── */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-signal text-xs font-bold uppercase tracking-[0.2em] font-mono-accent">
              <span className="h-[3px] w-6 bg-signal" />
              Diagnostic & accompagnement IA — PME et ETI
            </span>
            <h1 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-7xl text-ivory">
              Tout le monde vous parle d&apos;IA. Personne ne vous dit quoi en faire.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-aluminium leading-relaxed max-w-2xl">
              Entre les promesses des éditeurs et les injonctions à « ne pas rater le train », il
              manque l&apos;essentiel : savoir ce que l&apos;IA changerait concrètement dans{" "}
              <em>votre</em> entreprise, pour quel coût et quel gain. C&apos;est exactement le rôle
              d&apos;un diagnostic.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="#simulateur" size="lg" className="group">
                Tester mon éligibilité
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/contact" size="lg" variant="outline">
                Parler à un humain
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. Le constat ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
                — Le constat
              </span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">
                L&apos;écart se creuse entre les PME qui structurent et celles qui bricolent
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="space-y-5 text-aluminium leading-relaxed">
                <p>
                  Dans la plupart des PME, l&apos;IA est déjà là — mais par la petite porte : des
                  essais individuels sur ChatGPT, des outils choisis au hasard des publicités, aucune
                  vision de ce qui mérite vraiment d&apos;être automatisé. Résultat : du temps investi
                  sans gain mesurable, et des données d&apos;entreprise qui circulent dans des outils
                  jamais validés.
                </p>
                <p>
                  L&apos;État en a fait un chantier national : le plan {PLAN_OSEZ_IA.nom}, doté de{" "}
                  {PLAN_OSEZ_IA.enveloppeAnnoncee} dans le cadre de France 2030, vise{" "}
                  {PLAN_OSEZ_IA.objectif}. Ce n&apos;est pas un effet de mode : c&apos;est un signal
                  que l&apos;adoption structurée de l&apos;IA devient un facteur de compétitivité —
                  et qu&apos;il existe désormais des dispositifs pour la financer.
                </p>
                <p className="text-ivory font-medium">
                  La bonne question n&apos;est pas « faut-il y aller ? » mais « par quoi commencer,
                  pour quel retour ? ». C&apos;est une question de méthode, pas de technologie.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 3. Le dispositif Osez l'IA expliqué ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            badge="Le plan Osez l'IA"
            title="Ce que l'État finance, expliqué simplement"
            subtitle={`Un plan national porté par ${PLAN_OSEZ_IA.porteurs[0]}, la ${PLAN_OSEZ_IA.porteurs[1]} et le ${PLAN_OSEZ_IA.porteurs[2]}, qui succède au programme ${PLAN_OSEZ_IA.predecesseur}.`}
            align="left"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <AnimateOnScroll>
              <Card hover className="h-full border-signal/40">
                <span className="font-mono-accent text-xs font-bold uppercase tracking-widest text-signal">
                  La brique centrale
                </span>
                <h3 className="mt-3 text-xl font-bold text-ivory">{DIAG_DATA_IA.nom}</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">{DIAG_DATA_IA.description}</p>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">{DIAG_DATA_IA.selectionExperts}</p>
                <a
                  href={SOURCES_OFFICIELLES.portailDepot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-signal hover:text-[#d62e20] transition-colors"
                >
                  Déposer une demande : diag.bpifrance.fr
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Card>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <Card hover className="h-full">
                <span className="font-mono-accent text-xs font-bold uppercase tracking-widest text-aluminium">
                  Pour aller plus loin
                </span>
                <h3 className="mt-3 text-xl font-bold text-ivory">{ACCELERATEUR_IA.nom}</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">
                  Accompagnement individuel sur {ACCELERATEUR_IA.dureeMois} mois, pour les PME et ETI
                  réalisant plus de {ACCELERATEUR_IA.eligibilite.caMinEuros / 1_000_000} M€ de chiffre
                  d&apos;affaires, avec plus de {ACCELERATEUR_IA.eligibilite.effectifMin}{" "}
                  collaborateurs et au moins {ACCELERATEUR_IA.eligibilite.ancienneteMinAnnees} ans
                  d&apos;existence.
                </p>
              </Card>
            </AnimateOnScroll>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AUTRES_BRIQUES.map((brique) => (
              <AnimateOnScroll key={brique.nom}>
                <div className="rounded-sm border border-[#1c1c1c] bg-[#141414] p-6 h-full">
                  <h3 className="text-sm font-bold text-ivory">{brique.nom}</h3>
                  <p className="mt-2 text-xs text-aluminium leading-relaxed">{brique.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="mt-10 border-l-2 border-signal pl-6 max-w-3xl">
              <p className="text-sm text-aluminium leading-relaxed">
                <strong className="text-ivory">Transparence :</strong> la prestation {DIAG_DATA_IA.nom}{" "}
                est réalisée par un expert habilité par Bpifrance — ce que Globe Créateur n&apos;est
                pas à ce jour. Notre rôle : vous aider à identifier les dispositifs mobilisables,
                construire votre dossier avec vous, vous orienter vers le bon interlocuteur, puis
                mettre en œuvre votre feuille de route. Sources officielles :{" "}
                <a href={SOURCES_OFFICIELLES.catalogueBpifrance} target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory transition-colors">
                  bpifrance.fr
                </a>
                ,{" "}
                <a href={SOURCES_OFFICIELLES.dge} target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory transition-colors">
                  entreprises.gouv.fr
                </a>
                ,{" "}
                <a href={SOURCES_OFFICIELLES.franceNum} target="_blank" rel="noopener noreferrer" className="underline hover:text-ivory transition-colors">
                  francenum.gouv.fr
                </a>
                .
              </p>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ─── 4. La méthode ─── */}
      <ProcessSteps
        badge="Notre méthode"
        title="Sept semaines pour passer du flou à une feuille de route chiffrée"
        subtitle="Chaque phase produit un livrable nommé. Vous savez à tout moment où on en est et ce qui vous reste entre les mains."
        steps={phases}
      />

      {/* ─── 5. Les livrables détaillés ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            badge="Les livrables"
            title="Ce que vous avez en main à la fin"
            subtitle="Pas un rapport qui dort dans un tiroir : des documents de travail que vos équipes utilisent."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livrables.map((l) => (
              <AnimateOnScroll key={l.title}>
                <Card hover className="h-full p-6 lg:p-8">
                  <l.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold text-ivory">{l.title}</h3>
                  <p className="mt-2 text-sm text-aluminium leading-relaxed">{l.description}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── 6. Grille de prix — deux offres distinctes, jamais confondues ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]" id="tarifs">
        <Container>
          <SectionHeader
            badge="Tarifs"
            title="Deux parcours, deux offres — rien de caché"
            subtitle="Selon votre taille et votre situation, le bon point de départ n'est pas le même. Les deux sont des services à part entière."
          />

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Parcours B — offre directe */}
            <AnimateOnScroll>
              <Card className="h-full flex flex-col">
                <span className="font-mono-accent text-xs font-bold uppercase tracking-widest text-aluminium">
                  Offre directe Globe Créateur
                </span>
                <h3 className="mt-3 text-2xl font-bold text-ivory">Diagnostic Flash IA</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed flex-1">
                  Pour les TPE et les structures hors critères du dispositif public. Un format court
                  qui identifie vos premiers cas d&apos;usage, chiffre leur potentiel et vous donne un
                  plan d&apos;action actionnable — sans dossier de financement, sans attente.
                </p>
                <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                  <Tarif value={tarifsGlobeCreateur.diagnosticFlashEuros} />
                </div>
              </Card>
            </AnimateOnScroll>

            {/* Parcours A — accompagnement dispositif */}
            <AnimateOnScroll>
              <Card className="h-full flex flex-col border-signal/40">
                <span className="font-mono-accent text-xs font-bold uppercase tracking-widest text-signal">
                  Adossé au dispositif public
                </span>
                <h3 className="mt-3 text-2xl font-bold text-ivory">Accompagnement {DIAG_DATA_IA.nom}</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed flex-1">
                  Pour les PME et ETI qui entrent dans les critères annoncés du {DIAG_DATA_IA.nom}.
                  Nous cadrons vos priorités, construisons le dossier avec vous et vous orientons vers
                  le bon interlocuteur — la prestation cofinancée elle-même est réalisée par un expert
                  habilité par Bpifrance. Le dispositif bénéficie d&apos;{formatPriseEnCharge()} ;
                  nous vous communiquons le montant et le taux en vigueur lors du premier échange.
                </p>
                <div className="mt-6 pt-6 border-t border-[#2a2a2a]">
                  <Tarif value={tarifsGlobeCreateur.accompagnementEuros} prefix="à partir de" />
                </div>
              </Card>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll>
            <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-aluminium leading-relaxed">
              <strong className="text-ivory">Pour éviter toute confusion :</strong> le Diagnostic
              Flash IA est une prestation Globe Créateur, indépendante de tout dispositif public. Le{" "}
              {DIAG_DATA_IA.nom} est un dispositif Bpifrance, réalisé par un expert habilité, avec ses
              propres conditions et sa propre tarification. Ce sont deux produits différents — et
              nous vous dirons honnêtement lequel correspond à votre situation.
            </p>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ─── 7. Simulateur d'éligibilité ─── */}
      <section className="py-20 lg:py-28 scroll-mt-20" id="simulateur">
        <Container>
          <SectionHeader
            badge="Simulateur"
            title="Quel parcours pour votre entreprise ?"
            subtitle="Sept questions pour savoir si vous entrez dans les critères annoncés du dispositif — et sinon, par où commencer."
          />
          <EligibilitySimulator />
        </Container>
      </section>

      {/* ─── Calculateur ROI (aperçu du livrable) ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <SectionHeader
            badge="Calculateur"
            title="Combien de temps dort dans vos tâches répétitives ?"
            subtitle="Un ordre de grandeur en trente secondes, hypothèses affichées. Le chiffrage réel, processus par processus, fait partie du diagnostic."
          />
          <RoiCalculatorIa />
        </Container>
      </section>

      {/* ─── 8. Preuves : cas d'usage sectoriels + références ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeader
            badge="Concrètement"
            title="Ce que ça change, métier par métier"
            subtitle="Des exemples de cas d'usage réalistes par secteur — le diagnostic identifie ceux qui s'appliquent à votre entreprise."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {casUsageSectoriels.map((c) => (
              <AnimateOnScroll key={c.secteur}>
                <Card hover className="h-full p-6 lg:p-8">
                  <div className="flex items-center gap-3">
                    <c.icon className="h-5 w-5 text-signal" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-ivory">{c.secteur}</h3>
                  </div>
                  <p className="mt-3 text-sm text-aluminium leading-relaxed">{c.exemples}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>

          {/*
            Emplacement réservé — preuves sociales de l'offre IA.
            Si l'habilitation expert Diag Data IA est obtenue, elle sera mentionnée ICI,
            explicitement, avec sa date. Ne rien afficher avant. De même pour les premiers
            retours clients de l'offre IA : aucun cas client inventé, jamais.
          */}

          <AnimateOnScroll>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <Link
                href="/projets"
                className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors"
              >
                Voir nos projets
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/temoignages"
                className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors"
              >
                Ce que disent nos clients
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services/automatisation-nocode-dijon"
                className="inline-flex items-center gap-1.5 font-bold text-ivory hover:text-signal transition-colors"
              >
                Notre offre automatisation no-code
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ─── 9. FAQ ─── */}
      <FaqAccordion items={faqItems} title="Questions fréquentes" badge="FAQ" />

      {/* ─── 10. CTA final ─── */}
      <CtaIa intensity="fort" ctaHref="/contact" />

      <StickyCta />
    </>
  )
}

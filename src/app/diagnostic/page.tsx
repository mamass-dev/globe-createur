"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Check, X, Sparkles } from "lucide-react"

/* ─── DIAGNOSTIC DATA ─── */

type Answer = { label: string; value: string; icon?: string }
type Question = { id: string; question: string; subtext: string; answers: Answer[] }

const questions: Question[] = [
  {
    id: "site",
    question: "Vous avez un site internet ?",
    subtext: "Soyez honnete, c'est entre nous.",
    answers: [
      { label: "Non, rien du tout", value: "none", icon: "🚫" },
      { label: "Oui, mais il date", value: "old", icon: "🕸️" },
      { label: "Oui, il est correct", value: "ok", icon: "👍" },
      { label: "Oui, mais il ne ramene rien", value: "dead", icon: "💀" },
    ],
  },
  {
    id: "clients",
    question: "D'ou viennent vos clients aujourd'hui ?",
    subtext: "La vraie reponse, pas celle que vous aimeriez donner.",
    answers: [
      { label: "Bouche a oreille", value: "word", icon: "🗣️" },
      { label: "Google / SEO", value: "seo", icon: "🔍" },
      { label: "Reseaux sociaux", value: "social", icon: "📱" },
      { label: "Je ne sais pas", value: "unknown", icon: "🤷" },
    ],
  },
  {
    id: "problem",
    question: "C'est quoi votre vrai probleme ?",
    subtext: "Celui qui vous empeche de dormir.",
    answers: [
      { label: "Pas assez de clients", value: "clients", icon: "📉" },
      { label: "Pas le temps pour la com'", value: "time", icon: "⏰" },
      { label: "Je ne sais pas par ou commencer", value: "lost", icon: "🧭" },
      { label: "Mon site ne convertit pas", value: "conversion", icon: "🔄" },
    ],
  },
  {
    id: "sector",
    question: "Vous faites quoi ?",
    subtext: "Pour qu'on parle la meme langue.",
    answers: [
      { label: "Artisan / BTP", value: "artisan", icon: "🔨" },
      { label: "Restaurant / Hotellerie", value: "horeca", icon: "🍽️" },
      { label: "Commerce / E-commerce", value: "commerce", icon: "🛍️" },
      { label: "Profession liberale", value: "liberal", icon: "⚖️" },
      { label: "Bien-etre / Sante", value: "sante", icon: "🧘" },
      { label: "Immobilier", value: "immobilier", icon: "🏠" },
      { label: "Evenementiel", value: "evenementiel", icon: "🎉" },
      { label: "Autre PME / Services", value: "services", icon: "💼" },
    ],
  },
]

/* ─── FORFAITS ─── */

type Forfait = {
  name: string
  tagline: string
  why: string
  features: string[]
}

const FORFAITS: Record<string, Forfait> = {
  essentiel: {
    name: "Essentiel",
    tagline: "Poser les fondations",
    why: "Vous partez de zero ou presque. Il faut d'abord exister en ligne avant de vouloir performer.",
    features: [
      "Site internet offert",
      "Pilotage mensuel personnalise",
      "1 reseau social optimise",
      "Contenus adaptes a vos priorites",
      "Support email sous 24h",
    ],
  },
  croissance: {
    name: "Croissance",
    tagline: "Accelerer la visibilite",
    why: "Vous avez les bases mais pas les resultats. Il faut passer a la vitesse superieure avec du contenu regulier et du SEO serieux.",
    features: [
      "Tout Essentiel +",
      "2 reseaux sociaux geres",
      "Shooting photo mensuel",
      "Plan editorial & contenus mensuels",
      "SEO local avance",
      "Reporting mensuel detaille",
    ],
  },
  performance: {
    name: "Performance",
    tagline: "Dominer le marche",
    why: "Vous avez besoin d'une machine de guerre. Communication complete, automatisee, avec un chef de projet dedie qui pilote tout.",
    features: [
      "Tout Croissance +",
      "Video pro mensuelle",
      "Gestion complete des reseaux",
      "CRM & automatisations",
      "Campagnes Meta / LinkedIn",
      "Chef de projet dedie",
    ],
  },
}

/* ─── CASE STUDIES & SECTOR ACTIONS ─── */

type CaseStudy = { name: string; before: string; after: string; metric: string }

const CASE_STUDIES: Record<string, CaseStudy> = {
  artisan: { name: "Artisan plombier a Dijon", before: "0 demande en ligne, 100% bouche a oreille", after: "12 demandes de devis/mois via le site en 3 mois", metric: "+12 leads/mois" },
  horeca: { name: "Restaurant gastronomique a Beaune", before: "Site de 2019, 200 visites/mois, 0 reservation en ligne", after: "1 200 visites/mois, 35 reservations/mois", metric: "x6 en trafic" },
  commerce: { name: "Boutique deco a Chalon-sur-Saone", before: "Zero visibilite en ligne, clients uniquement en magasin", after: "Click & collect lance, +40% de CA en 4 mois", metric: "+40% de CA" },
  liberal: { name: "Cabinet comptable a Dijon", before: "Page 3 de Google, 2 demandes/mois", after: "Top 3 local, 18 demandes/mois", metric: "x9 en leads" },
  sante: { name: "Osteopathe a Beaune", before: "Agenda rempli uniquement par bouche a oreille, 0 avis Google", after: "42 avis Google, planning complet 3 semaines a l'avance", metric: "Planning complet" },
  immobilier: { name: "Agence immobiliere a Dijon", before: "Dependance totale aux portails (SeLoger, LeBonCoin)", after: "35% des mandats viennent du site direct", metric: "35% de mandats directs" },
  evenementiel: { name: "Salle de reception en Cote-d'Or", before: "Site sans photos pro, 3 demandes/mois", after: "Shooting pro + SEO, 22 demandes/mois", metric: "x7 en demandes" },
  services: { name: "PME de services a Dijon", before: "Communication inexistante, 100% bouche a oreille", after: "Site + SEO + reseaux : pipeline de prospects regulier", metric: "+200% de demandes" },
}

const SECTOR_ACTIONS: Record<string, string[]> = {
  artisan: ["Site vitrine avec formulaire de demande de devis", "SEO local sur vos metiers + zone d'intervention", "Fiche Google Business avec photos de chantiers"],
  horeca: ["Site avec menu en ligne, photos pro et reservation", "SEO local + fiche Google avec avis clients", "Instagram professionnel avec contenu regulier"],
  commerce: ["Site e-commerce ou vitrine avec catalogue produits", "SEO local + Google Shopping si pertinent", "Reseaux sociaux avec mise en avant des produits"],
  liberal: ["Site sobre et professionnel qui inspire confiance", "SEO local sur votre specialite + ville", "Gestion des avis Google et reputation en ligne"],
  sante: ["Site avec prise de rendez-vous en ligne", "SEO local sur votre discipline + zone", "Fiche Google optimisee avec avis patients"],
  immobilier: ["Site avec annonces dynamiques et pages de quartier", "SEO local par ville, quartier et type de bien", "Contenu regulier : guides acheteurs, tendances marche"],
  evenementiel: ["Site immersif avec galeries photo/video des evenements", "SEO saisonnier et campagnes ciblees", "Instagram et Pinterest pour la mise en valeur visuelle"],
  services: ["Site multi-pages detaillant chaque service", "SEO local sur vos expertises + zone geographique", "Strategie de contenu pour demontrer votre expertise"],
}

/* ─── PROFILE BUILDER ─── */

type Profile = {
  title: string
  problems: string[]
  actions: string[]
  lost: string
  caseStudy: CaseStudy
  forfait: string
}

function getProfile(answers: Record<string, string>): Profile {
  const noSite = answers.site === "none"
  const deadSite = answers.site === "dead" || answers.site === "old"
  const noClients = answers.problem === "clients" || answers.problem === "conversion"
  const noTime = answers.problem === "time"
  const sector = answers.sector || "services"
  const caseStudy = CASE_STUDIES[sector] || CASE_STUDIES.services
  const sectorActions = SECTOR_ACTIONS[sector] || SECTOR_ACTIONS.services

  if (noSite) {
    return {
      title: "Vous etes invisible. Completement.",
      problems: [
        "Vos concurrents captent 100% du trafic Google que vous pourriez avoir",
        "Les prospects qui cherchent votre metier dans votre ville ne vous trouvent pas",
        "Vous dependez entierement du bouche a oreille - le jour ou il s'arrete, vous aussi",
      ],
      actions: sectorActions,
      lost: "5 a 15 demandes par mois",
      caseStudy,
      forfait: "essentiel",
    }
  }

  if (deadSite && noTime) {
    return {
      title: "Votre site vous coute de l'argent. Et vous n'avez pas le temps.",
      problems: [
        "Un site lent ou date fait fuir 53% des visiteurs en moins de 3 secondes",
        "Vous savez qu'il faut agir mais chaque heure sur la com' est une heure perdue sur votre metier",
        "Sans equipe dediee, votre communication stagne et vos concurrents avancent",
      ],
      actions: ["Refonte complete avec un design moderne et performant", ...sectorActions.slice(1), "Pilotage complet - on gere tout, vous recevez un reporting"],
      lost: "10 a 15 heures par semaine + la majorite de votre trafic potentiel",
      caseStudy,
      forfait: "performance",
    }
  }

  if (deadSite) {
    return {
      title: "Votre site travaille contre vous.",
      problems: [
        "Un site lent ou date fait fuir 53% des visiteurs en moins de 3 secondes",
        "Google penalise les sites non-responsive et mal optimises",
        "Vos concurrents avec un site moderne captent vos prospects",
      ],
      actions: ["Refonte complete - design moderne, performance <1 seconde", ...sectorActions.slice(1)],
      lost: "40 a 60% de votre trafic potentiel",
      caseStudy,
      forfait: "croissance",
    }
  }

  if (noClients) {
    return {
      title: "Votre site existe. Mais personne ne le voit.",
      problems: [
        "Avoir un site ne suffit pas - sans SEO, c'est une brochure dans un tiroir",
        "Vos concurrents investissent dans du contenu et vous passent devant chaque mois",
        "Sans strategie d'acquisition, vous subissez au lieu de piloter",
      ],
      actions: sectorActions,
      lost: "entre 3 000 et 15 000 euros de CA par mois",
      caseStudy,
      forfait: "croissance",
    }
  }

  if (noTime) {
    return {
      title: "Vous le savez. Mais vous n'avez pas le temps.",
      problems: [
        "Chaque heure que vous passez sur votre com', c'est une heure en moins sur votre metier",
        "Publier quand on y pense, c'est pire que ne rien publier - c'est incoherent",
        "Sans regularite, Google et les reseaux sociaux vous oublient",
      ],
      actions: ["Un interlocuteur unique qui gere tout pour vous", ...sectorActions.slice(1), "Reporting mensuel - vous savez ce qui se passe sans y passer du temps"],
      lost: "10 a 15 heures par semaine de votre temps",
      caseStudy,
      forfait: "performance",
    }
  }

  return {
    title: "Vous avez du potentiel. Il faut le debloquer.",
    problems: [
      "Votre presence digitale ne reflete pas la qualite de votre travail",
      "Vos concurrents communiquent mieux, pas parce qu'ils sont meilleurs",
      "Chaque mois sans strategie digitale, c'est du terrain cede",
    ],
    actions: sectorActions,
    lost: "un avantage concurrentiel qui se creuse chaque jour",
    caseStudy,
    forfait: "essentiel",
  }
}

/* ─── ANIMATION ─── */

const fadeSlide = {
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  exit: { opacity: 0, y: -30 } as const,
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const,
}

/* ─── PAGE ─── */

export default function DiagnosticPage() {
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro")
  const [questionIdx, setQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  function handleAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    if (questionIdx < questions.length - 1) {
      setTimeout(() => setQuestionIdx((i) => i + 1), 300)
    } else {
      setTimeout(() => setStep("result"), 400)
    }
  }

  function goBack() {
    if (questionIdx > 0) setQuestionIdx((i) => i - 1)
    else setStep("intro")
  }

  function restart() {
    setStep("intro")
    setQuestionIdx(0)
    setAnswers({})
  }

  const profile = getProfile(answers)
  const reco = FORFAITS[profile.forfait]

  return (
    <>
      <AnimatePresence mode="wait">
        {/* ─── INTRO ─── */}
        {step === "intro" && (
          <motion.div key="intro" {...fadeSlide}>
            <section className="relative py-16 lg:py-24 min-h-[85dvh] flex items-center">
              <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
              <Container className="relative">
                <Badge variant="primary" className="mb-6">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  Diagnostic gratuit - 2 minutes
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl">
                  On ne va pas vous vendre{" "}
                  <span className="text-gradient">un forfait.</span>
                </h1>

                <p className="mt-6 text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  D&apos;abord, on veut comprendre votre situation.
                  4 questions. Zero bullshit. A la fin, vous saurez exactement
                  ce que vous perdez chaque mois — et ce qu&apos;on ferait pour vous.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setStep("quiz")} size="lg">
                    Commencer le diagnostic
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button href="/devis" variant="outline" size="lg">
                    Je sais deja ce que je veux
                  </Button>
                </div>

                <div className="mt-16 flex items-center gap-6 text-sm text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" /> Gratuit
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" /> Sans engagement
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" /> Resultat immediat
                  </span>
                </div>
              </Container>
            </section>
          </motion.div>
        )}

        {/* ─── QUIZ ─── */}
        {step === "quiz" && (
          <motion.div key={`quiz-${questionIdx}`} {...fadeSlide}>
            <section className="relative py-16 lg:py-24 min-h-[85dvh] flex items-center">
              <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
              <Container className="relative max-w-3xl">
                {/* Progress */}
                <div className="flex gap-2 mb-12">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        i <= questionIdx
                          ? "bg-indigo-600 dark:bg-indigo-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mb-10 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                <Badge variant="mono" className="mb-4">
                  Question {questionIdx + 1} / {questions.length}
                </Badge>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  {questions[questionIdx].question}
                </h2>
                <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 italic">
                  {questions[questionIdx].subtext}
                </p>

                <div className={`grid gap-4 mt-10 ${
                  questions[questionIdx].answers.length > 4
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {questions[questionIdx].answers.map((answer) => {
                    const isSelected = answers[questions[questionIdx].id] === answer.value
                    return (
                      <button
                        key={answer.value}
                        onClick={() => handleAnswer(questions[questionIdx].id, answer.value)}
                        className={`group text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 dark:border-indigo-500 bg-indigo-600 dark:bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-950"
                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/50"
                        }`}
                      >
                        <span className="text-2xl mb-3 block">{answer.icon}</span>
                        <span className={`text-base font-bold ${
                          isSelected ? "text-white" : "text-slate-900 dark:text-white"
                        }`}>
                          {answer.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Container>
            </section>
          </motion.div>
        )}

        {/* ─── RESULT ─── */}
        {step === "result" && (
          <motion.div key="result" {...fadeSlide}>
            {/* Header */}
            <section className="relative py-16 lg:py-24">
              <div className="dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
              <Container className="relative max-w-4xl">
                <Badge variant="primary" className="mb-6">
                  <Sparkles className="h-3 w-3 mr-1.5" />
                  Votre diagnostic
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                  {profile.title}
                </h1>
              </Container>
            </section>

            {/* Problems */}
            <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <Badge className="bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900">
                      Ce qui vous coute
                    </Badge>
                  </div>
                  <div className="lg:col-span-8 space-y-5">
                    {profile.problems.map((p) => (
                      <div key={p} className="flex items-start gap-4">
                        <X className="h-5 w-5 text-red-400 shrink-0 mt-1" />
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{p}</p>
                      </div>
                    ))}
                    <div className="mt-6 rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-800 p-6">
                      <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">
                        Estimation de perte mensuelle
                      </p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400">
                        {profile.lost}
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* Actions */}
            <section className="py-16 lg:py-20">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <Badge className="bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900">
                      Ce qu&apos;on ferait
                    </Badge>
                  </div>
                  <div className="lg:col-span-8 space-y-5">
                    {profile.actions.map((a, i) => (
                      <div key={a} className="flex items-start gap-4">
                        <span className="h-8 w-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed pt-1">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>

            {/* Case study */}
            <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <Badge variant="mono">Cas similaire</Badge>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 space-y-6">
                      <p className="font-extrabold text-slate-900 dark:text-white text-xl">
                        {profile.caseStudy.name}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Avant</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{profile.caseStudy.before}</p>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">Apres</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{profile.caseStudy.after}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-3xl sm:text-4xl font-extrabold text-gradient">
                          {profile.caseStudy.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* Recommended forfait */}
            <section className="py-16 lg:py-20">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <Badge variant="primary">Notre recommandation</Badge>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="rounded-[2rem] border-2 border-indigo-200 dark:border-indigo-700 overflow-hidden shadow-xl shadow-indigo-100/50 dark:shadow-indigo-950/50">
                      <div className="bg-indigo-600 dark:bg-indigo-700 px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-white font-extrabold text-2xl tracking-tight">{reco.name}</p>
                          <p className="text-indigo-200 text-sm font-medium">{reco.tagline}</p>
                        </div>
                        <span className="inline-flex items-center bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shrink-0">
                          Recommande pour vous
                        </span>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-8 space-y-6">
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {reco.why}
                        </p>

                        <ul className="space-y-3">
                          {reco.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                              <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Button href="/devis" size="lg">
                            Demander un devis {reco.name}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Link
                            href="/forfait-communication-pme"
                            className="text-sm text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            Comparer tous les forfaits →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* CTA final */}
            <section className="py-20 lg:py-28 bg-indigo-600 dark:bg-indigo-950 rounded-[3rem] mx-4 lg:mx-12 overflow-hidden relative mb-12">
              <div className="absolute inset-0 opacity-10 dot-grid pointer-events-none" />
              <Container className="relative z-10 max-w-3xl text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                  On en parle ?
                </h2>
                <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
                  20 minutes pour echanger sur votre projet. Gratuit, sans engagement.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Button href="/devis" size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-xl shadow-indigo-900/30 hover:-translate-y-0.5 transition-all">
                    Prendre rendez-vous
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-bold rounded-2xl text-white border border-white/30 hover:bg-white/10 transition-all"
                  >
                    Nous contacter
                  </Link>
                </div>
                <button
                  onClick={restart}
                  className="mt-8 text-sm text-indigo-200 hover:text-white transition-colors cursor-pointer"
                >
                  ← Refaire le diagnostic
                </button>
              </Container>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

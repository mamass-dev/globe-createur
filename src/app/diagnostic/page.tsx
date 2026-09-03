"use client"

import { useState } from "react"
import Link from "next/link"
import { trackAttrs } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Check, X, Sparkles } from "lucide-react"

/* ─── DIAGNOSTIC DATA ─── */

type Answer = { label: string; value: string; icon?: string }
type Question = { id: string; question: string; subtext: string; answers: Answer[] }

const questions: Question[] = [
  {
    id: "site",
    question: "Vous avez un site internet ?",
    subtext: "Soyez honnête, c'est entre nous.",
    answers: [
      { label: "Non, rien du tout", value: "none", icon: "🚫" },
      { label: "Oui, mais il date", value: "old", icon: "🕸️" },
      { label: "Oui, il est correct", value: "ok", icon: "👍" },
      { label: "Oui, mais il ne ramène rien", value: "dead", icon: "💀" },
    ],
  },
  {
    id: "clients",
    question: "D'où viennent vos clients aujourd'hui ?",
    subtext: "La vraie réponse, pas celle que vous aimeriez donner.",
    answers: [
      { label: "Bouche à oreille", value: "word", icon: "🗣️" },
      { label: "Google / SEO", value: "seo", icon: "🔍" },
      { label: "Réseaux sociaux", value: "social", icon: "📱" },
      { label: "Je ne sais pas", value: "unknown", icon: "🤷" },
    ],
  },
  {
    id: "problem",
    question: "C'est quoi votre vrai problème ?",
    subtext: "Celui qui vous empêche de dormir.",
    answers: [
      { label: "Pas assez de clients", value: "clients", icon: "📉" },
      { label: "Pas le temps pour la com'", value: "time", icon: "⏰" },
      { label: "Je ne sais pas par où commencer", value: "lost", icon: "🧭" },
      { label: "Mon site ne convertit pas", value: "conversion", icon: "🔄" },
    ],
  },
  {
    id: "sector",
    question: "Vous faites quoi ?",
    subtext: "Pour qu'on parle la même langue.",
    answers: [
      { label: "Artisan / BTP", value: "artisan", icon: "🔨" },
      { label: "Restaurant / Hôtellerie", value: "horeca", icon: "🍽️" },
      { label: "Commerce / E-commerce", value: "commerce", icon: "🛍️" },
      { label: "Profession libérale", value: "liberal", icon: "⚖️" },
      { label: "Bien-être / Santé", value: "sante", icon: "🧘" },
      { label: "Immobilier", value: "immobilier", icon: "🏠" },
      { label: "Événementiel", value: "evenementiel", icon: "🎉" },
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
    why: "Vous partez de zéro ou presque. Il faut d'abord exister en ligne avant de vouloir performer.",
    features: [
      "Site internet offert",
      "Pilotage mensuel personnalisé",
      "1 réseau social optimisé",
      "Contenus adaptés à vos priorités",
      "Support email sous 24h",
    ],
  },
  croissance: {
    name: "Croissance",
    tagline: "Accélérer la visibilité",
    why: "Vous avez les bases mais pas les résultats. Il faut passer à la vitesse supérieure avec du contenu régulier et du SEO sérieux.",
    features: [
      "Tout Essentiel +",
      "2 réseaux sociaux gérés",
      "Shooting photo mensuel",
      "Plan éditorial & contenus mensuels",
      "SEO local avancé",
      "Reporting mensuel détaillé",
    ],
  },
  performance: {
    name: "Performance",
    tagline: "Dominer le marché",
    why: "Vous avez besoin d'une machine de guerre. Communication complète, automatisée, avec un chef de projet dédié qui pilote tout.",
    features: [
      "Tout Croissance +",
      "Vidéo pro mensuelle",
      "Gestion complète des réseaux",
      "CRM & automatisations",
      "Campagnes Meta / LinkedIn",
      "Chef de projet dédié",
    ],
  },
}

/* ─── CASE STUDIES & SECTOR ACTIONS ─── */

type CaseStudy = { name: string; before: string; after: string; metric: string }

const CASE_STUDIES: Record<string, CaseStudy> = {
  artisan: { name: "Artisan plombier à Dijon", before: "0 demande en ligne, 100% bouche à oreille", after: "12 demandes de devis/mois via le site en 3 mois", metric: "+12 leads/mois" },
  horeca: { name: "Restaurant gastronomique à Beaune", before: "Site de 2019, 200 visites/mois, 0 réservation en ligne", after: "1 200 visites/mois, 35 réservations/mois", metric: "x6 en trafic" },
  commerce: { name: "Boutique déco à Chalon-sur-Saône", before: "Zéro visibilité en ligne, clients uniquement en magasin", after: "Click & collect lancé, +40% de CA en 4 mois", metric: "+40% de CA" },
  liberal: { name: "Cabinet comptable à Dijon", before: "Page 3 de Google, 2 demandes/mois", after: "Top 3 local, 18 demandes/mois", metric: "x9 en leads" },
  sante: { name: "Ostéopathe à Beaune", before: "Agenda rempli uniquement par bouche à oreille, 0 avis Google", after: "42 avis Google, planning complet 3 semaines à l'avance", metric: "Planning complet" },
  immobilier: { name: "Agence immobilière à Dijon", before: "Dépendance totale aux portails (SeLoger, LeBonCoin)", after: "35% des mandats viennent du site direct", metric: "35% de mandats directs" },
  evenementiel: { name: "Salle de réception en Côte-d'Or", before: "Site sans photos pro, 3 demandes/mois", after: "Shooting pro + SEO, 22 demandes/mois", metric: "x7 en demandes" },
  services: { name: "PME de services à Dijon", before: "Communication inexistante, 100% bouche à oreille", after: "Site + SEO + réseaux : pipeline de prospects régulier", metric: "+200% de demandes" },
}

const SECTOR_ACTIONS: Record<string, string[]> = {
  artisan: ["Site vitrine avec formulaire de demande de devis", "SEO local sur vos métiers + zone d'intervention", "Fiche Google Business avec photos de chantiers"],
  horeca: ["Site avec menu en ligne, photos pro et réservation", "SEO local + fiche Google avec avis clients", "Instagram professionnel avec contenu régulier"],
  commerce: ["Site e-commerce ou vitrine avec catalogue produits", "SEO local + Google Shopping si pertinent", "Réseaux sociaux avec mise en avant des produits"],
  liberal: ["Site sobre et professionnel qui inspire confiance", "SEO local sur votre spécialité + ville", "Gestion des avis Google et réputation en ligne"],
  sante: ["Site avec prise de rendez-vous en ligne", "SEO local sur votre discipline + zone", "Fiche Google optimisée avec avis patients"],
  immobilier: ["Site avec annonces dynamiques et pages de quartier", "SEO local par ville, quartier et type de bien", "Contenu régulier : guides acheteurs, tendances marché"],
  evenementiel: ["Site immersif avec galeries photo/vidéo des événements", "SEO saisonnier et campagnes ciblées", "Instagram et Pinterest pour la mise en valeur visuelle"],
  services: ["Site multi-pages détaillant chaque service", "SEO local sur vos expertises + zone géographique", "Stratégie de contenu pour démontrer votre expertise"],
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
      title: "Vous êtes invisible. Complètement.",
      problems: [
        "Vos concurrents captent 100% du trafic Google que vous pourriez avoir",
        "Les prospects qui cherchent votre métier dans votre ville ne vous trouvent pas",
        "Vous dépendez entièrement du bouche à oreille - le jour où il s'arrête, vous aussi",
      ],
      actions: sectorActions,
      lost: "5 à 15 demandes par mois",
      caseStudy,
      forfait: "essentiel",
    }
  }

  if (deadSite && noTime) {
    return {
      title: "Votre site vous coûte de l'argent. Et vous n'avez pas le temps.",
      problems: [
        "Un site lent ou daté fait fuir 53% des visiteurs en moins de 3 secondes",
        "Vous savez qu'il faut agir mais chaque heure sur la com' est une heure perdue sur votre métier",
        "Sans équipe dédiée, votre communication stagne et vos concurrents avancent",
      ],
      actions: ["Refonte complète avec un design moderne et performant", ...sectorActions.slice(1), "Pilotage complet - on gère tout, vous recevez un reporting"],
      lost: "10 à 15 heures par semaine + la majorité de votre trafic potentiel",
      caseStudy,
      forfait: "performance",
    }
  }

  if (deadSite) {
    return {
      title: "Votre site travaille contre vous.",
      problems: [
        "Un site lent ou daté fait fuir 53% des visiteurs en moins de 3 secondes",
        "Google pénalise les sites non-responsive et mal optimisés",
        "Vos concurrents avec un site moderne captent vos prospects",
      ],
      actions: ["Refonte complète - design moderne, performance <1 seconde", ...sectorActions.slice(1)],
      lost: "40 à 60% de votre trafic potentiel",
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
        "Sans stratégie d'acquisition, vous subissez au lieu de piloter",
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
        "Chaque heure que vous passez sur votre com', c'est une heure en moins sur votre métier",
        "Publier quand on y pense, c'est pire que ne rien publier - c'est incohérent",
        "Sans régularité, Google et les réseaux sociaux vous oublient",
      ],
      actions: ["Un interlocuteur unique qui gère tout pour vous", ...sectorActions.slice(1), "Reporting mensuel - vous savez ce qui se passe sans y passer du temps"],
      lost: "10 à 15 heures par semaine de votre temps",
      caseStudy,
      forfait: "performance",
    }
  }

  return {
    title: "Vous avez du potentiel. Il faut le débloquer.",
    problems: [
      "Votre présence digitale ne reflète pas la qualité de votre travail",
      "Vos concurrents communiquent mieux, pas parce qu'ils sont meilleurs",
      "Chaque mois sans stratégie digitale, c'est du terrain cédé",
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
                  4 questions. Zéro bullshit. À la fin, vous saurez exactement
                  ce que vous perdez chaque mois — et ce qu&apos;on ferait pour vous.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => setStep("quiz")} size="lg">
                    Commencer le diagnostic
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <Button href="/devis" variant="outline" size="lg">
                    Je sais déjà ce que je veux
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
                    <Check className="h-4 w-4 text-green-500" /> Résultat immédiat
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
                      Ce qui vous coûte
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
                          <p className="text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-2">Après</p>
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
                          Recommandé pour vous
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

                        <div className="pt-4 flex items-center gap-4 flex-wrap">
                          <Button href="/devis">
                            Demander un devis {reco.name}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button href="/forfait-communication-pme" variant="ghost">
                            Comparer les forfaits
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* CTA - Contact Axel */}
            <section className="py-16 lg:py-20">
              <Container className="max-w-4xl">
                <div className="relative rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 border border-indigo-100 dark:border-indigo-900/50 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                  <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
                    <div className="shrink-0">
                      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl">
                        <Image
                          src="/images/team/axel-masson.webp"
                          alt="Axel Masson - Globe Créateur"
                          fill
                          sizes="192px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
                          On en parle ?
                        </p>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                          Axel Masson
                        </h3>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                          Co-fondateur - Stratégie & Web
                        </p>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base max-w-lg">
                        J&apos;ai lu votre diagnostic. 20 minutes d&apos;échange suffisent pour
                        valider ces recommandations ensemble et voir comment on peut vous aider concrètement.
                        Sans engagement, sans bullshit.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                        <Link
                          href="/devis"
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-lg shadow-indigo-600/25 whitespace-nowrap"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          Prendre rendez-vous
                        </Link>
                        <a
                          href={`https://wa.me/33678978705?text=${encodeURIComponent("Bonjour Axel, je viens de faire le diagnostic sur votre site et j'aimerais en discuter.")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...trackAttrs("whatsapp_click", { location: "diagnostic" })}
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-colors shadow-lg shadow-green-600/25 hover:opacity-90"
                          style={{ backgroundColor: "#25D366" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-4 w-4" aria-hidden="true">
                            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.392 1.106-1.94 2.024-3.2 2.292-.862.182-1.986.328-5.774-1.242-4.846-2.008-7.962-6.924-8.204-7.244-.232-.32-1.94-2.586-1.94-4.934 0-2.348 1.228-3.502 1.664-3.98.392-.432 1.036-.628 1.65-.628.198 0 .376.01.536.018.474.02.712.048 1.024.792.392.932 1.348 3.28 1.464 3.518.118.238.232.554.074.872-.148.328-.278.474-.516.746-.238.272-.464.48-.702.774-.218.258-.464.534-.196.998.268.456 1.19 1.964 2.558 3.182 1.758 1.564 3.238 2.05 3.698 2.274.358.178.786.148 1.066-.148.356-.376.796-.998 1.244-1.612.318-.436.72-.49 1.112-.338.398.148 2.518 1.188 2.95 1.404.432.218.72.326.826.504.106.178.106 1.036-.286 2.142l-.048-.008z" />
                          </svg>
                          WhatsApp
                        </a>
                        <a
                          href="https://www.linkedin.com/in/axelmasson/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={restart}
                    className="text-sm text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    ← Refaire le diagnostic
                  </button>
                </div>
              </Container>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

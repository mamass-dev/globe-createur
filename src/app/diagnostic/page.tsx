"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { ArrowRight, ArrowLeft, Check, X } from "lucide-react"

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
      { label: "Restaurant / Hotel", value: "horeca", icon: "🍽️" },
      { label: "Commerce / E-commerce", value: "commerce", icon: "🛍️" },
      { label: "Services / Liberal", value: "services", icon: "💼" },
    ],
  },
]

/* ─── FORFAITS ─── */

type Forfait = {
  name: string
  tagline: string
  why: string
  features: string[]
  href: string
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
    href: "/devis",
  },
  croissance: {
    name: "Croissance",
    tagline: "Accelerer la visibilite",
    why: "Vous avez les bases mais pas les resultats. Il faut passer a la vitesse superieure avec du contenu regulier et du SEO sérieux.",
    features: [
      "Tout Essentiel +",
      "2 reseaux sociaux geres",
      "Shooting photo mensuel",
      "Plan editorial & contenus mensuels",
      "SEO local avance",
      "Reporting mensuel detaille",
    ],
    href: "/devis",
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
    href: "/devis",
  },
}

/* ─── PROFILES ─── */

type Profile = {
  title: string
  problems: string[]
  actions: string[]
  lost: string
  caseStudy: { name: string; before: string; after: string; metric: string }
  forfait: string
}

function getProfile(answers: Record<string, string>): Profile {
  const noSite = answers.site === "none"
  const deadSite = answers.site === "dead" || answers.site === "old"
  const noClients = answers.problem === "clients" || answers.problem === "conversion"
  const noTime = answers.problem === "time"

  if (noSite) {
    return {
      title: "Vous etes invisible. Completement.",
      problems: [
        "Vos concurrents captent 100% du trafic Google que vous pourriez avoir",
        "Les prospects qui cherchent votre metier dans votre ville ne vous trouvent pas",
        "Vous dependez entierement du bouche a oreille - le jour ou il s'arrete, vous aussi",
      ],
      actions: [
        "Site vitrine optimise SEO local - pour exister sur Google",
        "Fiche Google Business Profile - pour apparaitre sur Maps",
        "Contenus mensuels - pour que Google vous garde en haut",
      ],
      lost: "5 a 15 demandes de devis par mois",
      caseStudy: {
        name: "Artisan plombier a Dijon",
        before: "0 demande en ligne, 100% bouche a oreille",
        after: "12 demandes/mois via le site en 3 mois",
        metric: "+12 leads/mois",
      },
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
      actions: [
        "Refonte complete - design moderne, performance <1 seconde",
        "Communication complete geree - on s'occupe de tout, chaque mois",
        "Reporting mensuel - vous savez ce qui se passe sans y passer du temps",
      ],
      lost: "10 a 15 heures par semaine de votre temps + 40 a 60% du trafic potentiel",
      caseStudy: {
        name: "Gerant de 3 boutiques a Chalon",
        before: "0 publication, site abandonne, zero temps dispo",
        after: "Communication complete geree, +40% de trafic en boutique",
        metric: "+40% de trafic",
      },
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
      actions: [
        "Refonte complete - design moderne, performance <1 seconde",
        "SEO local - pour remonter dans les resultats Google",
        "Strategie de contenu - pour transformer les visiteurs en clients",
      ],
      lost: "40 a 60% de votre trafic potentiel",
      caseStudy: {
        name: "Restaurant gastronomique a Beaune",
        before: "Site de 2019, 200 visites/mois, 0 reservation en ligne",
        after: "1 200 visites/mois, 35 reservations/mois",
        metric: "x6 en trafic",
      },
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
      actions: [
        "Audit SEO complet - comprendre pourquoi vous n'etes pas visible",
        "Strategie de contenu locale - articles, fiches, pages de zone",
        "Gestion des avis Google - pour convertir la confiance en clients",
      ],
      lost: "entre 3 000 et 15 000 euros de CA par mois",
      caseStudy: {
        name: "Cabinet comptable a Dijon",
        before: "Page 3 de Google, 2 demandes/mois",
        after: "Top 3 local, 18 demandes/mois",
        metric: "x9 en leads",
      },
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
      actions: [
        "Un interlocuteur unique qui gere tout - site, SEO, reseaux, contenu",
        "Reporting mensuel - vous savez ce qui se passe sans y passer du temps",
        "Pilotage strategique - on decide ensemble, on execute pour vous",
      ],
      lost: "10 a 15 heures par semaine de votre temps",
      caseStudy: {
        name: "Gerant de 3 boutiques a Chalon",
        before: "0 publication, site abandonne, zero temps dispo",
        after: "Communication complete geree, +40% de trafic en boutique",
        metric: "+40% de trafic",
      },
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
    actions: [
      "Diagnostic complet de votre presence en ligne",
      "Plan d'action personnalise avec des priorites claires",
      "Accompagnement adapte a votre rythme et vos objectifs",
    ],
    lost: "un avantage concurrentiel qui se creuse chaque jour",
    caseStudy: {
      name: "PME de services a Dijon",
      before: "Communication inexistante, 100% bouche a oreille",
      after: "Site + SEO + reseaux : pipeline de prospects regulier",
      metric: "+200% de demandes",
    },
    forfait: "essentiel",
  }
}

/* ─── ANIMATION ─── */

const fadeSlide = {
  initial: { opacity: 0, y: 30 } as const,
  animate: { opacity: 1, y: 0 } as const,
  exit: { opacity: 0, y: -30 } as const,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } as const,
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-2 mb-12">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-500 ${
            i <= current ? "bg-slate-900" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  )
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
    if (questionIdx > 0) {
      setQuestionIdx((i) => i - 1)
    } else {
      setStep("intro")
    }
  }

  function restart() {
    setStep("intro")
    setQuestionIdx(0)
    setAnswers({})
  }

  const profile = getProfile(answers)
  const reco = FORFAITS[profile.forfait]

  return (
    <div className="min-h-dvh bg-white">
      <AnimatePresence mode="wait">
        {/* ─── INTRO ─── */}
        {step === "intro" && (
          <motion.div key="intro" {...fadeSlide}>
            <section className="min-h-dvh flex items-center">
              <Container className="max-w-4xl">
                <div className="space-y-8">
                  <p className="text-sm font-mono tracking-widest uppercase text-slate-400">
                    Globe Createur - diagnostic
                  </p>

                  <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 tracking-tight leading-[0.95]">
                    On ne va pas
                    <br />
                    vous vendre
                    <br />
                    <span className="text-slate-300">un forfait.</span>
                  </h1>

                  <div className="max-w-lg space-y-6 pt-4">
                    <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                      D&apos;abord, on veut comprendre votre situation.
                      4 questions. 2 minutes. Zero bullshit.
                    </p>
                    <p className="text-lg sm:text-xl text-slate-500 leading-relaxed">
                      A la fin, vous saurez exactement ce que vous perdez
                      chaque mois — et ce qu&apos;on ferait pour vous.
                    </p>
                  </div>

                  <div className="pt-8 flex flex-wrap items-center gap-6">
                    <button
                      onClick={() => setStep("quiz")}
                      className="group inline-flex items-center gap-4 text-lg font-black uppercase tracking-widest cursor-pointer"
                    >
                      <span className="h-16 w-16 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                        <ArrowRight className="h-6 w-6" />
                      </span>
                      <span className="group-hover:text-indigo-600 transition-colors duration-300">
                        Commencer
                      </span>
                    </button>

                    <Link
                      href="/devis"
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Je sais deja ce que je veux →
                    </Link>
                  </div>

                  <div className="pt-16 flex items-center gap-8 text-xs text-slate-300 font-mono uppercase tracking-wider">
                    <span>Gratuit</span>
                    <span className="h-px w-4 bg-slate-200" />
                    <span>Sans engagement</span>
                    <span className="h-px w-4 bg-slate-200" />
                    <span>2 minutes</span>
                  </div>
                </div>
              </Container>
            </section>
          </motion.div>
        )}

        {/* ─── QUIZ ─── */}
        {step === "quiz" && (
          <motion.div key={`quiz-${questionIdx}`} {...fadeSlide}>
            <section className="min-h-dvh flex items-center">
              <Container className="max-w-3xl">
                <ProgressBar current={questionIdx} total={questions.length} />

                <button
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-12 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1]">
                    {questions[questionIdx].question}
                  </h2>
                  <p className="text-lg text-slate-400 italic">
                    {questions[questionIdx].subtext}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                  {questions[questionIdx].answers.map((answer) => {
                    const isSelected = answers[questions[questionIdx].id] === answer.value
                    return (
                      <button
                        key={answer.value}
                        onClick={() => handleAnswer(questions[questionIdx].id, answer.value)}
                        className={`group text-left p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 hover:border-slate-900 bg-white"
                        }`}
                      >
                        <span className="text-2xl mb-3 block">{answer.icon}</span>
                        <span className={`text-lg font-bold ${
                          isSelected ? "text-white" : "text-slate-900"
                        }`}>
                          {answer.label}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <p className="text-xs text-slate-300 font-mono mt-12 uppercase tracking-wider">
                  Question {questionIdx + 1} sur {questions.length}
                </p>
              </Container>
            </section>
          </motion.div>
        )}

        {/* ─── RESULT ─── */}
        {step === "result" && (
          <motion.div key="result" {...fadeSlide}>
            {/* Header */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-24">
              <Container className="max-w-4xl">
                <p className="text-sm font-mono tracking-widest uppercase text-slate-400 mb-8">
                  Votre diagnostic
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1]">
                  {profile.title}
                </h1>
              </Container>
            </section>

            {/* Problems */}
            <section className="py-16 border-t border-slate-100">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                      Ce qui vous coute
                    </p>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    {profile.problems.map((p) => (
                      <div key={p} className="flex items-start gap-4">
                        <X className="h-5 w-5 text-red-400 shrink-0 mt-1" />
                        <p className="text-lg text-slate-700 leading-relaxed">{p}</p>
                      </div>
                    ))}
                    <div className="mt-8 p-6 bg-red-50 rounded-2xl">
                      <p className="text-sm font-mono uppercase tracking-wider text-red-400 mb-2">
                        Estimation de perte mensuelle
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-red-600">
                        {profile.lost}
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* Actions */}
            <section className="py-16 border-t border-slate-100">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-green-600 font-bold">
                      Ce qu&apos;on ferait
                    </p>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    {profile.actions.map((a, i) => (
                      <div key={a} className="flex items-start gap-4">
                        <span className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-mono font-bold shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-lg text-slate-700 leading-relaxed pt-1">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>

            {/* Case study */}
            <section className="py-16 border-t border-slate-100">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Cas similaire
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="bg-slate-50 rounded-2xl p-8 space-y-6">
                      <p className="font-black text-slate-900 text-xl">
                        {profile.caseStudy.name}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Avant</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{profile.caseStudy.before}</p>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-green-600 mb-2">Apres</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{profile.caseStudy.after}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <p className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                          {profile.caseStudy.metric}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* Recommended forfait */}
            <section className="py-16 border-t border-slate-100">
              <Container className="max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
                      Notre recommandation
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="rounded-2xl border-2 border-indigo-600 overflow-hidden">
                      <div className="bg-indigo-600 px-8 py-5 flex items-center justify-between">
                        <div>
                          <p className="text-white font-black text-2xl">{reco.name}</p>
                          <p className="text-indigo-200 text-sm font-medium">{reco.tagline}</p>
                        </div>
                        <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          Recommande pour vous
                        </span>
                      </div>

                      <div className="bg-white p-8 space-y-6">
                        <p className="text-slate-600 leading-relaxed">
                          {reco.why}
                        </p>

                        <ul className="space-y-3">
                          {reco.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-3 text-sm text-slate-700">
                              <Check className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                              {feat}
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 flex flex-wrap items-center gap-4">
                          <Link
                            href={reco.href}
                            className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-100"
                          >
                            Demander un devis {reco.name}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href="/forfait-communication-pme"
                            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
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
            <section className="py-20 border-t border-slate-100">
              <Container className="max-w-4xl">
                <div className="space-y-8">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.05]">
                    On en parle ?
                    <br />
                    <span className="text-slate-300">20 min. Gratuit. Sans bullshit.</span>
                  </h2>

                  <div className="flex flex-wrap items-center gap-6">
                    <Link
                      href="/devis"
                      className="group inline-flex items-center gap-4 text-lg font-black uppercase tracking-widest"
                    >
                      <span className="h-16 w-16 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300">
                        <ArrowRight className="h-6 w-6" />
                      </span>
                      <span className="group-hover:text-indigo-600 transition-colors duration-300">
                        Prendre rendez-vous
                      </span>
                    </Link>

                    <Link
                      href="/contact"
                      className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      ou envoyez-nous un message →
                    </Link>
                  </div>

                  <div className="pt-12">
                    <button
                      onClick={restart}
                      className="text-xs font-mono text-slate-300 hover:text-slate-500 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      ← Refaire le diagnostic
                    </button>
                  </div>
                </div>
              </Container>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, Building2, ExternalLink } from "lucide-react"
import {
  ELIGIBILITE_DIAG_DATA_IA,
  ACCELERATEUR_IA,
  DIAG_DATA_IA,
  SOURCES_OFFICIELLES,
  formatPriseEnCharge,
} from "@/lib/data/dispositif-ia"

/* Tous les seuils viennent de la config dispositif-ia — rien n'est codé en dur ici. */
const E = ELIGIBILITE_DIAG_DATA_IA
const ACC = ACCELERATEUR_IA.eligibilite

const millions = (n: number) => `${n / 1_000_000} M€`

type AnswerValue = string

type Question = {
  id: "effectif" | "ca" | "anciennete" | "independance" | "france" | "secteur" | "maturite"
  question: string
  subtext?: string
  options: { label: string; value: AnswerValue }[]
}

const questions: Question[] = [
  {
    id: "effectif",
    question: "Quel est l'effectif de votre entreprise ?",
    subtext: "En équivalent temps plein (ETP).",
    options: [
      { label: `Moins de ${E.effectifMin} salariés`, value: "tpe" },
      { label: `${E.effectifMin} à ${ACC.effectifMin - 1} salariés`, value: "pme-petite" },
      { label: `${ACC.effectifMin} à ${E.effectifMax.toLocaleString("fr-FR")} salariés`, value: "pme-eti" },
      { label: `Plus de ${E.effectifMax.toLocaleString("fr-FR")} salariés`, value: "grande" },
    ],
  },
  {
    id: "ca",
    question: "Quel est votre chiffre d'affaires annuel ?",
    subtext: "Sur votre dernier bilan de 12 mois.",
    options: [
      { label: `Moins de ${millions(E.caMinEuros)}`, value: "sous-seuil" },
      { label: `${millions(E.caMinEuros)} à ${millions(ACC.caMinEuros)}`, value: "eligible" },
      { label: `Plus de ${millions(ACC.caMinEuros)}`, value: "eligible-haut" },
    ],
  },
  {
    id: "anciennete",
    question: "Depuis combien de temps l'entreprise existe-t-elle ?",
    options: [
      { label: `Moins de ${E.ancienneteMinAnnees} an`, value: "jeune" },
      { label: `${E.ancienneteMinAnnees} à ${ACC.ancienneteMinAnnees} ans`, value: "etablie" },
      { label: `Plus de ${ACC.ancienneteMinAnnees} ans`, value: "mature" },
    ],
  },
  {
    id: "independance",
    question: "Votre entreprise est-elle indépendante ?",
    subtext: "C'est-à-dire non détenue majoritairement par un groupe.",
    options: [
      { label: "Oui, indépendante", value: "oui" },
      { label: "Non, filiale d'un groupe", value: "non" },
      { label: "Je ne sais pas précisément", value: "nsp" },
    ],
  },
  {
    id: "france",
    question: "L'entreprise est-elle immatriculée en France (RCS) ?",
    subtext: "Territoire national, DROM-COM inclus.",
    options: [
      { label: "Oui", value: "oui" },
      { label: "Non", value: "non" },
    ],
  },
  {
    id: "secteur",
    question: "Quel est votre secteur d'activité ?",
    options: [
      { label: "Industrie / production", value: "industrie" },
      { label: "Services / B2B", value: "services" },
      { label: "Commerce / distribution", value: "commerce" },
      { label: "BTP / artisanat", value: "btp" },
      { label: "Autre", value: "autre" },
    ],
  },
  {
    id: "maturite",
    question: "Où en êtes-vous avec l'IA aujourd'hui ?",
    options: [
      { label: "Nulle part, on n'a rien testé", value: "aucune" },
      { label: "Quelques essais individuels (ChatGPT…)", value: "essais" },
      { label: "Des usages réguliers mais non structurés", value: "usages" },
      { label: "Déjà un projet IA en production", value: "production" },
    ],
  },
]

type Answers = Partial<Record<Question["id"], AnswerValue>>

type Verdict = {
  parcours: "A" | "B"
  titre: string
  message: string
  caveats: string[]
  accelerateur: boolean
}

/**
 * Pré-qualification indicative. Ne JAMAIS affirmer une éligibilité définitive :
 * la décision appartient à Bpifrance.
 */
function evaluate(answers: Answers): Verdict {
  const caveats: string[] = []

  const horsFrance = answers.france === "non"
  const effectifOk = answers.effectif === "pme-petite" || answers.effectif === "pme-eti"
  const caOk = answers.ca === "eligible" || answers.ca === "eligible-haut"
  const ancienneteOk = answers.anciennete !== "jeune"
  const independanceKo = answers.independance === "non"

  if (answers.independance === "nsp") {
    caveats.push(
      "Le critère d'indépendance capitalistique reste à vérifier : c'est un point que nous clarifions ensemble dès le premier échange."
    )
  }

  const critereAnnonces = !horsFrance && effectifOk && caOk && ancienneteOk && !independanceKo

  const accelerateur =
    critereAnnonces &&
    answers.ca === "eligible-haut" &&
    answers.effectif === "pme-eti" &&
    answers.anciennete === "mature"

  if (critereAnnonces) {
    return {
      parcours: "A",
      titre: "Votre entreprise entre dans les critères annoncés du Diag Data IA",
      message:
        "D'après vos réponses, votre entreprise entre dans les critères annoncés du dispositif — la décision d'attribution appartient à Bpifrance. Prochaine étape concrète : un échange pour cadrer vos priorités, puis le dépôt de votre demande sur le portail Bpifrance. Nous vous accompagnons dans la construction du dossier.",
      caveats,
      accelerateur,
    }
  }

  if (horsFrance) {
    return {
      parcours: "B",
      titre: "Le dispositif est réservé aux entreprises immatriculées en France",
      message:
        "Le Diag Data IA s'adresse aux entreprises immatriculées au RCS en France. Cela ne ferme pas la porte à un travail sur l'IA : notre Diagnostic Flash IA est une prestation en direct, indépendante de tout dispositif public.",
      caveats,
      accelerateur: false,
    }
  }

  return {
    parcours: "B",
    titre: "Le Diagnostic Flash IA est le bon point de départ pour vous",
    message:
      "D'après vos réponses, votre entreprise ne correspond pas aux critères annoncés du Diag Data IA (le dispositif cible les PME et ETI à partir d'un certain effectif et chiffre d'affaires). C'est précisément pour ces situations que nous avons conçu le Diagnostic Flash IA : un format court, en direct, qui identifie vos premiers cas d'usage sans attendre un dossier de financement.",
    caveats,
    accelerateur: false,
  }
}

/* ─── Capture de contact (consentement explicite, non pré-coché) ─── */
function ContactCapture({ answers, verdict }: { answers: Answers; verdict: Verdict }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [entreprise, setEntreprise] = useState("")
  const [consent, setConsent] = useState(false)
  const [hp, setHp] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [renderTime] = useState(() => Date.now())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp || !consent) return
    setStatus("loading")

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "Simulateur éligibilité IA",
          context: {
            entreprise,
            parcours: verdict.parcours === "A" ? "Diag Data IA (critères annoncés)" : "Diagnostic Flash IA",
            consentement: "Consentement explicite coché par l'utilisateur",
            ...answers,
          },
          _hp: hp,
          _t: renderTime,
        }),
      })

      if (res.ok) {
        setStatus("success")
        track("simulateur_ia_lead", { parcours: verdict.parcours })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-[#2a2a2a] bg-[#141414] p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-signal mx-auto mb-3" aria-hidden="true" />
        <p className="font-bold text-ivory">Merci {name.split(" ")[0]} — c&apos;est bien reçu.</p>
        <p className="mt-2 text-sm text-aluminium">
          Nous revenons vers vous sous 24h ouvrées avec les prochaines étapes adaptées à votre situation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-[#2a2a2a] bg-[#141414] p-8 space-y-4">
      <p className="font-bold text-ivory">Recevoir un premier avis sur votre situation</p>
      <p className="text-sm text-aluminium leading-relaxed">
        Laissez-nous vos coordonnées : nous revenons vers vous avec une lecture honnête de vos réponses
        et la prochaine étape concrète — sans engagement.
      </p>

      <input
        type="text"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sim-name" className="block text-xs font-bold uppercase tracking-widest text-aluminium mb-2">
            Votre nom
          </label>
          <input
            id="sim-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-sm border border-[#2a2a2a] bg-noir text-sm text-ivory placeholder:text-[#5e6063] focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-all"
          />
        </div>
        <div>
          <label htmlFor="sim-entreprise" className="block text-xs font-bold uppercase tracking-widest text-aluminium mb-2">
            Entreprise
          </label>
          <input
            id="sim-entreprise"
            type="text"
            value={entreprise}
            onChange={(e) => setEntreprise(e.target.value)}
            className="w-full px-4 py-3 rounded-sm border border-[#2a2a2a] bg-noir text-sm text-ivory placeholder:text-[#5e6063] focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-all"
          />
        </div>
      </div>
      <div>
        <label htmlFor="sim-email" className="block text-xs font-bold uppercase tracking-widest text-aluminium mb-2">
          Email professionnel
        </label>
        <input
          id="sim-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-sm border border-[#2a2a2a] bg-noir text-sm text-ivory placeholder:text-[#5e6063] focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-all"
        />
      </div>

      <label htmlFor="sim-consent" className="flex items-start gap-3 cursor-pointer">
        <input
          id="sim-consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#e63a2b] cursor-pointer"
        />
        <span className="text-xs text-aluminium leading-relaxed">
          J&apos;accepte que Globe Créateur utilise ces informations pour me recontacter au sujet de ma
          demande. Elles ne servent à rien d&apos;autre —{" "}
          <Link href="/politique-confidentialite" className="underline hover:text-ivory transition-colors">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p className="text-xs text-signal font-medium" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous écrire directement via la page contact.
        </p>
      )}

      <Button type="submit" disabled={status === "loading" || !consent} className="w-full sm:w-auto">
        {status === "loading" ? "Envoi en cours…" : "Être recontacté"}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </form>
  )
}

/* ─── Composant principal ─── */
export function EligibilitySimulator() {
  const [step, setStep] = useState(0) // 0 = intro, 1..n = questions, n+1 = restitution
  const [answers, setAnswers] = useState<Answers>({})

  const total = questions.length

  const handleSelect = (questionId: Question["id"], value: AnswerValue) => {
    if (step === 1) track("simulateur_ia_demarre")
    const next = { ...answers, [questionId]: value }
    setAnswers(next)
    if (step < total) {
      setStep(step + 1)
    } else {
      setStep(total + 1)
      track("simulateur_ia_complete", { parcours: evaluate(next).parcours })
    }
  }

  const restart = () => {
    setStep(0)
    setAnswers({})
  }

  /* ─── Intro ─── */
  if (step === 0) {
    return (
      <div className="rounded-sm border border-[#1c1c1c] bg-[#141414] p-8 lg:p-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-sm bg-signal/10 text-signal mb-6">
          <Building2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-ivory mb-4">
          Votre entreprise entre-t-elle dans les critères du Diag Data IA ?
        </h3>
        <p className="text-aluminium leading-relaxed mb-8 max-w-md mx-auto">
          {total} questions, une minute. Vous saurez quel parcours est adapté à votre situation —
          diagnostic adossé au dispositif, ou format direct.
        </p>
        <Button onClick={() => setStep(1)}>
          Commencer
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <p className="mt-4 font-mono-accent text-xs uppercase tracking-widest text-[#5e6063]">
          Indicatif · La décision appartient à Bpifrance
        </p>
      </div>
    )
  }

  /* ─── Restitution ─── */
  if (step > total) {
    const verdict = evaluate(answers)

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-sm border border-[#1c1c1c] bg-[#141414] p-8 lg:p-10"
        >
          <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
            — Résultat indicatif
          </span>
          <h3 className="mt-4 text-2xl font-bold text-ivory leading-tight">{verdict.titre}</h3>
          <p className="mt-4 text-aluminium leading-relaxed">{verdict.message}</p>

          {verdict.parcours === "A" && (
            <>
              <p className="mt-4 text-aluminium leading-relaxed">
                Le {DIAG_DATA_IA.nom} bénéficie d&apos;{formatPriseEnCharge()}. Nous vous communiquons
                le montant et le taux en vigueur lors du premier échange.
              </p>
              <a
                href={SOURCES_OFFICIELLES.portailDepot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-signal hover:text-[#d62e20] transition-colors"
              >
                Portail de dépôt officiel : diag.bpifrance.fr
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </>
          )}

          {verdict.accelerateur && (
            <p className="mt-4 border-l-2 border-signal pl-4 text-sm text-aluminium leading-relaxed">
              À noter : au vu de votre taille, l&apos;{ACCELERATEUR_IA.nom} (accompagnement individuel
              sur {ACCELERATEUR_IA.dureeMois} mois) pourrait aussi vous concerner. Nous vous orientons
              vers le bon interlocuteur.
            </p>
          )}

          {verdict.caveats.map((c) => (
            <p key={c} className="mt-4 border-l-2 border-[#2a2a2a] pl-4 text-sm text-aluminium leading-relaxed">
              {c}
            </p>
          ))}
        </motion.div>

        <ContactCapture answers={answers} verdict={verdict} />

        <div className="text-center">
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 text-sm font-semibold text-aluminium hover:text-ivory transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Refaire le test
          </button>
        </div>
      </div>
    )
  }

  /* ─── Questions ─── */
  const question = questions[step - 1]
  const progress = (step / total) * 100

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between font-mono-accent text-xs uppercase tracking-widest text-[#5e6063] mb-2">
          <span>
            Question {step}/{total}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="h-1 bg-[#1c1c1c] overflow-hidden"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Progression du simulateur"
        >
          <motion.div
            className="h-full bg-signal"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-ivory mb-2">{question.question}</h3>
          {question.subtext && <p className="text-sm text-aluminium mb-6">{question.subtext}</p>}

          <div className="space-y-3 mt-6">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(question.id, option.value)}
                className="w-full text-left p-5 rounded-sm border border-[#2a2a2a] bg-[#141414] hover:border-signal focus-visible:border-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/40 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-ivory">{option.label}</span>
              </button>
            ))}
          </div>

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aluminium hover:text-ivory transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Question précédente
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

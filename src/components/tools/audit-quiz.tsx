"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { ArrowRight, RotateCcw, Share2, CheckCircle2, Lock } from "lucide-react"
import { LeadCaptureGate } from "@/components/tools/lead-capture-gate"
import {
  auditQuestions,
  categoryLabels,
  categoryIcons,
  getCategoryMaxScores,
  totalMaxScore,
  recommendations,
  type AuditCategory,
} from "@/lib/data/audit-questions"
import { SITE_URL } from "@/lib/constants"

/* ─── Radar Chart (pure SVG) ─── */
function RadarChart({ scores }: { scores: Record<AuditCategory, number> }) {
  const categories = Object.keys(categoryLabels) as AuditCategory[]
  const maxScores = getCategoryMaxScores()
  const svgW = 420
  const svgH = 400
  const cx = svgW / 2
  const cy = svgH / 2
  const maxR = 110

  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    }
  }

  const gridLevels = [0.25, 0.5, 0.75, 1]

  const dataPoints = categories.map((cat, i) => {
    const pct = maxScores[cat] > 0 ? scores[cat] / maxScores[cat] : 0
    return getPoint(i, maxR * pct)
  })

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"

  return (
    <div className="flex justify-center">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[420px]">
        {/* Grid */}
        {gridLevels.map((level) => {
          const pts = categories.map((_, i) => getPoint(i, maxR * level))
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z"
          return (
            <path
              key={level}
              d={path}
              fill="none"
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth={1}
            />
          )
        })}

        {/* Axes */}
        {categories.map((_, i) => {
          const p = getPoint(i, maxR)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeWidth={1}
            />
          )
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(99, 102, 241, 0.15)"
          stroke="#6366f1"
          strokeWidth={2.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#6366f1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        {categories.map((cat, i) => {
          const labelR = maxR + 40
          const p = getPoint(i, labelR)
          const pct = maxScores[cat] > 0 ? Math.round((scores[cat] / maxScores[cat]) * 100) : 0
          return (
            <text
              key={cat}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-slate-600 dark:fill-slate-400"
              fontSize={12}
              fontWeight={600}
            >
              <tspan x={p.x} dy="-0.5em">{categoryLabels[cat]}</tspan>
              <tspan x={p.x} dy="1.4em" className="fill-indigo-600 dark:fill-indigo-400" fontSize={11} fontWeight={700}>{pct}%</tspan>
            </text>
          )
        })}
      </svg>
    </div>
  )
}

/* ─── Animated Counter ─── */
function AnimatedScore({ target }: { target: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 1200

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target])

  return <span>{count}</span>
}

/* ─── Score Label ─── */
function getScoreLevel(score: number) {
  if (score <= 25) return { label: "Urgence digitale", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950" }
  if (score <= 50) return { label: "Des bases, mais beaucoup de potentiel", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" }
  if (score <= 75) return { label: "Bon niveau, des optimisations possibles", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950" }
  return { label: "Excellente maturité digitale", color: "text-green-500", bg: "bg-green-50 dark:bg-green-950" }
}

/* ─── Main Component ─── */
export function AuditQuiz() {
  const [step, setStep] = useState(0) // 0 = intro, 1-9 = questions, 10 = results
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [unlocked, setUnlocked] = useState(false)

  const totalQuestions = auditQuestions.length

  const handleSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    const question = auditQuestions[step - 1]
    const newAnswers = { ...answers, [question.id]: question.options[optionIndex].score }
    setAnswers(newAnswers)

    setTimeout(() => {
      setSelectedOption(null)
      if (step < totalQuestions) {
        setStep(step + 1)
      } else {
        setStep(totalQuestions + 1)
      }
    }, 400)
  }

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const scorePercent = Math.round((totalScore / totalMaxScore) * 100)

  const categoryScores: Record<AuditCategory, number> = {
    website: 0,
    seo: 0,
    social: 0,
    content: 0,
    "google-business": 0,
    automation: 0,
  }

  for (const q of auditQuestions) {
    categoryScores[q.category] += answers[q.id] ?? 0
  }

  const maxScores = getCategoryMaxScores()
  const weakCategories = (Object.keys(categoryScores) as AuditCategory[]).filter(
    (cat) => maxScores[cat] > 0 && categoryScores[cat] / maxScores[cat] < 0.5
  )

  const handleShare = async () => {
    const text = `Mon score digital : ${scorePercent}/100 - Faites le test gratuitement !`
    const url = `${SITE_URL}/audit-digital`

    if (navigator.share) {
      try {
        await navigator.share({ title: "Mon Audit Digital", text, url })
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`)
      alert("Lien copié !")
    }
  }

  const restart = () => {
    setStep(0)
    setAnswers({})
    setSelectedOption(null)
  }

  /* ─── INTRO ─── */
  if (step === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="text-center p-10 lg:p-14">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mb-6">
            <LucideIcon name="Target" className="h-8 w-8" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
            Évaluez votre présence digitale
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-md mx-auto">
            9 questions rapides pour obtenir votre score sur 100 et des recommandations personnalisées.
          </p>
          <Button
            onClick={() => setStep(1)}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-full text-base font-semibold shadow-sm transition-all cursor-pointer"
          >
            Commencer l&apos;audit
          </Button>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            2 minutes &middot; 9 questions &middot; 100% gratuit
          </p>
        </Card>
      </motion.div>
    )
  }

  /* ─── RESULTS ─── */
  if (step > totalQuestions) {
    const level = getScoreLevel(scorePercent)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Score + Radar */}
        <Card className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Score */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Votre score digital
              </p>
              <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                <span className="text-7xl lg:text-8xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  <AnimatedScore target={scorePercent} />
                </span>
                <span className="text-2xl font-bold text-slate-300 dark:text-slate-600">
                  /100
                </span>
              </div>
              <div className={`inline-block mt-4 px-4 py-1.5 rounded-full text-sm font-semibold ${level.color} ${level.bg}`}>
                {level.label}
              </div>
            </div>

            {/* Radar */}
            <RadarChart scores={categoryScores} />
          </div>
        </Card>

        {/* Category breakdown — teaser (blurred if locked) */}
        <div className="relative">
          <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 ${!unlocked ? "blur-sm select-none pointer-events-none" : ""}`}>
            {(Object.keys(categoryLabels) as AuditCategory[]).map((cat) => {
              const pct = maxScores[cat] > 0 ? Math.round((categoryScores[cat] / maxScores[cat]) * 100) : 0
              const barColor = pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-yellow-500" : "bg-red-500"
              return (
                <div
                  key={cat}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <LucideIcon name={categoryIcons[cat]} className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                      {categoryLabels[cat]}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{pct}%</div>
                  <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          {/* Overlay lock hint when locked */}
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg">
                <Lock className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Détails verrouillés</span>
              </div>
            </div>
          )}
        </div>

        {/* Lead capture gate OR full recommendations */}
        {!unlocked ? (
          <LeadCaptureGate
            source="Audit Digital"
            context={{
              score: scorePercent,
              categoryScores: Object.fromEntries(
                (Object.keys(categoryLabels) as AuditCategory[]).map((cat) => [
                  categoryLabels[cat],
                  maxScores[cat] > 0 ? Math.round((categoryScores[cat] / maxScores[cat]) * 100) : 0,
                ])
              ),
              weakCategories: weakCategories.map((cat) => categoryLabels[cat]),
              level: level.label,
            }}
            teaser="Renseignez vos coordonnées pour recevoir votre analyse détaillée par catégorie, vos recommandations personnalisées et un plan d'action concret."
            ctaLabel="Débloquer mes recommandations"
            onUnlock={() => setUnlocked(true)}
          />
        ) : (
          <>
            {/* Recommendations */}
            {weakCategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Nos recommandations pour vous
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weakCategories.map((cat) => {
                    const rec = recommendations[cat]
                    return (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Card className="h-full p-6 lg:p-8">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                              <LucideIcon name={categoryIcons[cat]} className="h-4 w-4" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {rec.title}
                            </h4>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                            {rec.text}
                          </p>
                          <Link
                            href={`/services/${rec.serviceSlug}`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                          >
                            {rec.serviceLabel}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* All good */}
            {weakCategories.length === 0 && (
              <Card className="text-center p-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Bravo, votre maturité digitale est excellente !
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Pour aller encore plus loin, découvrez nos forfaits d&apos;accompagnement continu.
                </p>
                <Button
                  href="/forfait-communication-pme"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                  Voir les forfaits
                </Button>
              </Card>
            )}
          </>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            Partager mon score
          </Button>
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Recommencer
          </button>
        </div>
      </motion.div>
    )
  }

  /* ─── QUESTIONS ─── */
  const question = auditQuestions[step - 1]
  const progress = (step / totalQuestions) * 100

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-2">
          <span>Question {step}/{totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <LucideIcon name={categoryIcons[question.category]} className="h-4 w-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
              {categoryLabels[question.category]}
            </span>
          </div>

          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  selectedOption === i
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 ring-1 ring-indigo-500/20"
                    : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-600"
                }`}
              >
                <span className={`text-sm font-medium ${
                  selectedOption === i
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-slate-700 dark:text-slate-300"
                }`}>
                  {option.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

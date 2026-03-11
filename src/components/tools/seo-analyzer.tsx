"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  Globe,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  FileText,
  Settings,
  Share2 as ShareIcon,
  Gauge,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import { LeadCaptureGate } from "@/components/tools/lead-capture-gate"

type Check = {
  id: string
  category: "content" | "technical" | "social" | "performance"
  label: string
  status: "pass" | "warning" | "fail"
  value: string
  tip: string
  points: number
  maxPoints: number
}

type AnalysisResult = {
  url: string
  score: number
  checks: Check[]
  categoryScores: Record<string, { points: number; max: number }>
  meta: {
    title: string | null
    description: string | null
    ogImage: string | null
    h1: string | null
  }
}

const categoryConfig = {
  content: { label: "Contenu", icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
  technical: { label: "Technique", icon: Settings, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950" },
  social: { label: "Réseaux sociaux", icon: ShareIcon, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950" },
  performance: { label: "Performance", icon: Gauge, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" },
}

const statusIcon = {
  pass: CheckCircle2,
  warning: AlertTriangle,
  fail: XCircle,
}

const statusColor = {
  pass: "text-green-500",
  warning: "text-yellow-500",
  fail: "text-red-500",
}

function ScoreRing({ score }: { score: number }) {
  const radius = 58
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={140} height={140} className="-rotate-90">
        <circle cx={70} cy={70} r={radius} fill="none" stroke="currentColor" strokeWidth={8} className="text-slate-100 dark:text-slate-800" />
        <motion.circle
          cx={70} cy={70} r={radius} fill="none" stroke={color} strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-extrabold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs font-bold text-slate-400">/100</span>
      </div>
    </div>
  )
}

function CheckRow({ check, index }: { check: Check; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = statusIcon[check.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer text-left"
      >
        <Icon className={`h-5 w-5 shrink-0 ${statusColor[check.status]}`} />
        <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{check.label}</span>
        <span className="text-xs font-bold text-slate-400 hidden sm:block max-w-[200px] truncate">{check.value}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pl-12">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1.5">{check.value}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{check.tip}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${check.status === "pass" ? "bg-green-500" : check.status === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(check.points / check.maxPoints) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{check.points}/{check.maxPoints}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function SeoAnalyzer() {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    setStatus("loading")
    setError("")
    setResult(null)
    setUnlocked(false)

    try {
      const res = await fetch("/api/seo-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'analyse")
        setStatus("error")
        return
      }

      setResult(data)
      setStatus("done")
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.")
      setStatus("error")
    }
  }

  // Group checks by category
  const grouped = result
    ? Object.entries(
        result.checks.reduce(
          (acc, check) => {
            if (!acc[check.category]) acc[check.category] = []
            acc[check.category].push(check)
            return acc
          },
          {} as Record<string, Check[]>
        )
      )
    : []

  const passCount = result?.checks.filter((c) => c.status === "pass").length ?? 0
  const warnCount = result?.checks.filter((c) => c.status === "warning").length ?? 0
  const failCount = result?.checks.filter((c) => c.status === "fail").length ?? 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* URL Input */}
      <Card className="p-6 lg:p-8 mb-8">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Entrez l'URL de votre site (ex: monsite.fr)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              disabled={status === "loading"}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "loading" || !url.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold shadow-sm transition-all cursor-pointer disabled:opacity-60 flex items-center gap-2 shrink-0"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyse...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyser
              </>
            )}
          </Button>
        </form>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </Card>

      {/* Loading state */}
      {status === "loading" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Loader2 className="h-10 w-10 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Analyse en cours de votre site...
          </p>
          <p className="text-xs text-slate-400 mt-1">Cela peut prendre quelques secondes.</p>
        </motion.div>
      )}

      {/* Results */}
      {status === "done" && result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Score header */}
          <Card className="p-8 lg:p-10">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ScoreRing score={result.score} />
              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Score SEO</p>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {result.score >= 80
                    ? "Très bon score !"
                    : result.score >= 50
                      ? "Des améliorations possibles"
                      : "Optimisations urgentes nécessaires"}
                </h2>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                >
                  {result.url}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="flex items-center gap-4 mt-4">
                  <span className="flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{passCount}</span>
                    <span className="text-slate-400 text-xs">OK</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{warnCount}</span>
                    <span className="text-slate-400 text-xs">Attention</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{failCount}</span>
                    <span className="text-slate-400 text-xs">Erreur</span>
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Category score bars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(result.categoryScores).map(([cat, { points, max }]) => {
              const cfg = categoryConfig[cat as keyof typeof categoryConfig]
              if (!cfg) return null
              const pct = Math.round((points / max) * 100)
              const Icon = cfg.icon
              return (
                <div key={cat} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${cfg.color}`} />
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{cfg.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{pct}%</div>
                  <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Lead capture gate */}
          {!unlocked ? (
            <LeadCaptureGate
              source="Analyseur SEO"
              context={{
                url: result.url,
                score: result.score,
                categoryScores: Object.fromEntries(
                  Object.entries(result.categoryScores).map(([cat, { points, max }]) => [
                    categoryConfig[cat as keyof typeof categoryConfig]?.label ?? cat,
                    `${Math.round((points / max) * 100)}%`,
                  ])
                ),
                failCount,
                warnCount,
                title: result.meta.title,
              }}
              teaser={`Votre site obtient ${result.score}/100. Renseignez vos coordonnées pour voir le détail de chaque critère avec les recommandations personnalisées.`}
              ctaLabel="Voir le rapport détaillé"
              onUnlock={() => setUnlocked(true)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Detailed checks by category */}
              {grouped.map(([category, checks]) => {
                const cfg = categoryConfig[category as keyof typeof categoryConfig]
                if (!cfg) return null
                const Icon = cfg.icon
                return (
                  <Card key={category} className="overflow-hidden">
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800 ${cfg.bg}`}>
                      <Icon className={`h-5 w-5 ${cfg.color}`} />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cfg.label}</h3>
                      <span className="text-xs text-slate-400 ml-auto">
                        {checks.filter((c) => c.status === "pass").length}/{checks.length} OK
                      </span>
                    </div>
                    <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {checks.map((check, i) => (
                        <CheckRow key={check.id} check={check} index={i} />
                      ))}
                    </div>
                  </Card>
                )
              })}

              {/* CTA */}
              <Card className="p-8 bg-indigo-600 dark:bg-indigo-500 text-white border-0 text-center">
                <h3 className="text-xl font-extrabold mb-2">
                  Besoin d&apos;aide pour améliorer votre SEO ?
                </h3>
                <p className="text-indigo-100 text-sm mb-6">
                  Nos experts analysent votre site en profondeur et mettent en place un plan d&apos;action concret.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    href="/devis"
                    className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                  >
                    Demander un audit complet
                  </Button>
                  <Button
                    href="/services/seo-local-dijon"
                    className="border border-white/30 text-white hover:bg-white/10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                  >
                    Notre service SEO
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

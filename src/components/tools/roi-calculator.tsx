"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"

const sectorData: Record<string, { label: string; monthlySearches: number; conversionRate: number }> = {
  restaurants: { label: "Restaurant", monthlySearches: 2400, conversionRate: 0.03 },
  hotels: { label: "Hôtel / Hébergement", monthlySearches: 3200, conversionRate: 0.025 },
  artisans: { label: "Artisan / BTP", monthlySearches: 1800, conversionRate: 0.04 },
  "professions-liberales": { label: "Profession libérale", monthlySearches: 1200, conversionRate: 0.035 },
  commerce: { label: "Commerce local", monthlySearches: 2000, conversionRate: 0.03 },
  "beaute-bien-etre": { label: "Beauté / Bien-être", monthlySearches: 2600, conversionRate: 0.035 },
  immobilier: { label: "Immobilier", monthlySearches: 2800, conversionRate: 0.02 },
  autre: { label: "Autre secteur", monthlySearches: 1500, conversionRate: 0.03 },
}

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)

export function RoiCalculator() {
  const [sector, setSector] = useState("restaurants")
  const [avgTicket, setAvgTicket] = useState(150)
  const [currentClients, setCurrentClients] = useState(20)
  const [showResults, setShowResults] = useState(false)

  const data = sectorData[sector] ?? sectorData.autre
  const potentialClients = Math.round(data.monthlySearches * data.conversionRate)
  const missedClients = Math.max(0, potentialClients - currentClients)
  const monthlyLost = missedClients * avgTicket
  const annualLost = monthlyLost * 12
  const investmentCost = 3500
  const projectedROI = annualLost > 0 ? Math.round(((annualLost - investmentCost) / investmentCost) * 100) : 0
  const projectedMonthlyRevenue = (currentClients + missedClients) * avgTicket
  const currentMonthlyRevenue = currentClients * avgTicket

  const handleCalculate = () => {
    setShowResults(true)
    setTimeout(() => {
      document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ─── Inputs ─── */}
        <Card className="p-8 lg:p-10 sticky top-28">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Paramètres de votre activité
          </h2>

          <div className="space-y-8">
            {/* Sector */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-400">
                Votre secteur
              </label>
              <select
                value={sector}
                onChange={(e) => { setSector(e.target.value); setShowResults(false) }}
                className="w-full rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {Object.entries(sectorData).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Avg Ticket */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Panier moyen
                </label>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {fmt(avgTicket)}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={5000}
                step={10}
                value={avgTicket}
                onChange={(e) => { setAvgTicket(Number(e.target.value)); setShowResults(false) }}
                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>20 €</span>
                <span>5 000 €</span>
              </div>
            </div>

            {/* Current clients */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Clients / mois actuels
                </label>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {currentClients}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={200}
                step={1}
                value={currentClients}
                onChange={(e) => { setCurrentClients(Number(e.target.value)); setShowResults(false) }}
                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>0</span>
                <span>200</span>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleCalculate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-3.5 rounded-full text-base font-semibold shadow-sm transition-all cursor-pointer"
            >
              Calculer mon ROI
            </Button>
          </div>
        </Card>

        {/* ─── Results ─── */}
        <div id="roi-results">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="p-8 lg:p-10 text-center">
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <LucideIcon name="TrendingUp" className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  </div>
                  <p className="text-slate-400 dark:text-slate-500 text-sm">
                    Remplissez les paramètres et cliquez sur « Calculer mon ROI » pour voir vos résultats.
                  </p>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <MetricCard
                    icon="Search"
                    label="Recherches mensuelles"
                    value={data.monthlySearches.toLocaleString("fr-FR")}
                    sub={`dans le secteur « ${data.label} »`}
                  />
                  <MetricCard
                    icon="Users"
                    label="Clients potentiels manqués"
                    value={`${missedClients}`}
                    sub="par mois"
                    highlight={missedClients > 0}
                  />
                  <MetricCard
                    icon="TrendingUp"
                    label="CA mensuel perdu"
                    value={fmt(monthlyLost)}
                    sub="chaque mois"
                    alert
                  />
                  <MetricCard
                    icon="Target"
                    label="CA annuel perdu"
                    value={fmt(annualLost)}
                    sub="par an"
                    alert
                  />
                </div>

                {/* Before / After comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before */}
                  <Card className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                      Aujourd&apos;hui
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-400">Clients / mois</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentClients}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">CA mensuel estimé</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{fmt(currentMonthlyRevenue)}</p>
                      </div>
                    </div>
                  </Card>

                  {/* After */}
                  <Card className="p-6 border-indigo-200 dark:border-indigo-800 ring-1 ring-indigo-500/10 relative overflow-hidden">
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">
                      Projection
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-4">
                      Avec Globe Créateur
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-400">Clients / mois</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {currentClients + missedClients}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">CA mensuel estimé</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {fmt(projectedMonthlyRevenue)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* ROI bar */}
                {projectedROI > 0 && (
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Retour sur investissement estimé
                      </p>
                      <span className="text-lg font-extrabold text-green-500">
                        +{projectedROI}%
                      </span>
                    </div>
                    <div className="flex gap-2 h-6 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <motion.div
                        className="bg-slate-300 dark:bg-slate-600 rounded-l-full flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: "15%" }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-[9px] font-bold text-white px-1 truncate">Invest.</span>
                      </motion.div>
                      <motion.div
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-r-full flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <span className="text-[9px] font-bold text-white px-1 truncate">Revenus générés</span>
                      </motion.div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Investissement moyen : {fmt(investmentCost)} &middot; Revenus additionnels estimés : {fmt(annualLost)}/an
                    </p>
                  </Card>
                )}

                {/* Warning if no missed clients */}
                {missedClients <= 0 && (
                  <Card className="p-6 text-center">
                    <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Votre volume actuel de clients semble déjà couvrir le potentiel de recherche de votre secteur.
                      Un site optimisé pourrait tout de même vous aider à fidéliser et augmenter le panier moyen.
                    </p>
                  </Card>
                )}

                {/* CTA */}
                <Card className="p-8 bg-indigo-600 dark:bg-indigo-500 text-white border-0 text-center">
                  <h3 className="text-xl font-extrabold mb-2">
                    Ces clients vous attendent
                  </h3>
                  <p className="text-indigo-100 text-sm mb-6">
                    Un site optimisé et un bon SEO local peuvent transformer ces chiffres en réalité.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button
                      href="/devis"
                      className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                    >
                      Demander un devis gratuit
                    </Button>
                    <Button
                      href="/forfait-communication-pme"
                      className="border border-white/30 text-white hover:bg-white/10 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                    >
                      Voir les forfaits
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ─── Metric Card ─── */
function MetricCard({
  icon,
  label,
  value,
  sub,
  highlight = false,
  alert = false,
}: {
  icon: string
  label: string
  value: string
  sub: string
  highlight?: boolean
  alert?: boolean
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4">
      <div className="flex items-center gap-2 mb-2">
        <LucideIcon name={icon} className={`h-4 w-4 ${alert ? "text-red-400" : "text-slate-400"}`} />
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate">
          {label}
        </span>
      </div>
      <p className={`text-xl lg:text-2xl font-extrabold ${
        alert ? "text-red-500" : highlight ? "text-orange-500" : "text-slate-900 dark:text-white"
      }`}>
        {value}
      </p>
      <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
    </div>
  )
}

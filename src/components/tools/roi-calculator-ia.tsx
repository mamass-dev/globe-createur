"use client"

import { useState } from "react"
import { track } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { ArrowRight, Info } from "lucide-react"

/**
 * Estimation indicative du gain annuel potentiel d'une automatisation par l'IA.
 * Les hypothèses sont affichées et modifiables par le visiteur — jamais cachées.
 * La version détaillée (par processus, avec coûts de mise en œuvre) est le
 * livrable du diagnostic : ce calculateur donne un ordre de grandeur, pas un devis.
 */

const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })

type FieldProps = {
  id: string
  label: string
  suffix: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
}

function NumberField({ id, label, suffix, value, min, max, step = 1, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-widest text-aluminium mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[#e63a2b] cursor-pointer"
        />
        <div className="shrink-0 w-28 text-right">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
            aria-label={`${label} (saisie directe)`}
            className="w-16 px-2 py-1.5 rounded-sm border border-[#2a2a2a] bg-noir text-sm text-ivory text-right focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal transition-all"
          />
          <span className="ml-1.5 text-xs text-aluminium">{suffix}</span>
        </div>
      </div>
    </div>
  )
}

export function RoiCalculatorIa() {
  const [collaborateurs, setCollaborateurs] = useState(5)
  const [heuresSemaine, setHeuresSemaine] = useState(4)
  const [coutHoraire, setCoutHoraire] = useState(30)
  // Hypothèses modifiables — valeurs par défaut volontairement prudentes
  const [partAutomatisable, setPartAutomatisable] = useState(30)
  const [semainesAn, setSemainesAn] = useState(45)
  const [tracked, setTracked] = useState(false)

  const onFirstInteraction = () => {
    if (!tracked) {
      track("tool_result", { tool: "calculateur-roi-ia" })
      setTracked(true)
    }
  }

  const heuresLiberees = Math.round(collaborateurs * heuresSemaine * semainesAn * (partAutomatisable / 100))
  const gainAnnuel = heuresLiberees * coutHoraire

  return (
    <div className="rounded-sm border border-[#1c1c1c] bg-[#141414] p-8 lg:p-12 max-w-3xl mx-auto" onPointerDown={onFirstInteraction} onKeyDown={onFirstInteraction}>
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Saisie */}
        <div className="space-y-6">
          <p className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
            — Votre situation
          </p>
          <NumberField
            id="roi-collabs"
            label="Collaborateurs concernés"
            suffix="pers."
            value={collaborateurs}
            min={1}
            max={200}
            onChange={setCollaborateurs}
          />
          <NumberField
            id="roi-heures"
            label="Heures par semaine et par personne sur des tâches répétitives"
            suffix="h/sem"
            value={heuresSemaine}
            min={1}
            max={35}
            onChange={setHeuresSemaine}
          />
          <NumberField
            id="roi-cout"
            label="Coût horaire chargé moyen"
            suffix="€/h"
            value={coutHoraire}
            min={15}
            max={150}
            step={5}
            onChange={setCoutHoraire}
          />

          <div className="border-t border-[#2a2a2a] pt-6 space-y-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aluminium">
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              Hypothèses de calcul — ajustez-les
            </p>
            <NumberField
              id="roi-part"
              label="Part de ce temps réellement automatisable"
              suffix="%"
              value={partAutomatisable}
              min={5}
              max={80}
              step={5}
              onChange={setPartAutomatisable}
            />
            <NumberField
              id="roi-semaines"
              label="Semaines travaillées par an"
              suffix="sem"
              value={semainesAn}
              min={40}
              max={52}
              onChange={setSemainesAn}
            />
          </div>
        </div>

        {/* Résultat */}
        <div className="flex flex-col justify-center lg:border-l lg:border-[#2a2a2a] lg:pl-10">
          <p className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-aluminium">
            Gain annuel potentiel
          </p>
          <p className="mt-3 text-5xl lg:text-6xl font-bold text-signal" aria-live="polite">
            {euros.format(gainAnnuel)}
          </p>
          <p className="mt-2 text-sm text-aluminium">
            soit environ <strong className="text-ivory">{heuresLiberees.toLocaleString("fr-FR")} heures</strong> libérées par an
          </p>

          <p className="mt-6 text-xs text-[#87898c] leading-relaxed">
            Estimation indicative : temps libéré valorisé au coût horaire chargé, avec la part
            automatisable que vous avez choisie en hypothèse. Elle ne tient pas compte des coûts de
            mise en œuvre ni du temps d&apos;adoption. Le chiffrage réel, processus par processus,
            fait partie des livrables du diagnostic.
          </p>

          <div className="mt-8">
            <Button href="/services/diagnostic-ia-pme" size="md" className="group">
              Passer au chiffrage réel
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building2,
  User,
  MapPin,
  Hash,
  Mail,
  Phone,
  Server,
  Globe,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Copy,
  Code,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type StructureType = "auto-entrepreneur" | "societe" | "association"

type FormData = {
  structureType: StructureType | ""
  raisonSociale: string
  adresse: string
  siret: string
  tvaIntra: string
  responsable: string
  email: string
  telephone: string
  hebergeurNom: string
  hebergeurAdresse: string
  hebergeurTelephone: string
  nomDomaine: string
}

const initialFormData: FormData = {
  structureType: "",
  raisonSociale: "",
  adresse: "",
  siret: "",
  tvaIntra: "",
  responsable: "",
  email: "",
  telephone: "",
  hebergeurNom: "",
  hebergeurAdresse: "",
  hebergeurTelephone: "",
  nomDomaine: "",
}

/* ------------------------------------------------------------------ */
/*  Hebergeur presets                                                   */
/* ------------------------------------------------------------------ */

const hebergeurPresets: Record<string, { nom: string; adresse: string; telephone: string }> = {
  ovh: {
    nom: "OVHcloud",
    adresse: "2 rue Kellermann, 59100 Roubaix, France",
    telephone: "1007",
  },
  ionos: {
    nom: "IONOS SARL",
    adresse: "7 place de la Gare, 57200 Sarreguemines, France",
    telephone: "0970 808 911",
  },
  o2switch: {
    nom: "o2switch SARL",
    adresse: "222 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France",
    telephone: "04 44 44 60 40",
  },
  vercel: {
    nom: "Vercel Inc.",
    adresse: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    telephone: "N/A",
  },
  hostinger: {
    nom: "Hostinger International Ltd.",
    adresse: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
    telephone: "N/A",
  },
}

/* ------------------------------------------------------------------ */
/*  Steps config                                                       */
/* ------------------------------------------------------------------ */

const steps = [
  { id: 1, label: "Structure", icon: Building2 },
  { id: 2, label: "Identité", icon: User },
  { id: 3, label: "Contact", icon: Mail },
  { id: 4, label: "Hébergeur", icon: Server },
  { id: 5, label: "Site web", icon: Globe },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generatePlainText(d: FormData): string {
  const structureLabel =
    d.structureType === "auto-entrepreneur"
      ? "Auto-entrepreneur"
      : d.structureType === "societe"
        ? "Société"
        : "Association"

  const now = new Date()
  const dateStr = now.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

  let text = `MENTIONS LÉGALES\n`
  text += `Dernière mise à jour : ${dateStr}\n\n`

  text += `1. ÉDITEUR DU SITE\n\n`
  text += `Le site ${d.nomDomaine} est édité par :\n`
  text += `${d.raisonSociale} (${structureLabel})\n`
  text += `Siège social : ${d.adresse}\n`
  text += `SIRET : ${d.siret}\n`
  if (d.tvaIntra) text += `Numéro de TVA intracommunautaire : ${d.tvaIntra}\n`
  text += `\n`

  text += `2. RESPONSABLE DE PUBLICATION\n\n`
  text += `Responsable de la publication : ${d.responsable}\n`
  text += `Email : ${d.email}\n`
  text += `Téléphone : ${d.telephone}\n\n`

  text += `3. HÉBERGEUR\n\n`
  text += `Le site est hébergé par :\n`
  text += `${d.hebergeurNom}\n`
  text += `Adresse : ${d.hebergeurAdresse}\n`
  if (d.hebergeurTelephone && d.hebergeurTelephone !== "N/A") text += `Téléphone : ${d.hebergeurTelephone}\n`
  text += `\n`

  text += `4. PROPRIÉTÉ INTELLECTUELLE\n\n`
  text += `L’ensemble du contenu du site ${d.nomDomaine} (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.\n`
  text += `Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de ${d.raisonSociale}.\n`
  text += `Toute exploitation non autorisée du site ou de l’un de ses éléments sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.\n\n`

  text += `5. PROTECTION DES DONNÉES PERSONNELLES\n\n`
  text += `Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :\n`
  text += `- Droit d’accès\n`
  text += `- Droit de rectification\n`
  text += `- Droit d’effacement\n`
  text += `- Droit à la limitation du traitement\n`
  text += `- Droit à la portabilité des données\n`
  text += `- Droit d’opposition\n\n`
  text += `Pour exercer ces droits, vous pouvez nous contacter à l’adresse suivante : ${d.email}\n`
  text += `Vous pouvez également adresser une réclamation auprès de la CNIL (www.cnil.fr).\n\n`

  text += `6. COOKIES\n\n`
  text += `Le site ${d.nomDomaine} peut utiliser des cookies pour améliorer l’expérience utilisateur et réaliser des statistiques de visites.\n`
  text += `Conformément à la législation en vigueur, vous êtes informé(e) que des cookies peuvent être déposés sur votre terminal lors de votre navigation.\n`
  text += `Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti(e) lors de leur dépôt.\n\n`

  text += `7. LIMITATION DE RESPONSABILITÉ\n\n`
  text += `${d.raisonSociale} s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur le site ${d.nomDomaine}. Toutefois, ${d.raisonSociale} ne peut garantir l’exactitude, la précision ou l’exhaustivité des informations mises à disposition.\n`
  text += `${d.raisonSociale} décline toute responsabilité :\n`
  text += `- pour toute interruption du site ;\n`
  text += `- pour toute survenance de bogues ;\n`
  text += `- pour toute imprécision ou inexactitude des informations ;\n`
  text += `- pour tout dommage résultant d’une intrusion frauduleuse d’un tiers.\n\n`

  text += `8. DROIT APPLICABLE\n\n`
  text += `Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.\n\n`

  text += `---\n`
  text += `Mentions légales générées gratuitement par Globe Créateur (https://globecreateur.fr/generateur-mentions-legales)\n`

  return text
}

function generateHtml(d: FormData): string {
  const structureLabel =
    d.structureType === "auto-entrepreneur"
      ? "Auto-entrepreneur"
      : d.structureType === "societe"
        ? "Société"
        : "Association"

  const now = new Date()
  const dateStr = now.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

  let html = `<h1>Mentions légales</h1>\n`
  html += `<p><em>Dernière mise à jour : ${dateStr}</em></p>\n\n`

  html += `<h2>1. Éditeur du site</h2>\n`
  html += `<p>Le site <strong>${d.nomDomaine}</strong> est édité par :</p>\n`
  html += `<ul>\n`
  html += `  <li><strong>${d.raisonSociale}</strong> (${structureLabel})</li>\n`
  html += `  <li>Siège social : ${d.adresse}</li>\n`
  html += `  <li>SIRET : ${d.siret}</li>\n`
  if (d.tvaIntra) html += `  <li>Numéro de TVA intracommunautaire : ${d.tvaIntra}</li>\n`
  html += `</ul>\n\n`

  html += `<h2>2. Responsable de publication</h2>\n`
  html += `<p>Responsable de la publication : <strong>${d.responsable}</strong></p>\n`
  html += `<ul>\n`
  html += `  <li>Email : <a href="mailto:${d.email}">${d.email}</a></li>\n`
  html += `  <li>Téléphone : ${d.telephone}</li>\n`
  html += `</ul>\n\n`

  html += `<h2>3. Hébergeur</h2>\n`
  html += `<p>Le site est hébergé par :</p>\n`
  html += `<ul>\n`
  html += `  <li><strong>${d.hebergeurNom}</strong></li>\n`
  html += `  <li>Adresse : ${d.hebergeurAdresse}</li>\n`
  if (d.hebergeurTelephone && d.hebergeurTelephone !== "N/A") html += `  <li>Téléphone : ${d.hebergeurTelephone}</li>\n`
  html += `</ul>\n\n`

  html += `<h2>4. Propriété intellectuelle</h2>\n`
  html += `<p>L’ensemble du contenu du site ${d.nomDomaine} (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.</p>\n`
  html += `<p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de ${d.raisonSociale}.</p>\n`
  html += `<p>Toute exploitation non autorisée du site ou de l’un de ses éléments sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>\n\n`

  html += `<h2>5. Protection des données personnelles</h2>\n`
  html += `<p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants concernant vos données personnelles :</p>\n`
  html += `<ul>\n`
  html += `  <li>Droit d’accès</li>\n`
  html += `  <li>Droit de rectification</li>\n`
  html += `  <li>Droit d’effacement</li>\n`
  html += `  <li>Droit à la limitation du traitement</li>\n`
  html += `  <li>Droit à la portabilité des données</li>\n`
  html += `  <li>Droit d’opposition</li>\n`
  html += `</ul>\n`
  html += `<p>Pour exercer ces droits, vous pouvez nous contacter à l’adresse suivante : <a href="mailto:${d.email}">${d.email}</a></p>\n`
  html += `<p>Vous pouvez également adresser une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.</p>\n\n`

  html += `<h2>6. Cookies</h2>\n`
  html += `<p>Le site ${d.nomDomaine} peut utiliser des cookies pour améliorer l’expérience utilisateur et réaliser des statistiques de visites.</p>\n`
  html += `<p>Conformément à la législation en vigueur, vous êtes informé(e) que des cookies peuvent être déposés sur votre terminal lors de votre navigation.</p>\n`
  html += `<p>Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti(e) lors de leur dépôt.</p>\n\n`

  html += `<h2>7. Limitation de responsabilité</h2>\n`
  html += `<p>${d.raisonSociale} s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur le site ${d.nomDomaine}. Toutefois, ${d.raisonSociale} ne peut garantir l’exactitude, la précision ou l’exhaustivité des informations mises à disposition.</p>\n`
  html += `<p>${d.raisonSociale} décline toute responsabilité :</p>\n`
  html += `<ul>\n`
  html += `  <li>pour toute interruption du site ;</li>\n`
  html += `  <li>pour toute survenance de bogues ;</li>\n`
  html += `  <li>pour toute imprécision ou inexactitude des informations ;</li>\n`
  html += `  <li>pour tout dommage résultant d’une intrusion frauduleuse d’un tiers.</li>\n`
  html += `</ul>\n\n`

  html += `<h2>8. Droit applicable</h2>\n`
  html += `<p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>\n\n`

  html += `<hr>\n`
  html += `<p><small>Mentions légales générées gratuitement par <a href="https://globecreateur.fr/generateur-mentions-legales" target="_blank" rel="noopener noreferrer">Globe Créateur</a></small></p>\n`

  return html
}

/* ------------------------------------------------------------------ */
/*  Step components                                                    */
/* ------------------------------------------------------------------ */

function StepStructure({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const options: { value: StructureType; label: string; desc: string }[] = [
    { value: "auto-entrepreneur", label: "Auto-entrepreneur", desc: "Entreprise individuelle, micro-entreprise" },
    { value: "societe", label: "Société", desc: "SARL, SAS, EURL, SA, SCI..." },
    { value: "association", label: "Association", desc: "Association loi 1901" },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Sélectionnez le type de structure juridique :</p>
      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange({ structureType: opt.value })}
            className={cn(
              "w-full text-left px-5 py-4 rounded-2xl border-2 transition-all cursor-pointer",
              data.structureType === opt.value
                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 shadow-md"
                : "border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700"
            )}
          >
            <p className="font-bold text-slate-900 dark:text-white">{opt.label}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{opt.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function StepIdentity({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Building2 className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Raison sociale / Nom
        </label>
        <input
          type="text"
          placeholder="Ex : Globe Créateur"
          value={data.raisonSociale}
          onChange={(e) => onChange({ raisonSociale: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <MapPin className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Adresse du siège social
        </label>
        <input
          type="text"
          placeholder="Ex : 10 rue de la Liberté, 21000 Dijon"
          value={data.adresse}
          onChange={(e) => onChange({ adresse: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Hash className="inline h-4 w-4 mr-1.5 text-amber-500" />
          SIRET
        </label>
        <input
          type="text"
          placeholder="Ex : 123 456 789 00012"
          value={data.siret}
          onChange={(e) => onChange({ siret: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Hash className="inline h-4 w-4 mr-1.5 text-amber-500" />
          N° TVA intracommunautaire <span className="text-slate-400 font-normal">(optionnel)</span>
        </label>
        <input
          type="text"
          placeholder="Ex : FR 12 345678901"
          value={data.tvaIntra}
          onChange={(e) => onChange({ tvaIntra: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
    </div>
  )
}

function StepContact({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <User className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Responsable de publication
        </label>
        <input
          type="text"
          placeholder="Prénom et nom"
          value={data.responsable}
          onChange={(e) => onChange({ responsable: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Mail className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Email de contact
        </label>
        <input
          type="email"
          placeholder="contact@monsite.fr"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Phone className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Téléphone
        </label>
        <input
          type="tel"
          placeholder="06 12 34 56 78"
          value={data.telephone}
          onChange={(e) => onChange({ telephone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
    </div>
  )
}

function StepHebergeur({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  const handlePreset = (key: string) => {
    const preset = hebergeurPresets[key]
    if (preset) {
      onChange({
        hebergeurNom: preset.nom,
        hebergeurAdresse: preset.adresse,
        hebergeurTelephone: preset.telephone,
      })
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Hébergeur prédéfini :</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(hebergeurPresets).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              onClick={() => handlePreset(key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all cursor-pointer",
                data.hebergeurNom === preset.nom
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-amber-300"
              )}
            >
              {preset.nom.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Server className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Nom de l&apos;hébergeur
        </label>
        <input
          type="text"
          placeholder="Ex : OVHcloud"
          value={data.hebergeurNom}
          onChange={(e) => onChange({ hebergeurNom: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <MapPin className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Adresse de l&apos;hébergeur
        </label>
        <input
          type="text"
          placeholder="Adresse complète"
          value={data.hebergeurAdresse}
          onChange={(e) => onChange({ hebergeurAdresse: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Phone className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Téléphone de l&apos;hébergeur
        </label>
        <input
          type="text"
          placeholder="Ex : 1007"
          value={data.hebergeurTelephone}
          onChange={(e) => onChange({ hebergeurTelephone: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
      </div>
    </div>
  )
}

function StepSite({ data, onChange }: { data: FormData; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <Globe className="inline h-4 w-4 mr-1.5 text-amber-500" />
          Nom de domaine du site
        </label>
        <input
          type="text"
          placeholder="Ex : www.monsite.fr"
          value={data.nomDomaine}
          onChange={(e) => onChange({ nomDomaine: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
        />
        <p className="text-xs text-slate-400 mt-1.5">Avec ou sans www, tel qu&apos;il apparaîtra dans les mentions légales.</p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Progress bar                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {Array.from({ length: total }, (_, i) => {
        const step = steps[i]
        const Icon = step.icon
        const isActive = i + 1 === current
        const isDone = i + 1 < current
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "w-full h-1.5 rounded-full transition-all duration-500",
                isDone
                  ? "bg-amber-500"
                  : isActive
                    ? "bg-amber-400"
                    : "bg-slate-200 dark:bg-slate-700"
              )}
            />
            <div className="flex items-center gap-1">
              <Icon
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  isDone || isActive ? "text-amber-500" : "text-slate-400"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-semibold hidden sm:block transition-colors",
                  isDone || isActive ? "text-amber-600 dark:text-amber-400" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Result display                                                     */
/* ------------------------------------------------------------------ */

function ResultDisplay({ data }: { data: FormData }) {
  const [copied, setCopied] = useState<"text" | "html" | null>(null)

  const handleCopy = useCallback(
    async (type: "text" | "html") => {
      const content = type === "text" ? generatePlainText(data) : generateHtml(data)
      await navigator.clipboard.writeText(content)
      setCopied(type)
      setTimeout(() => setCopied(null), 2500)
    },
    [data]
  )

  const structureLabel =
    data.structureType === "auto-entrepreneur"
      ? "Auto-entrepreneur"
      : data.structureType === "societe"
        ? "Société"
        : "Association"

  const now = new Date()
  const dateStr = now.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          type="button"
          onClick={() => handleCopy("text")}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
            copied === "text"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          )}
        >
          {copied === "text" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copier le texte
            </>
          )}
        </Button>
        <Button
          type="button"
          onClick={() => handleCopy("html")}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2",
            copied === "html"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-slate-800 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500 text-white"
          )}
        >
          {copied === "html" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Copié !
            </>
          ) : (
            <>
              <Code className="h-4 w-4" />
              Copier en HTML
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      <Card className="p-6 lg:p-10">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-extrabold prose-h1:text-2xl prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-3 prose-p:text-sm prose-li:text-sm prose-ul:my-2">
          <h1>Mentions légales</h1>
          <p><em>Dernière mise à jour : {dateStr}</em></p>

          <h2>1. Éditeur du site</h2>
          <p>Le site <strong>{data.nomDomaine}</strong> est édité par :</p>
          <ul>
            <li><strong>{data.raisonSociale}</strong> ({structureLabel})</li>
            <li>Siège social : {data.adresse}</li>
            <li>SIRET : {data.siret}</li>
            {data.tvaIntra && <li>N° TVA intracommunautaire : {data.tvaIntra}</li>}
          </ul>

          <h2>2. Responsable de publication</h2>
          <p>Responsable de la publication : <strong>{data.responsable}</strong></p>
          <ul>
            <li>Email : {data.email}</li>
            <li>Téléphone : {data.telephone}</li>
          </ul>

          <h2>3. Hébergeur</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>{data.hebergeurNom}</strong></li>
            <li>Adresse : {data.hebergeurAdresse}</li>
            {data.hebergeurTelephone && data.hebergeurTelephone !== "N/A" && (
              <li>Téléphone : {data.hebergeurTelephone}</li>
            )}
          </ul>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu du site {data.nomDomaine} (textes, images, vidéos, logos, icônes, sons,
            logiciels, etc.) est protégé par les lois françaises et internationales relatives à la
            propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des
            éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans
            l&apos;autorisation écrite préalable de {data.raisonSociale}.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de l&apos;un de ses éléments sera considérée
            comme constitutive d&apos;une contrefaçon et poursuivie conformément aux articles L.335-2 et suivants
            du Code de la propriété intellectuelle.
          </p>

          <h2>5. Protection des données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
            loi Informatique et Libertés du 6 janvier 1978 modifiée, vous disposez des droits suivants
            concernant vos données personnelles :
          </p>
          <ul>
            <li>Droit d&apos;accès</li>
            <li>Droit de rectification</li>
            <li>Droit d&apos;effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p>Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse suivante : {data.email}</p>
          <p>
            Vous pouvez également adresser une réclamation auprès de la{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              CNIL
            </a>
            .
          </p>

          <h2>6. Cookies</h2>
          <p>
            Le site {data.nomDomaine} peut utiliser des cookies pour améliorer l&apos;expérience utilisateur et
            réaliser des statistiques de visites.
          </p>
          <p>
            Conformément à la législation en vigueur, vous êtes informé(e) que des cookies
            peuvent être déposés sur votre terminal lors de votre navigation.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti(e) lors de leur
            dépôt.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            {data.raisonSociale} s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
            diffusées sur le site {data.nomDomaine}. Toutefois, {data.raisonSociale} ne peut garantir
            l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition.
          </p>
          <p>{data.raisonSociale} décline toute responsabilité :</p>
          <ul>
            <li>pour toute interruption du site ;</li>
            <li>pour toute survenance de bogues ;</li>
            <li>pour toute imprécision ou inexactitude des informations ;</li>
            <li>pour tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers.</li>
          </ul>

          <h2>8. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les
            tribunaux français seront seuls compétents.
          </p>

          <hr />
          <p className="text-xs text-slate-400">
            Mentions légales générées gratuitement par{" "}
            <a
              href="https://globecreateur.fr/generateur-mentions-legales"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              Globe Créateur
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function LegalNoticeGenerator() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialFormData)
  const [generated, setGenerated] = useState(false)

  const totalSteps = steps.length

  const updateData = useCallback((partial: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }, [])

  const canGoNext = (): boolean => {
    switch (step) {
      case 1:
        return data.structureType !== ""
      case 2:
        return data.raisonSociale.trim() !== "" && data.adresse.trim() !== "" && data.siret.trim() !== ""
      case 3:
        return data.responsable.trim() !== "" && data.email.trim() !== "" && data.telephone.trim() !== ""
      case 4:
        return data.hebergeurNom.trim() !== "" && data.hebergeurAdresse.trim() !== ""
      case 5:
        return data.nomDomaine.trim() !== ""
      default:
        return false
    }
  }

  const handleGenerate = () => {
    setGenerated(true)
  }

  const handleReset = () => {
    setStep(1)
    setData(initialFormData)
    setGenerated(false)
  }

  if (generated) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4"
          >
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Vos mentions légales sont prêtes !
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Copiez-les en texte brut ou en HTML et collez-les sur votre site.
          </p>
        </div>

        <ResultDisplay data={data} />

        <div className="text-center mt-8">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer underline underline-offset-4"
          >
            Générer de nouvelles mentions légales
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 lg:p-10">
        <ProgressBar current={step} total={totalSteps} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
              {steps[step - 1].label}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Étape {step} sur {totalSteps}
            </p>

            {step === 1 && <StepStructure data={data} onChange={updateData} />}
            {step === 2 && <StepIdentity data={data} onChange={updateData} />}
            {step === 3 && <StepContact data={data} onChange={updateData} />}
            {step === 4 && <StepHebergeur data={data} onChange={updateData} />}
            {step === 5 && <StepSite data={data} onChange={updateData} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>

          {step < totalSteps ? (
            <Button
              type="button"
              onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
              disabled={!canGoNext()}
              className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleGenerate}
              disabled={!canGoNext()}
              className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Générer les mentions légales
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  User, Briefcase, Building2, Mail, Phone, Globe, MapPin,
  Linkedin, Instagram, Facebook, Twitter,
  Copy, Check, Code, ChevronDown, ChevronRight, ChevronLeft,
  Palette, Layout, Type, Image, MousePointerClick,
  Sun, Moon, Sparkles,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FormData = {
  firstName: string
  lastName: string
  title: string
  department: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  photoUrl: string
  logoUrl: string
  linkedin: string
  instagram: string
  facebook: string
  twitter: string
  color: string
  font: string
  fontSize: string
  ctaText: string
  ctaUrl: string
  disclaimer: string
}

type Template = "classique" | "moderne" | "minimal" | "corporate" | "creatif"

const defaultData: FormData = {
  firstName: "",
  lastName: "",
  title: "",
  department: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  photoUrl: "",
  logoUrl: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  color: "#4f46e5",
  font: "Arial, sans-serif",
  fontSize: "13",
  ctaText: "",
  ctaUrl: "",
  disclaimer: "",
}

const fonts = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
  { value: "Courier New, monospace", label: "Courier" },
]

const fontSizes = [
  { value: "11", label: "Petit" },
  { value: "13", label: "Normal" },
  { value: "15", label: "Grand" },
]

const presetColors = [
  "#4f46e5", "#0891b2", "#059669", "#d97706", "#dc2626",
  "#7c3aed", "#db2777", "#0f172a", "#475569", "#1e40af",
]

const disclaimerPresets = [
  { label: "Aucun", value: "" },
  { label: "Confidentialité", value: "Ce message et ses pièces jointes sont confidentiels. Si vous n'êtes pas le destinataire, merci de le supprimer et d'en informer l'expéditeur." },
  { label: "Environnement", value: "Pensez à l'environnement avant d'imprimer ce message." },
]

const inputClass =
  "w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"

const inputClassNoPad =
  "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"

/* ------------------------------------------------------------------ */
/*  Tabs config                                                        */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "template", label: "Template", icon: Layout },
  { id: "infos", label: "Informations", icon: User },
  { id: "style", label: "Style", icon: Palette },
  { id: "options", label: "Options", icon: Sparkles },
] as const

type TabId = (typeof tabs)[number]["id"]

/* ------------------------------------------------------------------ */
/*  Templates config                                                   */
/* ------------------------------------------------------------------ */

const templates: { id: Template; label: string; desc: string; preview: string }[] = [
  { id: "classique", label: "Classique", desc: "Propre avec séparateur horizontal", preview: "━━ ligne séparatrice" },
  { id: "moderne", label: "Moderne", desc: "Barre colorée latérale", preview: "▌ accent vertical" },
  { id: "minimal", label: "Minimal", desc: "Texte épuré sur une ligne", preview: "— texte condensé" },
  { id: "corporate", label: "Corporate", desc: "Encadré avec logo entreprise", preview: "▢ cadre structuré" },
  { id: "creatif", label: "Créatif", desc: "Couleur dominante et audacieux", preview: "◆ couleurs vives" },
]

/* ------------------------------------------------------------------ */
/*  Generate signature HTML                                            */
/* ------------------------------------------------------------------ */

function generateSignatureHtml(data: FormData, template: Template): string {
  const fullName = `${data.firstName} ${data.lastName}`.trim()
  const color = data.color || "#4f46e5"
  const font = data.font || "Arial, sans-serif"
  const fs = parseInt(data.fontSize || "13")
  const websiteClean = data.website.replace(/^https?:\/\//, "").replace(/\/$/, "")

  // Social links
  const socials: string[] = []
  if (data.linkedin) socials.push(`<a href="${data.linkedin}" style="color:${color};text-decoration:none;font-size:${fs - 1}px;font-family:${font};" target="_blank">LinkedIn</a>`)
  if (data.instagram) socials.push(`<a href="${data.instagram}" style="color:${color};text-decoration:none;font-size:${fs - 1}px;font-family:${font};" target="_blank">Instagram</a>`)
  if (data.facebook) socials.push(`<a href="${data.facebook}" style="color:${color};text-decoration:none;font-size:${fs - 1}px;font-family:${font};" target="_blank">Facebook</a>`)
  if (data.twitter) socials.push(`<a href="${data.twitter}" style="color:${color};text-decoration:none;font-size:${fs - 1}px;font-family:${font};" target="_blank">X</a>`)
  const socialsRow = socials.length > 0 ? `<tr><td style="padding-top:8px;font-family:${font};">${socials.join(" &nbsp;|&nbsp; ")}</td></tr>` : ""

  // Photo
  const photoImg = data.photoUrl
    ? `<img src="${data.photoUrl}" alt="${fullName}" width="80" height="80" style="border-radius:${template === "moderne" || template === "creatif" ? "12px" : "50%"};width:80px;height:80px;object-fit:cover;display:block;" />`
    : ""
  const photoCell = photoImg ? `<td style="vertical-align:top;padding-right:16px;">${photoImg}</td>` : ""

  // Logo
  const logoImg = data.logoUrl
    ? `<tr><td style="padding-top:10px;"><img src="${data.logoUrl}" alt="${data.company}" height="30" style="height:30px;max-width:120px;display:block;" /></td></tr>`
    : ""

  // CTA button
  const ctaRow = data.ctaText && data.ctaUrl
    ? `<tr><td style="padding-top:10px;"><a href="${data.ctaUrl}" target="_blank" style="display:inline-block;padding:8px 18px;background-color:${color};color:#ffffff;text-decoration:none;border-radius:6px;font-size:${fs - 1}px;font-weight:bold;font-family:${font};">${data.ctaText}</a></td></tr>`
    : ""

  // Disclaimer
  const disclaimerRow = data.disclaimer
    ? `<tr><td style="padding-top:12px;font-size:${Math.max(fs - 3, 9)}px;color:#94a3b8;font-family:${font};line-height:1.4;max-width:450px;">${data.disclaimer}</td></tr>`
    : ""

  // Credit
  const creditRow = `<tr><td style="padding-top:10px;font-family:${font};"><a href="https://globecreateur.fr/generateur-signature-email" style="color:#cbd5e1;text-decoration:none;font-size:9px;" target="_blank">Signature cr&eacute;&eacute;e avec Globe Cr&eacute;ateur</a></td></tr>`

  // Title + department
  const titleLine = [data.title, data.department].filter(Boolean).join(" · ")

  // Contact info rows
  const contactRows = [
    data.email ? `<tr><td style="font-size:${fs - 1}px;color:#475569;padding-bottom:2px;font-family:${font};"><a href="mailto:${data.email}" style="color:${color};text-decoration:none;">${data.email}</a></td></tr>` : "",
    data.phone ? `<tr><td style="font-size:${fs - 1}px;color:#475569;padding-bottom:2px;font-family:${font};">${data.phone}</td></tr>` : "",
    data.website ? `<tr><td style="font-size:${fs - 1}px;padding-bottom:2px;font-family:${font};"><a href="${data.website}" style="color:${color};text-decoration:none;" target="_blank">${websiteClean}</a></td></tr>` : "",
    data.address ? `<tr><td style="font-size:${fs - 1}px;color:#94a3b8;padding-bottom:2px;font-family:${font};">${data.address}</td></tr>` : "",
  ].join("")

  if (template === "classique") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#334155;max-width:500px;">
  <tr>
    ${photoCell}
    <td style="vertical-align:top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:${fs + 5}px;font-weight:bold;color:#0f172a;padding-bottom:2px;font-family:${font};">${fullName || "Votre Nom"}</td></tr>
        ${titleLine ? `<tr><td style="font-size:${fs}px;color:${color};font-weight:600;padding-bottom:2px;font-family:${font};">${titleLine}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:${fs}px;color:#64748b;padding-bottom:8px;font-family:${font};">${data.company}</td></tr>` : ""}
        <tr><td style="border-top:2px solid ${color};padding-top:8px;"></td></tr>
        ${contactRows}
        ${socialsRow}
        ${logoImg}
        ${ctaRow}
        ${disclaimerRow}
        ${creditRow}
      </table>
    </td>
  </tr>
</table>`
  }

  if (template === "moderne") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#334155;max-width:500px;">
  <tr>
    ${photoCell}
    <td style="vertical-align:top;border-left:4px solid ${color};padding-left:16px;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="font-size:${fs + 7}px;font-weight:bold;color:${color};padding-bottom:2px;font-family:${font};">${fullName || "Votre Nom"}</td></tr>
        ${titleLine ? `<tr><td style="font-size:${fs}px;font-weight:600;color:#0f172a;padding-bottom:1px;font-family:${font};">${titleLine}</td></tr>` : ""}
        ${data.company ? `<tr><td style="font-size:${fs}px;color:#64748b;padding-bottom:10px;font-family:${font};">${data.company}</td></tr>` : ""}
        ${contactRows}
        ${socialsRow}
        ${logoImg}
        ${ctaRow}
        ${disclaimerRow}
        ${creditRow}
      </table>
    </td>
  </tr>
</table>`
  }

  if (template === "corporate") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#334155;max-width:520px;border:1px solid #e2e8f0;border-radius:8px;">
  <tr>
    <td style="padding:20px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          ${photoCell}
          <td style="vertical-align:top;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="font-size:${fs + 5}px;font-weight:bold;color:#0f172a;font-family:${font};">${fullName || "Votre Nom"}</td></tr>
              ${titleLine ? `<tr><td style="font-size:${fs}px;color:${color};font-weight:600;padding-top:2px;font-family:${font};">${titleLine}</td></tr>` : ""}
              ${data.company ? `<tr><td style="font-size:${fs}px;color:#64748b;padding-top:1px;font-family:${font};">${data.company}</td></tr>` : ""}
            </table>
          </td>
          ${data.logoUrl ? `<td style="vertical-align:top;text-align:right;padding-left:16px;"><img src="${data.logoUrl}" alt="${data.company}" height="40" style="height:40px;max-width:100px;" /></td>` : ""}
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;border-top:1px solid #e2e8f0;padding-top:12px;" width="100%">
        <tr>
          <td style="font-size:${fs - 1}px;color:#475569;font-family:${font};">
            ${[data.email ? `<a href="mailto:${data.email}" style="color:${color};text-decoration:none;">${data.email}</a>` : "", data.phone, data.website ? `<a href="${data.website}" style="color:${color};text-decoration:none;" target="_blank">${websiteClean}</a>` : ""].filter(Boolean).join(" &nbsp;&bull;&nbsp; ")}
          </td>
        </tr>
        ${data.address ? `<tr><td style="font-size:${fs - 2}px;color:#94a3b8;padding-top:4px;font-family:${font};">${data.address}</td></tr>` : ""}
        ${socialsRow}
        ${ctaRow}
      </table>
      ${data.disclaimer ? `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-top:1px solid #f1f5f9;padding-top:8px;" width="100%"><tr><td style="font-size:${Math.max(fs - 3, 9)}px;color:#94a3b8;font-family:${font};line-height:1.4;">${data.disclaimer}</td></tr></table>` : ""}
      <table cellpadding="0" cellspacing="0" border="0" style="margin-top:6px;" width="100%">${creditRow}</table>
    </td>
  </tr>
</table>`
  }

  if (template === "creatif") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};max-width:500px;">
  <tr>
    <td style="background-color:${color};padding:16px 20px;border-radius:10px 10px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${data.photoUrl ? `<td style="vertical-align:middle;padding-right:14px;"><img src="${data.photoUrl}" alt="${fullName}" width="64" height="64" style="border-radius:50%;width:64px;height:64px;object-fit:cover;border:3px solid rgba(255,255,255,0.3);" /></td>` : ""}
          <td style="vertical-align:middle;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr><td style="font-size:${fs + 5}px;font-weight:bold;color:#ffffff;font-family:${font};">${fullName || "Votre Nom"}</td></tr>
              ${titleLine ? `<tr><td style="font-size:${fs}px;color:rgba(255,255,255,0.85);font-family:${font};">${titleLine}</td></tr>` : ""}
              ${data.company ? `<tr><td style="font-size:${fs}px;color:rgba(255,255,255,0.7);font-family:${font};">${data.company}</td></tr>` : ""}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color:#f8fafc;padding:14px 20px;border-radius:0 0 10px 10px;border:1px solid #e2e8f0;border-top:none;">
      <table cellpadding="0" cellspacing="0" border="0">
        ${contactRows}
        ${socialsRow}
        ${data.logoUrl ? `<tr><td style="padding-top:8px;"><img src="${data.logoUrl}" alt="${data.company}" height="24" style="height:24px;max-width:100px;" /></td></tr>` : ""}
        ${ctaRow}
        ${disclaimerRow}
        ${creditRow}
      </table>
    </td>
  </tr>
</table>`
  }

  // minimal
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#334155;max-width:500px;">
  <tr><td style="font-size:${fs + 1}px;font-weight:bold;color:#0f172a;font-family:${font};">${fullName || "Votre Nom"}${titleLine ? ` &mdash; ${titleLine}` : ""}${data.company ? ` | ${data.company}` : ""}</td></tr>
  <tr><td style="font-size:${fs - 1}px;color:#64748b;padding-top:4px;font-family:${font};">
    ${[data.email, data.phone, data.website ? `<a href="${data.website}" style="color:${color};text-decoration:none;">${websiteClean}</a>` : ""].filter(Boolean).join(" &nbsp;&bull;&nbsp; ")}
  </td></tr>
  ${data.address ? `<tr><td style="font-size:${fs - 2}px;color:#94a3b8;padding-top:2px;font-family:${font};">${data.address}</td></tr>` : ""}
  ${socialsRow}
  ${ctaRow}
  ${disclaimerRow}
  ${creditRow}
</table>`
}

/* ------------------------------------------------------------------ */
/*  Tab: Template selection                                            */
/* ------------------------------------------------------------------ */

function TabTemplate({ template, setTemplate, data }: { template: Template; setTemplate: (t: Template) => void; data: FormData }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">Choisissez un design pour votre signature :</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={cn(
              "p-5 rounded-2xl border-2 text-left transition-all cursor-pointer group",
              template === t.id
                ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 shadow-lg shadow-cyan-500/10"
                : "border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-cyan-200 dark:hover:border-cyan-800"
            )}
          >
            <p className={cn(
              "text-sm font-bold",
              template === t.id ? "text-cyan-600 dark:text-cyan-400" : "text-slate-900 dark:text-white"
            )}>
              {t.label}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.desc}</p>
            <p className={cn(
              "text-xs font-mono mt-2",
              template === t.id ? "text-cyan-500" : "text-slate-300 dark:text-slate-600"
            )}>
              {t.preview}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab: Info form                                                     */
/* ------------------------------------------------------------------ */

function TabInfos({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      {/* Identity */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Identité</p>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Prénom" value={data.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} />
            </div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Nom" value={data.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Poste / Titre" value={data.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
            </div>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Département" value={data.department} onChange={(e) => update("department", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Entreprise" value={data.company} onChange={(e) => update("company", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Coordonnées</p>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="email" placeholder="Email" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="tel" placeholder="Téléphone" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="https://monsite.fr" value={data.website} onChange={(e) => update("website", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Adresse (optionnel)" value={data.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Social */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Réseaux sociaux</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="LinkedIn" value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="Instagram" value={data.instagram} onChange={(e) => update("instagram", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="Facebook" value={data.facebook} onChange={(e) => update("facebook", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="X (Twitter)" value={data.twitter} onChange={(e) => update("twitter", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab: Style                                                         */
/* ------------------------------------------------------------------ */

function TabStyle({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Couleur principale</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => update("color", c)}
              className={cn(
                "h-9 w-9 rounded-xl cursor-pointer transition-all",
                data.color === c ? "ring-2 ring-offset-2 ring-cyan-500 scale-110" : "hover:scale-105"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="relative">
            <input
              type="color"
              value={data.color}
              onChange={(e) => update("color", e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-9 h-9"
            />
            <div className="h-9 w-9 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer">
              <Palette className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">{data.color}</span>
      </div>

      {/* Font */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Police</p>
        <div className="grid grid-cols-3 gap-2">
          {fonts.map((f) => (
            <button
              key={f.value}
              onClick={() => update("font", f.value)}
              className={cn(
                "px-3 py-2.5 rounded-xl text-sm border-2 cursor-pointer transition-all",
                data.font === f.value
                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 font-bold text-cyan-600 dark:text-cyan-400"
                  : "border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-200"
              )}
              style={{ fontFamily: f.value }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Taille du texte</p>
        <div className="grid grid-cols-3 gap-2">
          {fontSizes.map((s) => (
            <button
              key={s.value}
              onClick={() => update("fontSize", s.value)}
              className={cn(
                "px-3 py-2.5 rounded-xl text-sm border-2 cursor-pointer transition-all",
                data.fontSize === s.value
                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 font-bold text-cyan-600 dark:text-cyan-400"
                  : "border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-200"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Images</p>
        <div className="space-y-3">
          <div className="relative">
            <Image className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="URL de votre photo de profil" value={data.photoUrl} onChange={(e) => update("photoUrl", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="URL du logo entreprise" value={data.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab: Options (CTA, disclaimer)                                     */
/* ------------------------------------------------------------------ */

function TabOptions({ data, update }: { data: FormData; update: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-6">
      {/* CTA */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Bouton d&apos;appel à l&apos;action</p>
        <p className="text-xs text-slate-400 mb-3">Ajoutez un bouton cliquable dans votre signature (ex : prise de RDV, portfolio, offre...)</p>
        <div className="space-y-3">
          <div className="relative">
            <MousePointerClick className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="text" placeholder="Texte du bouton (ex: Prendre RDV)" value={data.ctaText} onChange={(e) => update("ctaText", e.target.value)} className={inputClass} />
          </div>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input type="url" placeholder="URL du lien (ex: https://calendly.com/...)" value={data.ctaUrl} onChange={(e) => update("ctaUrl", e.target.value)} className={inputClass} />
          </div>
        </div>
        {data.ctaText && data.ctaUrl && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 flex items-center gap-2"
          >
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600 font-medium">Bouton activé</span>
          </motion.div>
        )}
      </div>

      {/* Disclaimer */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Mention de confidentialité</p>
        <p className="text-xs text-slate-400 mb-3">Texte légal affiché sous la signature (optionnel)</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {disclaimerPresets.map((d) => (
            <button
              key={d.label}
              onClick={() => update("disclaimer", d.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-all",
                data.disclaimer === d.value
                  ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-300"
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          placeholder="Ou saisissez votre propre texte..."
          value={data.disclaimer}
          onChange={(e) => update("disclaimer", e.target.value)}
          className={`${inputClassNoPad} resize-none`}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Email mockup preview                                               */
/* ------------------------------------------------------------------ */

function EmailMockup({ html, darkMode }: { html: string; darkMode: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl overflow-hidden border transition-colors",
      darkMode
        ? "bg-slate-900 border-slate-700"
        : "bg-white border-slate-200"
    )}>
      {/* Toolbar */}
      <div className={cn(
        "flex items-center gap-2 px-4 py-3 border-b",
        darkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className={cn("text-xs font-medium ml-2", darkMode ? "text-slate-400" : "text-slate-500")}>
          Nouveau message
        </span>
      </div>

      {/* Email header */}
      <div className={cn("px-5 py-3 border-b", darkMode ? "border-slate-700" : "border-slate-100")}>
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("text-xs font-semibold", darkMode ? "text-slate-400" : "text-slate-500")}>À :</span>
          <span className={cn("text-xs", darkMode ? "text-slate-300" : "text-slate-700")}>client@exemple.fr</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs font-semibold", darkMode ? "text-slate-400" : "text-slate-500")}>Objet :</span>
          <span className={cn("text-xs", darkMode ? "text-slate-300" : "text-slate-700")}>Proposition commerciale</span>
        </div>
      </div>

      {/* Email body */}
      <div className="px-5 py-4">
        <p className={cn("text-sm mb-4 leading-relaxed", darkMode ? "text-slate-300" : "text-slate-600")}>
          Bonjour,<br /><br />
          Merci pour notre échange. Vous trouverez ci-joint ma proposition.<br /><br />
          Cordialement,
        </p>
        {/* Signature */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: `1px solid ${darkMode ? "#334155" : "#f1f5f9"}` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Instructions                                                       */
/* ------------------------------------------------------------------ */

const instructionItems = [
  {
    client: "Gmail",
    steps: [
      "Cliquez \"Copier la signature\" ci-dessus",
      "Gmail → Paramètres (engrenage) → Voir tous les paramètres",
      "Onglet \"Général\" → Section \"Signature\"",
      "Cliquez \"Créer\" → Nommez votre signature → Collez (Ctrl+V)",
      "Enregistrer les modifications en bas de page",
    ],
  },
  {
    client: "Outlook (Bureau)",
    steps: [
      "Cliquez \"Copier la signature\"",
      "Fichier → Options → Courrier → Signatures",
      "Nouveau → Nommez → Collez (Ctrl+V) dans la zone d'édition",
      "Sélectionnez-la comme signature par défaut → OK",
    ],
  },
  {
    client: "Outlook (Web)",
    steps: [
      "Cliquez \"Copier la signature\"",
      "Paramètres (engrenage) → Courrier → Rédiger et répondre",
      "Dans la zone Signature → Collez (Ctrl+V)",
      "Enregistrer",
    ],
  },
  {
    client: "Apple Mail",
    steps: [
      "Cliquez \"Copier la signature\"",
      "Mail → Réglages → Signatures",
      "Cliquez + pour créer → Collez (Cmd+V)",
      "Décochez \"Toujours faire correspondre la police par défaut\"",
    ],
  },
  {
    client: "Thunderbird",
    steps: [
      "Cliquez \"Copier le code HTML\"",
      "Paramètres du compte → Cochez \"Apposer la signature\"",
      "Cochez \"Utiliser le HTML\" → Collez le code",
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function EmailSignatureGenerator() {
  const [data, setData] = useState<FormData>(defaultData)
  const [template, setTemplate] = useState<Template>("classique")
  const [activeTab, setActiveTab] = useState<TabId>("template")
  const [copied, setCopied] = useState<"signature" | "html" | null>(null)
  const [darkPreview, setDarkPreview] = useState(false)
  const [openInstruction, setOpenInstruction] = useState<string | null>(null)

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const signatureHtml = useMemo(() => generateSignatureHtml(data, template), [data, template])

  const copySignature = async () => {
    try {
      const blob = new Blob([signatureHtml], { type: "text/html" })
      const textBlob = new Blob([signatureHtml], { type: "text/plain" })
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob, "text/plain": textBlob }),
      ])
      setCopied("signature")
    } catch {
      await navigator.clipboard.writeText(signatureHtml)
      setCopied("html")
    }
    setTimeout(() => setCopied(null), 2500)
  }

  const copyHtml = async () => {
    await navigator.clipboard.writeText(signatureHtml)
    setCopied("html")
    setTimeout(() => setCopied(null), 2500)
  }

  const tabIndex = tabs.findIndex((t) => t.id === activeTab)
  const goNext = () => { if (tabIndex < tabs.length - 1) setActiveTab(tabs[tabIndex + 1].id) }
  const goPrev = () => { if (tabIndex > 0) setActiveTab(tabs[tabIndex - 1].id) }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Tabs + Form (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tab bar */}
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer",
                    activeTab === tab.id
                      ? "bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          <Card className="p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "template" && <TabTemplate template={template} setTemplate={setTemplate} data={data} />}
                {activeTab === "infos" && <TabInfos data={data} update={update} />}
                {activeTab === "style" && <TabStyle data={data} update={update} />}
                {activeTab === "options" && <TabOptions data={data} update={update} />}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={goPrev}
                disabled={tabIndex === 0}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </button>
              {tabIndex < tabs.length - 1 ? (
                <Button
                  onClick={goNext}
                  className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white cursor-pointer"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={copySignature} className="bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer">
                  {copied === "signature" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied === "signature" ? "Copié !" : "Copier la signature"}
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Right: Preview (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="sticky top-28 space-y-4">
            {/* Preview header */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Aperçu</p>
              <button
                onClick={() => setDarkPreview(!darkPreview)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer transition-colors"
              >
                {darkPreview ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {darkPreview ? "Mode clair" : "Mode sombre"}
              </button>
            </div>

            {/* Email mockup */}
            <EmailMockup html={signatureHtml} darkMode={darkPreview} />

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={copySignature}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white cursor-pointer"
                size="sm"
              >
                {copied === "signature" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === "signature" ? "Copié !" : "Copier la signature"}
              </Button>
              <Button onClick={copyHtml} variant="outline" className="cursor-pointer" size="sm">
                {copied === "html" ? <Check className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                {copied === "html" ? "Copié !" : "HTML"}
              </Button>
            </div>

            {/* Instructions */}
            <Card className="overflow-hidden">
              <p className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-700">
                Installation par client
              </p>
              {instructionItems.map((item) => (
                <div key={item.client} className="border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <button
                    onClick={() => setOpenInstruction(openInstruction === item.client ? null : item.client)}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {item.client}
                    <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", openInstruction === item.client && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openInstruction === item.client && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <ol className="px-5 pb-4 space-y-1.5 list-decimal list-inside">
                          {item.steps.map((step, i) => (
                            <li key={i} className="text-xs text-slate-500 dark:text-slate-400">{step}</li>
                          ))}
                        </ol>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

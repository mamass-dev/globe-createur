"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { track } from "@/lib/analytics"
import {
  User, Mail, Phone, Globe, Building2, MapPin, Briefcase,
  Linkedin, Instagram, Facebook, Twitter, Youtube,
  Palette, Upload, Copy, Check, Monitor, Smartphone,
  Moon, Sun, Eye, ChevronDown, Sparkles, Image as ImageIcon,
  Link2, Shield, Type, AlertCircle,
} from "lucide-react"

/* ─── Types ─── */
type SocialKey = "linkedin" | "instagram" | "facebook" | "twitter" | "youtube" | "tiktok"
type TemplateKey = "moderne" | "corporate" | "creatif" | "minimaliste" | "audacieux"
type PreviewClient = "gmail" | "outlook" | "mobile"

type FormData = {
  prenom: string
  nom: string
  poste: string
  entreprise: string
  email: string
  telephone: string
  siteWeb: string
  adresse: string
  socials: Record<SocialKey, string>
  couleurPrimaire: string
  couleurSecondaire: string
  template: TemplateKey
  logoUrl: string
  photoUrl: string
  ctaBanner: string
  ctaUrl: string
}

/* ─── Default state ─── */
const defaultForm: FormData = {
  prenom: "",
  nom: "",
  poste: "",
  entreprise: "",
  email: "",
  telephone: "",
  siteWeb: "",
  adresse: "",
  socials: { linkedin: "", instagram: "", facebook: "", twitter: "", youtube: "", tiktok: "" },
  couleurPrimaire: "#4f46e5",
  couleurSecondaire: "#8b5cf6",
  template: "moderne",
  logoUrl: "",
  photoUrl: "",
  ctaBanner: "",
  ctaUrl: "",
}

/* ─── Social config ─── */
const socialConfig: { key: SocialKey; label: string; icon: typeof Linkedin; placeholder: string }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/..." },
  { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/..." },
  { key: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/..." },
  { key: "twitter", label: "X (Twitter)", icon: Twitter, placeholder: "https://x.com/..." },
  { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@..." },
  { key: "tiktok", label: "TikTok", icon: Sparkles, placeholder: "https://tiktok.com/@..." },
]

/* ─── Templates ─── */
const templates: { key: TemplateKey; label: string; desc: string }[] = [
  { key: "moderne", label: "Moderne", desc: "Ligne verticale colorée, clean" },
  { key: "corporate", label: "Corporate", desc: "Classique, séparateur horizontal" },
  { key: "creatif", label: "Créatif", desc: "Bordure arrondie, fond subtil" },
  { key: "minimaliste", label: "Minimaliste", desc: "Texte pur, ultra léger" },
  { key: "audacieux", label: "Audacieux", desc: "Header coloré, photo ronde" },
]

/* ─── UTM builder ─── */
function addUtm(url: string, medium: string): string {
  if (!url) return ""
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`)
    u.searchParams.set("utm_source", "email_signature")
    u.searchParams.set("utm_medium", medium)
    u.searchParams.set("utm_campaign", "signature_generator")
    return u.toString()
  } catch {
    return url
  }
}

/* ─── Score calculator ─── */
function calculateScore(data: FormData): { total: number; details: { label: string; score: number; max: number; tip: string }[] } {
  const details: { label: string; score: number; max: number; tip: string }[] = []

  // Identity
  const identity = (data.prenom ? 5 : 0) + (data.nom ? 5 : 0) + (data.poste ? 5 : 0) + (data.entreprise ? 5 : 0)
  details.push({ label: "Identité", score: identity, max: 20, tip: "Renseignez nom, prénom, poste et entreprise" })

  // Contact
  const contact = (data.email ? 8 : 0) + (data.telephone ? 7 : 0) + (data.siteWeb ? 5 : 0)
  details.push({ label: "Contact", score: contact, max: 20, tip: "Email, téléphone et site web" })

  // Social
  const socialCount = Object.values(data.socials).filter(Boolean).length
  const social = Math.min(socialCount * 5, 15)
  details.push({ label: "Réseaux sociaux", score: social, max: 15, tip: "Ajoutez au moins 3 réseaux sociaux" })

  // Branding
  const branding = (data.logoUrl ? 8 : 0) + (data.photoUrl ? 7 : 0)
  details.push({ label: "Branding visuel", score: branding, max: 15, tip: "Ajoutez votre logo et photo professionnelle" })

  // Customization
  const custom = (data.couleurPrimaire !== "#4f46e5" ? 5 : 0) + (data.couleurSecondaire !== "#8b5cf6" ? 5 : 0)
  details.push({ label: "Personnalisation couleurs", score: custom, max: 10, tip: "Utilisez vos couleurs de marque" })

  // CTA
  const cta = data.ctaBanner && data.ctaUrl ? 10 : data.ctaBanner || data.ctaUrl ? 5 : 0
  details.push({ label: "Call-to-action", score: cta, max: 10, tip: "Ajoutez un CTA pour convertir vos emails" })

  // Address
  const addr = data.adresse ? 10 : 0
  details.push({ label: "Adresse", score: addr, max: 10, tip: "Ajoutez votre adresse pour la confiance" })

  const total = details.reduce((sum, d) => sum + d.score, 0)
  return { total, details }
}

/* ─── Color extraction from image ─── */
function extractColors(imageUrl: string): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) { resolve([]); return }
      canvas.width = 50
      canvas.height = 50
      ctx.drawImage(img, 0, 0, 50, 50)
      const data = ctx.getImageData(0, 0, 50, 50).data
      const colors: Record<string, number> = {}
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
        if (a < 128) continue
        if (r > 240 && g > 240 && b > 240) continue
        if (r < 15 && g < 15 && b < 15) continue
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
        colors[hex] = (colors[hex] || 0) + 1
      }
      const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c)
      resolve(sorted)
    }
    img.onerror = () => resolve([])
    img.src = imageUrl
  })
}

/* ─── Social icon SVG for email (inline, no external deps) ─── */
function socialIconSvg(key: SocialKey, color: string): string {
  const paths: Record<SocialKey, string> = {
    linkedin: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.28 8h4.44v12H.28zM7.5 8h4.26v1.64h.06C12.38 8.64 13.9 7.8 15.86 7.8c4.24 0 5.02 2.79 5.02 6.42V20.8h-4.44v-5.83c0-1.39-.03-3.18-1.94-3.18-1.94 0-2.24 1.51-2.24 3.08v5.93H7.5V8z",
    instagram: "M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.25-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z",
    facebook: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z",
    twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    youtube: "M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    tiktok: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.01-.3z",
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${color}"><path d="${paths[key]}"/></svg>`
}

/* ─── Generate signature HTML ─── */
function generateSignatureHtml(data: FormData, withUtm: boolean): string {
  const c1 = data.couleurPrimaire
  const c2 = data.couleurSecondaire
  const fullName = `${data.prenom} ${data.nom}`.trim() || "Votre Nom"
  const webUrl = withUtm && data.siteWeb ? addUtm(data.siteWeb, "website") : data.siteWeb
  const ctaLink = withUtm && data.ctaUrl ? addUtm(data.ctaUrl, "cta") : data.ctaUrl

  const activeSocials = socialConfig.filter((s) => data.socials[s.key])
  const socialsHtml = activeSocials.length > 0
    ? `<tr><td style="padding-top:10px">${activeSocials
        .map((s) => {
          const url = withUtm ? addUtm(data.socials[s.key], s.key) : data.socials[s.key]
          return `<a href="${url}" target="_blank" style="text-decoration:none;margin-right:8px">${socialIconSvg(s.key, c1)}</a>`
        })
        .join("")}</td></tr>`
    : ""

  const ctaHtml = data.ctaBanner && data.ctaUrl
    ? `<tr><td style="padding-top:12px"><a href="${ctaLink}" target="_blank" style="display:inline-block;padding:8px 20px;background:${c1};color:#ffffff;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;text-decoration:none;border-radius:6px">${data.ctaBanner}</a></td></tr>`
    : ""

  const photoHtml = data.photoUrl
    ? `<td style="vertical-align:top;padding-right:16px"><img src="${data.photoUrl}" width="80" height="80" alt="${fullName}" style="border-radius:${data.template === "audacieux" ? "50%" : "8px"};object-fit:cover;display:block" /></td>`
    : ""

  const logoHtml = data.logoUrl
    ? `<tr><td style="padding-top:10px"><img src="${data.logoUrl}" height="36" alt="${data.entreprise || "Logo"}" style="display:block;height:36px;width:auto" /></td></tr>`
    : ""

  const addressHtml = data.adresse
    ? `<tr><td style="font-family:Arial,sans-serif;font-size:12px;color:#71717a;padding-top:2px">${data.adresse}</td></tr>`
    : ""

  /* Template-specific wrappers */
  if (data.template === "moderne") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px"><tbody><tr>${photoHtml}<td style="border-left:3px solid ${c1};padding-left:16px;vertical-align:top"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="font-size:18px;font-weight:bold;color:#18181b">${fullName}</td></tr>${data.poste ? `<tr><td style="font-size:13px;color:${c1};font-weight:600;padding-top:1px">${data.poste}${data.entreprise ? ` — ${data.entreprise}` : ""}</td></tr>` : ""}<tr><td style="padding-top:8px;border-top:1px solid #e4e4e7;margin-top:8px"><table cellpadding="0" cellspacing="0" border="0"><tbody>${data.email ? `<tr><td style="font-size:12px;color:#52525b;padding-top:4px"><a href="mailto:${data.email}" style="color:#52525b;text-decoration:none">${data.email}</a></td></tr>` : ""}${data.telephone ? `<tr><td style="font-size:12px;color:#52525b;padding-top:2px"><a href="tel:${data.telephone}" style="color:#52525b;text-decoration:none">${data.telephone}</a></td></tr>` : ""}${data.siteWeb ? `<tr><td style="font-size:12px;padding-top:2px"><a href="${webUrl}" style="color:${c1};text-decoration:none;font-weight:600">${data.siteWeb.replace(/^https?:\/\//, "")}</a></td></tr>` : ""}${addressHtml}</tbody></table></td></tr>${socialsHtml}${logoHtml}${ctaHtml}</tbody></table></td></tr></tbody></table>`
  }

  if (data.template === "corporate") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px"><tbody><tr>${photoHtml}<td style="vertical-align:top"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="font-size:18px;font-weight:bold;color:#18181b">${fullName}</td></tr>${data.poste ? `<tr><td style="font-size:13px;color:#52525b;padding-top:1px">${data.poste}</td></tr>` : ""}${data.entreprise ? `<tr><td style="font-size:13px;font-weight:bold;color:${c1};padding-top:1px">${data.entreprise}</td></tr>` : ""}<tr><td style="padding-top:8px"><table cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid ${c1};padding-top:8px"><tbody>${data.email ? `<tr><td style="font-size:12px;color:#52525b;padding-top:6px">✉ <a href="mailto:${data.email}" style="color:#52525b;text-decoration:none">${data.email}</a></td></tr>` : ""}${data.telephone ? `<tr><td style="font-size:12px;color:#52525b;padding-top:2px">✆ <a href="tel:${data.telephone}" style="color:#52525b;text-decoration:none">${data.telephone}</a></td></tr>` : ""}${data.siteWeb ? `<tr><td style="font-size:12px;padding-top:2px">⊕ <a href="${webUrl}" style="color:${c1};text-decoration:none">${data.siteWeb.replace(/^https?:\/\//, "")}</a></td></tr>` : ""}${addressHtml}</tbody></table></td></tr>${socialsHtml}${logoHtml}${ctaHtml}</tbody></table></td></tr></tbody></table>`
  }

  if (data.template === "creatif") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px;border:1px solid #e4e4e7;border-radius:12px;overflow:hidden"><tbody><tr><td style="padding:20px"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr>${photoHtml}<td style="vertical-align:top"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="font-size:18px;font-weight:bold;color:#18181b">${fullName}</td></tr>${data.poste ? `<tr><td style="font-size:13px;color:#71717a;padding-top:1px">${data.poste}${data.entreprise ? ` · ${data.entreprise}` : ""}</td></tr>` : ""}</tbody></table></td></tr></tbody></table><table cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;padding-top:12px;border-top:1px dashed #d4d4d8"><tbody>${data.email ? `<tr><td style="font-size:12px;color:#52525b;padding-top:4px"><a href="mailto:${data.email}" style="color:#52525b;text-decoration:none">${data.email}</a></td></tr>` : ""}${data.telephone ? `<tr><td style="font-size:12px;color:#52525b;padding-top:2px"><a href="tel:${data.telephone}" style="color:#52525b;text-decoration:none">${data.telephone}</a></td></tr>` : ""}${data.siteWeb ? `<tr><td style="font-size:12px;padding-top:2px"><a href="${webUrl}" style="color:${c1};text-decoration:none;font-weight:600">${data.siteWeb.replace(/^https?:\/\//, "")}</a></td></tr>` : ""}${addressHtml}${socialsHtml}${logoHtml}${ctaHtml}</tbody></table></td></tr></tbody></table>`
  }

  if (data.template === "audacieux") {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px"><tbody><tr><td style="background:linear-gradient(135deg,${c1},${c2});padding:16px 20px;border-radius:12px 12px 0 0"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr>${data.photoUrl ? `<td style="vertical-align:middle;padding-right:14px"><img src="${data.photoUrl}" width="64" height="64" alt="${fullName}" style="border-radius:50%;border:2px solid rgba(255,255,255,0.5);display:block;object-fit:cover" /></td>` : ""}<td style="vertical-align:middle"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="font-size:18px;font-weight:bold;color:#ffffff">${fullName}</td></tr>${data.poste ? `<tr><td style="font-size:13px;color:rgba(255,255,255,0.85);padding-top:1px">${data.poste}${data.entreprise ? ` — ${data.entreprise}` : ""}</td></tr>` : ""}</tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding:14px 20px;border:1px solid #e4e4e7;border-top:none;border-radius:0 0 12px 12px"><table cellpadding="0" cellspacing="0" border="0"><tbody>${data.email ? `<tr><td style="font-size:12px;color:#52525b;padding-top:2px"><a href="mailto:${data.email}" style="color:#52525b;text-decoration:none">${data.email}</a></td></tr>` : ""}${data.telephone ? `<tr><td style="font-size:12px;color:#52525b;padding-top:2px"><a href="tel:${data.telephone}" style="color:#52525b;text-decoration:none">${data.telephone}</a></td></tr>` : ""}${data.siteWeb ? `<tr><td style="font-size:12px;padding-top:2px"><a href="${webUrl}" style="color:${c1};text-decoration:none;font-weight:600">${data.siteWeb.replace(/^https?:\/\//, "")}</a></td></tr>` : ""}${addressHtml}${socialsHtml}${logoHtml}${ctaHtml}</tbody></table></td></tr></tbody></table>`
  }

  // minimaliste (default)
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;max-width:500px"><tbody><tr><td style="vertical-align:top"><table cellpadding="0" cellspacing="0" border="0"><tbody><tr><td style="font-size:16px;font-weight:bold;color:#18181b">${fullName}</td></tr>${data.poste || data.entreprise ? `<tr><td style="font-size:13px;color:#71717a;padding-top:1px">${[data.poste, data.entreprise].filter(Boolean).join(" · ")}</td></tr>` : ""}<tr><td style="font-size:12px;color:#52525b;padding-top:6px">${[data.email ? `<a href="mailto:${data.email}" style="color:#52525b;text-decoration:none">${data.email}</a>` : "", data.telephone ? `<a href="tel:${data.telephone}" style="color:#52525b;text-decoration:none">${data.telephone}</a>` : "", data.siteWeb ? `<a href="${webUrl}" style="color:${c1};text-decoration:none">${data.siteWeb.replace(/^https?:\/\//, "")}</a>` : ""].filter(Boolean).join(" · ")}</td></tr>${addressHtml}${socialsHtml}${ctaHtml}</tbody></table></td></tr></tbody></table>`
}

/* ─── Input component (DA-consistent) ─── */
function FormInput({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  icon: typeof User
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>
    </div>
  )
}

/* ─── Score Ring ─── */
function ScoreRing({ score }: { score: number }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444"

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800" />
        <motion.circle
          cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute text-2xl font-extrabold text-slate-900 dark:text-white">{score}</span>
    </div>
  )
}

/* ─── Tab button ─── */
function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof User; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
        active
          ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}

/* ═══════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════ */
export function SignatureGenerator() {
  const [form, setForm] = useState<FormData>(defaultForm)
  const [tab, setTab] = useState<"infos" | "socials" | "design" | "preview">("infos")
  const [previewClient, setPreviewClient] = useState<PreviewClient>("gmail")
  const [darkPreview, setDarkPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const previewRef = useRef<HTMLDivElement>(null)

  const updateForm = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateSocial = useCallback((key: SocialKey, value: string) => {
    setForm((prev) => ({ ...prev, socials: { ...prev.socials, [key]: value } }))
  }, [])

  // Extract colors when logo changes
  useEffect(() => {
    if (form.logoUrl) {
      extractColors(form.logoUrl).then(setExtractedColors)
    }
  }, [form.logoUrl])

  const handleImageUpload = (key: "logoUrl" | "photoUrl") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateForm(key, reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const score = calculateScore(form)
  const signatureHtml = generateSignatureHtml(form, true)

  const handleCopy = async () => {
    track("signature_copied")
    try {
      // Copy as rich HTML (for paste into email clients)
      const blob = new Blob([signatureHtml], { type: "text/html" })
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob, "text/plain": new Blob([signatureHtml], { type: "text/plain" }) }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      await navigator.clipboard.writeText(signatureHtml)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  /* ─── Preview wrapper styles by client ─── */
  const clientStyles: Record<PreviewClient, string> = {
    gmail: "",
    outlook: "",
    mobile: "max-w-[375px] mx-auto",
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10 items-start">
      {/* ═══ LEFT: Form ═══ */}
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          <TabBtn active={tab === "infos"} onClick={() => setTab("infos")} icon={User} label="Informations" />
          <TabBtn active={tab === "socials"} onClick={() => setTab("socials")} icon={Link2} label="Réseaux" />
          <TabBtn active={tab === "design"} onClick={() => setTab("design")} icon={Palette} label="Design" />
          <TabBtn active={tab === "preview"} onClick={() => setTab("preview")} icon={Eye} label="Score" />
        </div>

        <AnimatePresence mode="wait">
          {/* ── Tab: Infos ── */}
          {tab === "infos" && (
            <motion.div
              key="infos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormInput icon={User} label="Prénom" value={form.prenom} onChange={(v) => updateForm("prenom", v)} placeholder="Jean" />
                <FormInput icon={User} label="Nom" value={form.nom} onChange={(v) => updateForm("nom", v)} placeholder="Dupont" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormInput icon={Briefcase} label="Poste" value={form.poste} onChange={(v) => updateForm("poste", v)} placeholder="Directeur Commercial" />
                <FormInput icon={Building2} label="Entreprise" value={form.entreprise} onChange={(v) => updateForm("entreprise", v)} placeholder="Mon Entreprise" />
              </div>
              <FormInput icon={Mail} label="Email" value={form.email} onChange={(v) => updateForm("email", v)} type="email" placeholder="jean@monentreprise.fr" />
              <FormInput icon={Phone} label="Téléphone" value={form.telephone} onChange={(v) => updateForm("telephone", v)} type="tel" placeholder="06 12 34 56 78" />
              <FormInput icon={Globe} label="Site web" value={form.siteWeb} onChange={(v) => updateForm("siteWeb", v)} placeholder="www.monentreprise.fr" />
              <FormInput icon={MapPin} label="Adresse" value={form.adresse} onChange={(v) => updateForm("adresse", v)} placeholder="12 rue de la Paix, 21000 Dijon" />

              {/* CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Call-to-action (optionnel)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput icon={Type} label="Texte du bouton" value={form.ctaBanner} onChange={(v) => updateForm("ctaBanner", v)} placeholder="Prendre rendez-vous" />
                  <FormInput icon={Link2} label="Lien du CTA" value={form.ctaUrl} onChange={(v) => updateForm("ctaUrl", v)} placeholder="https://calendly.com/..." />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Tab: Socials ── */}
          {tab === "socials" && (
            <motion.div
              key="socials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {socialConfig.map((s) => (
                <FormInput
                  key={s.key}
                  icon={s.icon}
                  label={s.label}
                  value={form.socials[s.key]}
                  onChange={(v) => updateSocial(s.key, v)}
                  placeholder={s.placeholder}
                />
              ))}
              <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 p-4">
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Tracking UTM intégré automatiquement
                </p>
                <p className="text-[11px] text-indigo-500/80 dark:text-indigo-400/60 mt-1">
                  Chaque lien sera enrichi de paramètres UTM pour tracker les clics dans Google Analytics.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── Tab: Design ── */}
          {tab === "design" && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Template selection */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Template</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {templates.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => updateForm("template", t.key)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        form.template === t.key
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{t.label}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Couleurs</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Principale</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={form.couleurPrimaire}
                        onChange={(e) => updateForm("couleurPrimaire", e.target.value)}
                        className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.couleurPrimaire}
                        onChange={(e) => updateForm("couleurPrimaire", e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Secondaire</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={form.couleurSecondaire}
                        onChange={(e) => updateForm("couleurSecondaire", e.target.value)}
                        className="h-10 w-10 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.couleurSecondaire}
                        onChange={(e) => updateForm("couleurSecondaire", e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Extracted colors */}
                {extractedColors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Couleurs extraites de votre logo :
                    </p>
                    <div className="flex gap-2">
                      {extractedColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => updateForm("couleurPrimaire", c)}
                          className="h-8 w-8 rounded-lg border-2 border-white dark:border-slate-700 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: c }}
                          title={`Appliquer ${c}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Images */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Images</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Logo</label>
                    <label className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer min-h-[80px]">
                      {form.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element -- data URL uploadée par l'utilisateur (FileReader), dimensions inconnues, next/image inutile ici
                        <img src={form.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
                      ) : (
                        <>
                          <Upload className="h-5 w-5 text-slate-400" />
                          <span className="text-[11px] text-slate-400">Importer</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload("logoUrl")} className="hidden" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1.5">Photo</label>
                    <label className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors cursor-pointer min-h-[80px]">
                      {form.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element -- data URL uploadée par l'utilisateur (FileReader), dimensions inconnues, next/image inutile ici
                        <img src={form.photoUrl} alt="Photo" className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <>
                          <ImageIcon className="h-5 w-5 text-slate-400" />
                          <span className="text-[11px] text-slate-400">Importer</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload("photoUrl")} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Tab: Score ── */}
          {tab === "preview" && (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="text-center">
                <ScoreRing score={score.total} />
                <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                  Score de qualité : {score.total}/100
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {score.total >= 80 ? "Excellente signature !" : score.total >= 50 ? "Bonne base, encore quelques améliorations." : "Complétez votre signature pour un meilleur impact."}
                </p>
              </div>

              <div className="space-y-3">
                {score.details.map((d) => (
                  <div key={d.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{d.label}</span>
                      <span className={`font-bold ${d.score === d.max ? "text-green-500" : d.score > 0 ? "text-amber-500" : "text-slate-400"}`}>
                        {d.score}/{d.max}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: d.score === d.max ? "#22c55e" : d.score > 0 ? "#f59e0b" : "#e4e4e7" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.score / d.max) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    {d.score < d.max && (
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {d.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══ RIGHT: Preview + Export ═══ */}
      <div className="lg:sticky lg:top-28 space-y-4">
        {/* Preview controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(["gmail", "outlook", "mobile"] as PreviewClient[]).map((c) => (
              <button
                key={c}
                onClick={() => setPreviewClient(c)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  previewClient === c
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700"
                }`}
              >
                {c === "mobile" ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
                {c === "gmail" ? "Gmail" : c === "outlook" ? "Outlook" : "Mobile"}
              </button>
            ))}
          </div>
          <button
            onClick={() => setDarkPreview(!darkPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {darkPreview ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            {darkPreview ? "Light" : "Dark"}
          </button>
        </div>

        {/* Preview */}
        <div
          className={`rounded-2xl border overflow-hidden transition-colors ${
            darkPreview
              ? "bg-[#1a1a2e] border-slate-700"
              : "bg-white border-slate-200"
          } ${clientStyles[previewClient]}`}
        >
          {/* Fake email header */}
          <div className={`px-4 py-3 border-b text-xs ${darkPreview ? "border-slate-700 text-slate-400" : "border-slate-100 text-slate-500"}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">De :</span>
              <span>{form.prenom || "Jean"} {form.nom || "Dupont"} &lt;{form.email || "jean@exemple.fr"}&gt;</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Objet :</span>
              <span className={darkPreview ? "text-slate-300" : "text-slate-700"}>Re: Votre projet</span>
            </div>
          </div>

          {/* Email body */}
          <div className={`px-4 py-4 text-sm ${darkPreview ? "text-slate-300" : "text-slate-600"}`}>
            <p className="mb-4">Bonjour,</p>
            <p className="mb-6">Merci pour votre message. Je reviens vers vous rapidement.</p>
            <p className="mb-4">Cordialement,</p>

            {/* Separator */}
            <div className={`border-t mb-4 ${darkPreview ? "border-slate-700" : "border-slate-200"}`} />

            {/* Actual signature */}
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: signatureHtml }} />
          </div>
        </div>

        {/* Export */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copier la signature
              </>
            )}
          </button>

          {/* Instructions */}
          <details className="group">
            <summary className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Comment installer dans votre client email ?
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-4">
              <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">Gmail</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Cliquez sur &quot;Copier la signature&quot; ci-dessus</li>
                  <li>Gmail → Paramètres (⚙️) → Voir tous les paramètres</li>
                  <li>Section &quot;Signature&quot; → Créer → Collez (Ctrl+V)</li>
                  <li>Enregistrer</li>
                </ol>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">Outlook</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Cliquez sur &quot;Copier la signature&quot; ci-dessus</li>
                  <li>Fichier → Options → Courrier → Signatures</li>
                  <li>Nouveau → Collez (Ctrl+V) → OK</li>
                </ol>
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">Apple Mail</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Cliquez sur &quot;Copier la signature&quot; ci-dessus</li>
                  <li>Mail → Préférences → Signatures</li>
                  <li>Cliquez &quot;+&quot; → Collez (⌘+V) dans la zone de droite</li>
                </ol>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

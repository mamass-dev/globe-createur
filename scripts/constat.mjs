#!/usr/bin/env node
/**
 * Prépare la page de constat d'un prospect, en douze minutes maximum :
 *   node scripts/constat.mjs "Nom de l'entreprise" https://son-site.fr [--contact "Prénom Nom"] [--email x@y.fr] [--phone 06…] [--sector "menuiserie"] [--city Dijon]
 *
 * 1. Capture mobile du site (Playwright, 390 × 844) → Vercel Blob privé, servie par /api/p/<slug>/asset/
 * 2. Score technique via l'API de l'analyseur du site (production)
 * 3. Whois RDAP (titulaire, registrar, expiration)
 * 4. Crée le dossier (ou le complète s'il existe : --slug) et affiche le lien admin + le lien prospect
 *
 * Reste à faire à la main dans l'admin : les trois points, le test client mystère, la vidéo d'une minute.
 * Lit PRIVATE_READ_WRITE_TOKEN dans .env.local (magasin Blob privé « globe-prospects-prive »).
 */
import { readFileSync, existsSync } from "node:fs"
import { put, get, list } from "@vercel/blob"
import { randomBytes } from "node:crypto"

const env = Object.fromEntries(
  (existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "")
    .split("\n").filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")] })
)
for (const [k, v] of Object.entries(env)) if (!process.env[k]) process.env[k] = v
const token = process.env.PRIVATE_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN
if (!token) { console.error("PRIVATE_READ_WRITE_TOKEN manquant (vercel env pull .env.local)"); process.exit(1) }

const args = process.argv.slice(2)
const positional = args.filter((a, i) => !a.startsWith("--") && !(args[i - 1]?.startsWith("--")))
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined }
const [company, siteArg] = positional
if (!company) { console.error("Usage : node scripts/constat.mjs \"Entreprise\" https://site.fr [--contact …] [--email …] [--phone …] [--sector …] [--city …] [--slug …]"); process.exit(1) }
const site = siteArg ? (siteArg.startsWith("http") ? siteArg : `https://${siteArg}`) : undefined

const SITE_URL = "https://globecreateur.fr"
const slugify = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)
const suffix = (n = 6) => { const a = "abcdefghjkmnpqrstuvwxyz23456789"; return Array.from(randomBytes(n), (b) => a[b % a.length]).join("") }

async function readProspect(slug) {
  try {
    const r = await get(`prospects/${slug}.json`, { access: "private", useCache: false, token })
    if (!r || r.statusCode !== 200) return null
    return JSON.parse(await new Response(r.stream).text())
  } catch { return null }
}

/* 1. Capture mobile */
async function screenshot(url, slug) {
  const { chromium } = await import("playwright-core")
  const { globSync } = await import("node:fs")
  const candidates = globSync?.(`${process.env.HOME}/Library/Caches/ms-playwright/chromium_headless_shell-*/*/chrome-headless-shell`) ?? []
  const browser = await chromium.launch(candidates.length ? { executablePath: candidates.sort().at(-1) } : {})
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "fr-FR" })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 }).catch(() => page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 }))
  await page.waitForTimeout(1500)
  const buf = await page.screenshot({ type: "png", fullPage: false })
  await browser.close()
  const name = `${suffix(10)}-mobile.png`
  await put(`prospects-assets/${slug}/${name}`, buf, { access: "private", contentType: "image/png", addRandomSuffix: false, token })
  return `/api/p/${slug}/asset/${name}`
}

/* 2. Score analyseur */
async function score(url) {
  const r = await fetch(`${SITE_URL}/api/seo-analyze`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url }) })
  if (!r.ok) return { score: null, issues: [] }
  const d = await r.json()
  const checks = Array.isArray(d.checks) ? d.checks : []
  const issues = checks.filter((c) => c.status === "fail").map((c) => `${c.label} : ${c.tip}`).slice(0, 3)
  return { score: typeof d.score === "number" ? d.score : null, issues }
}

/* 3. Whois RDAP */
async function whois(url) {
  const host = new URL(url).hostname.replace(/^www\./, "")
  const parts = host.split(".")
  const domain = parts.slice(-2).join(".")
  try {
    const r = await fetch(`https://rdap.org/domain/${domain}`, { headers: { accept: "application/rdap+json" } })
    if (!r.ok) return { domain }
    const d = await r.json()
    const expires = (d.events ?? []).find((e) => e.eventAction === "expiration")?.eventDate
    const registrar = (d.entities ?? []).find((e) => (e.roles ?? []).includes("registrar"))
    const registrant = (d.entities ?? []).find((e) => (e.roles ?? []).includes("registrant"))
    const name = (ent) => { const v = ent?.vcardArray?.[1]?.find((x) => x[0] === "fn"); return v?.[3] ?? ent?.handle }
    return { domain, registrar: name(registrar), holder: name(registrant) ?? (registrant ? "masqué" : undefined), expires: expires?.slice(0, 10) }
  } catch { return { domain } }
}

const existingSlug = opt("slug")
let prospect = existingSlug ? await readProspect(existingSlug) : null
const slug = prospect?.slug ?? `${slugify(company) || "prospect"}-${suffix()}`
const now = new Date().toISOString()
if (!prospect) {
  prospect = {
    id: suffix(12), slug, company, state: "constat", createdAt: now, updatedAt: now,
    constat: { points: [] }, proposition: { modules: [], cases: [], version: 1 },
    questions: [], events: [], relances: [], shares: [], projet: { acces: [], planning: [], livrables: [] }, rapports: [],
  }
}
prospect.company = company
if (opt("contact")) prospect.contactName = opt("contact")
if (opt("email")) prospect.contactEmail = opt("email")
if (opt("phone")) prospect.contactPhone = opt("phone")
if (opt("sector")) prospect.sector = opt("sector")
if (opt("city")) prospect.city = opt("city")
if (site) prospect.website = site

if (site) {
  process.stdout.write("Capture mobile… ")
  try { prospect.constat.screenshotUrl = await screenshot(site, slug); console.log("ok") } catch (e) { console.log("échec :", e.message.slice(0, 80)) }
  process.stdout.write("Score technique… ")
  const s = await score(site); prospect.constat.score = s.score; console.log(s.score ?? "indisponible")
  if (s.issues.length && prospect.constat.points.length === 0) {
    prospect.constat.points = s.issues.map((i) => { const [title, ...rest] = i.split(" : "); return { title: `À relire : ${title}`, text: rest.join(" : ") } })
  }
  process.stdout.write("Whois… ")
  prospect.constat.whois = await whois(site); console.log(prospect.constat.whois.holder ?? "titulaire inconnu", "·", prospect.constat.whois.expires ?? "")
}
prospect.updatedAt = new Date().toISOString()
prospect.events.push({ type: "note", at: prospect.updatedAt, meta: { text: "constat préparé par scripts/constat.mjs" } })
await put(`prospects/${slug}.json`, JSON.stringify(prospect), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, token })

console.log(`\nDossier : ${SITE_URL}/admin/prospects/${slug}`)
console.log(`Lien prospect : ${SITE_URL}/p/${slug}`)
console.log("À compléter dans l'admin : les trois points (proposés depuis l'analyseur, à réécrire), le test client mystère, la vidéo d'une minute, le lien de rendez-vous.")
void list

import * as cheerio from "cheerio"
import fs from "node:fs"

/** Relève l'email et le téléphone publiés sur la page d'accueil (puis la page contact) d'un site. Données publiques uniquement. */
const UA = "Mozilla/5.0 (compatible; GlobeCreateur/1.0; +https://globecreateur.fr)"
const GENERIC_BAD = /(sentry|wixpress|example|domain\.com|email\.com|yourdomain|noreply|no-reply|\.png|\.jpg|\.svg|\.webp|\.gif)/i

async function get(url: string): Promise<string | null> {
  try {
    const c = new AbortController(); const t = setTimeout(() => c.abort(), 12000)
    const r = await fetch(url, { signal: c.signal, headers: { "User-Agent": UA, Accept: "text/html" }, redirect: "follow" })
    clearTimeout(t); if (!r.ok) return null; return await r.text()
  } catch { return null }
}
function extract(html: string, host: string) {
  const $ = cheerio.load(html)
  const emails = new Set<string>(), phones = new Set<string>()
  $("a[href^='mailto:']").each((_, a) => { const e = ($(a).attr("href") || "").replace(/^mailto:/i, "").split("?")[0].trim().toLowerCase(); if (e.includes("@")) emails.add(e) })
  const text = $("body").text()
  for (const m of text.matchAll(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi)) emails.add(m[0].toLowerCase())
  for (const m of html.matchAll(/[a-z0-9._%+-]+(?:\[at\]|\(at\)| ?\{at\} ?)[a-z0-9.-]+\.[a-z]{2,}/gi)) emails.add(m[0].toLowerCase().replace(/\[at\]|\(at\)|\{at\}/, "@").replace(/\s/g, ""))
  $("a[href^='tel:']").each((_, a) => { const p = ($(a).attr("href") || "").replace(/^tel:/i, "").replace(/[^\d+]/g, ""); if (p.length >= 9) phones.add(p) })
  for (const m of text.matchAll(/(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}/g)) phones.add(m[0].replace(/[^\d+]/g, ""))
  const contactLinks: string[] = []
  $("a[href]").each((_, a) => { const h = $(a).attr("href") || ""; const t = $(a).text().toLowerCase(); if (/contact|nous-joindre|nous-contacter/i.test(h) || /contact/.test(t)) contactLinks.push(h) })
  const clean = [...emails].filter((e) => !GENERIC_BAD.test(e))
  // priorité : même domaine, puis contact@/info@/bonjour@, puis le reste
  clean.sort((a, b) => Number(b.endsWith(host)) - Number(a.endsWith(host)) || Number(/^(contact|info|bonjour|hello|accueil)@/.test(b)) - Number(/^(contact|info|bonjour|hello|accueil)@/.test(a)))
  return { emails: clean.slice(0, 3), phones: [...phones].slice(0, 2), contactLinks: [...new Set(contactLinks)].slice(0, 3) }
}
const sites = JSON.parse(fs.readFileSync(process.argv[2], "utf8")) as { name: string; finalUrl: string; host: string }[]
const out: unknown[] = []; let i = 0
async function worker() {
  while (i < sites.length) {
    const s = sites[i++]
    let html = await get(s.finalUrl); let res = html ? extract(html, s.host) : { emails: [], phones: [], contactLinks: [] }
    if (res.emails.length === 0 && html) {
      for (const l of res.contactLinks) {
        try { const u = new URL(l, s.finalUrl).toString(); if (!u.includes(s.host)) continue; const h2 = await get(u); if (h2) { const r2 = extract(h2, s.host); if (r2.emails.length) { res = { ...r2, contactLinks: res.contactLinks }; break } if (!res.phones.length) res.phones = r2.phones } } catch { /* ignore */ }
      }
    }
    out.push({ host: s.host, name: s.name, emails: res.emails, phones: res.phones, reachable: !!html })
    process.stderr.write(`${res.emails[0] ? "@ " : "- "}${s.host}\n`)
  }
}
await Promise.all(Array.from({ length: 8 }, worker))
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 0)); console.log("done", out.length)

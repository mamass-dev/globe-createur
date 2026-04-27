#!/usr/bin/env node
/**
 * Pousse les URLs du sitemap à l'Indexing API de Google.
 *
 * Officiellement Google n'autorise que JobPosting et BroadcastEvent,
 * mais l'API accepte toutes les URLs et le crawl est généralement
 * déclenché. Utilisation à vos risques.
 *
 * Setup :
 * 1. Créer un projet Google Cloud (console.cloud.google.com)
 * 2. Activer "Indexing API" dans APIs & Services > Library
 * 3. Créer un compte de service (IAM & Admin > Service Accounts)
 * 4. Générer une clé JSON pour ce SA, la sauver à la racine
 *    sous le nom service-account.json
 * 5. Dans Google Search Console > Settings > Users and permissions,
 *    ajouter l'email du compte de service en "Owner"
 * 6. npm install googleapis
 * 7. node scripts/submit-google-indexing.mjs
 *
 * Quota : 200 URL/jour par défaut (peut être augmenté sur demande).
 */

import fs from "node:fs"
import path from "node:path"

const SITE_URL = process.env.SITE_URL || "https://globecreateur.fr"
const KEY_FILE = path.resolve("service-account.json")
const QUOTA_PER_RUN = 200

if (!fs.existsSync(KEY_FILE)) {
  console.error(`Missing ${KEY_FILE}. See header comment for setup.`)
  process.exit(1)
}

let google
try {
  ;({ google } = await import("googleapis"))
} catch {
  console.error("Missing dependency: npm install googleapis")
  process.exit(1)
}

async function fetchSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`)
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

async function main() {
  const urls = await fetchSitemapUrls()
  const batch = urls.slice(0, QUOTA_PER_RUN)

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  })

  const indexing = google.indexing({ version: "v3", auth })

  let success = 0
  let failed = 0
  for (const url of batch) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: { url, type: "URL_UPDATED" },
      })
      console.log(`OK  ${url}`)
      success++
    } catch (err) {
      console.error(`ERR ${url} -> ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. Success: ${success}, Failed: ${failed}, Total in sitemap: ${urls.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

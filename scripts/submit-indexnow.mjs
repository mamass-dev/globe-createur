#!/usr/bin/env node
/**
 * Soumet toutes les URLs du sitemap à IndexNow (Bing, Yandex, etc.).
 * Usage : node scripts/submit-indexnow.mjs [https://globecreateur.fr]
 */

const SITE_URL = process.argv[2] || process.env.SITE_URL || "https://globecreateur.fr"
const HOST = new URL(SITE_URL).host
const KEY = "c7096e2c33e6a5740bbc3204ba1633f5"

async function fetchSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`)
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  return urls.filter((u) => {
    try {
      return new URL(u).host === HOST
    } catch {
      return false
    }
  })
}

async function submit(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  }

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ]

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      })
      console.log(`${endpoint} -> ${res.status} ${res.statusText}`)
    } catch (err) {
      console.error(`${endpoint} -> ERROR`, err.message)
    }
  }
}

async function main() {
  console.log(`Fetching sitemap from ${SITE_URL}/sitemap.xml...`)
  const urls = await fetchSitemapUrls()
  console.log(`Found ${urls.length} URLs. Submitting to IndexNow...`)
  await submit(urls)
  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

#!/usr/bin/env node
/**
 * Données Search Console de globecreateur.fr (service account du repo).
 * Usage : node scripts/gsc-data.mjs <query|page|query-page|date> [jours=28] [limite=100]
 * Sortie : TSV (dimension(s), clics, impressions, CTR %, position)
 */
import { google } from "googleapis";

const [dim = "query", days = "28", limit = "100"] = process.argv.slice(2);
const DIMS = { query: ["query"], page: ["page"], "query-page": ["query", "page"], date: ["date"] };
if (!DIMS[dim]) { console.error("Dimension inconnue :", dim); process.exit(1); }

import { existsSync } from "node:fs";
const keyCandidates = ["../gsc-service-account.json", "../service-account.json"]
  .map((p) => new URL(p, import.meta.url).pathname);
const keyFile = keyCandidates.find(existsSync);

const auth = new google.auth.GoogleAuth({
  keyFile,
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
});

const sc = google.searchconsole({ version: "v1", auth });
const end = new Date(Date.now() - 3 * 864e5);
const start = new Date(end - (parseInt(days) - 1) * 864e5);
const iso = (d) => d.toISOString().slice(0, 10);

const res = await sc.searchanalytics.query({
  siteUrl: "sc-domain:globecreateur.fr",
  requestBody: {
    startDate: iso(start), endDate: iso(end),
    dimensions: DIMS[dim], rowLimit: parseInt(limit),
  },
});

console.log([...DIMS[dim], "clics", "impressions", "ctr_%", "position"].join("\t"));
for (const r of res.data.rows ?? []) {
  console.log([...r.keys, r.clicks, r.impressions, (r.ctr * 100).toFixed(2), r.position.toFixed(1)].join("\t"));
}

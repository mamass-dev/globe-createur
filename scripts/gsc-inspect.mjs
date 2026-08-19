#!/usr/bin/env node
/**
 * Statut d'indexation Search Console (URL Inspection API) pour une liste d'URLs.
 * Usage : node scripts/gsc-inspect.mjs <fichier-urls | url ...>
 * Sortie : TSV (url, verdict, coverageState, lastCrawl, canonicalGoogle)
 * Quota : 2 000 inspections / jour / propriété.
 */
import { google } from "googleapis";
import { existsSync, readFileSync } from "node:fs";

const keyFile = ["../gsc-service-account.json", "../service-account.json"]
  .map((p) => new URL(p, import.meta.url).pathname)
  .find(existsSync);

const auth = new google.auth.GoogleAuth({ keyFile, scopes: ["https://www.googleapis.com/auth/webmasters"] });
const sc = google.searchconsole({ version: "v1", auth });

const args = process.argv.slice(2);
const urls = args.length === 1 && existsSync(args[0])
  ? readFileSync(args[0], "utf8").split("\n").map((s) => s.trim()).filter(Boolean)
  : args;

console.log(["url", "verdict", "coverageState", "lastCrawl", "canonicalGoogle"].join("\t"));
for (const url of urls) {
  try {
    const { data } = await sc.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: "sc-domain:globecreateur.fr", languageCode: "fr" },
    });
    const r = data.inspectionResult?.indexStatusResult ?? {};
    console.log([url, r.verdict, r.coverageState, r.lastCrawlTime ?? "", r.googleCanonical ?? ""].join("\t"));
  } catch (e) {
    console.log([url, "ERROR", e.message].join("\t"));
  }
}

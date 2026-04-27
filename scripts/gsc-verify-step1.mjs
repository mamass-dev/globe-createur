#!/usr/bin/env node
/**
 * Étape 1/2 : récupère un token de vérification GSC depuis Google
 * et crée le fichier HTML dans public/.
 *
 * Lancer : node scripts/gsc-verify-step1.mjs
 * Puis commit + push, attendre Vercel, puis step2.
 */
import { google } from "googleapis"
import fs from "node:fs"
import path from "node:path"

const SITE = "https://globecreateur.fr/"

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/siteverification"],
})

const verification = google.siteVerification({ version: "v1", auth })

const res = await verification.webResource.getToken({
  requestBody: {
    site: { type: "SITE", identifier: SITE },
    verificationMethod: "FILE",
  },
})

const { token } = res.data
if (!token) {
  console.error("No token received")
  process.exit(1)
}

const filename = token
const content = `google-site-verification: ${token}`
const outPath = path.resolve("public", filename)
fs.writeFileSync(outPath, content)

console.log(`Token: ${token}`)
console.log(`File written: public/${filename}`)
console.log(`Next: commit + push, wait for Vercel, then run step2.`)

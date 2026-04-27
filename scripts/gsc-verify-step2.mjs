#!/usr/bin/env node
/**
 * Étape 2/2 : confirme la vérification GSC.
 * Google fetch le fichier HTML et valide le service account comme owner
 * de la propriété "URL prefix" https://globecreateur.fr/.
 *
 * Lancer après que le fichier soit déployé sur Vercel.
 */
import { google } from "googleapis"

const SITE = "https://globecreateur.fr/"

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/siteverification"],
})

const verification = google.siteVerification({ version: "v1", auth })

try {
  const res = await verification.webResource.insert({
    verificationMethod: "FILE",
    requestBody: {
      site: { type: "SITE", identifier: SITE },
    },
  })
  console.log("Verified successfully:")
  console.log(JSON.stringify(res.data, null, 2))
} catch (err) {
  console.error("ERROR:", err.code, "-", err.message)
  if (err.errors) console.error(JSON.stringify(err.errors, null, 2))
  process.exit(1)
}

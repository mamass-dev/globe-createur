import Script from "next/script"

/**
 * Rybbit (analytics auto-hébergée, sans cookie) — ne rend rien tant que
 * NEXT_PUBLIC_RYBBIT_SITE_ID n'est pas défini (Vercel → Environment Variables).
 */
export function Rybbit() {
  const siteId = process.env.NEXT_PUBLIC_RYBBIT_SITE_ID
  const host = process.env.NEXT_PUBLIC_RYBBIT_HOST ?? "https://stats.globecreateur.fr"
  if (!siteId) return null
  return <Script src={`${host}/api/script.js`} data-site-id={siteId} strategy="afterInteractive" />
}

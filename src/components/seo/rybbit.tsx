/**
 * Rybbit (analytics auto-hébergée, sans cookie) — snippet officiel rendu côté serveur
 * (React 19 hisse la balise <script src defer> dans le <head>). Ne rend rien tant que
 * NEXT_PUBLIC_RYBBIT_SITE_ID n'est pas défini (Vercel → Environment Variables).
 */
export function Rybbit() {
  const siteId = process.env.NEXT_PUBLIC_RYBBIT_SITE_ID
  const host = process.env.NEXT_PUBLIC_RYBBIT_HOST ?? "https://stats.globecreateur.fr"
  if (!siteId) return null
  return <script src={`${host}/api/script.js`} data-site-id={siteId} defer />
}

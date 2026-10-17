/** Adresses publiques du quartier général (tunnel de prospection). Utilisable côté client et serveur. */
export const HQ_URL = (process.env.NEXT_PUBLIC_HQ_URL || "https://hq.globecreateur.fr").replace(/\/$/, "")

export const hq = {
  admin: () => `${HQ_URL}/`,
  dossier: (slug: string) => `${HQ_URL}/admin/${slug}`,
  prospect: (slug: string) => `${HQ_URL}/${slug}`,
  document: (slug: string, version?: number) => `${HQ_URL}/${slug}/document${version ? `?v=${version}` : ""}`,
}

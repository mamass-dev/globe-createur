import { put, get, list, del } from "@vercel/blob"
import { randomBytes, createHash } from "node:crypto"
import { type Prospect, emptyProspect } from "./types"

/*
 * Stockage : un JSON par prospect dans Vercel Blob, accès privé (lisible uniquement
 * avec le jeton serveur). Volume attendu : quelques dizaines de dossiers, donc une
 * lecture-modification-écriture simple suffit. Les captures et vidéos sont stockées
 * en privé aussi et servies par une route du site (le lien prospect reste la seule clé).
 */

/** Magasin privé relié avec le préfixe PRIVATE (variable PRIVATE_READ_WRITE_TOKEN). */
const TOKEN = () => process.env.PRIVATE_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN
const PREFIX = "prospects/"
const pathFor = (slug: string) => `${PREFIX}${slug}.json`

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

export function randomSuffix(n = 6) {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789"
  const bytes = randomBytes(n)
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")
}

export function sha256(s: string) {
  return createHash("sha256").update(s).digest("hex")
}

export async function getProspect(slug: string): Promise<Prospect | null> {
  if (!/^[a-z0-9-]{3,60}$/.test(slug)) return null
  try {
    const res = await get(pathFor(slug), { access: "private", useCache: false, token: TOKEN() })
    if (!res || res.statusCode !== 200 || !res.stream) return null
    const text = await new Response(res.stream).text()
    return JSON.parse(text) as Prospect
  } catch {
    return null
  }
}

export async function saveProspect(p: Prospect): Promise<Prospect> {
  p.updatedAt = new Date().toISOString()
  await put(pathFor(p.slug), JSON.stringify(p), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: TOKEN(),
  })
  return p
}

/** Lecture-modification-écriture. `mutate` renvoie false pour annuler l'écriture. */
export async function updateProspect(slug: string, mutate: (p: Prospect) => boolean | void | Promise<boolean | void>): Promise<Prospect | null> {
  const p = await getProspect(slug)
  if (!p) return null
  const keep = await mutate(p)
  if (keep === false) return p
  return saveProspect(p)
}

export async function listProspects(): Promise<Prospect[]> {
  const out: Prospect[] = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: PREFIX, cursor, limit: 100, token: TOKEN() })
    for (const b of page.blobs) {
      if (!b.pathname.endsWith(".json")) continue
      const slug = b.pathname.slice(PREFIX.length, -5)
      const p = await getProspect(slug)
      if (p) out.push(p)
    }
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return out.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

export async function createProspect(company: string, extra: Partial<Prospect> = {}): Promise<Prospect> {
  const base = slugify(company) || "prospect"
  let slug = `${base}-${randomSuffix()}`
  while (await getProspect(slug)) slug = `${base}-${randomSuffix()}`
  const p = emptyProspect({ id: randomSuffix(12), slug, company, ...extra })
  return saveProspect(p)
}

export async function deleteProspect(slug: string) {
  await del(pathFor(slug), { token: TOKEN() })
}

export const ASSET_PREFIX = "prospects-assets/"

/** Capture ou vidéo : stockée en privé, servie par /api/p/<slug>/asset/<fichier>. */
export async function putAsset(slug: string, filename: string, body: Buffer | Blob | ReadableStream, contentType: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
  const name = `${randomSuffix(10)}-${safe}`
  await put(`${ASSET_PREFIX}${slug}/${name}`, body, {
    access: "private",
    contentType,
    addRandomSuffix: false,
    token: TOKEN(),
  })
  return `/api/p/${slug}/asset/${name}`
}

export async function getAsset(slug: string, name: string) {
  if (!/^[a-zA-Z0-9._-]{3,120}$/.test(name)) return null
  const res = await get(`${ASSET_PREFIX}${slug}/${name}`, { access: "private", useCache: true, token: TOKEN() })
  if (!res || res.statusCode !== 200 || !res.stream) return null
  return res
}

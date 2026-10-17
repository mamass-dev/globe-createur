import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "node:crypto"

/*
 * Accès admin : un mot de passe (PROSPECTS_ADMIN_PASSWORD) → cookie HMAC valable 30 jours.
 * Suffisant pour deux associés ; aucune donnée bancaire n'est stockée.
 */

const COOKIE = "gc_admin"
const DAYS = 30

function secret() {
  const s = process.env.PROSPECTS_ADMIN_PASSWORD
  if (!s) throw new Error("PROSPECTS_ADMIN_PASSWORD manquant")
  return s
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex")
}

export function makeSession(): string {
  const exp = Date.now() + DAYS * 864e5
  const payload = String(exp)
  return `${payload}.${sign(payload)}`
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return false
  if (Number(payload) < Date.now()) return false
  const expected = sign(payload)
  if (expected.length !== sig.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
}

export function checkPassword(input: string): boolean {
  const s = secret()
  const a = Buffer.from(input)
  const b = Buffer.from(s)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies()
  return verifySession(jar.get(COOKIE)?.value)
}

export async function setAdminCookie() {
  const jar = await cookies()
  jar.set(COOKIE, makeSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DAYS * 86400,
  })
}

export async function clearAdminCookie() {
  const jar = await cookies()
  jar.delete(COOKIE)
}

/** Garde pour les routes API admin : renvoie une Response 401 ou null si OK. */
export async function requireAdmin(): Promise<Response | null> {
  if (await isAdmin()) return null
  return Response.json({ error: "Non autorisé" }, { status: 401 })
}

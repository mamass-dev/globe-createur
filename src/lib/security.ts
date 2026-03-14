import { z } from "zod"

// ─── HTML SANITIZATION ───

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export function sanitizeForEmail(text: string): string {
  return escapeHtml(text).replace(/\n/g, "<br />")
}

// ─── IN-MEMORY RATE LIMITER ───

const requests = new Map<string, { count: number; resetAt: number }>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, val] of requests) {
    if (val.resetAt < now) requests.delete(key)
  }
}

export function rateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 3_600_000 }: { maxRequests?: number; windowMs?: number } = {}
): { success: boolean; remaining: number } {
  cleanup()
  const now = Date.now()
  const entry = requests.get(ip)

  if (!entry || entry.resetAt < now) {
    requests.set(ip, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: maxRequests - entry.count }
}

export function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

// ─── SSRF PROTECTION ───

const BLOCKED_PATTERNS = [
  /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)/i,
  /^https?:\/\/(169\.254\.|10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/,
  /^https?:\/\/\[::1\]/,
  /^https?:\/\/.*\.(local|internal|intranet|localhost)(\/|$)/i,
]

export function isUrlSafe(url: string): boolean {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(url)) return false
  }
  try {
    const parsed = new URL(url)
    if (!["http:", "https:"].includes(parsed.protocol)) return false
    if (parsed.port && !["80", "443", ""].includes(parsed.port)) return false
  } catch {
    return false
  }
  return true
}

// ─── ANTI-SPAM (honeypot + time check) ───

/**
 * Rejects bots that fill invisible fields or submit too fast.
 * Returns null if legit, or an error string if spam.
 */
export function checkSpam(body: Record<string, unknown>): string | null {
  // Honeypot: hidden field that should stay empty
  if (body._hp) return "spam"
  // Time check: reject if submitted in under 2 seconds
  const t = typeof body._t === "number" ? body._t : 0
  if (t > 0 && Date.now() - t < 2_000) return "spam"
  return null
}

// ─── VALIDATION SCHEMAS ───

export const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(100, "Nom trop long").trim(),
  email: z.string().email("Email invalide").max(255).trim(),
  message: z.string().min(10, "Message trop court").max(5000, "Message trop long").trim(),
})

export const devisSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim(),
  company: z.string().max(100).trim().optional().default(""),
  service: z.string().min(1, "Service requis").max(100).trim(),
  budget: z.string().max(50).trim().optional().default(""),
  message: z.string().min(10).max(5000).trim(),
})

export const leadSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).trim(),
  phone: z.string().max(20).trim().optional().default(""),
  source: z.string().max(50).trim().optional().default("unknown"),
  context: z.record(z.string(), z.unknown()).optional(),
})

export const leadMagnetSchema = z.object({
  email: z.string().email("Email invalide").max(255).trim(),
  source: z.string().max(100).trim().optional().default("lead-magnet"),
  offer: z.string().max(200).trim().optional().default(""),
  page: z.string().max(500).trim().optional().default(""),
})

export const seoAnalyzeSchema = z.object({
  url: z.string().min(4).max(2000).trim(),
})

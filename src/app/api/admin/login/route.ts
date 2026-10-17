import { NextResponse } from "next/server"
import { checkPassword, setAdminCookie, clearAdminCookie } from "@/lib/prospects/auth"
import { rateLimit, getClientIp } from "@/lib/security"

export async function POST(request: Request) {
  const ip = getClientIp(request)
  if (!rateLimit(`admin-login:${ip}`, { maxRequests: 10, windowMs: 900_000 }).success) {
    return NextResponse.json({ error: "Trop de tentatives" }, { status: 429 })
  }
  const body = await request.json().catch(() => ({}))
  const pwd = typeof body?.password === "string" ? body.password : ""
  if (!pwd || !checkPassword(pwd)) return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
  await setAdminCookie()
  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  await clearAdminCookie()
  return NextResponse.json({ ok: true })
}

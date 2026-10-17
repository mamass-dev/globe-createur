import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/prospects/auth"
import { getProspect, putAsset } from "@/lib/prospects/store"

const MAX = 60 * 1024 * 1024 // vidéo d'une minute en 1080p
const TYPES = ["image/png", "image/jpeg", "image/webp", "video/mp4", "video/quicktime", "video/webm"]

/** Capture d'écran ou vidéo du constat → fichier privé, servi par /api/p/<slug>/asset/. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const denied = await requireAdmin()
  if (denied) return denied
  const { slug } = await params
  if (!(await getProspect(slug))) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  const form = await request.formData()
  const file = form.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "Fichier manquant" }, { status: 400 })
  if (file.size > MAX) return NextResponse.json({ error: "Fichier trop lourd (60 Mo max)" }, { status: 413 })
  if (!TYPES.includes(file.type)) return NextResponse.json({ error: "Type non accepté" }, { status: 415 })
  const url = await putAsset(slug, file.name, file, file.type)
  return NextResponse.json({ ok: true, url })
}

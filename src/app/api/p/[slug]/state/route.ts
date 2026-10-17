import { NextResponse } from "next/server"
import { getProspect } from "@/lib/prospects/store"

/** Lecture légère pour l'actualisation de la page prospect (questions, réponses, état). */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getProspect(slug)
  if (!p) return NextResponse.json({ error: "Introuvable" }, { status: 404 })
  return NextResponse.json(
    { state: p.state, questions: p.questions, version: p.proposition.version, updatedAt: p.updatedAt },
    { headers: { "Cache-Control": "no-store" } }
  )
}

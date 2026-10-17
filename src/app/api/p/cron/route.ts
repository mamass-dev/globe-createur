import { NextResponse } from "next/server"
import { listProspects, saveProspect } from "@/lib/prospects/store"
import { computeDueRelance } from "@/lib/prospects/relances"
import { alertRelancesDue } from "@/lib/prospects/mail"

/*
 * Cron quotidien (vercel.json) : propose les relances dues et prévient Axel.
 * Rien ne part vers un prospect ici : l'envoi se fait depuis l'admin, après relecture.
 */
export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const prospects = await listProspects()
  const due: { p: typeof prospects[number]; topic: string; subject: string }[] = []
  for (const p of prospects) {
    const r = computeDueRelance(p)
    if (!r) continue
    p.relances.push(r)
    p.events.push({ type: "relance", at: r.dueAt, meta: { id: r.id, topic: r.topic, status: "proposee" } })
    await saveProspect(p)
    due.push({ p, topic: r.topic, subject: r.subject })
  }
  await alertRelancesDue(due)
  return NextResponse.json({ ok: true, checked: prospects.length, proposed: due.length })
}

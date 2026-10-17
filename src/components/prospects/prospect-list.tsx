"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { STATE_LABELS, type ProspectState } from "@/lib/prospects/types"
import { hq } from "@/lib/prospects/links"
import { Plus, Loader2, LogOut, Eye, MessageSquare, Bell } from "lucide-react"

type Row = {
  slug: string; company: string; contactName: string; state: ProspectState; createdAt: string; updatedAt: string
  opens: number; lastActivity: string | null; lastChapter: string | null; openQuestions: number; pendingRelances: number
}

const ago = (iso: string | null) => {
  if (!iso) return "jamais"
  const d = (Date.now() - new Date(iso).getTime()) / 864e5
  if (d < 1 / 24) return "à l'instant"
  if (d < 1) return `il y a ${Math.round(d * 24)} h`
  return `il y a ${Math.round(d)} j`
}

export function ProspectList() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [company, setCompany] = useState("")
  const [website, setWebsite] = useState("")
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  const load = async () => {
    const r = await fetch("/api/admin/prospects", { cache: "no-store" })
    if (r.ok) setRows(await r.json())
  }
  useEffect(() => { load() }, [])

  const create = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const r = await fetch("/api/admin/prospects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ company, website }) })
    setBusy(false)
    if (r.ok) { const { slug } = await r.json(); window.location.href = hq.dossier(slug) }
  }

  const states: ProspectState[] = ["constat", "proposition", "accepte", "projet", "rapport", "clos"]
  const counts = Object.fromEntries(states.map((s) => [s, rows?.filter((r) => r.state === s).length ?? 0]))

  return (
    <div className="min-h-dvh bg-noir text-ivory">
      <header className="border-b border-[#1c1c1c]">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
          <p className="text-lg font-bold">Prospects</p>
          <p className="text-xs text-aluminium">{rows ? `${rows.length} dossier${rows.length > 1 ? "s" : ""}` : ""}</p>
          <button type="button" onClick={async () => { await fetch("/api/admin/login", { method: "DELETE" }); router.refresh() }} className="ml-auto inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><LogOut className="h-3.5 w-3.5" /> Quitter</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Tunnel en chiffres */}
        <div className="grid grid-cols-3 gap-px border border-[#1c1c1c] bg-[#1c1c1c] sm:grid-cols-6">
          {states.map((s) => (<div key={s} className="bg-noir p-3"><p className="text-2xl font-bold">{counts[s]}</p><p className="text-[11px] uppercase tracking-widest text-aluminium">{STATE_LABELS[s]}</p></div>))}
        </div>

        <form onSubmit={create} className="mt-8 flex flex-col gap-3 border border-[#1c1c1c] p-4 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm"><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Nouvelle entreprise</span><input required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Menuiserie Dupont" className="mt-1 w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none focus:border-signal" /></label>
          <label className="flex-1 text-sm"><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Site (optionnel)</span><input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" className="mt-1 w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none focus:border-signal" /></label>
          <Button type="submit" size="md" disabled={busy || company.length < 2}>{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Créer le lien</Button>
        </form>
        <p className="mt-2 text-xs text-aluminium">Ou depuis le terminal : <code>node scripts/constat.mjs &quot;Entreprise&quot; https://son-site.fr</code> prépare le constat (capture mobile, score, Whois) avant d&apos;ouvrir le dossier ici.</p>

        <div className="mt-8 overflow-x-auto border border-[#1c1c1c]">
          <table className="w-full text-sm">
            <thead className="bg-[#0f0f0f] text-left text-[11px] uppercase tracking-widest text-aluminium">
              <tr><th className="p-3">Entreprise</th><th className="p-3">État</th><th className="p-3">Ouvertures</th><th className="p-3">Dernière activité</th><th className="p-3">Arrêt</th><th className="p-3">Signaux</th></tr>
            </thead>
            <tbody>
              {!rows && <tr><td className="p-4 text-aluminium" colSpan={6}><Loader2 className="inline h-4 w-4 animate-spin" /> Chargement</td></tr>}
              {rows?.length === 0 && <tr><td className="p-4 text-aluminium" colSpan={6}>Aucun dossier. Créez le premier ci-dessus.</td></tr>}
              {rows?.map((r) => (
                <tr key={r.slug} className="border-t border-[#1c1c1c] hover:bg-[#0f0f0f]">
                  <td className="p-3"><a href={hq.dossier(r.slug)} className="font-bold hover:text-signal">{r.company}</a><br /><span className="text-xs text-aluminium">{r.contactName || r.slug}</span></td>
                  <td className="p-3 text-xs">{STATE_LABELS[r.state]}</td>
                  <td className="p-3"><Eye className="mr-1 inline h-3.5 w-3.5 text-aluminium" />{r.opens}</td>
                  <td className="p-3 text-xs">{ago(r.lastActivity)}</td>
                  <td className="p-3 text-xs text-aluminium">{r.lastChapter ?? ""}</td>
                  <td className="p-3 text-xs">
                    {r.openQuestions > 0 && <span className="mr-2 inline-flex items-center gap-1 text-signal"><MessageSquare className="h-3.5 w-3.5" /> {r.openQuestions}</span>}
                    {r.pendingRelances > 0 && <span className="inline-flex items-center gap-1 text-signal"><Bell className="h-3.5 w-3.5" /> relance à valider</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

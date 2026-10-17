"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CATALOG } from "@/lib/prospects/catalog"
import { hq } from "@/lib/prospects/links"
import { STATE_LABELS, totals, type Prospect, type ProspectState, type Module } from "@/lib/prospects/types"
import { Loader2, Save, ExternalLink, Trash2, Upload, Plus, X, Send, Ban, Check } from "lucide-react"

type Props = { slug: string; cases: { slug: string; title: string }[] }

const when = (iso?: string) => (iso ? new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : "")
const field = "mt-1 w-full border-b border-[#2a2a2a] bg-transparent py-2 text-sm outline-none focus:border-signal"
const label = "block text-[11px] font-bold uppercase tracking-widest text-aluminium"
const area = "mt-1 w-full resize-y border border-[#2a2a2a] bg-transparent p-2 text-sm outline-none focus:border-signal"

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border border-[#1c1c1c] p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

export function ProspectEditor({ slug, cases }: Props) {
  const [p, setP] = useState<Prospect | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [newRel, setNewRel] = useState({ subject: "", draft: "" })
  const router = useRouter()

  const load = async () => {
    const r = await fetch(`/api/admin/prospects/${slug}`, { cache: "no-store" })
    if (r.ok) setP(await r.json())
  }
  useEffect(() => { load() }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (fn: (d: Prospect) => void) => setP((prev) => { if (!prev) return prev; const d = structuredClone(prev); fn(d); return d })

  const save = async () => {
    if (!p) return
    setSaving(true); setMsg(null)
    const body = { company: p.company, contactName: p.contactName, contactEmail: p.contactEmail ?? "", contactPhone: p.contactPhone, sector: p.sector, city: p.city, website: p.website, internalNotes: p.internalNotes, constat: p.constat, proposition: p.proposition, projet: p.projet, rapports: p.rapports, parrainageCode: p.parrainageCode }
    const r = await fetch(`/api/admin/prospects/${slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    setSaving(false)
    const d = await r.json().catch(() => ({}))
    setMsg(r.ok ? `Enregistré (proposition v${d.version})` : `Erreur : ${d.error ?? r.status} ${d.details ? JSON.stringify(d.details) : ""}`)
    if (r.ok) load()
  }

  const action = async (body: Record<string, unknown>) => {
    const r = await fetch(`/api/admin/prospects/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const d = await r.json().catch(() => ({}))
    setMsg(r.ok ? "Fait." : `Erreur : ${d.error ?? r.status}`)
    await load()
  }

  const upload = async (file: File, target: "screenshotUrl" | "videoUrl") => {
    setMsg("Envoi du fichier…")
    const fd = new FormData(); fd.append("file", file)
    const r = await fetch(`/api/admin/prospects/${slug}/upload`, { method: "POST", body: fd })
    const d = await r.json().catch(() => ({}))
    if (r.ok) { set((x) => { x.constat[target] = d.url }); setMsg("Fichier envoyé, pensez à enregistrer.") } else setMsg(`Erreur : ${d.error}`)
  }

  const sums = useMemo(() => (p ? totals(p.proposition) : { once: 0, monthly: 0 }), [p])

  if (!p) return <div className="flex min-h-dvh items-center justify-center bg-noir text-aluminium"><Loader2 className="h-5 w-5 animate-spin" /></div>

  const publicUrl = hq.prospect(p.slug)
  const states: ProspectState[] = ["constat", "proposition", "accepte", "projet", "rapport", "clos"]
  const lastOpen = [...p.events].reverse().find((e) => e.type === "open")

  return (
    <div className="min-h-dvh bg-noir text-ivory">
      <header className="sticky top-0 z-30 border-b border-[#1c1c1c] bg-noir/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <a href={hq.admin()} className="text-xs text-aluminium hover:text-ivory">← Prospects</a>
          <p className="font-bold">{p.company}</p>
          <select value={p.state} onChange={(e) => action({ action: "state", state: e.target.value })} className="border border-[#2a2a2a] bg-noir px-2 py-1 text-xs">
            {states.map((s) => <option key={s} value={s}>{STATE_LABELS[s]}</option>)}
          </select>
          <a href={publicUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><ExternalLink className="h-3.5 w-3.5" /> Voir la page</a>
          <button type="button" onClick={() => { navigator.clipboard.writeText(publicUrl); setMsg("Lien copié.") }} className="text-xs text-aluminium hover:text-ivory">Copier le lien</button>
          <span className="ml-auto text-xs text-aluminium">{msg}</span>
          <Button type="button" size="sm" onClick={save} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Enregistrer</Button>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6"><ul className="flex gap-4 pb-2 text-[11px] font-bold uppercase tracking-widest text-aluminium whitespace-nowrap">
          {[["fiche", "Fiche"], ["signaux", "Signaux"], ["constat", "Constat"], ["proposition", "Proposition"], ["questions", `Questions (${p.questions.filter((q) => !q.answer).length})`], ["relances", `Relances (${p.relances.filter((r) => r.status === "proposee").length})`], ["projet", "Projet"], ["rapports", "Rapports"]].map(([id, l]) => <li key={id}><a href={`#${id}`} className="hover:text-ivory">{l}</a></li>)}
        </ul></nav>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <Section id="fiche" title="Fiche">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className={label}>Entreprise<input value={p.company} onChange={(e) => set((d) => { d.company = e.target.value })} className={field} /></label>
            <label className={label}>Site<input value={p.website ?? ""} onChange={(e) => set((d) => { d.website = e.target.value })} className={field} /></label>
            <label className={label}>Secteur<input value={p.sector ?? ""} onChange={(e) => set((d) => { d.sector = e.target.value })} className={field} /></label>
            <label className={label}>Contact<input value={p.contactName ?? ""} onChange={(e) => set((d) => { d.contactName = e.target.value })} className={field} /></label>
            <label className={label}>E-mail (nécessaire aux relances)<input value={p.contactEmail ?? ""} onChange={(e) => set((d) => { d.contactEmail = e.target.value })} className={field} /></label>
            <label className={label}>Téléphone<input value={p.contactPhone ?? ""} onChange={(e) => set((d) => { d.contactPhone = e.target.value })} className={field} /></label>
            <label className={label}>Ville<input value={p.city ?? ""} onChange={(e) => set((d) => { d.city = e.target.value })} className={field} /></label>
          </div>
          <label className={label}>Notes internes (jamais affichées)<textarea rows={3} value={p.internalNotes ?? ""} onChange={(e) => set((d) => { d.internalNotes = e.target.value })} className={area} /></label>
          <p className="text-xs text-aluminium">Lien prospect : <code>{publicUrl}</code> · créé le {when(p.createdAt)}</p>
        </Section>

        <Section id="signaux" title="Signaux">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="bg-[#0f0f0f] p-3"><p className="text-xs text-aluminium">Ouvertures</p><p className="text-xl font-bold">{p.events.filter((e) => e.type === "open").length}</p><p className="text-xs text-aluminium">{lastOpen ? `dernière ${when(lastOpen.at)} (${lastOpen.meta?.device ?? ""})` : "jamais ouverte"}</p></div>
            <div className="bg-[#0f0f0f] p-3"><p className="text-xs text-aluminium">Chapitres lus</p><p className="text-sm">{[...new Set(p.events.filter((e) => e.type === "chapter").map((e) => e.meta?.chapter))].join(" → ") || "aucun"}</p></div>
            <div className="bg-[#0f0f0f] p-3"><p className="text-xs text-aluminium">Partagé à</p><p className="text-sm">{p.shares.map((s) => s.name).join(", ") || "personne"}</p></div>
            <div className="bg-[#0f0f0f] p-3"><p className="text-xs text-aluminium">Sélection du prospect</p><p className="text-sm">{p.proposition.modules.filter((m) => m.selected).length}/{p.proposition.modules.length} briques · {sums.once.toLocaleString("fr-FR")} € HT{sums.monthly ? ` + ${sums.monthly}/mois` : ""}</p></div>
          </div>
          <details><summary className="cursor-pointer text-xs text-aluminium">Journal complet ({p.events.length})</summary>
            <ul className="mt-2 max-h-64 overflow-auto text-xs text-aluminium">{[...p.events].reverse().map((e, i) => <li key={i}>{when(e.at)} · {e.type}{e.meta ? " · " + Object.entries(e.meta).map(([k, v]) => `${k}=${v}`).join(" ") : ""}</li>)}</ul>
          </details>
        </Section>

        <Section id="constat" title="Constat">
          <label className={label}>Accroche (texte écrit pour ce prospect)<textarea rows={3} value={p.constat.pitch ?? ""} onChange={(e) => set((d) => { d.constat.pitch = e.target.value })} className={area} /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Capture mobile (URL)<input value={p.constat.screenshotUrl ?? ""} onChange={(e) => set((d) => { d.constat.screenshotUrl = e.target.value })} className={field} /></label>
              <label className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs text-aluminium hover:text-ivory"><Upload className="h-3.5 w-3.5" /> Envoyer une image<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "screenshotUrl")} /></label>
            </div>
            <div>
              <label className={label}>Vidéo (mp4, YouTube non répertorié ou Loom)<input value={p.constat.videoUrl ?? ""} onChange={(e) => set((d) => { d.constat.videoUrl = e.target.value })} className={field} /></label>
              <label className="mt-2 inline-flex cursor-pointer items-center gap-1 text-xs text-aluminium hover:text-ivory"><Upload className="h-3.5 w-3.5" /> Envoyer un mp4 (60 Mo max)<input type="file" accept="video/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0], "videoUrl")} /></label>
            </div>
            <label className={label}>Score analyseur (0-100)<input type="number" value={p.constat.score ?? ""} onChange={(e) => set((d) => { d.constat.score = e.target.value === "" ? null : Number(e.target.value) })} className={field} /></label>
            <label className={label}>Lien de prise de rendez-vous<input value={p.constat.bookingUrl ?? ""} onChange={(e) => set((d) => { d.constat.bookingUrl = e.target.value })} className={field} /></label>
          </div>
          <div>
            <p className={label}>Les trois choses qui coûtent</p>
            {p.constat.points.map((pt, i) => (
              <div key={i} className="mt-2 flex gap-2">
                <div className="flex-1 space-y-1">
                  <input value={pt.title} placeholder="Titre" onChange={(e) => set((d) => { d.constat.points[i].title = e.target.value })} className={field} />
                  <textarea rows={2} value={pt.text} placeholder="Explication" onChange={(e) => set((d) => { d.constat.points[i].text = e.target.value })} className={area} />
                </div>
                <button type="button" onClick={() => set((d) => { d.constat.points.splice(i, 1) })} className="text-aluminium hover:text-signal" aria-label="Retirer"><X className="h-4 w-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => set((d) => { d.constat.points.push({ title: "", text: "" }) })} className="mt-2 inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><Plus className="h-3.5 w-3.5" /> Ajouter un point</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <fieldset className="border border-[#1c1c1c] p-3"><legend className="px-1 text-[11px] uppercase tracking-widest text-aluminium">Test client mystère</legend>
              <label className={label}>Canal<input value={p.constat.mystere?.channel ?? ""} onChange={(e) => set((d) => { d.constat.mystere = { ...d.constat.mystere, channel: e.target.value } })} className={field} placeholder="formulaire du site, e-mail, téléphone" /></label>
              <label className={label}>Envoyé le<input type="datetime-local" value={p.constat.mystere?.sentAt?.slice(0, 16) ?? ""} onChange={(e) => set((d) => { d.constat.mystere = { ...d.constat.mystere, sentAt: e.target.value ? new Date(e.target.value).toISOString() : undefined } })} className={field} /></label>
              <label className={label}>Réponse reçue le (vide = jamais)<input type="datetime-local" value={p.constat.mystere?.repliedAt?.slice(0, 16) ?? ""} onChange={(e) => set((d) => { d.constat.mystere = { ...d.constat.mystere, repliedAt: e.target.value ? new Date(e.target.value).toISOString() : null } })} className={field} /></label>
              <label className={label}>Note<input value={p.constat.mystere?.note ?? ""} onChange={(e) => set((d) => { d.constat.mystere = { ...d.constat.mystere, note: e.target.value } })} className={field} /></label>
            </fieldset>
            <fieldset className="border border-[#1c1c1c] p-3"><legend className="px-1 text-[11px] uppercase tracking-widest text-aluminium">Domaine et fiche Google</legend>
              <label className={label}>Domaine<input value={p.constat.whois?.domain ?? ""} onChange={(e) => set((d) => { d.constat.whois = { ...d.constat.whois, domain: e.target.value } })} className={field} /></label>
              <label className={label}>Titulaire<input value={p.constat.whois?.holder ?? ""} onChange={(e) => set((d) => { d.constat.whois = { ...d.constat.whois, holder: e.target.value } })} className={field} /></label>
              <label className={label}>Registrar<input value={p.constat.whois?.registrar ?? ""} onChange={(e) => set((d) => { d.constat.whois = { ...d.constat.whois, registrar: e.target.value } })} className={field} /></label>
              <label className={label}>Expire le<input type="date" value={p.constat.whois?.expires?.slice(0, 10) ?? ""} onChange={(e) => set((d) => { d.constat.whois = { ...d.constat.whois, expires: e.target.value } })} className={field} /></label>
              <label className={label}>Fiche Google (note affichée)<input value={p.constat.googleFiche?.note ?? ""} onChange={(e) => set((d) => { d.constat.googleFiche = { ...d.constat.googleFiche, note: e.target.value } })} className={field} /></label>
            </fieldset>
          </div>
        </Section>

        <Section id="proposition" title={`Proposition · version ${p.proposition.version}`}>
          <p className="text-xs text-aluminium">Toute modification du contenu incrémente la version. Le prospect voit la proposition dès que l&apos;état passe à « Proposition en lecture ».</p>
          <label className={label}>Introduction<textarea rows={3} value={p.proposition.intro ?? ""} onChange={(e) => set((d) => { d.proposition.intro = e.target.value })} className={area} /></label>
          <div>
            <p className={label}>Briques</p>
            <ul className="mt-2 divide-y divide-[#1c1c1c] border border-[#1c1c1c]">
              {p.proposition.modules.map((m, i) => (
                <li key={m.id} className="grid gap-2 p-3 sm:grid-cols-[1fr_120px_auto]">
                  <div className="space-y-1">
                    <input value={m.title} onChange={(e) => set((d) => { d.proposition.modules[i].title = e.target.value })} className={field} />
                    <textarea rows={2} value={m.desc} onChange={(e) => set((d) => { d.proposition.modules[i].desc = e.target.value })} className={area} />
                    <div className="flex flex-wrap gap-3 text-xs text-aluminium">
                      <label className="flex items-center gap-1"><input type="checkbox" checked={!!m.monthly} onChange={(e) => set((d) => { d.proposition.modules[i].monthly = e.target.checked })} /> mensuel</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={!!m.required} onChange={(e) => set((d) => { d.proposition.modules[i].required = e.target.checked; if (e.target.checked) d.proposition.modules[i].selected = true })} /> obligatoire</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={!!m.estimate} onChange={(e) => set((d) => { d.proposition.modules[i].estimate = e.target.checked })} /> estimation</label>
                      <label className="flex items-center gap-1"><input type="checkbox" checked={m.selected} onChange={(e) => set((d) => { d.proposition.modules[i].selected = e.target.checked })} /> coché par défaut</label>
                    </div>
                  </div>
                  <label className={label}>Prix HT<input type="number" value={m.price} onChange={(e) => set((d) => { d.proposition.modules[i].price = Number(e.target.value) })} className={field} /></label>
                  <button type="button" onClick={() => set((d) => { d.proposition.modules.splice(i, 1) })} className="text-aluminium hover:text-signal" aria-label="Retirer"><X className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-wrap gap-2">
              <select onChange={(e) => { const c = CATALOG.find((c) => c.id === e.target.value); if (c) set((d) => { d.proposition.modules.push({ ...c, selected: true } as Module) }); e.target.value = "" }} defaultValue="" className="border border-[#2a2a2a] bg-noir px-2 py-1 text-xs">
                <option value="">+ Depuis le catalogue…</option>
                {CATALOG.map((c) => <option key={c.id} value={c.id}>{c.title} · {c.price} €{c.monthly ? "/mois" : ""}</option>)}
              </select>
              <button type="button" onClick={() => set((d) => { d.proposition.modules.push({ id: `custom-${Date.now().toString(36)}`, title: "", desc: "", price: 0, selected: true }) })} className="inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><Plus className="h-3.5 w-3.5" /> Brique sur mesure</button>
            </div>
            <p className="mt-2 text-sm">Sélection actuelle : <strong>{sums.once.toLocaleString("fr-FR")} € HT</strong>{sums.monthly ? <> + <strong>{sums.monthly.toLocaleString("fr-FR")} € HT</strong> par mois</> : null}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className={label}>Minimum HT ponctuel<input type="number" value={p.proposition.minTotal ?? ""} onChange={(e) => set((d) => { d.proposition.minTotal = e.target.value === "" ? undefined : Number(e.target.value) })} className={field} /></label>
            <label className={label}>Démarrage possible<input type="date" value={p.proposition.startDate ?? ""} onChange={(e) => set((d) => { d.proposition.startDate = e.target.value })} className={field} /></label>
            <label className={label}>Valable jusqu&apos;au<input type="date" value={p.proposition.validUntil ?? ""} onChange={(e) => set((d) => { d.proposition.validUntil = e.target.value })} className={field} /></label>
            <label className={label}>Acompte (%)<input type="number" value={p.proposition.depositPct ?? ""} onChange={(e) => set((d) => { d.proposition.depositPct = e.target.value === "" ? undefined : Number(e.target.value) })} className={field} /></label>
          </div>
          <div>
            <p className={label}>Planning</p>
            {(p.proposition.planning ?? []).map((s, i) => (
              <div key={i} className="mt-1 flex gap-2"><input value={s.label} placeholder="Étape" onChange={(e) => set((d) => { d.proposition.planning![i].label = e.target.value })} className={field} /><input value={s.when} placeholder="Quand" onChange={(e) => set((d) => { d.proposition.planning![i].when = e.target.value })} className={field} /><button type="button" onClick={() => set((d) => { d.proposition.planning!.splice(i, 1) })} className="text-aluminium hover:text-signal"><X className="h-4 w-4" /></button></div>
            ))}
            <button type="button" onClick={() => set((d) => { d.proposition.planning = [...(d.proposition.planning ?? []), { label: "", when: "" }] })} className="mt-2 inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><Plus className="h-3.5 w-3.5" /> Étape</button>
          </div>
          <div>
            <p className={label}>Cas clients affichés</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {cases.map((c) => { const on = p.proposition.cases.includes(c.slug); return <button key={c.slug} type="button" onClick={() => set((d) => { d.proposition.cases = on ? d.proposition.cases.filter((s) => s !== c.slug) : [...d.proposition.cases, c.slug] })} className={`border px-2 py-1 text-xs ${on ? "border-signal bg-signal/20" : "border-[#2a2a2a] text-aluminium"}`}>{c.title}</button> })}
            </div>
          </div>
          <label className={label}>Conditions courtes (affichées avant acceptation)<textarea rows={3} value={p.proposition.terms ?? ""} onChange={(e) => set((d) => { d.proposition.terms = e.target.value })} className={area} /></label>
          {p.acceptance && <p className="border border-signal/40 bg-signal/10 p-3 text-sm">Acceptée le {when(p.acceptance.acceptedAt)} par {p.acceptance.name} ({p.acceptance.email}), version {p.acceptance.version}, {p.acceptance.totalOnce.toLocaleString("fr-FR")} € HT{p.acceptance.totalMonthly ? ` + ${p.acceptance.totalMonthly}/mois` : ""}. IP {p.acceptance.ip}. <a className="underline" href={hq.document(p.slug, p.acceptance.version)} target="_blank" rel="noreferrer">Document figé</a></p>}
        </Section>

        <Section id="questions" title="Questions du prospect">
          {p.questions.length === 0 && <p className="text-sm text-aluminium">Aucune question.</p>}
          {[...p.questions].reverse().map((q) => (
            <div key={q.id} className="border border-[#1c1c1c] p-3 text-sm">
              {q.quote && <blockquote className="mb-1 border-l-2 border-[#2a2a2a] pl-2 text-aluminium">« {q.quote} »</blockquote>}
              <p><span className="text-xs text-aluminium">{when(q.createdAt)} · {q.chapter}</span><br />{q.text}</p>
              {q.answer ? <p className="mt-2 border-t border-[#1c1c1c] pt-2 whitespace-pre-line"><span className="text-xs text-signal">Réponse {when(q.answeredAt)}</span><br />{q.answer}</p> : (
                <div className="mt-2 flex gap-2">
                  <textarea rows={2} value={answers[q.id] ?? ""} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} placeholder="Votre réponse (affichée sur sa page + e-mail)" className={area} />
                  <Button type="button" size="sm" onClick={() => action({ action: "answer", id: q.id, answer: answers[q.id] })} disabled={!answers[q.id]?.trim()}><Send className="h-4 w-4" /></Button>
                </div>
              )}
            </div>
          ))}
        </Section>

        <Section id="relances" title="Relances">
          <p className="text-xs text-aluminium">Le cron propose une relance à J+2, J+7, J+14, puis la clôture à J+21 depuis l&apos;entrée dans l&apos;état. Rien ne part sans votre clic. {!p.contactEmail && <span className="text-signal">Renseignez l&apos;e-mail de contact pour activer les relances.</span>}</p>
          {p.relances.map((r, i) => (
            <div key={r.id} className={`border p-3 text-sm ${r.status === "proposee" ? "border-signal/50" : "border-[#1c1c1c]"}`}>
              <p className="text-xs text-aluminium">{when(r.dueAt)} · sujet « {r.topic} » · {r.status}{r.sentAt ? ` le ${when(r.sentAt)}` : ""}</p>
              {r.status === "proposee" ? (
                <>
                  <input value={r.subject} onChange={(e) => set((d) => { d.relances[i].subject = e.target.value })} className={field} />
                  <textarea rows={6} value={r.draft} onChange={(e) => set((d) => { d.relances[i].draft = e.target.value })} className={area} />
                  <div className="mt-2 flex gap-2">
                    <Button type="button" size="sm" onClick={() => action({ action: "relance", id: r.id, op: "send", subject: r.subject, draft: r.draft })}><Send className="h-4 w-4" /> Envoyer</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => action({ action: "relance", id: r.id, op: "cancel" })}><Ban className="h-4 w-4" /> Annuler</Button>
                  </div>
                </>
              ) : <p className="mt-1 whitespace-pre-line text-aluminium"><strong className="text-ivory">{r.subject}</strong><br />{r.draft}</p>}
            </div>
          ))}
          <details className="border border-[#1c1c1c] p-3"><summary className="cursor-pointer text-xs text-aluminium">Envoyer une relance maintenant</summary>
            <input value={newRel.subject} onChange={(e) => setNewRel({ ...newRel, subject: e.target.value })} placeholder="Objet" className={field} />
            <textarea rows={5} value={newRel.draft} onChange={(e) => setNewRel({ ...newRel, draft: e.target.value })} placeholder="Message (le lien de la page est ajouté automatiquement)" className={area} />
            <Button type="button" size="sm" className="mt-2" onClick={() => { action({ action: "relance_new", topic: "manuel", subject: newRel.subject, draft: newRel.draft }); setNewRel({ subject: "", draft: "" }) }} disabled={!newRel.subject || !newRel.draft}><Send className="h-4 w-4" /> Envoyer</Button>
          </details>
        </Section>

        <Section id="projet" title="Projet (visible après acceptation)">
          <label className={label}>Note au client<textarea rows={2} value={p.projet.note ?? ""} onChange={(e) => set((d) => { d.projet.note = e.target.value })} className={area} /></label>
          <div className="grid gap-4 lg:grid-cols-3">
            {(["acces", "planning", "livrables"] as const).map((k) => (
              <div key={k}>
                <p className={label}>{k === "acces" ? "Accès remis" : k === "planning" ? "Planning" : "Livrables"}</p>
                {p.projet[k].map((it, i) => (
                  <div key={i} className="mt-1 flex items-center gap-2"><input type="checkbox" checked={it.done} onChange={(e) => set((d) => { d.projet[k][i].done = e.target.checked })} /><input value={it.label} onChange={(e) => set((d) => { d.projet[k][i].label = e.target.value })} className={field} /><input value={it.when ?? ""} placeholder="quand" onChange={(e) => set((d) => { d.projet[k][i].when = e.target.value })} className={`${field} w-24`} /><button type="button" onClick={() => set((d) => { d.projet[k].splice(i, 1) })} className="text-aluminium hover:text-signal"><X className="h-4 w-4" /></button></div>
                ))}
                <button type="button" onClick={() => set((d) => { d.projet[k].push({ label: "", done: false }) })} className="mt-2 inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><Plus className="h-3.5 w-3.5" /> Ligne</button>
              </div>
            ))}
          </div>
        </Section>

        <Section id="rapports" title="Rapports mensuels (visibles à l'état « Client »)">
          {p.rapports.map((r, i) => (
            <div key={i} className="border border-[#1c1c1c] p-3">
              <div className="flex gap-2"><input value={r.month} placeholder="Octobre 2026" onChange={(e) => set((d) => { d.rapports[i].month = e.target.value })} className={field} /><button type="button" onClick={() => set((d) => { d.rapports.splice(i, 1) })} className="text-aluminium hover:text-signal"><X className="h-4 w-4" /></button></div>
              <textarea rows={4} value={r.text} placeholder="Ce qu'on a fait, ce que ça a donné, la suite" onChange={(e) => set((d) => { d.rapports[i].text = e.target.value })} className={area} />
              <div className="mt-2 flex flex-wrap gap-2">
                {r.metrics.map((m, j) => <div key={j} className="flex gap-1"><input value={m.label} placeholder="Demandes" onChange={(e) => set((d) => { d.rapports[i].metrics[j].label = e.target.value })} className={`${field} w-32`} /><input value={m.value} placeholder="12" onChange={(e) => set((d) => { d.rapports[i].metrics[j].value = e.target.value })} className={`${field} w-20`} /><button type="button" onClick={() => set((d) => { d.rapports[i].metrics.splice(j, 1) })} className="text-aluminium"><X className="h-3.5 w-3.5" /></button></div>)}
                <button type="button" onClick={() => set((d) => { d.rapports[i].metrics.push({ label: "", value: "" }) })} className="text-xs text-aluminium hover:text-ivory">+ chiffre</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => set((d) => { d.rapports.push({ month: "", text: "", metrics: [] }) })} className="inline-flex items-center gap-1 text-xs text-aluminium hover:text-ivory"><Plus className="h-3.5 w-3.5" /> Rapport</button>
          <label className={label}>Code de parrainage<input value={p.parrainageCode ?? ""} onChange={(e) => set((d) => { d.parrainageCode = e.target.value })} className={field} /></label>
        </Section>

        <div className="flex items-center justify-between border border-[#1c1c1c] p-5">
          <Button type="button" size="md" onClick={save} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Enregistrer le dossier</Button>
          <button type="button" onClick={async () => { if (confirm(`Supprimer définitivement ${p.company} ?`)) { await fetch(`/api/admin/prospects/${slug}`, { method: "DELETE" }); window.location.href = hq.admin() } }} className="inline-flex items-center gap-1 text-xs text-aluminium hover:text-signal"><Trash2 className="h-3.5 w-3.5" /> Supprimer</button>
        </div>
      </main>
    </div>
  )
}

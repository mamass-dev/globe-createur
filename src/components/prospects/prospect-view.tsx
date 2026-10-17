"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { track } from "@/lib/analytics"
import { Button } from "@/components/ui/button"
import { CHAPTERS, STATE_LABELS, totals, type Constat, type Proposition, type Question, type Projet, type Rapport, type ProspectState } from "@/lib/prospects/types"
import {
  MessageSquareQuote, Send, Check, Share2, FileDown, Clock, Mail, Phone, Lock, ArrowRight, Smartphone, Globe, Star, AlertTriangle, CheckCircle2, Loader2, X, Link2, Gift,
} from "lucide-react"

export type PublicProspect = {
  slug: string
  company: string
  contactName?: string
  state: ProspectState
  constat: Constat
  proposition: Proposition
  acceptance?: { name: string; acceptedAt: string; version: number; hash: string; totalOnce: number; totalMonthly: number }
  questions: Question[]
  projet: Projet
  rapports: Rapport[]
  parrainageCode?: string
  shares: string[]
}

export type CaseCard = { slug: string; title: string; client: string; category: string; excerpt: string; image: string }

const eur = (n: number) => n.toLocaleString("fr-FR") + " € HT"
const dateFr = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "")
const dateTimeFr = (iso?: string) => (iso ? new Date(iso).toLocaleString("fr-FR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "")

function deviceLabel() {
  if (typeof navigator === "undefined") return ""
  const ua = navigator.userAgent
  if (/iPhone|Android.+Mobile/.test(ua)) return "téléphone"
  if (/iPad|Android/.test(ua)) return "tablette"
  return "ordinateur"
}

function VideoEmbed({ url }: { url: string }) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/)
  const loom = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/)
  if (yt) return <iframe className="aspect-video w-full border border-[#1c1c1c]" src={`https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`} title="Vidéo" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
  if (loom) return <iframe className="aspect-video w-full border border-[#1c1c1c]" src={`https://www.loom.com/embed/${loom[1]}`} title="Vidéo" allowFullScreen />
  return <video className="aspect-video w-full bg-black border border-[#1c1c1c]" controls playsInline preload="metadata" src={url} />
}

export function ProspectView({ prospect: initial, cases }: { prospect: PublicProspect; cases: CaseCard[] }) {
  const [p, setP] = useState(initial)
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initial.proposition.modules.filter((m) => m.selected || m.required).map((m) => m.id)))
  const [quote, setQuote] = useState<string>("")
  const [quoteBtn, setQuoteBtn] = useState<{ x: number; y: number; text: string } | null>(null)
  const [qText, setQText] = useState("")
  const [qStatus, setQStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [shareOpen, setShareOpen] = useState(false)
  const [shareName, setShareName] = useState("")
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState<string>("constat")
  const questionsRef = useRef<HTMLDivElement>(null)
  const slug = p.slug

  const post = useCallback(async (path: string, body: unknown) => {
    const res = await fetch(`/api/p/${slug}/${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    return res
  }, [slug])

  /* Ouverture + chapitres + actualisation */
  useEffect(() => {
    post("event", { type: "open", device: deviceLabel() }).catch(() => {})
    track("prospect_open", { slug, state: p.state })
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = (e.target as HTMLElement).dataset.chapter
          if (!id) continue
          setActive(id)
          post("event", { type: "chapter", chapter: id }).catch(() => {})
          track("prospect_chapter", { slug, chapter: id })
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    )
    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => io.observe(el))
    const poll = setInterval(async () => {
      try {
        const r = await fetch(`/api/p/${slug}/state`, { cache: "no-store" })
        if (!r.ok) return
        const d = await r.json()
        setP((prev) => ({ ...prev, questions: d.questions, state: d.state }))
      } catch { /* silencieux */ }
    }, 45_000)
    return () => { io.disconnect(); clearInterval(poll) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  /* Surlignage → bouton « Commenter ce passage » */
  useEffect(() => {
    const onUp = () => {
      const sel = window.getSelection()
      const text = sel?.toString().trim() ?? ""
      if (!text || text.length < 8 || text.length > 600 || !sel || sel.rangeCount === 0) { setQuoteBtn(null); return }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      setQuoteBtn({ x: rect.left + rect.width / 2, y: rect.top + window.scrollY - 44, text })
    }
    document.addEventListener("mouseup", onUp)
    document.addEventListener("touchend", onUp)
    return () => { document.removeEventListener("mouseup", onUp); document.removeEventListener("touchend", onUp) }
  }, [])

  const toggleModule = (id: string) => {
    const m = p.proposition.modules.find((m) => m.id === id)
    if (!m || m.required) return
    const next = new Set(selected)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelected(next)
    post("selection", { selected: [...next] }).catch(() => {})
    track("prospect_selection", { slug, module: id, on: next.has(id) })
  }

  const liveProposition = useMemo<Proposition>(() => ({ ...p.proposition, modules: p.proposition.modules.map((m) => ({ ...m, selected: m.required || selected.has(m.id) })) }), [p.proposition, selected])
  const sums = totals(liveProposition)
  const belowMin = !!p.proposition.minTotal && sums.once < p.proposition.minTotal

  const sendQuestion = async () => {
    if (qText.trim().length < 2) return
    setQStatus("sending")
    const r = await post("question", { text: qText.trim(), quote: quote || undefined, chapter: active })
    if (r.ok) {
      const { id } = await r.json()
      setP((prev) => ({ ...prev, questions: [...prev.questions, { id, text: qText.trim(), quote: quote || undefined, chapter: active, createdAt: new Date().toISOString() }] }))
      setQText(""); setQuote(""); setQStatus("sent")
      track("prospect_question", { slug })
      setTimeout(() => setQStatus("idle"), 3000)
    } else setQStatus("error")
  }

  const share = async () => {
    if (shareName.trim().length < 2) return
    await post("event", { type: "share", name: shareName.trim() })
    setP((prev) => ({ ...prev, shares: [...prev.shares, shareName.trim()] }))
    try { await navigator.clipboard.writeText(window.location.href.split("#")[0]); setCopied(true) } catch { /* pas de presse-papiers */ }
    track("prospect_share", { slug })
  }

  const answered = p.questions.filter((q) => q.answer).length
  const openQ = p.questions.length - answered
  const showProposition = ["proposition", "accepte", "projet", "rapport", "clos"].includes(p.state) && p.proposition.modules.length > 0
  const chapters = CHAPTERS.filter((c) => {
    if (c.id === "constat") return true
    if (["proposition", "planning", "accepter"].includes(c.id)) return showProposition && (c.id !== "accepter" || p.state === "proposition" || p.state === "accepte")
    if (c.id === "cas") return cases.length > 0
    return true
  })

  return (
    <div className="min-h-dvh bg-noir text-ivory">
      {/* Barre haute */}
      <header className="sticky top-0 z-40 border-b border-[#1c1c1c] bg-noir/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">GLOBE<span className="ml-2 hidden text-[10px] font-bold uppercase tracking-[0.3em] text-aluminium sm:inline">Creative House</span></Link>
          <span className="truncate text-sm text-aluminium">× <span className="text-ivory">{p.company}</span></span>
          <span className="ml-auto hidden items-center gap-2 text-xs text-aluminium sm:flex">
            <span className="inline-block h-1.5 w-1.5 bg-signal" /> {STATE_LABELS[p.state]}
          </span>
          <Link href={`/p/${slug}/document`} className="inline-flex h-9 items-center gap-1.5 border border-[#2a2a2a] px-3 text-xs font-bold uppercase tracking-widest text-aluminium hover:text-ivory" title="Version imprimable (PDF)">
            <FileDown className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden sm:inline">PDF</span>
          </Link>
          <button type="button" onClick={() => setShareOpen(true)} className="inline-flex h-9 items-center gap-1.5 border border-[#2a2a2a] px-3 text-xs font-bold uppercase tracking-widest text-aluminium hover:text-ivory">
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Partager</span>
          </button>
        </div>
        {/* Chapitres */}
        <nav className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6" aria-label="Chapitres">
          <ul className="flex gap-1 pb-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className={`inline-block px-3 py-1.5 ${active === c.id ? "bg-ivory text-noir" : "text-aluminium hover:text-ivory"}`}>{c.label}</a>
              </li>
            ))}
            <li className="ml-auto flex items-center gap-1 px-3 py-1.5 text-aluminium normal-case tracking-normal font-normal">
              {p.questions.length > 0 ? <>{p.questions.length} question{p.questions.length > 1 ? "s" : ""} · {answered} réponse{answered > 1 ? "s" : ""}{openQ > 0 ? ` · ${openQ} en attente` : ""}</> : "Aucune question pour l'instant"}
            </li>
          </ul>
        </nav>
      </header>

      {/* Bouton flottant de commentaire sur sélection */}
      {quoteBtn && (
        <button
          type="button"
          style={{ left: quoteBtn.x, top: quoteBtn.y }}
          onClick={() => { setQuote(quoteBtn.text); setQuoteBtn(null); window.getSelection()?.removeAllRanges(); questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }) }}
          className="absolute z-50 -translate-x-1/2 inline-flex items-center gap-1.5 bg-signal px-3 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-lg"
        >
          <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden="true" /> Commenter ce passage
        </button>
      )}

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Bandeaux d'état */}
        {p.state === "accepte" && p.acceptance && (
          <div className="mt-6 flex flex-col gap-2 border border-signal/50 bg-signal/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm"><CheckCircle2 className="mr-2 inline h-4 w-4 text-signal" aria-hidden="true" />Proposition acceptée le {dateTimeFr(p.acceptance.acceptedAt)} par {p.acceptance.name}. Nous vous appelons pour caler le démarrage.</p>
            <Link href={`/p/${slug}/document?v=${p.acceptance.version}`} className="text-sm underline underline-offset-4">Document figé (version {p.acceptance.version})</Link>
          </div>
        )}
        {p.state === "clos" && (
          <div className="mt-6 border border-[#2a2a2a] p-5 text-sm text-aluminium">Dossier classé. Cette page reste accessible : si le sujet revient, une question ci-dessous suffit pour reprendre.</div>
        )}

        {/* CONSTAT */}
        <section id="constat" data-chapter="constat" className="scroll-mt-28 py-12 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Préparé pour {p.company}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {p.state === "constat" ? "Ce que nous avons vu, et ce qu'on ferait en premier." : p.state === "proposition" ? "Votre proposition, à lire et à composer." : p.state === "projet" ? "Votre projet, en cours." : p.state === "rapport" ? "Votre tableau de bord." : "Votre page."}
          </h1>
          {p.constat.pitch && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-aluminium">{p.constat.pitch}</p>}

          {p.constat.videoUrl && (
            <div className="mt-8 max-w-3xl">
              <VideoEmbed url={p.constat.videoUrl} />
              <p className="mt-2 text-xs text-aluminium">Une minute, en vrai, pour commenter cette page.</p>
            </div>
          )}

          <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
            {p.constat.screenshotUrl && (
              <figure className="border border-[#1c1c1c] bg-[#0f0f0f] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.constat.screenshotUrl} alt={`Le site de ${p.company} vu sur un téléphone`} className="mx-auto max-h-[560px] w-auto border border-[#2a2a2a]" />
                <figcaption className="mt-3 flex items-center gap-2 text-xs text-aluminium"><Smartphone className="h-3.5 w-3.5" aria-hidden="true" /> Votre site, tel qu'un client le voit sur son téléphone{typeof p.constat.score === "number" ? ` · score technique ${p.constat.score}/100` : ""}</figcaption>
              </figure>
            )}
            <div className="space-y-6">
              {p.constat.points.length > 0 && (
                <ol className="space-y-4">
                  {p.constat.points.map((pt, i) => (
                    <li key={i} className="border border-[#1c1c1c] p-5">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-signal">0{i + 1}</p>
                      <p className="mt-1 text-lg font-bold">{pt.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-aluminium">{pt.text}</p>
                    </li>
                  ))}
                </ol>
              )}
              {p.constat.mystere?.sentAt && (
                <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-5">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-aluminium"><Clock className="h-3.5 w-3.5" aria-hidden="true" /> Test client mystère</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Nous vous avons écrit {p.constat.mystere.channel ? `par ${p.constat.mystere.channel} ` : ""}le {dateTimeFr(p.constat.mystere.sentAt)}.{" "}
                    {p.constat.mystere.repliedAt ? <>Votre réponse est arrivée le {dateTimeFr(p.constat.mystere.repliedAt)}.</> : <span className="text-signal">Nous n'avons pas reçu de réponse.</span>}
                  </p>
                  {p.constat.mystere.note && <p className="mt-2 text-sm text-aluminium">{p.constat.mystere.note}</p>}
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {p.constat.whois?.domain && (
                  <div className="border border-[#1c1c1c] p-5 text-sm">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-aluminium"><Globe className="h-3.5 w-3.5" aria-hidden="true" /> Nom de domaine</p>
                    <p className="mt-2">{p.constat.whois.domain}</p>
                    {p.constat.whois.holder && <p className="text-aluminium">Titulaire : {p.constat.whois.holder}</p>}
                    {p.constat.whois.registrar && <p className="text-aluminium">Chez : {p.constat.whois.registrar}</p>}
                    {p.constat.whois.expires && <p className="text-aluminium">Expire le {dateFr(p.constat.whois.expires)}</p>}
                  </div>
                )}
                {p.constat.googleFiche?.note && (
                  <div className="border border-[#1c1c1c] p-5 text-sm">
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-aluminium"><Star className="h-3.5 w-3.5" aria-hidden="true" /> Fiche Google</p>
                    <p className="mt-2 text-aluminium">{p.constat.googleFiche.note}</p>
                  </div>
                )}
              </div>
              {p.state === "constat" && (
                <div className="flex flex-col gap-3 border border-[#1c1c1c] bg-[#141414] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm">Vingt minutes suffisent pour savoir si on peut vous aider. {p.constat.bookingUrl ? "Choisissez un créneau réel :" : "Écrivez-nous :"}</p>
                  {p.constat.bookingUrl ? (
                    <Button href={p.constat.bookingUrl} size="md" track={{ event: "cta_click", props: { cta: "rdv", location: "prospect-constat" } }}>Prenons 20 minutes <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
                  ) : (
                    <Button href="https://wa.me/33678978705" size="md" track={{ event: "cta_click", props: { cta: "whatsapp", location: "prospect-constat" } }}>WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PROPOSITION */}
        {showProposition && (
          <section id="proposition" data-chapter="proposition" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">La proposition · version {p.proposition.version}</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">{p.state === "proposition" ? "Composez-la vous-même : retirez ou ajoutez, le montant suit." : "Ce que nous faisons ensemble."}</h2>
            {p.proposition.intro && <p className="mt-4 max-w-3xl leading-relaxed text-aluminium">{p.proposition.intro}</p>}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <ul className="divide-y divide-[#1c1c1c] border border-[#1c1c1c]">
                {liveProposition.modules.map((m) => {
                  const on = m.selected
                  const editable = p.state === "proposition" && !m.required
                  return (
                    <li key={m.id} className={`flex gap-4 p-5 transition-colors ${on ? "" : "opacity-50"}`}>
                      <button
                        type="button"
                        disabled={!editable}
                        onClick={() => toggleModule(m.id)}
                        aria-pressed={on}
                        aria-label={`${on ? "Retirer" : "Ajouter"} ${m.title}`}
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border ${on ? "border-signal bg-signal text-white" : "border-[#2a2a2a]"} ${editable ? "cursor-pointer" : "cursor-default"}`}
                      >
                        {on && <Check className="h-4 w-4" aria-hidden="true" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{m.title}{m.required && <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-aluminium">inclus</span>}</p>
                        {m.desc && <p className="mt-1 text-sm leading-relaxed text-aluminium">{m.desc}</p>}
                      </div>
                      <p className="shrink-0 text-right text-sm font-bold">
                        {eur(m.price)}{m.monthly && <span className="block text-xs font-normal text-aluminium">par mois</span>}
                        {m.estimate && <span className="block text-[10px] font-normal uppercase tracking-widest text-aluminium">estimation</span>}
                      </p>
                    </li>
                  )
                })}
              </ul>
              <aside className="h-fit space-y-4 border border-[#1c1c1c] bg-[#0f0f0f] p-5 lg:sticky lg:top-32">
                <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Votre sélection</p>
                <p className="text-3xl font-bold">{eur(sums.once)}</p>
                {sums.monthly > 0 && <p className="text-lg">+ {eur(sums.monthly)} <span className="text-sm text-aluminium">par mois</span></p>}
                {belowMin && <p className="flex items-start gap-2 text-xs text-signal"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> En dessous de {eur(p.proposition.minTotal!)}, cette proposition n'est plus valable telle quelle : parlons-en.</p>}
                {p.proposition.depositPct ? <p className="text-xs text-aluminium">Acompte à l'acceptation : {p.proposition.depositPct} % du montant ponctuel.</p> : null}
                {p.proposition.startDate && <p className="text-sm"><Clock className="mr-1.5 inline h-3.5 w-3.5 text-signal" aria-hidden="true" /> Démarrage possible le {dateFr(p.proposition.startDate)}</p>}
                {p.proposition.validUntil && <p className="text-xs text-aluminium">Valable jusqu'au {dateFr(p.proposition.validUntil)}.</p>}
                {liveProposition.modules.some((m) => m.estimate && m.selected) && <p className="text-xs text-aluminium">Les montants marqués « estimation » sont confirmés par écrit avant toute acceptation.</p>}
                {p.state === "proposition" && <a href="#accepter" className="block"><Button size="md" className="w-full">Accepter en ligne</Button></a>}
              </aside>
            </div>
          </section>
        )}

        {/* PLANNING */}
        {showProposition && (p.proposition.planning?.length ?? 0) > 0 && (
          <section id="planning" data-chapter="planning" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Le planning</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Ce qui se passe, et quand.</h2>
            <ol className="mt-8 grid gap-px border border-[#1c1c1c] bg-[#1c1c1c] sm:grid-cols-2 lg:grid-cols-4">
              {p.proposition.planning!.map((s, i) => (
                <li key={i} className="bg-noir p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-signal">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 font-bold">{s.label}</p>
                  <p className="mt-1 text-sm text-aluminium">{s.when}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* CAS CLIENTS */}
        {cases.length > 0 && (
          <section id="cas" data-chapter="cas" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Cas clients</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Choisis pour vous.</h2>
            <div className="mt-8 grid gap-px border border-[#1c1c1c] bg-[#1c1c1c] sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <Link key={c.slug} href={`/projets/${c.slug}`} target="_blank" className="group bg-noir p-5 transition-colors hover:bg-[#141414]">
                  {c.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image} alt="" className="mb-4 aspect-[4/3] w-full object-cover" loading="lazy" />
                  )}
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{c.category}{c.client ? ` · ${c.client}` : ""}</p>
                  <p className="mt-2 font-bold group-hover:text-signal">{c.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-aluminium">{c.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* PROJET (après signature) */}
        {["projet", "rapport"].includes(p.state) && (
          <section id="projet" data-chapter="projet" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Le projet</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Où on en est.</h2>
            {p.projet.note && <p className="mt-4 max-w-3xl text-aluminium">{p.projet.note}</p>}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {([["Accès remis", p.projet.acces], ["Planning", p.projet.planning], ["Livrables", p.projet.livrables]] as const).map(([label, items]) => (
                <div key={label} className="border border-[#1c1c1c] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{label}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {items.length === 0 && <li className="text-aluminium">À venir.</li>}
                    {items.map((it, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${it.done ? "border-signal bg-signal text-white" : "border-[#2a2a2a]"}`}>{it.done && <Check className="h-3 w-3" aria-hidden="true" />}</span>
                        <span className={it.done ? "text-aluminium line-through" : ""}>{it.label}{it.when ? <span className="text-aluminium"> · {it.when}</span> : null}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RAPPORTS + PARRAINAGE */}
        {p.state === "rapport" && (
          <section id="rapports" data-chapter="rapports" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Rapports mensuels</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Les chiffres, chaque mois.</h2>
            <div className="mt-8 space-y-4">
              {p.rapports.length === 0 && <p className="text-aluminium">Le premier rapport arrive à la fin du mois.</p>}
              {[...p.rapports].reverse().map((r) => (
                <article key={r.month} className="border border-[#1c1c1c] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{r.month}</p>
                  {r.metrics.length > 0 && (
                    <dl className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {r.metrics.map((m) => (<div key={m.label} className="bg-[#0f0f0f] p-3"><dt className="text-xs text-aluminium">{m.label}</dt><dd className="text-xl font-bold">{m.value}</dd></div>))}
                    </dl>
                  )}
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">{r.text}</p>
                </article>
              ))}
            </div>
            {p.parrainageCode && (
              <div className="mt-8 flex flex-col gap-3 border border-[#1c1c1c] bg-[#141414] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm"><Gift className="mr-2 inline h-4 w-4 text-signal" aria-hidden="true" />Vous connaissez une entreprise qui a le même problème que vous aviez ? Transmettez-lui ce lien : nous lui préparons sa page, et vous avez un mois de suivi offert si elle signe.</p>
                <code className="shrink-0 bg-noir px-3 py-2 text-xs">globecreateur.fr/contact?parrain={p.parrainageCode}</code>
              </div>
            )}
          </section>
        )}

        {/* QUESTIONS */}
        <section id="questions" data-chapter="questions" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Vos questions</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-4xl">Surlignez un passage, ou écrivez directement.</h2>
          <p className="mt-3 max-w-2xl text-sm text-aluminium">Chaque question arrive chez nous à l'instant où vous l'envoyez. La réponse s'affiche ici, et vous la recevez aussi par e-mail.</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div ref={questionsRef} className="border border-[#1c1c1c] p-5">
              {quote && (
                <blockquote className="mb-3 flex items-start gap-2 border-l-2 border-signal bg-[#0f0f0f] p-3 text-sm text-aluminium">
                  <span className="flex-1">« {quote} »</span>
                  <button type="button" onClick={() => setQuote("")} aria-label="Retirer le passage" className="text-aluminium hover:text-ivory"><X className="h-4 w-4" /></button>
                </blockquote>
              )}
              <textarea
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                rows={4}
                placeholder={quote ? "Votre remarque sur ce passage…" : "Votre question…"}
                className="w-full resize-none border-b border-[#2a2a2a] bg-transparent py-3 text-base outline-none placeholder:text-[#5e6063] focus:border-signal"
              />
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs text-aluminium">{qStatus === "sent" ? "Envoyé. On vous répond dans la journée." : qStatus === "error" ? "Échec de l'envoi, réessayez." : ""}</p>
                <Button type="button" size="sm" onClick={sendQuestion} disabled={qStatus === "sending" || qText.trim().length < 2}>
                  {qStatus === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />} Envoyer
                </Button>
              </div>
            </div>
            <ol className="space-y-3">
              {p.questions.length === 0 && <li className="text-sm text-aluminium">Aucune question pour l'instant.</li>}
              {[...p.questions].reverse().map((q) => (
                <li key={q.id} className="border border-[#1c1c1c] p-4 text-sm">
                  {q.quote && <blockquote className="mb-2 border-l-2 border-[#2a2a2a] pl-3 text-aluminium">« {q.quote} »</blockquote>}
                  <p><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Vous · {dateTimeFr(q.createdAt)}</span><br />{q.text}</p>
                  {q.answer ? (
                    <p className="mt-3 border-t border-[#1c1c1c] pt-3"><span className="text-[11px] font-bold uppercase tracking-widest text-signal">Globe · {dateTimeFr(q.answeredAt)}</span><br /><span className="whitespace-pre-line">{q.answer}</span></p>
                  ) : (
                    <p className="mt-3 text-xs text-aluminium">En attente de réponse.</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ACCEPTER */}
        {showProposition && (p.state === "proposition" || p.state === "accepte") && (
          <section id="accepter" data-chapter="accepter" className="scroll-mt-28 border-t border-[#1c1c1c] py-12 lg:py-20">
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Accepter</p>
            {p.state === "accepte" && p.acceptance ? (
              <div className="mt-3 max-w-2xl">
                <h2 className="text-2xl font-bold sm:text-4xl">C'est signé.</h2>
                <p className="mt-4 text-aluminium">Version {p.acceptance.version} acceptée le {dateTimeFr(p.acceptance.acceptedAt)} par {p.acceptance.name}, pour {eur(p.acceptance.totalOnce)}{p.acceptance.totalMonthly ? ` + ${eur(p.acceptance.totalMonthly)} par mois` : ""}. Empreinte : <code className="text-xs">{p.acceptance.hash.slice(0, 16)}…</code></p>
                <Link href={`/p/${slug}/document?v=${p.acceptance.version}`} className="mt-4 inline-flex items-center gap-2 text-sm underline underline-offset-4"><FileDown className="h-4 w-4" aria-hidden="true" /> Télécharger le document figé</Link>
              </div>
            ) : (
              <AcceptBlock slug={slug} terms={p.proposition.terms} belowMin={belowMin} sums={sums} hasEstimate={liveProposition.modules.some((m) => m.estimate && m.selected)} defaultName={p.contactName ?? ""} onAccepted={() => setP((prev) => ({ ...prev, state: "accepte" }))} />
            )}
          </section>
        )}

        <footer className="border-t border-[#1c1c1c] py-10 text-xs leading-relaxed text-aluminium">
          <p><Lock className="mr-1.5 inline h-3.5 w-3.5" aria-hidden="true" />Cette page est privée : seules les personnes qui ont le lien y accèdent. Elle mesure son ouverture et les chapitres lus, pour qu'on vous rappelle au bon moment et sur le bon sujet, et rien d'autre. Pas de cookie publicitaire.</p>
          <p className="mt-2">Cette page a été préparée par nos agents et relue par un humain. C'est le genre d'outil qu'on installe chez nos clients.</p>
          <p className="mt-2">Globe Créateur · Dijon, et partout où il faut aller · <a href="mailto:contact@globecreateur.fr" className="underline underline-offset-4">contact@globecreateur.fr</a> · <a href="https://wa.me/33678978705" className="underline underline-offset-4">WhatsApp</a></p>
        </footer>
      </main>

      {/* Partage nominatif */}
      {shareOpen && (
        <div role="dialog" aria-modal="true" aria-label="Partager cette page" className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div className="w-full max-w-md border border-[#2a2a2a] bg-noir p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-lg font-bold">Partager à un associé, un comptable…</p>
              <button type="button" onClick={() => { setShareOpen(false); setCopied(false) }} aria-label="Fermer" className="text-aluminium hover:text-ivory"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-2 text-sm text-aluminium">Dites-nous simplement à qui, pour qu'on puisse lui répondre aussi. Le lien est copié ensuite.</p>
            <input value={shareName} onChange={(e) => setShareName(e.target.value)} placeholder="Prénom et rôle (ex. Marie, comptable)" className="mt-4 w-full border-b border-[#2a2a2a] bg-transparent py-3 outline-none focus:border-signal" />
            {p.shares.length > 0 && <p className="mt-3 text-xs text-aluminium">Déjà partagé à : {p.shares.join(", ")}</p>}
            <div className="mt-5 flex gap-3">
              <Button type="button" size="sm" onClick={share} disabled={shareName.trim().length < 2}>{copied ? <><Check className="h-4 w-4" aria-hidden="true" /> Lien copié</> : <><Link2 className="h-4 w-4" aria-hidden="true" /> Copier le lien</>}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AcceptBlock({ slug, terms, belowMin, sums, hasEstimate, defaultName, onAccepted }: { slug: string; terms?: string; belowMin: boolean; sums: { once: number; monthly: number }; hasEstimate: boolean; defaultName: string; onAccepted: () => void }) {
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState("")
  const [agree, setAgree] = useState(false)
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"form" | "code" | "done">("form")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const call = async (body: unknown) => {
    setBusy(true); setErr(null)
    const r = await fetch(`/api/p/${slug}/accept`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    const d = await r.json().catch(() => ({}))
    setBusy(false)
    if (!r.ok) { setErr(d.error ?? "Erreur"); return null }
    return d
  }

  if (step === "done") return <p className="mt-4 text-lg"><CheckCircle2 className="mr-2 inline h-5 w-5 text-signal" aria-hidden="true" />C'est accepté. Vous recevez la confirmation et le document figé par e-mail.</p>

  return (
    <div className="mt-3 grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold sm:text-4xl">Accepter en ligne, en deux minutes.</h2>
        <p className="mt-4 text-sm leading-relaxed text-aluminium">Votre nom, votre e-mail, un code reçu par e-mail : la proposition est alors figée telle que vous l'avez composée, horodatée, et vous en recevez une copie. Pas d'impression, pas de scan.</p>
        {terms && <p className="mt-4 whitespace-pre-line border-l-2 border-[#2a2a2a] pl-4 text-sm text-aluminium">{terms}</p>}
        <p className="mt-4 text-sm">Montant accepté : <strong>{eur(sums.once)}</strong>{sums.monthly > 0 && <> + <strong>{eur(sums.monthly)}</strong> par mois</>}</p>
        {hasEstimate && <p className="mt-2 text-xs text-signal">Votre sélection contient des montants « estimation » : ils vous sont confirmés par écrit avant l'acceptation. Écrivez-nous ou posez la question ci-dessus.</p>}
        {belowMin && <p className="mt-2 text-xs text-signal">Votre sélection est sous le minimum de cette proposition : parlons-en avant.</p>}
      </div>
      <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-5">
        {step === "form" ? (
          <form onSubmit={async (e) => { e.preventDefault(); const d = await call({ step: "start", name, email }); if (d) setStep("code") }} className="space-y-4">
            <label className="block text-sm"><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Votre nom</span><input required minLength={2} value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none focus:border-signal" /></label>
            <label className="block text-sm"><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Votre e-mail professionnel</span><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none focus:border-signal" /></label>
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" /> <span>J'accepte cette proposition telle que composée ci-dessus{terms ? " et ses conditions" : ""}.</span></label>
            {err && <p className="text-sm text-signal">{err}</p>}
            <Button type="submit" size="md" className="w-full" disabled={busy || !agree || belowMin || hasEstimate}>{busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Mail className="h-4 w-4" aria-hidden="true" />} Recevoir mon code</Button>
          </form>
        ) : (
          <form onSubmit={async (e) => { e.preventDefault(); const d = await call({ step: "confirm", code }); if (d) { setStep("done"); onAccepted(); track("prospect_accept", { slug }) } }} className="space-y-4">
            <p className="text-sm text-aluminium">Un code à six chiffres vient de partir vers {email}. Il est valable quinze minutes.</p>
            <input inputMode="numeric" pattern="\d{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full border-b border-[#2a2a2a] bg-transparent py-3 text-center text-3xl tracking-[0.5em] outline-none focus:border-signal" />
            {err && <p className="text-sm text-signal">{err}</p>}
            <Button type="submit" size="md" className="w-full" disabled={busy || code.length !== 6}>{busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Check className="h-4 w-4" aria-hidden="true" />} Confirmer l'acceptation</Button>
            <button type="button" onClick={() => setStep("form")} className="w-full text-xs text-aluminium underline underline-offset-4">Changer d'e-mail</button>
          </form>
        )}
        <p className="mt-4 flex items-center gap-2 text-xs text-aluminium"><Phone className="h-3.5 w-3.5" aria-hidden="true" /> Vous préférez en parler avant ? <a href="https://wa.me/33678978705" className="underline underline-offset-4">WhatsApp</a></p>
      </div>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { track } from "@/lib/analytics"
import { hq } from "@/lib/prospects/links"
import { Button } from "@/components/ui/button"
import { CHAPTERS, totals, type Constat, type Proposition, type Question, type Projet, type Rapport, type ProspectState } from "@/lib/prospects/types"
import { Check, X, Loader2, ArrowRight, MessageSquareQuote } from "lucide-react"

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
const dateFr = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "")
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
  if (yt) return <iframe className="aspect-video w-full" src={`https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`} title="Vidéo" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen />
  if (loom) return <iframe className="aspect-video w-full" src={`https://www.loom.com/embed/${loom[1]}`} title="Vidéo" allowFullScreen />
  return <video className="aspect-video w-full bg-black" controls playsInline preload="metadata" src={url} />
}

/* Titre de chapitre : une ligne discrète, pas de bloc */
function Chapter({ id, kicker, title, children }: { id: string; kicker: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} data-chapter={id} className="scroll-mt-20 border-t border-[#1c1c1c] py-14 lg:py-20">
      <p className="text-[11px] font-bold uppercase tracking-widest text-signal">{kicker}</p>
      {title && <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

export function ProspectView({ prospect: initial, cases }: { prospect: PublicProspect; cases: CaseCard[] }) {
  const [p, setP] = useState(initial)
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initial.proposition.modules.filter((m) => m.selected || m.required).map((m) => m.id)))
  const [quote, setQuote] = useState("")
  const [quoteBtn, setQuoteBtn] = useState<{ x: number; y: number; text: string } | null>(null)
  const [qText, setQText] = useState("")
  const [qStatus, setQStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [shareOpen, setShareOpen] = useState(false)
  const [shareName, setShareName] = useState("")
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState("constat")
  const questionsRef = useRef<HTMLDivElement>(null)
  const slug = p.slug

  const post = useCallback((path: string, body: unknown) =>
    fetch(`/api/p/${slug}/${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }), [slug])

  /* Ouverture, chapitres, actualisation des réponses */
  useEffect(() => {
    post("event", { type: "open", device: deviceLabel() }).catch(() => {})
    track("prospect_open", { slug, state: p.state })
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const id = (e.target as HTMLElement).dataset.chapter
        if (!id) continue
        setActive(id)
        post("event", { type: "chapter", chapter: id }).catch(() => {})
        track("prospect_chapter", { slug, chapter: id })
      }
    }, { rootMargin: "-40% 0px -50% 0px" })
    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => io.observe(el))
    const poll = setInterval(async () => {
      try {
        const r = await fetch(`/api/p/${slug}/state`, { cache: "no-store" })
        if (r.ok) { const d = await r.json(); setP((prev) => ({ ...prev, questions: d.questions, state: d.state })) }
      } catch { /* silencieux */ }
    }, 45_000)
    return () => { io.disconnect(); clearInterval(poll) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  /* Surlignage → « Commenter ce passage » */
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
    if (!m || m.required || p.state !== "proposition") return
    const next = new Set(selected)
    if (next.has(id)) next.delete(id); else next.add(id)
    setSelected(next)
    post("selection", { selected: [...next] }).catch(() => {})
    track("prospect_selection", { slug, module: id, on: next.has(id) })
  }

  const live = useMemo<Proposition>(() => ({ ...p.proposition, modules: p.proposition.modules.map((m) => ({ ...m, selected: m.required || selected.has(m.id) })) }), [p.proposition, selected])
  const sums = totals(live)
  const belowMin = !!p.proposition.minTotal && sums.once < p.proposition.minTotal
  const hasEstimate = live.modules.some((m) => m.estimate && m.selected)

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
    try { await navigator.clipboard.writeText(hq.prospect(slug)); setCopied(true) } catch { /* pas de presse-papiers */ }
    track("prospect_share", { slug })
  }

  const showProposition = ["proposition", "accepte", "projet", "rapport", "clos"].includes(p.state) && p.proposition.modules.length > 0
  const canAccept = p.state === "proposition"
  const chapters = CHAPTERS.filter((c) => {
    if (c.id === "constat" || c.id === "questions") return true
    if (c.id === "proposition") return showProposition
    if (c.id === "planning") return showProposition && (p.proposition.planning?.length ?? 0) > 0
    if (c.id === "cas") return cases.length > 0
    if (c.id === "accepter") return canAccept
    return false
  })
  const c = p.constat
  const extras = [
    c.whois?.domain ? `Nom de domaine ${c.whois.domain}${c.whois.holder ? `, au nom de ${c.whois.holder}` : ""}${c.whois.expires ? `, expire le ${dateFr(c.whois.expires)}` : ""}.` : null,
    c.googleFiche?.note ? `Fiche Google : ${c.googleFiche.note}` : null,
    typeof c.score === "number" ? `Score technique du site : ${c.score}/100.` : null,
  ].filter((x): x is string => !!x)

  return (
    <div className="min-h-dvh bg-noir text-ivory">
      {/* Barre : le nom, et c'est tout */}
      <header className="sticky top-0 z-40 bg-noir/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-baseline gap-3 px-5 py-4">
          <a href="https://globecreateur.fr" className="text-base font-bold tracking-tight">GLOBE</a>
          <span className="truncate text-sm text-aluminium">× {p.company}</span>
        </div>
        <nav className="mx-auto max-w-2xl overflow-x-auto px-5" aria-label="Chapitres">
          <ul className="flex gap-5 border-b border-[#1c1c1c] pb-3 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
            {chapters.map((ch) => (
              <li key={ch.id}><a href={`#${ch.id}`} className={active === ch.id ? "text-ivory" : "text-[#5e6063] hover:text-aluminium"}>{ch.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>

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

      <main className="mx-auto max-w-2xl px-5">
        {p.state === "accepte" && p.acceptance && (
          <p className="mt-8 text-sm text-aluminium"><Check className="mr-1.5 inline h-4 w-4 text-signal" aria-hidden="true" />Acceptée le {dateTimeFr(p.acceptance.acceptedAt)} par {p.acceptance.name}. <a href={hq.document(slug, p.acceptance.version)} className="underline underline-offset-4">Document figé</a>.</p>
        )}
        {p.state === "clos" && <p className="mt-8 text-sm text-aluminium">Dossier classé. Une question ci-dessous suffit pour reprendre.</p>}

        {/* CONSTAT */}
        <section id="constat" data-chapter="constat" className="scroll-mt-20 py-14 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-widest text-signal">Pour {p.company}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {p.state === "constat" ? "Ce qu'on a vu, et ce qu'on ferait en premier." : p.state === "proposition" ? "Ce qu'on a vu, et ce qu'on vous propose." : p.state === "projet" ? "Où on en est." : p.state === "rapport" ? "Vos chiffres du mois." : "Votre page."}
          </h1>
          {c.pitch && <p className="mt-5 text-lg leading-relaxed text-aluminium">{c.pitch}</p>}
          {c.videoUrl && <div className="mt-8"><VideoEmbed url={c.videoUrl} /></div>}
          {c.points.length > 0 && (
            <ol className="mt-10 space-y-7">
              {c.points.map((pt, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="pt-1 text-[11px] font-bold text-signal">0{i + 1}</span>
                  <div><p className="text-lg font-bold leading-snug">{pt.title}</p><p className="mt-1.5 leading-relaxed text-aluminium">{pt.text}</p></div>
                </li>
              ))}
            </ol>
          )}
          {c.mystere?.sentAt && (
            <p className="mt-10 border-l-2 border-signal pl-4 leading-relaxed">
              Nous vous avons écrit {c.mystere.channel ? `par ${c.mystere.channel} ` : ""}le {dateTimeFr(c.mystere.sentAt)}.{" "}
              {c.mystere.repliedAt ? <>Votre réponse est arrivée le {dateTimeFr(c.mystere.repliedAt)}.</> : <span className="text-signal">Nous n'avons pas reçu de réponse.</span>}
              {c.mystere.note && <span className="text-aluminium"> {c.mystere.note}</span>}
            </p>
          )}
          {c.screenshotUrl && (
            <figure className="mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.screenshotUrl} alt={`Le site de ${p.company} sur un téléphone`} className="w-40 border border-[#2a2a2a]" />
              <figcaption className="mt-2 text-xs text-aluminium">Votre site, tel qu'un client le voit sur son téléphone.</figcaption>
            </figure>
          )}
          {extras.length > 0 && (
            <details className="mt-8 text-sm text-aluminium">
              <summary className="cursor-pointer select-none hover:text-ivory">Ce qu'on a aussi vérifié</summary>
              <ul className="mt-3 space-y-1.5 pl-4 [&>li]:list-disc">{extras.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </details>
          )}
          {p.state === "constat" && (
            <div className="mt-10">
              <Button href={c.bookingUrl || "https://wa.me/33678978705"} size="md" track={{ event: "cta_click", props: { cta: c.bookingUrl ? "rdv" : "whatsapp", location: "prospect-constat" } }}>
                Prenons 20 minutes <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </section>

        {/* PROPOSITION */}
        {showProposition && (
          <Chapter id="proposition" kicker={`Proposition · version ${p.proposition.version}`} title={canAccept ? "Retirez ou ajoutez : le montant suit." : undefined}>
            {p.proposition.intro && <p className="mb-8 leading-relaxed text-aluminium">{p.proposition.intro}</p>}
            <ul className="divide-y divide-[#1c1c1c] border-y border-[#1c1c1c]">
              {live.modules.map((m) => {
                const editable = canAccept && !m.required
                return (
                  <li key={m.id} className={`flex items-start gap-4 py-5 ${m.selected ? "" : "opacity-40"}`}>
                    <button
                      type="button"
                      disabled={!editable}
                      onClick={() => toggleModule(m.id)}
                      aria-pressed={m.selected}
                      aria-label={`${m.selected ? "Retirer" : "Ajouter"} ${m.title}`}
                      className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border ${m.selected ? "border-signal bg-signal text-white" : "border-[#2a2a2a]"} ${editable ? "cursor-pointer" : "cursor-default"}`}
                    >
                      {m.selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold leading-snug">{m.title}</p>
                      {m.desc && <p className="mt-1 text-sm leading-relaxed text-aluminium">{m.desc}</p>}
                    </div>
                    <p className="shrink-0 text-right text-sm">
                      {eur(m.price)}{m.monthly && <span className="block text-xs text-aluminium">par mois</span>}
                      {m.estimate && <span className="block text-[10px] uppercase tracking-widest text-aluminium">estimation</span>}
                    </p>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="text-2xl font-bold">{eur(sums.once)}{sums.monthly > 0 && <span className="text-base font-normal text-aluminium"> + {eur(sums.monthly)} par mois</span>}</p>
              {p.proposition.startDate && <p className="text-sm text-aluminium">Démarrage possible le {dateFr(p.proposition.startDate)}</p>}
            </div>
            <p className="mt-2 text-xs text-aluminium">
              {p.proposition.depositPct ? `Acompte de ${p.proposition.depositPct} % à l'acceptation. ` : ""}
              {p.proposition.validUntil ? `Valable jusqu'au ${dateFr(p.proposition.validUntil)}. ` : ""}
              {hasEstimate ? "Les montants « estimation » sont confirmés par écrit avant acceptation." : ""}
            </p>
            {belowMin && <p className="mt-2 text-sm text-signal">En dessous de {eur(p.proposition.minTotal!)}, cette proposition n'est plus valable telle quelle : parlons-en.</p>}
            {canAccept && <a href="#accepter" className="mt-6 inline-block"><Button size="md">Accepter en ligne</Button></a>}
          </Chapter>
        )}

        {/* PLANNING */}
        {showProposition && (p.proposition.planning?.length ?? 0) > 0 && (
          <Chapter id="planning" kicker="Planning">
            <ol className="space-y-5">
              {p.proposition.planning!.map((s, i) => (
                <li key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="pt-0.5 text-[11px] font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <div><p className="font-bold">{s.label}</p><p className="text-sm text-aluminium">{s.when}</p></div>
                </li>
              ))}
            </ol>
          </Chapter>
        )}

        {/* CAS CLIENTS */}
        {cases.length > 0 && (
          <Chapter id="cas" kicker="Cas clients" title="Deux exemples proches de votre situation.">
            <ul className="space-y-5">
              {cases.map((cs) => (
                <li key={cs.slug}>
                  <a href={`https://globecreateur.fr/projets/${cs.slug}`} target="_blank" rel="noreferrer" className="group block">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{cs.category}{cs.client ? ` · ${cs.client}` : ""}</p>
                    <p className="mt-1 font-bold underline-offset-4 group-hover:underline">{cs.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-aluminium">{cs.excerpt}</p>
                  </a>
                </li>
              ))}
            </ul>
          </Chapter>
        )}

        {/* PROJET */}
        {["projet", "rapport"].includes(p.state) && (
          <Chapter id="projet" kicker="Le projet">
            {p.projet.note && <p className="mb-8 leading-relaxed text-aluminium">{p.projet.note}</p>}
            <div className="space-y-8">
              {([["Accès remis", p.projet.acces], ["Planning", p.projet.planning], ["Livrables", p.projet.livrables]] as const).map(([label, items]) => items.length > 0 && (
                <div key={label}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{label}</p>
                  <ul className="mt-3 space-y-2">
                    {items.map((it, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center border ${it.done ? "border-signal bg-signal text-white" : "border-[#2a2a2a]"}`}>{it.done && <Check className="h-3 w-3" aria-hidden="true" />}</span>
                        <span className={it.done ? "text-aluminium line-through" : ""}>{it.label}{it.when ? <span className="text-aluminium"> · {it.when}</span> : null}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Chapter>
        )}

        {/* RAPPORTS */}
        {p.state === "rapport" && (
          <Chapter id="rapports" kicker="Rapports mensuels">
            {p.rapports.length === 0 && <p className="text-aluminium">Le premier rapport arrive à la fin du mois.</p>}
            <div className="space-y-10">
              {[...p.rapports].reverse().map((r) => (
                <article key={r.month}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-aluminium">{r.month}</p>
                  {r.metrics.length > 0 && (
                    <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                      {r.metrics.map((m) => (<div key={m.label}><dd className="text-2xl font-bold">{m.value}</dd><dt className="text-xs text-aluminium">{m.label}</dt></div>))}
                    </dl>
                  )}
                  <p className="mt-4 whitespace-pre-line leading-relaxed">{r.text}</p>
                </article>
              ))}
            </div>
            {p.parrainageCode && (
              <p className="mt-10 text-sm text-aluminium">Une entreprise qui a le même problème que vous aviez ? Transmettez-lui <code className="text-ivory">globecreateur.fr/contact?parrain={p.parrainageCode}</code> : on lui prépare sa page, et vous avez un mois de suivi offert si elle signe.</p>
            )}
          </Chapter>
        )}

        {/* QUESTIONS */}
        <Chapter id="questions" kicker="Vos questions" title="Surlignez un passage, ou écrivez ici.">
          <div ref={questionsRef}>
            {quote && (
              <blockquote className="mb-3 flex items-start gap-2 border-l-2 border-signal pl-3 text-sm text-aluminium">
                <span className="flex-1">« {quote} »</span>
                <button type="button" onClick={() => setQuote("")} aria-label="Retirer le passage" className="hover:text-ivory"><X className="h-4 w-4" /></button>
              </blockquote>
            )}
            <textarea value={qText} onChange={(e) => setQText(e.target.value)} rows={3} placeholder={quote ? "Votre remarque sur ce passage…" : "Votre question…"} className="w-full resize-none border-b border-[#2a2a2a] bg-transparent py-3 text-base outline-none placeholder:text-[#5e6063] focus:border-signal" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-aluminium">{qStatus === "sent" ? "Envoyé. Réponse dans la journée, ici et par e-mail." : qStatus === "error" ? "Échec de l'envoi, réessayez." : ""}</p>
              <Button type="button" size="sm" variant="outline" onClick={sendQuestion} disabled={qStatus === "sending" || qText.trim().length < 2}>
                {qStatus === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null} Envoyer
              </Button>
            </div>
          </div>
          {p.questions.length > 0 && (
            <ol className="mt-10 space-y-6 text-sm">
              {[...p.questions].reverse().map((q) => (
                <li key={q.id}>
                  {q.quote && <blockquote className="mb-1 border-l-2 border-[#2a2a2a] pl-3 text-aluminium">« {q.quote} »</blockquote>}
                  <p><span className="text-[11px] font-bold uppercase tracking-widest text-aluminium">Vous · {dateTimeFr(q.createdAt)}</span><br />{q.text}</p>
                  {q.answer ? (
                    <p className="mt-3"><span className="text-[11px] font-bold uppercase tracking-widest text-signal">Globe · {dateTimeFr(q.answeredAt)}</span><br /><span className="whitespace-pre-line">{q.answer}</span></p>
                  ) : <p className="mt-2 text-xs text-aluminium">En attente de réponse.</p>}
                </li>
              ))}
            </ol>
          )}
        </Chapter>

        {/* ACCEPTER */}
        {canAccept && (
          <Chapter id="accepter" kicker="Accepter" title="En deux minutes, sans impression ni scan.">
            <AcceptBlock slug={slug} terms={p.proposition.terms} belowMin={belowMin} sums={sums} hasEstimate={hasEstimate} defaultName={p.contactName ?? ""} onAccepted={() => setP((prev) => ({ ...prev, state: "accepte" }))} />
          </Chapter>
        )}

        <footer className="border-t border-[#1c1c1c] py-10 text-xs leading-relaxed text-aluminium">
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={hq.document(slug, p.acceptance?.version)} className="underline underline-offset-4 hover:text-ivory">Version imprimable (PDF)</a>
            <button type="button" onClick={() => setShareOpen(true)} className="underline underline-offset-4 hover:text-ivory">Partager à un associé</button>
            <a href="https://wa.me/33678978705" className="underline underline-offset-4 hover:text-ivory">WhatsApp</a>
          </p>
          <p className="mt-4">Page privée, réservée à ceux qui ont le lien. Elle mesure son ouverture et les chapitres lus, pour qu'on vous rappelle au bon moment. Rien d'autre.</p>
        </footer>
      </main>

      {shareOpen && (
        <div role="dialog" aria-modal="true" aria-label="Partager cette page" className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div className="w-full max-w-sm bg-noir p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-bold">À qui ?</p>
              <button type="button" onClick={() => { setShareOpen(false); setCopied(false) }} aria-label="Fermer" className="text-aluminium hover:text-ivory"><X className="h-5 w-5" /></button>
            </div>
            <input value={shareName} onChange={(e) => setShareName(e.target.value)} placeholder="Marie, comptable" className="mt-4 w-full border-b border-[#2a2a2a] bg-transparent py-3 outline-none focus:border-signal" />
            {p.shares.length > 0 && <p className="mt-3 text-xs text-aluminium">Déjà partagé à {p.shares.join(", ")}.</p>}
            <Button type="button" size="sm" className="mt-5" onClick={share} disabled={shareName.trim().length < 2}>{copied ? "Lien copié" : "Copier le lien"}</Button>
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

  if (step === "done") return <p className="text-lg"><Check className="mr-2 inline h-5 w-5 text-signal" aria-hidden="true" />C'est accepté. La confirmation et le document figé arrivent par e-mail.</p>

  return (
    <div className="max-w-md">
      <p className="text-sm leading-relaxed text-aluminium">Votre nom, votre e-mail, un code reçu par e-mail. La proposition est figée telle que vous l'avez composée, et vous en recevez une copie.</p>
      {terms && <p className="mt-4 whitespace-pre-line border-l-2 border-[#2a2a2a] pl-4 text-sm text-aluminium">{terms}</p>}
      <p className="mt-4"><strong>{eur(sums.once)}</strong>{sums.monthly > 0 && <> + <strong>{eur(sums.monthly)}</strong> par mois</>}</p>
      {hasEstimate && <p className="mt-2 text-sm text-signal">Votre sélection contient un montant « estimation » : demandez-nous la confirmation écrite, ou retirez-le.</p>}
      {belowMin && <p className="mt-2 text-sm text-signal">Votre sélection est sous le minimum de cette proposition : parlons-en avant.</p>}
      {step === "form" ? (
        <form onSubmit={async (e) => { e.preventDefault(); const d = await call({ step: "start", name, email }); if (d) setStep("code") }} className="mt-6 space-y-5">
          <input required minLength={2} value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none placeholder:text-[#5e6063] focus:border-signal" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Votre e-mail professionnel" className="w-full border-b border-[#2a2a2a] bg-transparent py-2 outline-none placeholder:text-[#5e6063] focus:border-signal" />
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" /> <span>J'accepte cette proposition telle que composée{terms ? " et ses conditions" : ""}.</span></label>
          {err && <p className="text-sm text-signal">{err}</p>}
          <Button type="submit" size="md" disabled={busy || !agree || belowMin || hasEstimate}>{busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null} Recevoir mon code</Button>
        </form>
      ) : (
        <form onSubmit={async (e) => { e.preventDefault(); const d = await call({ step: "confirm", code }); if (d) { setStep("done"); onAccepted(); track("prospect_accept", { slug }) } }} className="mt-6 space-y-5">
          <p className="text-sm text-aluminium">Un code à six chiffres vient de partir vers {email}, valable quinze minutes.</p>
          <input inputMode="numeric" pattern="\d{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} placeholder="000000" className="w-full border-b border-[#2a2a2a] bg-transparent py-3 text-center text-3xl tracking-[0.5em] outline-none focus:border-signal" />
          {err && <p className="text-sm text-signal">{err}</p>}
          <Button type="submit" size="md" disabled={busy || code.length !== 6}>{busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null} Confirmer</Button>
          <button type="button" onClick={() => setStep("form")} className="block text-xs text-aluminium underline underline-offset-4">Changer d'e-mail</button>
        </form>
      )}
    </div>
  )
}

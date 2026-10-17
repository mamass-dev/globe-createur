import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProspect } from "@/lib/prospects/store"
import { totals } from "@/lib/prospects/types"
import { PrintButton } from "@/components/prospects/print-button"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: "Document", robots: { index: false, follow: false } }

const eur = (n: number) => n.toLocaleString("fr-FR") + " € HT"
const dateFr = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "")

/**
 * Version imprimable (PDF via le navigateur). Avec `?v=<n>` égal à la version acceptée,
 * c'est la copie figée au moment de l'acceptation qui est rendue, avec son empreinte.
 */
export default async function DocumentPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ v?: string }> }) {
  const { slug } = await params
  const { v } = await searchParams
  const p = await getProspect(slug)
  if (!p) notFound()
  const frozen = p.acceptance && String(p.acceptance.version) === v ? p.acceptance : null
  const prop = frozen ? frozen.snapshot : p.proposition
  const sums = totals(prop)
  const modules = prop.modules.filter((m) => m.selected || m.required)
  const today = new Date().toISOString()

  return (
    <div className="min-h-dvh bg-white text-[#111] print:bg-white">
      <style>{`@page { margin: 18mm; } @media print { .no-print { display: none !important } }`}</style>
      <div className="no-print sticky top-0 flex items-center justify-between gap-3 border-b border-neutral-200 bg-white px-6 py-3 text-sm">
        <a href={`/p/${slug}`} className="underline underline-offset-4">← Retour à la page</a>
        <PrintButton />
      </div>
      <article className="mx-auto max-w-3xl px-6 py-10 text-[15px] leading-relaxed [&_h1]:text-[#111]! [&_h2]:text-[#6b6b6b]! [&_p]:text-[#111] [&_li]:text-[#111] [&_td]:text-[#111] [&_th]:text-[#111]">
        <header className="flex items-start justify-between gap-6 border-b border-neutral-200 pb-6">
          <div>
            <p className="text-lg font-bold tracking-tight">GLOBE <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500">Creative House</span></p>
            <p className="mt-1 text-xs text-neutral-500">Globe Créateur · Dijon · contact@globecreateur.fr</p>
          </div>
          <div className="text-right text-xs text-neutral-500">
            <p>{frozen ? "Proposition acceptée" : "Proposition commerciale"}</p>
            <p>Version {prop.version} · {dateFr(frozen ? frozen.acceptedAt : today)}</p>
            <p>Réf. {p.slug}</p>
          </div>
        </header>

        <h1 className="mt-8 text-2xl font-bold">{p.company}</h1>
        {p.contactName && <p className="text-neutral-600">À l'attention de {p.contactName}</p>}

        {!frozen && p.constat.points.length > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-bold uppercase tracking-widest text-neutral-500">Constat</h2>
            {p.constat.pitch && <p className="mt-2">{p.constat.pitch}</p>}
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              {p.constat.points.map((pt, i) => (<li key={i}><strong>{pt.title}.</strong> {pt.text}</li>))}
            </ol>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-base font-bold uppercase tracking-widest text-neutral-500">Proposition</h2>
          {prop.intro && <p className="mt-2">{prop.intro}</p>}
          <table className="mt-4 w-full border-collapse text-sm">
            <thead><tr className="border-b border-neutral-300 text-left"><th className="py-2 pr-3">Prestation</th><th className="py-2 text-right">Montant</th></tr></thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.id} className="border-b border-neutral-200 align-top">
                  <td className="py-2 pr-3"><strong>{m.title}</strong>{m.desc && <><br /><span className="text-neutral-600">{m.desc}</span></>}{m.estimate && <><br /><span className="text-xs uppercase tracking-widest text-neutral-500">estimation à confirmer</span></>}</td>
                  <td className="whitespace-nowrap py-2 text-right">{eur(m.price)}{m.monthly ? " / mois" : ""}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td className="py-2 pr-3 font-bold">Total ponctuel</td><td className="py-2 text-right font-bold">{eur(sums.once)}</td></tr>
              {sums.monthly > 0 && <tr><td className="py-2 pr-3 font-bold">Abonnement mensuel</td><td className="py-2 text-right font-bold">{eur(sums.monthly)} / mois</td></tr>}
              <tr><td className="py-1 pr-3 text-xs text-neutral-500" colSpan={2}>TVA 20 % en sus. {prop.depositPct ? `Acompte de ${prop.depositPct} % du montant ponctuel à l'acceptation.` : ""}</td></tr>
            </tfoot>
          </table>
          {(prop.startDate || prop.validUntil) && (
            <p className="mt-3 text-sm text-neutral-600">{prop.startDate ? `Démarrage possible le ${dateFr(prop.startDate)}. ` : ""}{prop.validUntil ? `Proposition valable jusqu'au ${dateFr(prop.validUntil)}.` : ""}</p>
          )}
        </section>

        {(prop.planning?.length ?? 0) > 0 && (
          <section className="mt-8">
            <h2 className="text-base font-bold uppercase tracking-widest text-neutral-500">Planning</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">{prop.planning!.map((s, i) => (<li key={i}><strong>{s.label}</strong> · {s.when}</li>))}</ol>
          </section>
        )}

        {prop.terms && (
          <section className="mt-8">
            <h2 className="text-base font-bold uppercase tracking-widest text-neutral-500">Conditions</h2>
            <p className="mt-2 whitespace-pre-line text-sm">{prop.terms}</p>
          </section>
        )}

        <section className="mt-8 border-t border-neutral-200 pt-6 text-sm">
          <h2 className="text-base font-bold uppercase tracking-widest text-neutral-500">Garanties Globe Créateur</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Tout ce qui est produit vous appartient : fichiers sources, accès, nom de domaine, droits cédés par écrit.</li>
            <li>Un coffre d'accès vous est remis à la livraison ; vous êtes prévenu 60 puis 30 jours avant chaque échéance.</li>
            <li>Les abonnements sont résiliables avec un mois de préavis.</li>
          </ul>
        </section>

        {frozen && (
          <section className="mt-8 border border-neutral-300 p-4 text-sm">
            <h2 className="font-bold text-[#111]!">Acceptation</h2>
            <p className="mt-1">Acceptée en ligne le {new Date(frozen.acceptedAt).toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} par <strong>{frozen.name}</strong> ({frozen.email}), après vérification de l'adresse e-mail par code à usage unique.</p>
            <p className="mt-1">Montant accepté : {eur(frozen.totalOnce)}{frozen.totalMonthly ? ` + ${eur(frozen.totalMonthly)} par mois` : ""}.</p>
            <p className="mt-1 break-all text-xs text-neutral-600">Empreinte SHA-256 de la version acceptée : {frozen.hash}</p>
          </section>
        )}

        <footer className="mt-10 text-xs text-neutral-500">Globe Créateur · globecreateur.fr · Ce document est généré depuis la page {`globecreateur.fr/p/${p.slug}`}.</footer>
      </article>
    </div>
  )
}

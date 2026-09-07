import Link from "next/link"
import { ArrowRight, Check, Clock, ShieldCheck, MapPinned } from "lucide-react"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import { services } from "@/lib/data/services"
import { OFFRES_FIXES_VITRINE, formatPrixHT, type OffreFixe } from "@/lib/data/offres-fixes"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/section-header"
import { AnimateOnScroll } from "@/components/ui/animate"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { ProcessSteps } from "@/components/sections/process-steps"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { RelatedServices } from "@/components/sections/related-services"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { JsonLd } from "@/components/seo/json-ld"
import { DevisForm } from "@/components/forms/devis-form"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

/**
 * Gabarit des offres à prix fixe (modèle « vectorisation de logo ») :
 * réponse directe en haut de page, prix et délai visibles sans scroller, formulaire court,
 * FAQ balisée. Pensé pour être lisible tel quel par Google et par les assistants IA.
 */
export function OffreFixePage({ offre }: { offre: OffreFixe }) {
  const PATH = `/services/${offre.slug}`
  const prix = formatPrixHT(offre.prixHT)
  const related = offre.relatedServices.map((s) => services.find((srv) => srv.slug === s)).filter((s): s is NonNullable<typeof s> => Boolean(s))
  const autres = OFFRES_FIXES_VITRINE.filter((o) => offre.related.includes(o.slug))

  const enBref = [
    { icon: "Euro", label: "Prix", value: prix },
    { icon: "Clock", label: "Délai", value: offre.delai },
    { icon: "MapPinned", label: "Où", value: "À distance, toute la France" },
    { icon: "ShieldCheck", label: "Engagement", value: "Aucun. Paiement à la commande, remboursé si on ne peut pas livrer." },
  ]

  return (
    <>
      <ServiceSchema name={offre.nom} description={offre.metaDescription} url={PATH} />
      <FaqSchema items={offre.faq} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}${PATH}#offre`,
          name: offre.nom,
          serviceType: offre.nom,
          description: offre.reponseDirecte,
          provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
          areaServed: { "@type": "Country", name: "France" },
          offers: {
            "@type": "Offer",
            name: offre.nom,
            price: offre.prixHT,
            priceCurrency: "EUR",
            url: `${SITE_URL}${PATH}#commander`,
            availability: "https://schema.org/InStock",
          },
        }}
      />

      <Breadcrumb items={[{ name: "Services", href: "/services" }, { name: offre.nom, href: PATH }]} />

      {/* ─── 1. Hero : réponse directe ─── */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="inline-flex items-center gap-2 font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
                <LucideIcon name={offre.icon} className="h-4 w-4" />
                Offre à prix fixe
              </span>
              <h1 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-6xl text-ivory">{offre.promesse}</h1>
              <p className="mt-6 text-lg text-aluminium leading-relaxed max-w-2xl">{offre.reponseDirecte}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="#commander" size="lg" track={{ event: "cta_click", props: { cta: "commander", location: `offre-${offre.slug}-hero` } }}>
                  {offre.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <WhatsAppLink location={`offre-${offre.slug}`} message={`Bonjour Axel, je suis intéressé par l'offre « ${offre.nom} » et j'ai une question.`} label="Une question ? WhatsApp" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-6 lg:p-8">
                <p className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">— En bref</p>
                <dl className="mt-5 space-y-4">
                  {enBref.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <LucideIcon name={item.icon} className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-widest text-aluminium">{item.label}</dt>
                        <dd className="mt-0.5 text-base font-bold text-ivory">{item.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 pt-5 border-t border-[#2a2a2a] text-sm text-aluminium leading-relaxed">
                  <strong className="text-ivory">Pour qui :</strong> {offre.pourQui}
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 2. Ce qui est inclus ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <SectionHeader badge="Le périmètre" title="Ce que comprend l'offre, sans zone grise" subtitle="Le périmètre est fixe : c'est ce qui permet le prix fixe et le délai fixe." />
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 max-w-6xl mx-auto">
            <AnimateOnScroll>
              <ul className="space-y-3">
                {offre.inclus.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-aluminium">
                    <Check className="h-5 w-5 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <Card className="h-full">
                <span className="font-mono-accent text-xs font-bold uppercase tracking-widest text-signal">Livrables</span>
                <ul className="mt-4 space-y-2.5">
                  {offre.livrables.map((l) => (
                    <li key={l} className="flex gap-2.5 text-sm text-ivory font-bold">
                      <ArrowRight className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-[#2a2a2a] space-y-3 text-sm text-aluminium">
                  <p className="flex gap-2"><Clock className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />{offre.delaiDetail}</p>
                  <p className="flex gap-2"><MapPinned className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />Prestation à distance, valable pour toute entreprise en France.</p>
                  <p className="flex gap-2"><ShieldCheck className="h-4 w-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />Facture avec TVA. Si on ne peut pas livrer dans le périmètre annoncé, on vous le dit avant et on rembourse.</p>
                </div>
              </Card>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 3. Étapes ─── */}
      <ProcessSteps badge="Comment ça se passe" title={`${offre.nom} : trois étapes, ${offre.delai}`} steps={offre.etapes.map((e, i) => ({ number: String(i + 1).padStart(2, "0"), ...e }))} />

      {/* ─── 4. Commander ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c] scroll-mt-20" id="commander">
        <Container>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">— Commander</span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">{prix}, {offre.delai}</h2>
              <p className="mt-6 text-aluminium leading-relaxed">
                Laissez votre nom, votre email et un mot sur votre contexte. On vous confirme sous 24 h ouvrées que l&apos;offre
                correspond bien à votre besoin, puis vous recevez le lien de paiement sécurisé. Le délai court à partir du paiement.
              </p>
              <p className="mt-4 text-sm text-aluminium leading-relaxed">
                Besoin de plus que ce périmètre ? Dites-le dans le message : on vous propose un devis à part, sans vous
                faire payer l&apos;offre pour rien.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="border border-[#1c1c1c] bg-[#141414] p-6 lg:p-10">
                <DevisForm
                  defaultService={offre.formService}
                  submitLabel={offre.ctaLabel}
                  successTitle="Demande bien reçue."
                  successText="On vous confirme l'offre et on vous envoie le lien de paiement sous 24 h ouvrées. Regardez vos spams si rien n'arrive."
                />
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ─── 5. FAQ ─── */}
      <FaqAccordion items={offre.faq} title={`Questions fréquentes sur l'offre ${offre.nom}`} badge="FAQ" />

      {/* ─── 6. Autres offres à prix fixe ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <SectionHeader badge="Même principe" title="Les autres offres à prix fixe" subtitle="Un besoin précis, un prix annoncé, un délai tenu." />
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {autres.map((o) => (
              <AnimateOnScroll key={o.slug}>
                <Link href={o.href} className="group block h-full border border-[#1c1c1c] bg-[#141414] p-6 hover:border-signal/60 transition-colors">
                  <LucideIcon name={o.icon} className="h-6 w-6 text-signal" />
                  <h3 className="mt-4 text-lg font-bold text-ivory group-hover:text-signal transition-colors">{o.nom}</h3>
                  <p className="mt-2 text-sm text-aluminium leading-relaxed">{o.accroche}</p>
                  <p className="mt-4 text-sm font-bold text-ivory">
                    {o.prefix}{o.prix} <span className="text-aluminium font-normal">· {o.delai}</span>
                  </p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && <RelatedServices services={related} />}
    </>
  )
}

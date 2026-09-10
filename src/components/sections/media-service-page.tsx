import { ArrowRight, Check, Clock, MapPinned, Euro, Users } from "lucide-react"
import { SITE_URL, SITE_NAME } from "@/lib/constants"
import { services } from "@/lib/data/services"
import { SHOWREEL_VIDEO_ID, type MediaService } from "@/lib/data/media-services"
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
import { PortfolioGallery } from "@/components/sections/portfolio-gallery"
import { VideoHero } from "@/components/sections/video-hero"
import { ServiceSchema, FaqSchema } from "@/components/seo/schemas"
import { JsonLd } from "@/components/seo/json-ld"
import { DevisForm } from "@/components/forms/devis-form"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"

/**
 * Gabarit des pages Photo et Vidéo : réponse directe, « En bref », showreel (vidéo) ou portfolio
 * (photo), prestations, périmètre, étapes, formulaire court, FAQ balisée.
 */
export function MediaServicePage({ service: s }: { service: MediaService }) {
  const PATH = `/services/${s.slug}`
  const isVideo = s.slug.startsWith("video")
  const related = s.relatedServices.map((r) => services.find((srv) => srv.slug === r)).filter((r): r is NonNullable<typeof r> => Boolean(r))
  const enBref = [
    { icon: Euro, label: "Prix", value: s.prix },
    { icon: Clock, label: "Délai", value: s.delai },
    { icon: MapPinned, label: "Zone", value: s.zone },
    { icon: Users, label: "Pour qui", value: s.pourQui },
  ]

  return (
    <>
      <ServiceSchema name={s.nom} description={s.metaDescription} url={PATH} />
      <FaqSchema items={s.faq} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${SITE_URL}${PATH}#service`,
          name: s.nom,
          serviceType: s.nom,
          description: s.reponseDirecte,
          provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
          areaServed: [{ "@type": "City", name: "Dijon" }, { "@type": "AdministrativeArea", name: "Bourgogne-Franche-Comté" }],
        }}
      />

      <Breadcrumb items={[{ name: "Services", href: "/services" }, { name: s.nom, href: PATH }]} />

      {/* ─── Hero ─── */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <Container>
          <AnimateOnScroll>
            <span className="inline-flex items-center gap-2 font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">
              <LucideIcon name={s.icon} className="h-4 w-4" />
              {isVideo ? "Vidéo & drone" : "Photo & drone"}
            </span>
            <h1 className="text-impact mt-6 text-4xl sm:text-5xl lg:text-6xl text-ivory max-w-5xl">{s.h1}</h1>
            <p className="mt-6 text-lg text-aluminium leading-relaxed max-w-3xl">{s.reponseDirecte}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#devis" size="lg" track={{ event: "cta_click", props: { cta: "devis", location: `${s.slug}-hero` } }}>
                {s.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <WhatsAppLink location={s.slug} message={`Bonjour Axel, j'ai un projet ${isVideo ? "vidéo" : "photo"} et j'aimerais en discuter.`} label="Une question ? WhatsApp" />
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ─── Showreel (vidéo) ─── */}
      {isVideo && (
        <section className="pb-20 lg:pb-28">
          <Container>
            <AnimateOnScroll>
              <div className="border border-[#1c1c1c] bg-[#0f0f0f] p-2 max-w-5xl mx-auto">
                <VideoHero videoId={SHOWREEL_VIDEO_ID} poster="/images/video-cover.webp" />
              </div>
              <p className="mt-4 text-center text-xs uppercase tracking-widest text-aluminium">Showreel drone Globe Créateur</p>
            </AnimateOnScroll>
          </Container>
        </section>
      )}

      {/* ─── En bref ─── */}
      <section className="py-16 lg:py-20 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {enBref.map((item) => (
              <div key={item.label} className="border border-[#1c1c1c] bg-[#141414] p-5">
                <item.icon className="h-5 w-5 text-signal" aria-hidden="true" />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-aluminium">{item.label}</p>
                <p className="mt-1.5 text-sm font-semibold text-ivory leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Portfolio (photo) ─── */}
      {!isVideo && <PortfolioGallery />}
      {isVideo && (
        <PortfolioGallery
          badge="Images aériennes"
          title="Ce qu'on filme et photographie du ciel"
          subtitle="Sites, chantiers, domaines, festivals : quelques prises de vue drone, en attendant le montage de vos images."
          initial="drone"
          showFilters={false}
        />
      )}

      {/* ─── Prestations ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <SectionHeader badge="Prestations" title={isVideo ? "Ce qu'on tourne" : "Ce qu'on photographie"} subtitle="Chaque image est faite pour un usage précis : site, fiche Google, réseaux, recrutement, impression." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.prestations.map((p) => (
              <AnimateOnScroll key={p.titre}>
                <Card className="h-full">
                  <h3 className="text-lg font-bold text-ivory">{p.titre}</h3>
                  <p className="mt-3 text-sm text-aluminium leading-relaxed">{p.texte}</p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Inclus ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start max-w-6xl mx-auto">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">— Ce qui est compris</span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">Du brief à la livraison, tout est inclus</h2>
              <p className="mt-6 text-aluminium leading-relaxed">
                Pas de photographe qui livre des fichiers bruts, pas de vidéaste qui disparaît après le tournage. Les images sont
                pensées pour vos supports et livrées prêtes à l&apos;emploi, avec les droits qui vont avec.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <ul className="space-y-3">
                {s.inclus.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-aluminium">
                    <Check className="h-5 w-5 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <ProcessSteps badge="Comment ça se passe" title={`${s.nom} : trois étapes`} steps={s.etapes.map((e, i) => ({ number: String(i + 1).padStart(2, "0"), ...e }))} />

      {/* ─── Devis ─── */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c] scroll-mt-20" id="devis">
        <Container>
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-signal">— Devis sous 24 h</span>
              <h2 className="text-impact mt-4 text-3xl lg:text-5xl text-ivory">{isVideo ? "Parlons de votre vidéo" : "Parlons de votre shooting"}</h2>
              <p className="mt-6 text-aluminium leading-relaxed">
                Un mot sur votre activité, le type d&apos;images dont vous avez besoin et une échéance si vous en avez une. On revient vers
                vous sous 24 h ouvrées avec des questions ou directement un devis détaillé.
              </p>
              <p className="mt-4 text-sm text-aluminium leading-relaxed">
                Besoin d&apos;images en continu ? Les shootings et tournages sont inclus dans nos forfaits communication à partir du
                forfait Croissance.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div className="border border-[#1c1c1c] bg-[#141414] p-6 lg:p-10">
                <DevisForm defaultService={s.formService} submitLabel={s.ctaLabel} successTitle="Demande bien reçue." successText="On vous répond sous 24 h ouvrées avec un devis ou quelques questions." />
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      <FaqAccordion items={s.faq} title={`Questions fréquentes : ${s.nom.toLowerCase()}`} badge="FAQ" />

      {related.length > 0 && <RelatedServices services={related} />}
    </>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { OffresFixesSection } from "@/components/sections/offres-fixes-section"
import { PortfolioGallery } from "@/components/sections/portfolio-gallery"
import { Kicker } from "@/components/ui/kicker"
import { logos } from "@/lib/data/logos"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { VideoHero } from "@/components/sections/video-hero"
import { GoogleReviewsBadge } from "@/components/sections/google-reviews-badge"
import { temoignages, googleReviews } from "@/lib/data/temoignages"
import { TestimonialsWall } from "@/components/sections/testimonials-wall"
import { AnimateOnScroll } from "@/components/ui/animate"
import { AggregateRatingSchema } from "@/components/seo/schemas"
import { getProjetPages } from "@/lib/content"
import { EasterEgg } from "@/components/ui/easter-egg"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { HomeStickyBar } from "@/components/sections/home-sticky-bar"

export const revalidate = 3600

/*
 * Home refondue le 2026-09-25 (conversion) : hero qui nomme la cible et le territoire, un seul
 * bouton principal, preuves (projets réels, logos) remontées, 3 piliers au lieu de 14 services,
 * page deux fois plus courte. Méthodologie / secteurs / blog / zones vivent dans le footer et
 * leurs pages. Pas de pop-up ici (voir lead-magnet.tsx).
 */

const PILIERS = [
  {
    href: "/services/creation-site-internet-dijon",
    icon: "Globe",
    title: "Un site qui ramène des demandes",
    desc: "Rapide, trouvé sur Google, conçu pour transformer une visite en prise de contact. Site vitrine livré en 3 à 5 semaines.",
    cta: "Création de site internet",
  },
  {
    href: "/services/photographe-entreprise-dijon",
    icon: "Camera",
    title: "Des images qui sont les vôtres",
    desc: "Vos lieux, vos équipes, vos produits, vos événements, en photo et en vidéo, drone compris. Studio intégré, livraison sous 5 à 7 jours.",
    cta: "Photo & vidéo d'entreprise",
  },
  {
    href: "/services/seo-local-dijon",
    icon: "Search",
    title: "Être trouvé par ceux qui cherchent",
    desc: "Fiche Google, bloc Maps, pages qui répondent aux recherches de vos clients. Forfaits dès 600 €/mois, audit initial offert.",
    cta: "SEO local",
  },
]

const HERO_LOGOS = ["helite", "leet", "ligue-tennis-bfc", "uimm", "zumub", "plombieres-les-dijon"]

const TOOLS = [
  { href: "/analyseur-seo", icon: "Search", tag: "5 secondes", title: "Analyseur SEO", desc: "Score sur 100 et 13 critères vérifiés sur votre page.", cta: "Analyser mon site" },
  { href: "/audit-digital", icon: "Target", tag: "2 min · 9 questions", title: "Audit digital", desc: "Votre score global et les actions prioritaires.", cta: "Tester mon score" },
  { href: "/calculateur-roi", icon: "TrendingUp", tag: "Instantané", title: "Calculateur ROI", desc: "Ce que l'invisibilité sur Google vous coûte chaque mois.", cta: "Calculer" },
  { href: "/generateur-signature-email", icon: "Mail", tag: "5 modèles", title: "Signature email", desc: "Une signature pro compatible Gmail et Outlook.", cta: "Créer ma signature" },
]

const TEAM = [
  { name: "Axel Masson", role: "Co-fondateur · Stratégie & web", photo: "/images/team/axel-masson.webp" },
  { name: "Adrien Lecrivain", role: "Co-fondateur · Photo & vidéo", photo: "/images/team/adrien-lecrivain.webp" },
]

export default function HomePage() {
  const projets = getProjetPages().slice(0, 3)

  return (
    <>
      <EasterEgg />
      <AggregateRatingSchema ratingValue={5} reviewCount={10} />
      <HomeStickyBar />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] pt-28 pb-12 lg:pt-40 lg:pb-16">
        <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-5xl">
            <AnimateOnScroll>
              <h1 className="text-impact text-[3rem] leading-[0.92] sm:text-6xl lg:text-[6.5rem] text-ivory">
                Des images et un site
                <br />
                qui vous <span className="text-signal">ramènent des clients.</span>
              </h1>
            </AnimateOnScroll>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <AnimateOnScroll delay={0.12} className="lg:col-span-7">
              <p className="text-lg lg:text-xl text-aluminium leading-relaxed max-w-xl">
                Agence de communication à Dijon : création de sites, SEO local, photo et vidéo pour les PME de
                Bourgogne-Franche-Comté. Un seul interlocuteur, des délais tenus, des prix annoncés.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button href="/devis" size="lg" track={{ event: "cta_click", props: { cta: "devis", location: "home-hero" } }}>
                  Parlons de votre projet
                </Button>
                <WhatsAppLink location="home-hero" label="Écrire sur WhatsApp" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-[#8a8a8a]">Réponse sous 24 h ouvrées · Sans engagement</p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2} className="lg:col-span-5 lg:justify-self-end">
              <GoogleReviewsBadge reviews={googleReviews} />
            </AnimateOnScroll>
          </div>

          {/* Logos clients */}
          <AnimateOnScroll delay={0.25} className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8a8a8a]">Ils nous font confiance</span>
            {logos
              .filter((l) => HERO_LOGOS.includes(l.src.split("/").pop()!.replace(".webp", "")))
              .map((l) => (
                <Image key={l.name} src={l.src} alt={l.name} width={120} height={40} className="h-7 w-auto invert opacity-60" />
              ))}
          </AnimateOnScroll>

          {/* Vidéo */}
          <AnimateOnScroll delay={0.2} className="relative mt-14 lg:mt-20">
            <div className="absolute -inset-x-10 -bottom-10 h-40 bg-signal/10 blur-3xl pointer-events-none" />
            <div className="relative border border-[#1c1c1c] bg-[#0f0f0f] p-2">
              <VideoHero videoId="56KVxVaWeEw" poster="/images/video-cover.webp" />
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ═══ 2. PREUVES : PROJETS ═══ */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f] border-y border-[#1c1c1c]">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <AnimateOnScroll className="max-w-2xl">
              <Kicker number="01">Réalisations</Kicker>
              <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Ce qu&apos;on a fait pour eux</h2>
            </AnimateOnScroll>
            <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-signal hover:gap-4 transition-all shrink-0">
              Tous nos projets <LucideIcon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projets.map((projet) => {
              const fm = projet.frontmatter as Record<string, string>
              return (
                <AnimateOnScroll key={projet.slug}>
                  <Link href={`/projets/${projet.slug}`} className="group block">
                    {fm.image && (
                      <div className="relative aspect-[4/3] overflow-hidden border border-[#1c1c1c] mb-5 bg-[#141414]">
                        <Image src={fm.image} alt={fm.imageAlt || fm.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      </div>
                    )}
                    {fm.category && <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-signal">{fm.category}</span>}
                    <h3 className="mt-2 text-xl font-display font-bold text-ivory group-hover:text-signal transition-colors leading-snug">{fm.client || fm.title}</h3>
                    {fm.excerpt && <p className="mt-2 text-sm text-aluminium line-clamp-2">{fm.excerpt}</p>}
                  </Link>
                </AnimateOnScroll>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ═══ 3. TROIS PILIERS ═══ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-12">
            <Kicker number="02">Ce qu&apos;on fait</Kicker>
            <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Trois leviers, un seul interlocuteur.</h2>
            <p className="mt-5 text-lg text-aluminium">
              Le site, les images et le référencement travaillent ensemble. C&apos;est ce qui manque à la plupart des PME : pas un prestataire de plus, une communication cohérente.
            </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1c1c1c] border border-[#1c1c1c]">
            {PILIERS.map((p) => (
              <Link key={p.href} href={p.href} {...{ "data-rybbit-event": "cta_click", "data-rybbit-prop-cta": p.cta, "data-rybbit-prop-location": "home-piliers" }} className="group bg-[#0a0a0a] p-8 lg:p-10 transition-colors hover:bg-[#141414]">
                <div className="flex h-12 w-12 items-center justify-center bg-signal/15 text-signal group-hover:bg-signal group-hover:text-white transition-colors">
                  <LucideIcon name={p.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-display font-bold uppercase tracking-tight text-ivory group-hover:text-signal transition-colors">{p.title}</h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">{p.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-signal">
                  {p.cta} <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-aluminium hover:text-signal transition-colors">
              Tous nos services, dont refonte, automatisation et pilotage communication <LucideIcon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ═══ 4. PHOTO & VIDÉO ═══ */}
      <PortfolioGallery
        badge="Photo & vidéo"
        title="Ce qu'on filme et photographie"
        subtitle="Reportages, événements, lieux, portraits, drone : de vraies images de vraies entreprises. Un studio photo et vidéo intégré, pas une banque d'images."
        limit={6}
        showFilters={false}
        eagerCount={0}
      />
      <div className="bg-[#0a0a0a] pb-20 -mt-8 text-center">
        <Button href="/services/photographe-entreprise-dijon" variant="outline" size="md" track={{ event: "cta_click", props: { cta: "photo", location: "home-portfolio" } }}>Voir le portfolio photo</Button>
        <Button href="/services/video-entreprise-dijon" variant="ghost" size="md" className="ml-3" track={{ event: "cta_click", props: { cta: "video", location: "home-portfolio" } }}>Vidéo & drone</Button>
      </div>

      {/* ═══ 5. OFFRES À PRIX FIXE ═══ */}
      <OffresFixesSection />

      {/* ═══ 6. TÉMOIGNAGES ═══ */}
      <TestimonialsWall reviews={temoignages} />

      {/* ═══ 7. ÉQUIPE (compact) ═══ */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a] border-y border-[#1c1c1c]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimateOnScroll className="lg:col-span-5">
              <Kicker number="03">L&apos;équipe</Kicker>
              <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Vous parlez à ceux qui font le travail.</h2>
              <p className="mt-5 text-lg text-aluminium leading-relaxed">
                Deux associés, un studio à Longvic aux portes de Dijon. Pas de commercial, pas de sous-traitance : la personne qui vous répond est celle qui conçoit votre site ou tient l&apos;appareil photo.
              </p>
              <div className="mt-8">
                <Button href="/a-propos" variant="outline" size="md">Découvrir l&apos;équipe</Button>
              </div>
            </AnimateOnScroll>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
              {TEAM.map((m, i) => (
                <AnimateOnScroll key={m.name} delay={0.08 * i}>
                  <div className="relative aspect-[4/5] overflow-hidden border border-[#1c1c1c] bg-[#141414]">
                    <Image src={m.photo} alt={m.name} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover object-top" loading="lazy" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 pt-16">
                      <p className="font-display text-lg font-bold text-ivory">{m.name}</p>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-signal">{m.role}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══ 8. OUTILS GRATUITS ═══ */}
      <section className="py-20 lg:py-28 bg-[#0f0f0f]">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-12">
            <Kicker number="04">Outils gratuits</Kicker>
            <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Pas encore prêt ? Testez d&apos;abord.</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1c] border border-[#1c1c1c]">
            {TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href} className="group bg-[#0a0a0a] p-7 lg:p-8 transition-colors hover:bg-[#141414]">
                <div className="flex h-12 w-12 items-center justify-center bg-signal/15 text-signal mb-6 group-hover:bg-signal group-hover:text-white transition-colors">
                  <LucideIcon name={tool.icon} className="h-5 w-5" />
                </div>
                <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-aluminium">{tool.tag}</span>
                <h3 className="mt-2 text-lg font-display font-bold text-ivory uppercase tracking-tight group-hover:text-signal transition-colors">{tool.title}</h3>
                <p className="mt-2 text-sm text-aluminium leading-relaxed">{tool.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-signal font-bold text-xs uppercase tracking-widest">
                  {tool.cta} <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 9. CTA FINAL ═══ */}
      <section className="relative overflow-hidden bg-signal py-24 lg:py-36">
        <Container className="relative">
          <div className="max-w-4xl">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-white/70">— Parlons-en</span>
              <h2 className="text-impact mt-6 text-5xl lg:text-8xl text-white">On regarde votre situation ensemble ?</h2>
              <p className="mt-8 text-xl text-white/85 max-w-2xl">
                Un premier échange de 20 minutes, gratuit et sans engagement. On vous dit ce qui a du sens pour votre budget, même si ce n&apos;est pas avec nous.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/devis" size="lg" track={{ event: "cta_click", props: { cta: "devis", location: "home-final" } }} className="bg-noir text-ivory hover:bg-[#1c1c1c] transition-colors">
                  Parlons de votre projet
                </Button>
                <WhatsAppLink location="home-final" label="Écrire sur WhatsApp" className="h-14 px-9 rounded-none text-sm uppercase tracking-widest" />
              </div>
            </AnimateOnScroll>
          </div>
          <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-white/10 leading-none pointer-events-none select-none uppercase tracking-tighter">Globe</div>
        </Container>
      </section>
    </>
  )
}

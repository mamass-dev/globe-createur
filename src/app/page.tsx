import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Kicker } from "@/components/ui/kicker"
import { Marquee } from "@/components/ui/marquee"
import { ServiceGrid } from "@/components/sections/service-grid"
import { CityCrosslinks } from "@/components/sections/city-crosslinks"
import { services } from "@/lib/data/services"
import { secteurs } from "@/lib/data/secteurs"
import { logos } from "@/lib/data/logos"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { VideoHero } from "@/components/sections/video-hero"
import { GoogleReviewsBadge } from "@/components/sections/google-reviews-badge"
import { temoignages, googleReviews } from "@/lib/data/temoignages"
import { TestimonialsWall } from "@/components/sections/testimonials-wall"
import { Team } from "@/components/sections/team"
import { AnimateOnScroll } from "@/components/ui/animate"
import { AggregateRatingSchema } from "@/components/seo/schemas"
import { getBlogPosts, getProjetPages } from "@/lib/content"
import { EasterEgg } from "@/components/ui/easter-egg"

// Lazy load non-critical components
const LogoMarquee = dynamic(() => import("@/components/sections/logo-marquee").then(mod => mod.LogoMarquee), {
  ssr: true,
})
const Stats = dynamic(() => import("@/components/sections/stats").then(mod => mod.Stats), {
  ssr: true,
})

export const revalidate = 3600

const TOOLS = [
  { href: "/audit-digital", icon: "Target", tag: "2 min · 9 questions", title: "Audit Digital", desc: "Votre score sur 100 et les actions prioritaires pour votre PME.", cta: "Tester mon score" },
  { href: "/calculateur-roi", icon: "TrendingUp", tag: "Résultats instantanés", title: "Calculateur ROI", desc: "Le chiffre d'affaires perdu chaque mois faute de visibilité Google.", cta: "Calculer mon manque à gagner" },
  { href: "/analyseur-seo", icon: "Search", tag: "Analyse instantanée", title: "Analyseur SEO", desc: "Un audit SEO complet de votre URL : balises, technique, performance.", cta: "Analyser mon site" },
  { href: "/generateur-signature-email", icon: "Mail", tag: "5 templates pro", title: "Signature Email", desc: "Une signature pro avec preview multi-client et tracking UTM.", cta: "Créer ma signature" },
]

export default function HomePage() {
  const projets = getProjetPages().slice(0, 3)
  const posts = getBlogPosts().slice(0, 3)

  return (
    <>
      <EasterEgg />
      <AggregateRatingSchema ratingValue={5} reviewCount={10} />

      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden bg-[#0a0a0a] pt-32 pb-12 lg:pt-44 lg:pb-16">
        <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden="true" />
        <Container className="relative">
          <div className="max-w-5xl">
            <AnimateOnScroll>
              <Kicker number="01">Studio créatif — Dijon · est. 2025</Kicker>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.08}>
              <h1 className="text-impact mt-8 text-[3.25rem] leading-[0.9] sm:text-7xl lg:text-[8rem] text-ivory">
                Propulsez votre
                <br />
                <span className="text-signal">croissance digitale.</span>
              </h1>
            </AnimateOnScroll>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <AnimateOnScroll delay={0.16} className="lg:col-span-7">
              <p className="text-lg lg:text-xl text-aluminium leading-relaxed max-w-xl">
                Stratégies digitales haute performance, sites web qui convertissent et automatisations qui vous font gagner du temps.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/devis" size="lg">Démarrer un projet</Button>
                <Button href="/projets" variant="outline" size="lg">Voir nos réalisations</Button>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.24} className="lg:col-span-5 lg:justify-self-end">
              <GoogleReviewsBadge reviews={googleReviews} />
            </AnimateOnScroll>
          </div>

          {/* Video */}
          <AnimateOnScroll delay={0.2} className="relative mt-16 lg:mt-24">
            <div className="absolute -inset-x-10 -bottom-10 h-40 bg-signal/10 blur-3xl pointer-events-none" />
            <div className="relative border border-[#1c1c1c] bg-[#0f0f0f] p-2">
              <VideoHero videoId="56KVxVaWeEw" poster="/images/video-cover.webp" />
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ═══ MARQUEE mots-clés ═══ */}
      <div className="border-y border-[#1c1c1c] bg-[#0a0a0a] py-6">
        <Marquee
          items={["DESIGN", "PHOTO", "VIDÉO", "WEB", "BRANDING", "SEO", "STRATÉGIE", "CONTENU"]}
          speed={32}
          className="text-impact text-3xl lg:text-5xl text-ivory"
        />
      </div>

      {/* ═══ LOGOS ═══ */}
      <LogoMarquee logos={logos} title="Ils nous font confiance" />

      {/* ═══ 2. EXPERTISES ═══ */}
      <ServiceGrid
        services={services}
        title="Des solutions conçues pour la performance"
        subtitle="Une approche holistique du digital pour couvrir tous vos besoins de croissance."
        badge="02 — Expertises"
      />

      {/* ═══ 3. MÉTHODOLOGIE ═══ */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimateOnScroll className="order-2 lg:order-1 relative">
              <div className="relative aspect-square overflow-hidden border border-[#1c1c1c]">
                <Image
                  src="/images/collaboration.webp"
                  alt="L'équipe Globe Créateur en shooting photo sur le terrain"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-px -right-px bg-signal p-6 max-w-xs">
                <p className="font-display font-bold uppercase text-white text-sm tracking-wide">Optimisation ROI</p>
                <p className="mt-2 text-xs text-white/80 leading-relaxed">Chaque action analysée pour garantir un retour sur investissement maximal.</p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1} className="order-1 lg:order-2">
              <Kicker number="03">Méthodologie</Kicker>
              <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">
                Plus qu'une agence,<br />un partenaire.
              </h2>
              <div className="mt-10 space-y-px">
                {[
                  { t: "Transparence totale", d: "Des rapports clairs et un suivi direct de vos indicateurs de performance." },
                  { t: "Expertise multi-canal", d: "Web, SEO, contenu et no-code réunis pour une vision 360°." },
                  { t: "Accompagnement de proximité", d: "Basés à Dijon, nous sommes à vos côtés sur le terrain." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 border-t border-[#1c1c1c] py-6">
                    <span className="font-mono-accent text-signal text-sm shrink-0 pt-1">0{i + 1}</span>
                    <div>
                      <h3 className="font-display font-bold text-ivory uppercase tracking-wide">{item.t}</h3>
                      <p className="text-aluminium text-sm mt-2 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button href="/a-propos" variant="secondary" size="md">Découvrir notre manifeste</Button>
              </div>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ═══ 4. TEAM ═══ */}
      <Team />

      {/* ═══ STATS ═══ */}
      <Stats
        stats={[
          { value: 110, suffix: "+", label: "Projets Réalisés" },
          { value: 30, suffix: "+", label: "PME Accompagnées" },
          { value: 97, suffix: "%", label: "Clients Satisfaits" },
          { value: 350, suffix: "+", label: "Shooting Photos" },
        ]}
      />

      {/* ═══ TÉMOIGNAGES ═══ */}
      <TestimonialsWall reviews={temoignages} />

      {/* ═══ 5. OUTILS GRATUITS ═══ */}
      <section className="py-24 lg:py-32 bg-[#0f0f0f]">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-16 lg:mb-20">
            <Kicker number="05">Outils gratuits</Kicker>
            <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">
              Testez avant de vous lancer.
            </h2>
            <p className="mt-5 text-lg text-aluminium">
              Quatre outils gratuits pour évaluer votre situation et mesurer le potentiel de votre présence digitale.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1c1c1c] border border-[#1c1c1c]">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative bg-[#0a0a0a] p-8 lg:p-10 transition-colors duration-300 hover:bg-[#141414]"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-none bg-signal/15 text-signal mb-8 group-hover:bg-signal group-hover:text-white transition-colors">
                  <LucideIcon name={tool.icon} className="h-6 w-6" />
                </div>
                <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-aluminium">{tool.tag}</span>
                <h3 className="mt-3 text-xl font-display font-bold text-ivory uppercase tracking-tight group-hover:text-signal transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm text-aluminium leading-relaxed">{tool.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-signal font-bold text-xs uppercase tracking-widest">
                  {tool.cta}
                  <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ 6. SECTEURS ═══ */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a]">
        <Container>
          <AnimateOnScroll className="max-w-3xl mb-16">
            <Kicker number="06">Secteurs accompagnés</Kicker>
            <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Nous parlons votre métier.</h2>
            <p className="mt-5 text-lg text-aluminium">
              Des sites et des stratégies pensés pour les spécificités de votre secteur d&apos;activité.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1c1c1c] border border-[#1c1c1c]">
            {secteurs.map((s) => (
              <Link
                key={s.slug}
                href={`/secteurs/${s.slug}`}
                className="group flex items-center gap-3 bg-[#0a0a0a] p-5 transition-colors hover:bg-[#141414]"
              >
                <div className="h-10 w-10 rounded-none bg-signal/15 text-signal flex items-center justify-center shrink-0 group-hover:bg-signal group-hover:text-white transition-colors">
                  <LucideIcon name={s.icon} className="h-5 w-5" />
                </div>
                <span className="font-semibold text-ivory text-sm group-hover:text-signal transition-colors">
                  {s.title.replace(/^Sites? (internet|e-commerce) pour /i, "").replace(/^le bien-être et la santé/i, "Bien-être & santé")}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/secteurs" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-signal hover:gap-4 transition-all">
              Voir tous les secteurs <LucideIcon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ═══ 7. RÉALISATIONS ═══ */}
      <section className="py-24 lg:py-32 bg-[#0f0f0f]">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
            <AnimateOnScroll className="max-w-2xl">
              <Kicker number="07">Réalisations</Kicker>
              <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Nos derniers projets</h2>
            </AnimateOnScroll>
            <Link href="/projets" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-signal hover:gap-4 transition-all shrink-0">
              Tous nos projets <LucideIcon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projets.map((projet) => {
              const fm = projet.frontmatter as Record<string, string>
              return (
                <AnimateOnScroll key={projet.slug}>
                  <Link href={`/projets/${projet.slug}`} className="group block">
                    {fm.image && (
                      <div className="relative aspect-[4/3] overflow-hidden border border-[#1c1c1c] mb-5 bg-[#141414]">
                        <Image
                          src={fm.image}
                          alt={fm.imageAlt || fm.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {fm.category && (
                      <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-signal">{fm.category}</span>
                    )}
                    <h3 className="mt-2 text-xl font-display font-bold text-ivory group-hover:text-signal transition-colors leading-snug">
                      {fm.title}
                    </h3>
                    {fm.excerpt && <p className="mt-2 text-sm text-aluminium line-clamp-2">{fm.excerpt}</p>}
                  </Link>
                </AnimateOnScroll>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ═══ 8. BLOG ═══ */}
      <section className="py-24 lg:py-32 bg-[#0a0a0a]">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
            <AnimateOnScroll>
              <Kicker number="08">Journal</Kicker>
              <h2 className="text-impact mt-6 text-4xl lg:text-6xl text-ivory">Derniers articles</h2>
            </AnimateOnScroll>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-signal hover:gap-4 transition-all shrink-0">
              Tous les articles <LucideIcon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <AnimateOnScroll key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden border border-[#1c1c1c] mb-5">
                    <Image
                      src={post.frontmatter.image}
                      alt={post.frontmatter.imageAlt || post.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono-accent text-[11px] uppercase tracking-[0.2em] text-signal">
                    {new Date(post.frontmatter.publishedAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <h3 className="mt-2 text-xl font-display font-bold text-ivory group-hover:text-signal transition-colors leading-snug">
                    {post.frontmatter.title}
                  </h3>
                  <p className="mt-2 text-sm text-aluminium line-clamp-2">{post.frontmatter.metaDescription}</p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══ ZONES ═══ */}
      <CityCrosslinks
        title="Notre périmètre d'intervention"
        subtitle="Studio basé à Dijon, on intervient partout en Bourgogne-Franche-Comté et en Auvergne-Rhône-Alpes."
      />

      {/* ═══ 9. CTA ═══ */}
      <section className="relative overflow-hidden bg-signal py-28 lg:py-40">
        <Container className="relative">
          <div className="max-w-4xl">
            <AnimateOnScroll>
              <span className="font-mono-accent text-xs font-bold uppercase tracking-[0.25em] text-white/70">— Parlons-en</span>
              <h2 className="text-impact mt-6 text-5xl lg:text-8xl text-white">
                Prêt à transformer votre vision en réalité ?
              </h2>
              <p className="mt-8 text-xl text-white/80 max-w-2xl">
                Discutons de vos objectifs lors d&apos;un premier échange gratuit de 20 minutes.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/devis" size="lg" className="bg-noir text-ivory hover:bg-[#1c1c1c] transition-colors">
                  Démarrer maintenant
                </Button>
                <Button href="/contact" size="lg" className="border border-white/40 text-white hover:bg-white hover:text-signal transition-colors">
                  Nous contacter
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
          <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[20vw] font-display font-bold text-white/10 leading-none pointer-events-none select-none uppercase tracking-tighter">
            Globe
          </div>
        </Container>
      </section>
    </>
  )
}

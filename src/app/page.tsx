import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/sections/hero"
import { ServiceGrid } from "@/components/sections/service-grid"
import { services } from "@/lib/data/services"
import { logos } from "@/lib/data/logos"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { VideoHero } from "@/components/sections/video-hero"
import { GoogleReviewsBadge } from "@/components/sections/google-reviews-badge"
import { temoignages, googleReviews } from "@/lib/data/temoignages"
import { TestimonialsWall } from "@/components/sections/testimonials-wall"
import { Team } from "@/components/sections/team"
import { AggregateRatingSchema } from "@/components/seo/schemas"

// Lazy load non-critical components
const LogoMarquee = dynamic(() => import("@/components/sections/logo-marquee").then(mod => mod.LogoMarquee), {
  ssr: true,
})
const Stats = dynamic(() => import("@/components/sections/stats").then(mod => mod.Stats), {
  ssr: true,
})

export default function HomePage() {
  return (
    <>
      <AggregateRatingSchema ratingValue={5} reviewCount={10} />

      {/* 1. HERO — Centred video layout */}
      <section className="relative pt-32 pb-12 lg:pt-44 lg:pb-20 mesh-gradient dark:bg-slate-950 overflow-hidden">
        <Container>
          {/* Text — centred */}
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              Studio Digital 2026
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Propulsez votre <br className="hidden sm:block" />
              <span className="text-gradient">croissance digitale.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Stratégies digitales haute performance, sites web qui convertissent et automatisations qui vous font gagner du temps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Button href="/devis" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-950">
                Démarrer un projet
              </Button>
              <Button href="/projets" className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-8 h-14 rounded-xl text-lg font-bold">
                Voir nos réalisations
              </Button>
            </div>
            <div className="flex justify-center pt-2">
              <GoogleReviewsBadge reviews={googleReviews} />
            </div>
          </div>

          {/* Video — central, full width with perspective */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative" style={{ perspective: "1200px" }}>
              <div className="transform-gpu" style={{ transform: "rotateX(2deg)" }}>
                <VideoHero videoId="56KVxVaWeEw" poster="/images/video-cover.webp" />
              </div>
            </div>
            {/* Glow effects */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-600/15 dark:bg-indigo-400/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -top-8 -left-16 h-32 w-32 bg-indigo-600/10 dark:bg-indigo-400/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -top-8 -right-16 h-32 w-32 bg-violet-600/10 dark:bg-violet-400/10 blur-3xl rounded-full pointer-events-none" />
          </div>
        </Container>
      </section>

      {/* 2. LOGO MARQUEE */}
      <LogoMarquee logos={logos} title="Ils nous font confiance" />

      {/* 3. CORE SERVICES - SaaS Grid */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <Container>
           <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Expertises</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">Des solutions conçues <br /> pour la performance.</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                 Une approche holistique du digital pour couvrir tous vos besoins de croissance.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                 <Link key={service.slug} href={`/services/${service.slug}`} className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       <LucideIcon name="CheckCircle2" className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                       {service.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                       {service.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                       En savoir plus <LucideIcon name="ArrowRight" className="h-4 w-4" />
                    </div>
                 </Link>
              ))}
           </div>
        </Container>
      </section>

      {/* 4. IMAGE + CONTENT - SaaS Layout */}
      <section className="py-24 dark:bg-slate-950">
        <Container>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 aspect-square relative">
                    <Image
                       src="/images/collaboration.webp"
                       alt="L'équipe Globe Créateur en shooting photo sur le terrain"
                       fill
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       className="object-cover"
                       loading="lazy"
                    />
                 </div>
                 <div className="absolute -bottom-8 -right-8 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-xs animate-float">
                    <div className="flex items-center gap-4 mb-3">
                       <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <LucideIcon name="CheckCircle2" className="h-6 w-6" />
                       </div>
                       <p className="font-bold text-slate-900 dark:text-white text-sm">Optimisation ROI</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Nous analysons chaque action pour garantir un retour sur investissement maximal.</p>
                 </div>
              </div>

              <div className="order-1 lg:order-2 space-y-8">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Méthodologie</h2>
                 <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    Plus qu'une agence, <br /> un partenaire de confiance.
                 </h3>
                 <div className="space-y-6">
                    {[
                       { t: "Transparence Totale", d: "Des rapports clairs et un suivi direct de vos indicateurs de performance." },
                       { t: "Expertise Multi-Canal", d: "Web, SEO, Contenu et No-code réunis pour une vision 360°." },
                       { t: "Accompagnement de Proximité", d: "Basés à Dijon, nous sommes à vos côtés sur le terrain." }
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <LucideIcon name="CheckCircle2" className="h-6 w-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          <div>
                             <h4 className="font-bold text-slate-900 dark:text-white">{item.t}</h4>
                             <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{item.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="pt-4">
                    <Button href="/a-propos" className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-8 h-12 rounded-xl font-bold transition-all">
                       Découvrir notre manifeste
                    </Button>
                 </div>
              </div>
           </div>
        </Container>
      </section>

      {/* 5. TEAM */}
      <Team />

      {/* 6. STATS - SaaS Impact */}
      <Stats
        stats={[
          { value: 110, suffix: "+", label: "Projets Réalisés" },
          { value: 30, suffix: "+", label: "PME Accompagnées" },
          { value: 97, suffix: "%", label: "Clients Satisfaits" },
          { value: 350, suffix: "+", label: "Shooting Photos" }
        ]}
      />

      {/* 6. TESTIMONIALS WALL */}
      <TestimonialsWall reviews={temoignages} />

      {/* 7. FREE TOOLS — Lead magnets */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Outils gratuits
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
              Testez avant de <span className="text-gradient">vous lancer.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Trois outils gratuits pour évaluer votre situation et mesurer le potentiel de votre présence digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Audit Digital */}
            <Link
              href="/audit-digital"
              className="group relative p-8 lg:p-10 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-950/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <LucideIcon name="Target" className="h-7 w-7" />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  2 min &middot; 9 questions
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Audit Digital Gratuit
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Obtenez votre score sur 100 et découvrez vos forces, faiblesses et les actions prioritaires pour votre PME.
                </p>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                  Tester mon score
                  <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Calculateur ROI */}
            <Link
              href="/calculateur-roi"
              className="group relative p-8 lg:p-10 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 dark:bg-red-950/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <LucideIcon name="TrendingUp" className="h-7 w-7" />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  Résultats instantanés
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
                  Calculateur ROI
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Estimez le chiffre d&apos;affaires que vous perdez chaque mois en n&apos;étant pas visible sur Google.
                </p>
                <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-bold text-sm">
                  Calculer mon manque à gagner
                  <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>

            {/* Analyseur SEO */}
            <Link
              href="/analyseur-seo"
              className="group relative p-8 lg:p-10 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 dark:bg-green-950/50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <LucideIcon name="Search" className="h-7 w-7" />
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                  Analyse instantanée
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Analyseur SEO
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Entrez votre URL et obtenez un audit SEO complet : balises, technique, réseaux sociaux et performance.
                </p>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
                  Analyser mon site
                  <LucideIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* 8. CTA - SaaS Conversion */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <Container className="text-center">
           <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
                 Prêt à transformer votre <br /> <span className="text-indigo-600 dark:text-indigo-400 italic">vision</span> en réalité ?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                 Discutons de vos objectifs lors d'un premier échange gratuit de 20 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Button href="/devis" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-100 dark:shadow-indigo-950 transition-all">
                    Démarrer maintenant
                 </Button>
                 <Button href="/contact" className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-12 h-16 rounded-2xl text-xl font-bold">
                    Nous contacter
                 </Button>
              </div>
           </div>
        </Container>
      </section>
    </>
  )
}

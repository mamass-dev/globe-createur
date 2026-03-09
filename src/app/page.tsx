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
      {/* 1. SAAS HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 mesh-gradient overflow-hidden">
        <Container>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                    Studio Digital 2026
                 </div>
                 <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    Propulsez votre <br />
                    <span className="text-gradient">croissance digitale.</span>
                 </h1>
                 <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    Nous concevons des stratégies digitales haute performance, des sites web qui convertissent et des automatisations qui vous font gagner du temps.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <Button href="/devis" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200">
                       D&eacute;marrer un projet
                    </Button>
                    <Button href="/projets" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 h-14 rounded-xl text-lg font-bold">
                       Voir nos r&eacute;alisations
                    </Button>
                 </div>
                 <div className="flex items-center gap-6 pt-4">
                    <div className="flex -space-x-3">
                       {[1,2,3,4].map(i => (
                          <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                             <Image src={`/images/user-1.webp`} alt="Client accompagné par Globe Créateur" fill sizes="40px" className="object-cover" />
                          </div>
                       ))}
                    </div>
                    <p className="text-sm font-medium text-slate-500">
                       Plus de <span className="text-slate-900 font-bold">30 PME</span> nous font confiance.
                    </p>
                 </div>
              </div>
              
              <div className="relative">
                 <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-100 border border-slate-100 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/3]">
                    <Image 
                       src="/images/team.webp" 
                       alt="L'équipe Globe Créateur en discussion backstage lors d'un événement" 
                       fill
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       className="object-cover"
                       priority
                    />
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-indigo-600/10 blur-3xl rounded-full" />
                 <div className="absolute -top-10 -right-10 h-32 w-32 bg-violet-600/10 blur-3xl rounded-full" />
              </div>
           </div>
        </Container>
      </section>

      {/* 2. LOGO MARQUEE - SaaS Style (Subtle) */}
      <LogoMarquee logos={logos} title="Ils nous font confiance" />

      {/* 3. CORE SERVICES - SaaS Grid */}
      <section className="py-24 bg-slate-50">
        <Container>
           <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">Expertises</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900">Des solutions con&ccedil;ues <br /> pour la performance.</h3>
              <p className="text-lg text-slate-600">
                 Une approche holistique du digital pour couvrir tous vos besoins de croissance.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                 <Link key={service.slug} href={`/services/${service.slug}`} className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       {/* Icon placeholder or icon mapping */}
                       <LucideIcon name="CheckCircle2" className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                       {service.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed mb-6">
                       {service.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                       En savoir plus <LucideIcon name="ArrowRight" className="h-4 w-4" />
                    </div>
                 </Link>
              ))}
           </div>
        </Container>
      </section>

      {/* 4. IMAGE + CONTENT - SaaS Layout */}
      <section className="py-24">
        <Container>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                 <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 aspect-square relative">
                    <Image 
                       src="/images/collaboration.webp"
                       alt="L'équipe Globe Créateur en shooting photo sur le terrain" 
                       fill
                       sizes="(max-width: 1024px) 100vw, 50vw"
                       className="object-cover"
                       loading="lazy"
                    />
                 </div>
                 <div className="absolute -bottom-8 -right-8 p-6 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-xs animate-float">
                    <div className="flex items-center gap-4 mb-3">
                       <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <LucideIcon name="CheckCircle2" className="h-6 w-6" />
                       </div>
                       <p className="font-bold text-slate-900 text-sm">Optimisation ROI</p>
                    </div>
                    <p className="text-xs text-slate-500">Nous analysons chaque action pour garantir un retour sur investissement maximal.</p>
                 </div>
              </div>
              
              <div className="order-1 lg:order-2 space-y-8">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">M&eacute;thodologie</h2>
                 <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                    Plus qu'une agence, <br /> un partenaire de confiance.
                 </h3>
                 <div className="space-y-6">
                    {[
                       { t: "Transparence Totale", d: "Des rapports clairs et un suivi direct de vos indicateurs de performance." },
                       { t: "Expertise Multi-Canal", d: "Web, SEO, Contenu et No-code réunis pour une vision 360&deg;." },
                       { t: "Accompagnement de Proximit&eacute;", d: "Bas&eacute;s &agrave; Dijon, nous sommes &agrave; vos c&ocirc;t&eacute;s sur le terrain." }
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4">
                          <LucideIcon name="CheckCircle2" className="h-6 w-6 text-indigo-600 shrink-0" />
                          <div>
                             <h4 className="font-bold text-slate-900">{item.t}</h4>
                             <p className="text-slate-500 text-sm mt-1">{item.d}</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="pt-4">
                    <Button href="/a-propos" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12 rounded-xl font-bold transition-all">
                       D&eacute;couvrir notre manifeste
                    </Button>
                 </div>
              </div>
           </div>
        </Container>
      </section>

      {/* 5. STATS - SaaS Impact */}
      <Stats 
        stats={[
          { value: 110, suffix: "+", label: "Projets R&eacute;alis&eacute;s" },
          { value: 30, suffix: "+", label: "PME Accompagn&eacute;es" },
          { value: 97, suffix: "%", label: "Clients Satisfaits" },
          { value: 350, suffix: "+", label: "Shooting Photos" }
        ]}
      />

      {/* 6. CTA - SaaS Conversion */}
      <section className="py-32 bg-white">
        <Container className="text-center">
           <div className="max-w-4xl mx-auto space-y-10">
              <h2 className="text-4xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
                 Pr&ecirc;t &agrave; transformer votre <br /> <span className="text-indigo-600 italic">vision</span> en r&eacute;alit&eacute; ?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                 Discutons de vos objectifs lors d'un premier &eacute;change gratuit de 20 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                 <Button href="/devis" className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-indigo-100 transition-all">
                    D&eacute;marrer maintenant
                 </Button>
                 <Button href="/contact" className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-12 h-16 rounded-2xl text-xl font-bold">
                    Nous contacter
                 </Button>
              </div>
           </div>
        </Container>
      </section>
    </>
  )
}

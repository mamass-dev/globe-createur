import type { Metadata } from "next"
import { CLRHero } from "@/components/cl-racing/hero"
import { CLRMarquee } from "@/components/cl-racing/marquee"
import { CLRFormules } from "@/components/cl-racing/formules"
import { CLRCalendrier } from "@/components/cl-racing/calendrier"
import { CLRGallery } from "@/components/cl-racing/gallery"
import { CLRFaq } from "@/components/cl-racing/faq"
import { CLRReservationForm } from "@/components/cl-racing/reservation-form"

export const metadata: Metadata = {
  title: "Globe Créateur × CL RACING — Photographe officiel · Circuit de Vaison",
  description:
    "Réservez vos photos et vidéos de roulage sur le circuit de Vaison-la-Romaine — week-end de Pentecôte 24-25 mai 2026. Pack photo illimité 50€, pack vidéo 140€, combo −28€. Photographe officiel CL RACING.",
  alternates: { canonical: "/cl-racing" },
  openGraph: {
    title: "Globe Créateur × CL RACING — Photographe officiel circuit de Vaison",
    description:
      "Capturez vos plus belles trajectoires sur le circuit de Vaison-la-Romaine. Réservation en ligne, livraison digitale, galerie privée.",
    type: "website",
    url: "/cl-racing",
    locale: "fr_FR",
    images: [{ url: "/cl-racing/3143.webp", width: 1600, height: 901 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Globe Créateur × CL RACING — Photographe officiel circuit de Vaison",
    images: ["/cl-racing/3143.webp"],
  },
}

export default function CLRacingPage() {
  return (
    <>
      <CLRHero />
      <CLRMarquee />
      <CLRFormules />
      <CLRCalendrier />
      <CLRGallery />
      <CLRFaq />

      <section
        id="reservation"
        className="relative py-24 md:py-32 bg-white dark:bg-slate-950 scroll-mt-24"
      >
        <div className="absolute inset-0 mesh-gradient pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-5">
          <div className="text-center mb-12 md:mb-14">
            <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px]">
              <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
              Réservation · Sans paiement en ligne
              <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-4 leading-[1.05] text-slate-900 dark:text-white uppercase">
              Je réserve ma
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
                prise de vue
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-6 max-w-xl mx-auto leading-relaxed">
              5 champs, 30 secondes. On vous rappelle sous 24h pour confirmer.
            </p>
          </div>
          <CLRReservationForm />
        </div>
      </section>
    </>
  )
}

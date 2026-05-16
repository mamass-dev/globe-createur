import Image from "next/image"
import { HERO_PHOTO } from "@/lib/cl-racing"

export function CLRHero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 lg:pb-24 overflow-hidden mesh-gradient">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px] mb-6">
              <span className="h-px w-10 bg-indigo-600 dark:bg-indigo-400" />
              Globe Créateur × CL Racing · Officiel
            </span>

            <h1 className="font-black leading-[0.95] tracking-tighter uppercase text-slate-900 dark:text-white">
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                Vos plus belles
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 mt-1 break-words">
                trajectoires
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-1">
                capturées.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mt-8 max-w-xl">
              Réservez votre prise de vue sur le prochain roulage du circuit de Vaison-la-Romaine.
              Photos illimitées, vidéo dédiée, livraison digitale.
            </p>

            <div className="mt-10 max-w-md">
              <a
                href="#reservation"
                className="group w-full inline-flex flex-col items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-5 rounded-2xl text-lg sm:text-xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all"
              >
                <span className="inline-flex items-center gap-3">
                  <span aria-hidden>📸</span>
                  Je réserve ma session
                  <span
                    aria-hidden
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-normal normal-case text-white/85">
                  30 secondes · sans paiement · rappel sous 24h
                </span>
              </a>
              <a
                href="#galerie"
                className="mt-4 block text-center text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors text-xs uppercase tracking-widest"
              >
                Voir la galerie ↓
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-200/40 dark:shadow-indigo-950/40">
              <Image
                src={HERO_PHOTO.src}
                alt={HERO_PHOTO.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-white/50 dark:border-slate-800/50">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                  Pentecôte · 24-25 mai 2026
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/80 font-bold mb-1">
                    Circuit de Vaison · 2026
                  </div>
                  <div className="text-white font-black tracking-tight text-lg leading-tight">
                    Globe Créateur × CL Racing
                  </div>
                </div>
                <a
                  href="#reservation"
                  className="shrink-0 inline-flex items-center justify-center h-10 px-4 rounded-full bg-white text-slate-900 hover:bg-indigo-500 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all"
                >
                  Réserver
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 md:gap-12 max-w-3xl">
          <Stat value="∞" label="Photos / session" />
          <Stat value="4" label="Créneaux vidéo / jour" />
          <Stat value="5–7j" label="Délai de livraison" />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
        {value}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-3 font-semibold leading-snug">
        {label}
      </div>
    </div>
  )
}

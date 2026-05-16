import { FORMULES } from "@/lib/cl-racing"

export function CLRFormules() {
  return (
    <section id="formules" className="relative py-24 md:py-32 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead
          kicker="Tarifs simples · sans surprise"
          title="Choisissez votre formule"
          subtitle="Réservez en ligne sans paiement. Le règlement se fait sur place le jour du roulage ou à la livraison de vos médias."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {FORMULES.map((f, i) => (
            <article
              key={f.id}
              className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 md:p-10 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-indigo-950/50 hover:-translate-y-1 transition-all duration-300"
            >
              {f.highlight && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950">
                  ★ {f.highlight}
                </span>
              )}

              <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                Formule {String(i + 1).padStart(2, "0")}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                    {f.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {f.tagline}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 flex sm:block items-baseline gap-2">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
                    {f.price}€
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:mt-2 font-semibold">
                    {f.unit}
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-7 text-[15px]">
                {f.description}
              </p>

              <ul className="mt-8 space-y-3.5">
                {f.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {f.notes && (
                <p className="mt-7 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                  {f.notes}
                </p>
              )}

              <a
                href="#reservation"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
              >
                Réserver {f.name.toLowerCase()}
                <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 relative overflow-hidden rounded-3xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-violet-950/30 p-6 md:p-10">
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-950">
                ⚡ Offre combo · −28€
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 dark:text-white mt-3 leading-tight">
                Pack Photo + Vidéo
              </h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-md">
                Prenez les deux formules sur la même journée et profitez de{" "}
                <strong className="text-slate-900 dark:text-white">−20% sur la vidéo</strong>.
                Couverture complète : photos illimitées + 1 session filmée.
              </p>
            </div>

            <div className="flex items-center gap-6 md:flex-col md:items-end shrink-0">
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-base text-slate-400 line-through font-semibold">190€</span>
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400 leading-none">
                    162€
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mt-2">
                  par pilote / journée
                </div>
              </div>
              <a
                href="#reservation"
                className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Choisir le combo
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionHead({
  kicker,
  title,
  subtitle,
}: {
  kicker: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="max-w-3xl">
      <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px]">
        <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
        {kicker}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-4 leading-[1.05] text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-5 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

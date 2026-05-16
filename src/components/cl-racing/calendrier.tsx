import { ROULAGES, statusLabel } from "@/lib/cl-racing"

const STATUS_CLASSES: Record<string, string> = {
  open: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  limited: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  soon: "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  full: "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
}

export function CLRCalendrier() {
  return (
    <section
      id="calendrier"
      className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px]">
              <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
              Week-end de Pentecôte · 24-25 mai 2026
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-4 leading-[1.05] text-slate-900 dark:text-white">
              Les prochains roulages
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-5 leading-relaxed">
              Premier roulage de la saison sur le circuit de Vaison-la-Romaine, en partenariat
              avec CL RACING. Réservez votre prise de vue sur l'une (ou les deux) des journées.
            </p>
          </div>
          <a
            href="#reservation"
            className="shrink-0 self-start md:self-end inline-flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
          >
            Réserver une date
          </a>
        </div>

        <div className="mt-12 grid gap-4">
          {ROULAGES.map((r) => (
            <article
              key={r.id}
              className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-5 md:gap-6 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-50 dark:hover:shadow-indigo-950/30 transition-all"
            >
              <div className="flex items-center gap-5 md:w-72 shrink-0">
                <div className="text-center bg-slate-50 dark:bg-slate-900 rounded-2xl px-3 py-3 min-w-[72px]">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                    {r.weekday}
                  </div>
                  <div className="text-3xl md:text-4xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400 leading-none mt-0.5">
                    {r.day}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                    {r.month}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white leading-snug">
                    {r.type}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Circuit de Vaison-la-Romaine
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-6 flex-1">
                <span
                  className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${STATUS_CLASSES[r.status]}`}
                >
                  {statusLabel(r.status)}
                </span>
                {typeof r.videoSlotsLeft === "number" && (
                  <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <span className="font-black text-lg text-slate-900 dark:text-white">
                      {r.videoSlotsLeft}
                    </span>
                    créneau{r.videoSlotsLeft > 1 ? "x" : ""} vidéo restant
                    {r.videoSlotsLeft > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {r.status === "soon" || r.status === "full" ? (
                <span className="shrink-0 text-sm font-bold text-slate-400 dark:text-slate-500 px-4 py-2.5 self-start md:self-auto">
                  {r.status === "soon" ? "Bientôt ouvert" : "Complet"}
                </span>
              ) : (
                <a
                  href="#reservation"
                  className="shrink-0 self-start md:self-auto inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Réserver
                  <span aria-hidden>→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

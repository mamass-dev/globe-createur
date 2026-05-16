import { FAQ_ITEMS } from "@/lib/cl-racing"

export function CLRFaq() {
  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800"
    >
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <span className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black tracking-widest uppercase text-[11px]">
            <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
            FAQ
            <span className="h-px w-8 bg-indigo-600 dark:bg-indigo-400" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mt-4 leading-[1.05] text-slate-900 dark:text-white">
            Ça va vous parler
          </h2>
        </div>

        <div className="mt-14 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 md:p-6 cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
            >
              <summary className="flex items-start justify-between gap-6 list-none">
                <span className="font-bold text-slate-900 dark:text-white text-base md:text-lg leading-snug">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-open:rotate-45 text-lg font-light"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

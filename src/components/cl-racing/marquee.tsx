export function CLRMarquee() {
  const items = [
    "CIRCUIT DE VAISON",
    "PARTENAIRE OFFICIEL CL RACING",
    "PENTECÔTE · 24-25 MAI 2026",
    "PHOTOS ILLIMITÉES — 50€",
    "VIDÉO DÉDIÉE — 140€",
    "PACK COMBO −28€",
    "LIVRAISON DIGITALE",
  ]
  const loop = [...items, ...items]
  return (
    <div className="relative bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-6">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-black text-xl md:text-3xl tracking-tight text-slate-900 dark:text-white mx-6 md:mx-8 flex items-center gap-6 md:gap-8 uppercase shrink-0"
          >
            {item}
            <span className="text-indigo-500 dark:text-indigo-400 text-xl">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}

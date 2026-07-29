"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

/**
 * Barre CTA persistante mobile pour les landing pages à fort trafic payant.
 * Apparaît après un premier scroll pour ne pas cannibaliser le hero.
 */
export function StickyCta({ city }: { city?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-2 shadow-2xl backdrop-blur">
        <div className="hidden min-[380px]:block flex-1 pl-3">
          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">Audit offert</p>
          <p className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">
            Réponse sous 24&nbsp;h{city ? ` · ${city}` : ""}
          </p>
        </div>
        <Link
          href="/devis"
          className="flex flex-1 min-[380px]:flex-none items-center justify-center gap-1.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 px-5 py-3.5 text-sm font-bold text-white"
        >
          Devis gratuit
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

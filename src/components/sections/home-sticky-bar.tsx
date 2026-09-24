"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { trackAttrs } from "@/lib/analytics"
import { WHATSAPP_NUMBER } from "@/components/ui/whatsapp-link"

/**
 * Barre de conversion fixe en bas d'écran, mobile uniquement (home).
 * Apparaît après le hero pour ne pas doubler ses boutons.
 */
export function HomeStickyBar() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Axel, je visite votre site et j'aimerais discuter de mon projet.")}`
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 border border-[#2a2a2a] bg-[#0f0f0f]/95 p-2 shadow-2xl backdrop-blur">
        <Link
          href="/devis"
          {...trackAttrs("cta_click", { cta: "devis", location: "home-sticky" })}
          className="flex h-12 items-center justify-center gap-1.5 bg-signal text-xs font-bold uppercase tracking-widest text-white"
        >
          Parlons-en <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          {...trackAttrs("whatsapp_click", { location: "home-sticky" })}
          className="flex h-12 items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: "#25D366" }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}

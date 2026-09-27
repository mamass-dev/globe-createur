"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Wordmark } from "@/components/ui/wordmark"
import { CardIntro } from "@/components/carte/card-intro"
import { WHATSAPP_NUMBER } from "@/components/ui/whatsapp-link"
import { track, trackAttrs } from "@/lib/analytics"
import type { IgLink } from "@/lib/data/ig-links"

/**
 * Page de liens Instagram : liste verticale, tout visible d'un coup (pas de swipe à deviner).
 * Chaque lien est une carte illustrée avec le hook du reel ; la première est mise en avant.
 * Intro « G » (une fois par session), suivi Rybbit `ig_view` + `ig_click`.
 */
export function IgStories({ links, handle, tagline }: { links: IgLink[]; handle: string; tagline: string }) {
  const [intro, setIntro] = useState(true)
  const onIntroDone = useCallback(() => setIntro(false), [])
  useEffect(() => {
    if (!intro) track("ig_view", { link: "page", index: links.length })
  }, [intro, links.length])

  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Axel, je viens d'Instagram et j'aimerais discuter d'un projet.")}`
  const [first, ...rest] = links
  const fade = (i: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: intro ? 0 : 1, y: intro ? 18 : 0 }, transition: { delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } })

  return (
    <div className="relative min-h-dvh bg-noir text-ivory">
      <CardIntro slug="ig" onDone={onIntroDone} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(230,58,43,0.18),transparent_70%)]" />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-8" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}>
        {/* En-tête */}
        <motion.div {...fade(0)} className="flex flex-col items-center text-center">
          <Wordmark size="md" className="items-center" />
          <a href={`https://www.instagram.com/${handle.replace("@", "")}/`} target="_blank" rel="noopener noreferrer" className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
            {handle}
          </a>
          <p className="mt-2 text-sm text-aluminium">{tagline}</p>
        </motion.div>

        {/* Contact en premier */}
        <motion.a
          {...fade(1)}
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          {...trackAttrs("whatsapp_click", { location: "ig" })}
          className="mt-8 flex h-14 items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: "#25D366" }}
        >
          Nous écrire sur WhatsApp
        </motion.a>
        <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-[#8a8a8a]">Réponse dans la journée</p>

        {/* Carte mise en avant */}
        {first && (
          <motion.a
            {...fade(2)}
            href={first.href}
            {...trackAttrs("ig_click", { link: first.id, index: "1" })}
            className="group relative mt-6 block overflow-hidden border border-[#2a2a2a] bg-[#0f0f0f]"
          >
            <div className="relative aspect-[4/3]">
              <Image src={first.image} alt="" fill priority sizes="(max-width: 448px) 100vw, 448px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="inline-flex items-center gap-2 font-mono-accent text-[11px] font-bold uppercase tracking-[0.25em] text-signal">
                  <span className="h-[2px] w-6 bg-signal" />
                  {first.tag}
                </span>
                <h1 className="text-impact mt-3 text-3xl leading-[0.95] text-ivory">{first.hook}</h1>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-aluminium">{first.sub}</p>
              <span className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-signal text-xs font-bold uppercase tracking-widest text-white">
                {first.cta} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.a>
        )}

        {/* Autres liens : cartes compactes, vignette + hook + flèche */}
        <div className="mt-4 space-y-3">
          {rest.map((l, k) => (
            <motion.a
              key={l.id}
              {...fade(k + 3)}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...trackAttrs("ig_click", { link: l.id, index: String(k + 2) })}
              className="group flex items-center gap-4 border border-[#2a2a2a] bg-[#0f0f0f] p-3 pr-4 transition-colors hover:border-signal active:border-signal"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono-accent text-[10px] font-bold uppercase tracking-[0.2em] text-signal">{l.tag}</span>
                <p className="mt-1 font-display text-base font-bold leading-tight text-ivory">{l.hook}</p>
                <p className="mt-1 line-clamp-1 text-xs text-aluminium">{l.sub}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-aluminium transition-all group-hover:translate-x-1 group-hover:text-signal" />
            </motion.a>
          ))}
        </div>

        <p className="mt-auto pt-10 text-center text-[11px] uppercase tracking-widest text-[#5e6063]">© Globe Créateur · globecreateur.fr</p>
      </div>
    </div>
  )
}

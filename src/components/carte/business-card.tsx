"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageSquare, Mail, Linkedin, Instagram, Globe, UserPlus, Share2, Check, QrCode, RotateCcw } from "lucide-react"
import { Wordmark } from "@/components/ui/wordmark"
import type { BusinessCard } from "@/lib/cards"
import { CardIntro } from "./card-intro"
import { TiltCard } from "./tilt-card"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

type Action = {
  label: string
  href: string
  Icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

/**
 * Carte de visite NFC. `qrSvg` : QR code de l'URL de la carte, rendu côté serveur,
 * affiché au dos (flip) pour qu'un interlocuteur sans NFC puisse scanner.
 */
export function BusinessCardView({ card, qrSvg }: { card: BusinessCard; qrSvg?: string }) {
  const [intro, setIntro] = useState(true)
  const [flipped, setFlipped] = useState(false)
  const [shared, setShared] = useState(false)
  const onIntroDone = useCallback(() => setIntro(false), [])

  const actions: Action[] = []
  if (card.phoneE164) {
    actions.push({ label: "Appeler", href: `tel:${card.phoneE164}`, Icon: Phone })
    actions.push({ label: "SMS", href: `sms:${card.phoneE164}`, Icon: MessageSquare })
    actions.push({
      label: "WhatsApp",
      href: `https://wa.me/${card.phoneE164.replace(/[^0-9]/g, "")}`,
      Icon: WhatsAppIcon,
      external: true,
    })
  }
  actions.push({ label: "Email", href: `mailto:${card.email}`, Icon: Mail })
  if (card.linkedin) actions.push({ label: "LinkedIn", href: card.linkedin, Icon: Linkedin, external: true })
  if (card.instagram) actions.push({ label: "Instagram", href: card.instagram, Icon: Instagram, external: true })
  actions.push({ label: "Site web", href: card.website, Icon: Globe, external: true })

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : card.website
    const shareData = {
      title: `${card.fullName} — ${card.org}`,
      text: `${card.fullName}, ${card.role} chez ${card.org}`,
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    } catch {
      /* partage annulé — on ignore */
    }
  }

  const fade = {
    hidden: { opacity: 0, y: 18 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } }),
  }
  const state = intro ? "hidden" : "show"

  return (
    <div
      className="relative min-h-dvh overflow-hidden bg-noir text-ivory"
      onPointerMove={(e) => {
        const el = e.currentTarget
        el.style.setProperty("--gx", `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`)
        el.style.setProperty("--gy", `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`)
      }}
      style={{ ["--gx" as string]: "50%", ["--gy" as string]: "15%" }}
    >
      <CardIntro slug={card.slug} onDone={onIntroDone} />

      {/* Halo rouge qui suit le doigt + trame de points */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background-position] duration-300"
        style={{ background: "radial-gradient(60% 40% at var(--gx) var(--gy), rgba(230,58,43,0.22), transparent 70%)" }}
      />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-12 pt-10">
        {/* Marque */}
        <motion.div custom={0} variants={fade} initial="hidden" animate={state} className="flex justify-center">
          <Wordmark size="sm" />
        </motion.div>

        {/* Carte recto/verso inclinable */}
        <motion.div custom={1} variants={fade} initial="hidden" animate={state} className="mt-8" style={{ perspective: 1200 }}>
          <TiltCard>
            <motion.div
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Recto : photo + identité */}
              <div className="border border-[#1c1c1c] bg-[#0f0f0f] px-6 py-8 text-center [backface-visibility:hidden]">
                <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-full border border-[#2a2a2a] shadow-2xl">
                  <Image src={card.photo} alt={card.fullName} fill sizes="160px" priority className="object-cover object-top" />
                </div>
                <h1 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight text-ivory">{card.fullName}</h1>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <motion.span
                    className="h-[3px] w-6 origin-left bg-signal"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: intro ? 0 : 1 }}
                    transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                  />
                  <p className="text-[11px] font-bold uppercase tracking-widest text-signal">{card.role}</p>
                </div>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-aluminium">{card.tagline}</p>
              </div>

              {/* Verso : QR code */}
              {qrSvg && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center border border-[#1c1c1c] bg-[#0f0f0f] px-6 py-8 text-center [backface-visibility:hidden]"
                  style={{ transform: "rotateY(180deg)" }}
                  aria-hidden={!flipped}
                >
                  <div className="w-44 [&>svg]:h-auto [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-widest text-signal">Scannez-moi</p>
                  <p className="mt-2 max-w-xs text-sm text-aluminium">Pour ouvrir cette carte sur votre téléphone et enregistrer le contact.</p>
                </div>
              )}
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* CTA principal — vCard, avec halo pulsé */}
        <motion.div custom={2} variants={fade} initial="hidden" animate={state} className="relative mt-6">
          {!intro && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 border border-signal"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <a
            href={`/carte/${card.slug}/vcard`}
            className="relative flex h-14 w-full items-center justify-center gap-2 bg-signal px-9 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#d62e20]"
          >
            <UserPlus className="h-5 w-5" />
            Ajouter à mes contacts
          </a>
        </motion.div>

        {/* Grille d'actions */}
        <motion.div custom={3} variants={fade} initial="hidden" animate={state} className="mt-4 grid grid-cols-3 gap-3">
          {actions.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col items-center justify-center gap-2 border border-[#1c1c1c] bg-[#0f0f0f] px-2 py-4 text-center transition-colors hover:border-signal active:border-signal"
            >
              <Icon className="h-5 w-5 text-aluminium transition-colors group-hover:text-signal" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-aluminium transition-colors group-hover:text-ivory">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* Partager + QR */}
        <motion.div custom={4} variants={fade} initial="hidden" animate={state} className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-12 items-center justify-center gap-2 border border-[#2a2a2a] px-4 text-xs font-bold uppercase tracking-widest text-ivory transition-colors hover:border-signal hover:text-signal"
          >
            {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {shared ? "Lien copié" : "Partager"}
          </button>
          {qrSvg && (
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              aria-pressed={flipped}
              className="flex h-12 items-center justify-center gap-2 border border-[#2a2a2a] px-4 text-xs font-bold uppercase tracking-widest text-ivory transition-colors hover:border-signal hover:text-signal"
            >
              {flipped ? <RotateCcw className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
              {flipped ? "Retourner" : "Mon QR code"}
            </button>
          )}
        </motion.div>

        {/* Pied */}
        <div className="mt-auto pt-10 text-center">
          <a
            href={card.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-widest text-[#5e6063] transition-colors hover:text-aluminium"
          >
            © {card.org} · globecreateur.fr
          </a>
        </div>
      </div>
    </div>
  )
}

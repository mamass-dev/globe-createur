"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, MessageSquare, Mail, Linkedin, Instagram, Globe, UserPlus, Share2, Check } from "lucide-react"
import { Wordmark } from "@/components/ui/wordmark"
import type { BusinessCard } from "@/lib/cards"

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

export function BusinessCardView({ card }: { card: BusinessCard }) {
  const [shared, setShared] = useState(false)

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
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.05 * i, duration: 0.5, ease: "easeOut" as const } }),
  }

  return (
    <div className="relative min-h-dvh bg-noir text-ivory">
      {/* Halo rouge diffus en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(230,58,43,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-6 pb-12 pt-10">
        {/* Marque */}
        <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="flex justify-center">
          <Wordmark size="sm" />
        </motion.div>

        {/* Photo */}
        <motion.div custom={1} variants={fade} initial="hidden" animate="show" className="mt-8 flex justify-center">
          <div className="relative aspect-square w-40 overflow-hidden rounded-full border border-border shadow-2xl">
            <Image
              src={card.photo}
              alt={card.fullName}
              fill
              sizes="160px"
              priority
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Identité */}
        <motion.div custom={2} variants={fade} initial="hidden" animate="show" className="mt-6 text-center">
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-ivory">{card.fullName}</h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-[3px] w-6 bg-signal" />
            <p className="text-[11px] font-bold uppercase tracking-widest text-signal">{card.role}</p>
          </div>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-aluminium">{card.tagline}</p>
        </motion.div>

        {/* CTA principal — vCard */}
        <motion.a
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          href={`/carte/${card.slug}/vcard`}
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 bg-signal px-9 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#d62e20]"
        >
          <UserPlus className="h-5 w-5" />
          Ajouter à mes contacts
        </motion.a>

        {/* Grille d'actions */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-4 grid grid-cols-3 gap-3"
        >
          {actions.map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col items-center justify-center gap-2 border border-border bg-secondary px-2 py-4 text-center transition-colors hover:border-signal"
            >
              <Icon className="h-5 w-5 text-aluminium transition-colors group-hover:text-signal" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-aluminium transition-colors group-hover:text-ivory">
                {label}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Partager */}
        <motion.button
          custom={5}
          variants={fade}
          initial="hidden"
          animate="show"
          type="button"
          onClick={handleShare}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 border border-border px-7 text-sm font-bold uppercase tracking-widest text-ivory transition-colors hover:border-signal hover:text-signal"
        >
          {shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {shared ? "Lien copié" : "Partager cette carte"}
        </motion.button>

        {/* Pied */}
        <div className="mt-auto pt-10 text-center">
          <a
            href={card.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-widest text-slate-600 transition-colors hover:text-aluminium"
          >
            © {card.org} · globecreateur.fr
          </a>
        </div>
      </div>
    </div>
  )
}

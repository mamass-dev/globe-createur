"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

/**
 * Intro plein écran au flash de la puce NFC : barre rouge qui balaie, marque « G » qui surgit,
 * léger retour haptique (Android), puis fondu vers la carte. ~1,9 s, un tap pour passer.
 * Jouée une fois par session et par carte ; désactivée si l'utilisateur limite les animations.
 */
export function CardIntro({ slug, onDone }: { slug: string; onDone: () => void }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState<boolean | null>(null)

  useEffect(() => {
    let played = false
    try {
      played = sessionStorage.getItem(`carte-intro-${slug}`) === "1"
    } catch {
      /* stockage indisponible : on joue l'intro */
    }
    if (reduced || played) {
      const id = requestAnimationFrame(() => {
        setShow(false)
        onDone()
      })
      return () => cancelAnimationFrame(id)
    }
    const start = requestAnimationFrame(() => setShow(true))
    try {
      sessionStorage.setItem(`carte-intro-${slug}`, "1")
    } catch {
      /* ignore */
    }
    const haptic = window.setTimeout(() => {
      try {
        navigator.vibrate?.([12, 40, 18])
      } catch {
        /* non supporté */
      }
    }, 650)
    const end = window.setTimeout(() => {
      setShow(false)
      onDone()
    }, 1900)
    return () => {
      cancelAnimationFrame(start)
      window.clearTimeout(haptic)
      window.clearTimeout(end)
    }
  }, [slug, reduced, onDone])

  return (
    <AnimatePresence>
      {show !== false && (
        <motion.button
          type="button"
          aria-label="Passer l'introduction"
          onClick={() => {
            setShow(false)
            onDone()
          }}
          className="fixed inset-0 z-50 flex cursor-default flex-col items-center justify-center bg-noir"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <motion.div
            className="h-[3px] w-24 origin-left bg-signal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            transition={{ duration: 1.1, times: [0, 0.35, 0.65, 1], ease: "easeInOut" }}
          />
          <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0.55, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.55, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src="/images/logo/globe-mark-transparent.png" alt="" width={112} height={112} priority className="h-28 w-28" />
          </motion.div>
          <motion.p
            className="absolute bottom-16 text-[11px] font-bold uppercase tracking-[0.35em] text-aluminium"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.4 }}
          >
            Creative House
          </motion.p>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

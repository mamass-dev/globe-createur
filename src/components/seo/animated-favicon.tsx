"use client"

import { useEffect } from "react"

const FRAMES = 16
const INTERVAL_MS = 110
const IDLE_BETWEEN_CYCLES_MS = 2400

/**
 * Favicon animé : la barre rouge du « G » balaie de gauche à droite, un cycle toutes les ~4 s.
 * Chrome et Safari n'animent pas les GIF/SVG de favicon : on remplace le href du <link rel="icon">
 * image par image. Désactivé si l'utilisateur préfère réduire les animations, en pause quand
 * l'onglet est caché (aucun coût quand on ne le voit pas).
 */
export function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const link =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]:not([type="image/svg+xml"])') ??
      (() => {
        const l = document.createElement("link")
        l.rel = "icon"
        document.head.appendChild(l)
        return l
      })()
    const original = link.href
    const srcs = Array.from({ length: FRAMES }, (_, i) => `/favicon-frames/f${String(i).padStart(2, "0")}.png`)
    srcs.forEach((s) => {
      const img = new Image()
      img.src = s
    })

    let frame = 0
    let timer: number | undefined
    const tick = () => {
      if (document.hidden) {
        timer = window.setTimeout(tick, 500)
        return
      }
      link.href = srcs[frame]
      frame = (frame + 1) % FRAMES
      timer = window.setTimeout(tick, frame === 0 ? IDLE_BETWEEN_CYCLES_MS : INTERVAL_MS)
    }
    timer = window.setTimeout(tick, 1500)
    return () => {
      if (timer) window.clearTimeout(timer)
      link.href = original
    }
  }, [])
  return null
}

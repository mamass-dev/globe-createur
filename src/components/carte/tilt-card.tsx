"use client"

import { useEffect, useRef, type ReactNode } from "react"

const MAX = 12

/**
 * Inclinaison 3D légère : suit le doigt / la souris, et le gyroscope quand il est disponible
 * (Android sans permission ; iOS après un premier toucher, qui déclenche la demande).
 */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const asked = useRef(false)

  const apply = (rx: number, ry: number) => {
    const el = ref.current
    if (!el) return
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
  }
  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1)"
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
    window.setTimeout(() => {
      if (el) el.style.transition = ""
    }, 600)
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return
      // beta : inclinaison avant/arrière (téléphone tenu ~45°), gamma : gauche/droite
      const rx = Math.max(-MAX, Math.min(MAX, -(e.beta - 45) / 3))
      const ry = Math.max(-MAX, Math.min(MAX, e.gamma / 3))
      apply(rx, ry)
    }
    type DOE = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> }
    const D = DeviceOrientationEvent as unknown as DOE
    if (typeof D.requestPermission !== "function") {
      window.addEventListener("deviceorientation", onOrient)
      return () => window.removeEventListener("deviceorientation", onOrient)
    }
    // iOS : la permission ne peut être demandée qu'après un geste utilisateur
    const ask = () => {
      if (asked.current) return
      asked.current = true
      D.requestPermission?.()
        .then((r) => {
          if (r === "granted") window.addEventListener("deviceorientation", onOrient)
        })
        .catch(() => {
          /* refusé : on garde le suivi au doigt */
        })
    }
    window.addEventListener("pointerdown", ask, { once: true })
    return () => {
      window.removeEventListener("pointerdown", ask)
      window.removeEventListener("deviceorientation", onOrient)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || e.pointerType === "pen" || e.pointerType === "touch") {
          const r = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - r.left) / r.width - 0.5
          const y = (e.clientY - r.top) / r.height - 0.5
          apply(-y * MAX * 2, x * MAX * 2)
        }
      }}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      {children}
    </div>
  )
}

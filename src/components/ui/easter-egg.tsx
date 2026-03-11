"use client"

import { useEffect, useState, useCallback } from "react"

export function EasterEgg() {
  const [showEgg, setShowEgg] = useState(false)

  const triggerKonami = useCallback(() => {
    setShowEgg(true)
    setTimeout(() => setShowEgg(false), 4000)
  }, [])

  useEffect(() => {
    // Console easter egg
    console.log(
      "\n%c   ██████╗ ██╗      ██████╗ ██████╗ ███████╗\n  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔════╝\n  ██║  ███╗██║     ██║   ██║██████╔╝█████╗  \n  ██║   ██║██║     ██║   ██║██╔══██╗██╔══╝  \n  ╚██████╔╝███████╗╚██████╔╝██████╔╝███████╗\n   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝\n",
      "color: #6366f1; font-weight: bold;"
    )
    console.log(
      "%c👋 Hey ! Tu fouilles dans la console ? On aime ça.\n" +
      "🚀 Next.js · React 19 · Tailwind · Beaucoup de café\n" +
      "🔒 Routes API rate-limitées et sanitizées.\n" +
      "💼 contact@globecreateur.fr",
      "color: #94a3b8; font-size: 11px;"
    )

    // Konami code: ↑↑↓↓←→←→BA
    const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","b","a"]
    let idx = 0

    function onKey(e: KeyboardEvent) {
      if (e.key === code[idx]) {
        idx++
        if (idx === code.length) {
          idx = 0
          triggerKonami()
        }
      } else {
        idx = 0
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [triggerKonami])

  if (!showEgg) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-in fade-in duration-300">
      <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-indigo-500/30 blur-3xl rounded-full scale-150" />
        {/* Card */}
        <div className="relative bg-slate-900/95 backdrop-blur-xl border border-indigo-500/50 rounded-3xl px-12 py-10 text-center shadow-2xl shadow-indigo-500/20 animate-in zoom-in-95 duration-500">
          <p className="text-6xl mb-4">🌍</p>
          <p className="text-2xl font-black text-white mb-2">Konami Code !</p>
          <p className="text-indigo-400 font-mono text-sm">↑↑↓↓BA</p>
          <p className="text-slate-400 text-xs mt-3">Globe Créateur approuve ce joueur.</p>
        </div>
      </div>
    </div>
  )
}

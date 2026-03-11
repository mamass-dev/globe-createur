"use client"

import { useEffect } from "react"

const ASCII_ART = `
%c
   ██████╗ ██╗      ██████╗ ██████╗ ███████╗
  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔════╝
  ██║  ███╗██║     ██║   ██║██████╔╝█████╗
  ██║   ██║██║     ██║   ██║██╔══██╗██╔══╝
  ╚██████╔╝███████╗╚██████╔╝██████╔╝███████╗
   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚══════╝
   ██████╗██████╗ ███████╗ █████╗ ████████╗███████╗██╗   ██╗██████╗
  ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔════╝██║   ██║██╔══██╗
  ██║     ██████╔╝█████╗  ███████║   ██║   █████╗  ██║   ██║██████╔╝
  ██║     ██╔══██╗██╔══╝  ██╔══██║   ██║   ██╔══╝  ██║   ██║██╔══██╗
  ╚██████╗██║  ██║███████╗██║  ██║   ██║   ███████╗╚██████╔╝██║  ██║
   ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝

`

export function EasterEgg() {
  useEffect(() => {
    console.log(
      ASCII_ART,
      "color: #6366f1; font-weight: bold; font-size: 10px; font-family: monospace;"
    )
    console.log(
      "%c👋 Hey ! Tu fouilles dans la console ? On aime ça.\n\n" +
      "🚀 Ce site est construit avec Next.js, React 19, Tailwind et beaucoup de café.\n" +
      "🔒 Toutes les routes API sont rate-limitées et sanitizées. Pas la peine d'essayer 😉\n\n" +
      "💼 On recrute des curieux comme toi → contact@globecreateur.fr\n" +
      "⭐ Ou laisse-nous un avis Google, ça nous ferait plaisir.\n",
      "color: #94a3b8; font-size: 12px; line-height: 1.6;"
    )

    // Konami code easter egg
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ]
    let konamiIndex = 0

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          konamiIndex = 0
          document.body.style.transition = "transform 1s ease"
          document.body.style.transform = "rotate(360deg)"
          setTimeout(() => {
            document.body.style.transform = ""
            alert("🌍 Globe Créateur approuve ce joueur ! Code Konami activé.")
          }, 1000)
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}

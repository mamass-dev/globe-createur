"use client"

import { useEffect, useState, useCallback } from "react"

export function WhatsAppButton() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    if (currentY > lastScrollY && currentY > 300) {
      setVisible(false)
    } else {
      setVisible(true)
    }
    setLastScrollY(currentY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const message = encodeURIComponent(
    "Bonjour, je visite votre site Globe Créateur et j'aimerais en savoir plus sur vos services."
  )

  return (
    <a
      href={`https://wa.me/33678978705?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "#25D366" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.336 22.594c-.392 1.106-1.94 2.024-3.2 2.292-.862.182-1.986.328-5.774-1.242-4.846-2.008-7.962-6.924-8.204-7.244-.232-.32-1.94-2.586-1.94-4.934 0-2.348 1.228-3.502 1.664-3.98.392-.432 1.036-.628 1.65-.628.198 0 .376.01.536.018.474.02.712.048 1.024.792.392.932 1.348 3.28 1.464 3.518.118.238.232.554.074.872-.148.328-.278.474-.516.746-.238.272-.464.48-.702.774-.218.258-.464.534-.196.998.268.456 1.19 1.964 2.558 3.182 1.758 1.564 3.238 2.05 3.698 2.274.358.178.786.148 1.066-.148.356-.376.796-.998 1.244-1.612.318-.436.72-.49 1.112-.338.398.148 2.518 1.188 2.95 1.404.432.218.72.326.826.504.106.178.106 1.036-.286 2.142l-.048-.008z" />
      </svg>
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
      </span>
    </a>
  )
}

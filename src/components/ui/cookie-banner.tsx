"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

function loadGA() {
  if (typeof window === "undefined") return
  if (document.getElementById("ga-script")) return
  const script = document.createElement("script")
  script.id = "ga-script"
  script.async = true
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-LEGY3EMG5L"
  document.head.appendChild(script)
  script.onload = () => {
    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    gtag("js", new Date())
    gtag("config", "G-LEGY3EMG5L")
  }
}

export function CookieBanner() {
  const [status, setStatus] = useState<"pending" | "accepted" | "refused" | "hidden">("hidden")
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent === "accepted") {
      loadGA()
      setStatus("hidden")
    } else if (consent === "refused") {
      setStatus("hidden")
    } else {
      setStatus("pending")
    }
  }, [])

  function handleChoice(choice: "accepted" | "refused") {
    localStorage.setItem("cookie-consent", choice)
    if (choice === "accepted") loadGA()
    setClosing(true)
    setTimeout(() => {
      setStatus(choice)
    }, 300)
  }

  if (status === "hidden" || status === "accepted" || status === "refused") return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 transition-all duration-300 ${
        closing ? "translate-y-full opacity-0" : "translate-y-0 opacity-100 animate-slide-up"
      }`}
    >
      <div className="flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Ce site utilise des cookies pour mesurer l&apos;audience via Google Analytics.
            Aucune donn&eacute;e personnelle n&apos;est partag&eacute;e avec des tiers.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => handleChoice("refused")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Refuser
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}

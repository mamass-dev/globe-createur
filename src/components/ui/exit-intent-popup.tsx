"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [closing, setClosing] = useState(false)
  const [email, setEmail] = useState("")
  const pageLoadTime = useRef(Date.now())

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setVisible(false)
      setClosing(false)
    }, 300)
  }, [])

  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return
      if (sessionStorage.getItem("exit-popup-shown")) return
      if (Date.now() - pageLoadTime.current < 15000) return
      if (localStorage.getItem("cookie-consent") === null) return

      sessionStorage.setItem("exit-popup-shown", "true")
      setVisible(true)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [close])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => {
      close()
    }, 2500)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-popup-heading"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-8 ${
          closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Fermer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-green-600 dark:text-green-400"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Merci !
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Vous recevrez le guide dans quelques instants.
            </p>
          </div>
        ) : (
          <>
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-indigo-600 dark:text-indigo-400"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>

            <h2
              id="exit-popup-heading"
              className="text-center text-xl font-bold text-slate-900 dark:text-white sm:text-2xl"
            >
              Attendez ! Un guide gratuit pour vous
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              T&eacute;l&eacute;chargez notre guide &laquo;&nbsp;Les 10 erreurs SEO qui
              co&ucirc;tent cher aux PME&nbsp;&raquo; &mdash; c&apos;est gratuit.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                Recevoir le guide
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              Pas de spam. D&eacute;sabonnement en 1 clic.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

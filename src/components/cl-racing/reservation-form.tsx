"use client"

import { useState, type FormEvent } from "react"
import { ROULAGES, FORMULE_CHOICES, type FormuleId } from "@/lib/cl-racing"

type Status = "idle" | "submitting" | "success" | "error"

export function CLRReservationForm() {
  const [formule, setFormule] = useState<FormuleId>("photo")
  const [roulageId, setRoulageId] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverMessage, setServerMessage] = useState<string>("")

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("submitting")
    setErrors({})
    setServerMessage("")

    const fd = new FormData(e.currentTarget)
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      roulageId,
      formule,
      consent: fd.get("consent") === "on",
      website: fd.get("website") || "", // honeypot
    }

    try {
      const res = await fetch("/api/cl-racing/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json()) as
        | { success: true }
        | { error?: string; details?: Record<string, string[]> }

      if (res.ok && "success" in data && data.success) {
        setStatus("success")
        return
      }
      if ("details" in data && data.details) {
        const flat: Record<string, string> = {}
        for (const [k, v] of Object.entries(data.details)) {
          flat[k] = Array.isArray(v) ? v[0] : String(v)
        }
        setErrors(flat)
      }
      setServerMessage(
        ("error" in data && data.error) ||
          "Une erreur est survenue. Vérifiez les champs et réessayez.",
      )
      setStatus("error")
    } catch {
      setStatus("error")
      setServerMessage("Impossible de joindre le serveur. Réessayez dans un instant.")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-10 md:p-14 text-center shadow-xl shadow-indigo-100/50 dark:shadow-indigo-950/30">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto text-white text-3xl shadow-lg shadow-emerald-200 dark:shadow-emerald-950">
          ✓
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-6 text-slate-900 dark:text-white">
          C&apos;est noté !
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-md mx-auto leading-relaxed">
          On vous rappelle <strong>sous 24h</strong> au numéro indiqué pour caler les derniers
          détails (créneau vidéo, repérage de votre moto, etc.).
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="Prénom"
          name="firstName"
          required
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Field
          label="Nom"
          name="lastName"
          required
          error={errors.lastName}
          autoComplete="family-name"
        />
      </div>

      <Field
        label="Email"
        name="email"
        type="email"
        required
        error={errors.email}
        placeholder="vous@email.com"
        autoComplete="email"
      />

      <Field
        label="Téléphone"
        name="phone"
        type="tel"
        required
        error={errors.phone}
        placeholder="06 12 34 56 78"
        autoComplete="tel"
        hint="On vous rappelle sous 24h pour confirmer."
      />

      <div>
        <Label>Date du roulage</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ROULAGES.filter((r) => r.status !== "full").map((r) => {
            const selected = roulageId === r.id
            const disabled = r.status === "soon"
            return (
              <button
                type="button"
                key={r.id}
                disabled={disabled}
                onClick={() => setRoulageId(r.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 dark:border-indigo-400"
                    : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-900"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400 leading-none">
                    {r.day}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                    {r.month}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-snug">
                  {r.type}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  {r.weekday}
                </div>
              </button>
            )
          })}
        </div>
        {errors.roulageId && (
          <p className="text-rose-600 dark:text-rose-400 text-xs mt-2.5 font-medium">
            {errors.roulageId}
          </p>
        )}
      </div>

      <div>
        <Label>Formule</Label>
        <div className="grid grid-cols-3 gap-2.5">
          {FORMULE_CHOICES.map((f) => {
            const selected = formule === f.id
            return (
              <button
                type="button"
                key={f.id}
                onClick={() => setFormule(f.id)}
                className={`relative text-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selected
                    ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 dark:border-indigo-400"
                    : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-slate-900"
                }`}
              >
                {f.badge && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-200 dark:shadow-emerald-950">
                    {f.badge}
                  </span>
                )}
                <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {f.label}
                </div>
                <div className="mt-1 flex items-baseline justify-center gap-1.5">
                  {f.oldPrice && (
                    <span className="text-xs text-slate-400 line-through font-medium">
                      {f.oldPrice}€
                    </span>
                  )}
                  <span
                    className={`text-xl sm:text-2xl font-black tracking-tighter leading-none ${
                      selected
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {f.price}€
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 leading-tight">
                  {f.sub}
                </div>
              </button>
            )
          })}
        </div>
        {errors.formule && (
          <p className="text-rose-600 dark:text-rose-400 text-xs mt-2.5 font-medium">
            {errors.formule}
          </p>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 md:p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 accent-indigo-600 rounded"
          />
          <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            J&apos;accepte d&apos;être recontacté par Globe Créateur et autorise l&apos;usage ponctuel de mes
            images par Globe Créateur × CL RACING à des fins de communication. Voir les{" "}
            <a
              href="/mentions-legales"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium"
            >
              mentions légales
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="text-rose-600 dark:text-rose-400 text-xs mt-2.5 font-medium">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && serverMessage && (
        <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-sm text-rose-700 dark:text-rose-300">
          {serverMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group w-full inline-flex flex-col items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-7 py-5 rounded-2xl text-lg sm:text-xl font-black uppercase tracking-widest shadow-xl shadow-indigo-200 dark:shadow-indigo-950 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0"
      >
        <span className="inline-flex items-center gap-3">
          <span aria-hidden>📸</span>
          {status === "submitting" ? "Envoi en cours…" : "Je réserve ma session"}
          {status !== "submitting" && (
            <span aria-hidden className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          )}
        </span>
        <span className="text-[10px] sm:text-xs font-semibold tracking-normal normal-case text-white/85">
          30 secondes · sans paiement · rappel sous 24h
        </span>
      </button>
    </form>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-200 font-bold mb-3">
      {children}
    </label>
  )
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  placeholder,
  hint,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  error?: string
  placeholder?: string
  hint?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-slate-700 dark:text-slate-200 font-bold mb-2">
        {label}
        {required && <span className="text-indigo-600 dark:text-indigo-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-950 transition"
      />
      {hint && !error && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">{hint}</p>
      )}
      {error && (
        <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5 font-medium">{error}</p>
      )}
    </div>
  )
}

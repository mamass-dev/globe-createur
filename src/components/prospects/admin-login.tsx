"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export function AdminLogin() {
  const [pwd, setPwd] = useState("")
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const router = useRouter()
  return (
    <div className="flex min-h-dvh items-center justify-center bg-noir p-6 text-ivory">
      <form
        onSubmit={async (e) => {
          e.preventDefault(); setBusy(true); setErr(null)
          const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pwd }) })
          setBusy(false)
          if (r.ok) router.refresh(); else setErr((await r.json().catch(() => ({}))).error ?? "Erreur")
        }}
        className="w-full max-w-sm border border-[#1c1c1c] p-8"
      >
        <Lock className="h-6 w-6 text-signal" aria-hidden="true" />
        <p className="mt-4 text-xl font-bold">Espace prospects</p>
        <input type="password" autoFocus value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Mot de passe" className="mt-6 w-full border-b border-[#2a2a2a] bg-transparent py-3 outline-none focus:border-signal" />
        {err && <p className="mt-2 text-sm text-signal">{err}</p>}
        <Button type="submit" size="md" className="mt-6 w-full" disabled={busy || !pwd}>Entrer</Button>
      </form>
    </div>
  )
}

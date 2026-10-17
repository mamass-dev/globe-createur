"use client"

import { usePathname } from "next/navigation"

/**
 * Masque le chrome global du site (header, footer, boutons flottants)
 * sur les cartes de visite NFC plein écran (/carte/*), les pages prospects (/p/*) et l'admin.
 */
export function HideOnCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/carte") || pathname === "/ig" || pathname?.startsWith("/p/") || pathname?.startsWith("/admin")) return null
  return <>{children}</>
}

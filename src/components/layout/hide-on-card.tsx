"use client"

import { usePathname } from "next/navigation"

/**
 * Masque le chrome global du site (header, footer, boutons flottants)
 * sur les cartes de visite NFC plein écran (/carte/*).
 */
export function HideOnCard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/carte")) return null
  return <>{children}</>
}

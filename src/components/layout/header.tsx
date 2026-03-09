"use client"

import { useState } from "react"
import Link from "next/link"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/lib/data/navigation"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100 h-20">
      <Container className="flex h-full items-center justify-between">
        {/* Logo - Professional SaaS style */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-lg shrink-0">G</div>
          <span className="whitespace-nowrap">Globe Créateur</span>
        </Link>

        {/* Desktop nav - SaaS style */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-slate-200 mx-2" />
          
          <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Contact
          </Link>
          <Button href="/devis" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all">
            Démarrer
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-slate-600 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <LucideIcon name="X" className="h-6 w-6" /> : <LucideIcon name="Menu" className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <Container className="py-6 space-y-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-lg font-medium text-slate-900"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
               <Button href="/devis" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold">
                  D&eacute;marrer un projet
               </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}

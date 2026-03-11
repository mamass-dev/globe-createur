"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { LucideIcon } from "@/components/ui/lucide-icon"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { mainNav } from "@/lib/data/navigation"
import type { NavItem } from "@/lib/types"
import { ChevronDown, ArrowRight } from "lucide-react"

/* ─── Desktop Dropdown (mega menu) ─── */
function DesktopDropdown({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem
  open: boolean
  onOpen: () => void
  onClose: () => void
}) {
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current)
    onOpen()
  }

  const handleLeave = () => {
    timeout.current = setTimeout(onClose, 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
        onClick={onOpen}
      >
        {item.label}
        {item.label.includes("Outils") && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 rounded-full leading-none">
            Gratuit
          </span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="w-[520px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 p-2">
          {/* Children grid */}
          <div className="grid grid-cols-1 gap-0.5">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="group flex items-start gap-3.5 px-4 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
              >
                {child.icon && (
                  <div className="mt-0.5 h-9 w-9 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <LucideIcon name={child.icon} className="h-4.5 w-4.5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {child.label}
                  </div>
                  {child.description && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {child.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Footer link */}
          <div className="mt-1 pt-2 border-t border-slate-100 dark:border-slate-800 px-4 pb-2">
            <Link
              href={item.href}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Voir tous les {item.label.toLowerCase()}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Mobile Accordion ─── */
function MobileAccordion({
  item,
  onClose,
}: {
  item: NavItem
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-lg font-medium text-slate-900 dark:text-slate-100 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-2 space-y-1 border-l-2 border-indigo-100 dark:border-indigo-900 ml-1">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {child.icon && (
                <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center">
                  <LucideIcon name={child.icon} className="h-4 w-4" />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {child.label}
                </div>
                {child.description && (
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    {child.description}
                  </div>
                )}
              </div>
            </Link>
          ))}
          <Link
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400"
          >
            Voir tout
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── Header ─── */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Close dropdown on route change / scroll
  useEffect(() => {
    const close = () => setOpenDropdown(null)
    window.addEventListener("scroll", close, { passive: true })
    return () => window.removeEventListener("scroll", close)
  }, [])

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-20">
      <Container className="flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo/logo-main.webp"
            alt="Globe Créateur"
            width={160}
            height={160}
            className="h-16 w-auto dark:hidden"
            priority
          />
          <Image
            src="/images/logo/logo-alt.webp"
            alt="Globe Créateur"
            width={160}
            height={160}
            className="h-16 w-auto hidden dark:block"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {mainNav.map((item) =>
            item.children && item.children.length > 0 ? (
              <DesktopDropdown
                key={item.label}
                item={item}
                open={openDropdown === item.label}
                onOpen={() => setOpenDropdown(item.label)}
                onClose={() => setOpenDropdown(null)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
          <Button
            href="/devis"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all"
          >
            Démarrer
          </Button>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <LucideIcon name="X" className="h-6 w-6" />
            ) : (
              <LucideIcon name="Menu" className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 animate-in slide-in-from-top duration-300 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          <Container className="py-6 space-y-4">
            {mainNav.map((item) =>
              item.children && item.children.length > 0 ? (
                <MobileAccordion
                  key={item.label}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-lg font-medium text-slate-900 dark:text-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="block text-lg font-medium text-slate-900 dark:text-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <Button
                href="/devis"
                className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-xl font-semibold"
              >
                Démarrer un projet
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}

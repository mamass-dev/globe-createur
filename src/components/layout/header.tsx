"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { mainNav } from "@/lib/data/navigation"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-surface/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          Globe Cr&eacute;ateur
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {mainNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.children ? (
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  aria-expanded={openDropdown === item.label}
                >
                  {item.label}
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    openDropdown === item.label && "rotate-180"
                  )} />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {item.children && openDropdown === item.label && (
                <div className="absolute left-0 top-full pt-2 animate-fade-in">
                  <div className="rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl shadow-black/[0.04] min-w-60">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-foreground transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Button href="/contact" variant="ghost" size="sm">
            Contact
          </Button>
          <Button href="/devis" size="sm">
            Devis gratuit
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white animate-fade-in">
          <Container className="py-4 space-y-0.5">
            {mainNav.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-3 space-y-0.5 animate-fade-in">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-3 py-2.5 text-sm text-gray-400 hover:text-foreground rounded-lg hover:bg-gray-50"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-2">
              <Button href="/contact" variant="outline" size="sm" className="w-full">
                Contact
              </Button>
              <Button href="/devis" size="sm" className="w-full">
                Devis gratuit
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { SITE_NAME, CONTACT } from "@/lib/constants"
import { footerNav } from "@/lib/data/navigation"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-white">
      <Container className="py-14 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
              {SITE_NAME}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[240px]">
              Studio de communication 360° &agrave; Dijon. Web, SEO, contenu et strat&eacute;gie pour PME.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href={CONTACT.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-foreground transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={CONTACT.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-foreground transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Entreprise</h3>
            <ul className="space-y-2.5">
              {footerNav.entreprise.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-foreground transition-colors duration-200"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {CONTACT.address.street}
                <br />
                {CONTACT.address.zip} {CONTACT.address.city}
              </li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              {footerNav.contact.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-400 hover:text-foreground transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            &copy; {currentYear} {SITE_NAME}. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex gap-6 text-xs text-gray-300">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors duration-200">
              Mentions l&eacute;gales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors duration-200">
              Confidentialit&eacute;
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

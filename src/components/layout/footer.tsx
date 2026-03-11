import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { SITE_NAME, CONTACT } from "@/lib/constants"
import { footerNav } from "@/lib/data/navigation"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12">
      <Container>
        {/* Top: Brand + Contact */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-14 pb-14 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-4">
            <Link href="/">
              <Image src="/images/logo/logo-main.webp" alt="Globe Créateur" width={200} height={200} className="h-16 w-auto dark:hidden" />
              <Image src="/images/logo/logo-alt.webp" alt="Globe Créateur" width={200} height={200} className="h-16 w-auto hidden dark:block" />
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Studio de communication 360&deg; &agrave; Dijon. Web, SEO, photo, vid&eacute;o et design pour les PME.
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-3">
            <a href={`mailto:${CONTACT.email}`} className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{CONTACT.email}</a>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {CONTACT.address.street}, {CONTACT.address.zip} {CONTACT.address.city}
            </p>
            <div className="flex gap-3 mt-1">
              <a href={CONTACT.socials.instagram} className="h-9 w-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href={CONTACT.socials.linkedin} className="h-9 w-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Links Grid — 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 mb-14">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Agence</h3>
            <ul className="space-y-2.5">
              {footerNav.agence.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Outils gratuits</h3>
            <ul className="space-y-2.5">
              {footerNav.outils.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Zones</h3>
            <ul className="space-y-2.5">
              {footerNav.villes.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Informations</h3>
            <ul className="space-y-2.5">
              {footerNav.informations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} Globe Créateur. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-medium">
             <Link href="/mentions-legales" className="hover:text-indigo-600 dark:hover:text-indigo-400">Mentions légales</Link>
             <Link href="/politique-confidentialite" className="hover:text-indigo-600 dark:hover:text-indigo-400">Confidentialité</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

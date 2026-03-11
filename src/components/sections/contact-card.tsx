import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { AnimateOnScroll } from "@/components/ui/animate"

export function ContactCard({ city }: { city?: string }) {
  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-4xl">
        <AnimateOnScroll>
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950 border border-indigo-100 dark:border-indigo-900/50 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-100/50 dark:bg-violet-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-12">
              {/* Photo */}
              <div className="shrink-0">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-slate-800 shadow-xl">
                  <Image
                    src="/images/team/axel-masson.webp"
                    alt="Axel Masson - Globe Créateur"
                    fill
                    sizes="192px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
                    Votre contact privilégié
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Axel Masson
                  </h3>
                  <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                    Co-fondateur · Stratégie & Web
                  </p>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base max-w-lg">
                  {city
                    ? `Un seul interlocuteur de A à Z pour votre projet${city ? ` à ${city}` : ""}. Je me déplace pour vous rencontrer, comprendre votre marché et construire une stratégie qui vous ressemble.`
                    : "Un seul interlocuteur de A à Z. Je me déplace pour vous rencontrer, comprendre votre marché et construire une stratégie sur-mesure pour votre entreprise."}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Link
                    href="/devis"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-lg shadow-indigo-600/25"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Discutons de votre projet
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/axel-masson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}

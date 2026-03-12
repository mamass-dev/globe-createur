import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_LOCALE } from "@/lib/constants"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocalBusinessSchema } from "@/components/seo/local-business"
import { WebSiteSchema } from "@/components/seo/schemas"
import { Cursor } from "@/components/ui/cursor"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { LeadMagnet } from "@/components/ui/lead-magnet"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Globe Créateur - Studio Digital & Innovation",
    template: "%s | Globe Créateur",
  },
  description: "Studio de création digitale à Dijon. Nous concevons des expériences web immersives et des stratégies business pour les marques de demain.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6366f1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()` }} />
      </head>
      {/*
        ╔═══════════════════════════════════════════════╗
        ║  Bien joué, tu lis le code source ! 🕵️       ║
        ║                                               ║
        ║  Tape le Konami Code sur la homepage :        ║
        ║  ↑ ↑ ↓ ↓ B A                                 ║
        ║                                               ║
        ║  Globe Créateur — globecreateur.fr             ║
        ║  Construit avec Next.js, React 19 & Tailwind  ║
        ║  contact@globecreateur.fr                     ║
        ╚═══════════════════════════════════════════════╝
      */}
      <body className={`${inter.className} flex min-h-dvh flex-col antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <LocalBusinessSchema />
        <WebSiteSchema />
        <Header />
        <main className="flex-1 relative overflow-x-clip">{children}</main>
        <Footer />
        <WhatsAppButton />
        <LeadMagnet />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

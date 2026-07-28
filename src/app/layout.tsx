import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { SITE_NAME, SITE_URL, SITE_LOCALE } from "@/lib/constants"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocalBusinessSchema } from "@/components/seo/local-business"
import { WebSiteSchema, OrganizationSchema } from "@/components/seo/schemas"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { LeadMagnet } from "@/components/ui/lead-magnet"
import { GrainOverlay } from "@/components/ui/grain"
import { HideOnCard } from "@/components/layout/hide-on-card"
import "./globals.css"

const monument = localFont({
  variable: "--font-monument",
  display: "swap",
  src: [
    { path: "../../public/fonts/MonumentGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/MonumentGrotesk-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/MonumentGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/MonumentGrotesk-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../../public/fonts/MonumentGrotesk-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/MonumentGrotesk-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
})

const monumentMono = localFont({
  variable: "--font-monument-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/MonumentGrotesk-Mono.woff2", weight: "400", style: "normal" },
  ],
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
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`dark ${monument.variable} ${monumentMono.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://img.youtube.com" />
      </head>
      {/*
        ╔═══════════════════════════════════════════════╗
        ║  Bien joué, tu lis le code source ! 🕵️       ║
        ║                                               ║
        ║  Tape le Konami Code sur la homepage :        ║
        ║  ↑ ↑ ↓ ↓ B A                                 ║
        ║                                               ║
        ║  Globe Créateur - globecreateur.fr             ║
        ║  Construit avec Next.js, React 19 & Tailwind  ║
        ║  contact@globecreateur.fr                     ║
        ╚═══════════════════════════════════════════════╝
      */}
      <body className={`${monument.className} flex min-h-dvh flex-col antialiased bg-[#0a0a0a] text-[#f5f2ec]`}>
        <LocalBusinessSchema />
        <WebSiteSchema />
        <OrganizationSchema />
        <GrainOverlay />
        <HideOnCard>
          <Header />
        </HideOnCard>
        <main className="flex-1 relative overflow-x-clip">{children}</main>
        <HideOnCard>
          <Footer />
          <WhatsAppButton />
          <LeadMagnet />
        </HideOnCard>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_LOCALE } from "@/lib/constants"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LocalBusinessSchema } from "@/components/seo/local-business"
import { Cursor } from "@/components/ui/cursor"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} flex min-h-dvh flex-col antialiased bg-white text-slate-900`}>
        <LocalBusinessSchema />
        <Header />
        <main className="flex-1 relative overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

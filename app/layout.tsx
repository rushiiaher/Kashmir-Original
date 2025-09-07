import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Kashmir Bazaar — Authentic Kashmiri Products",
    template: "%s | Kashmir Bazaar",
  },
  description:
    "Shop authentic Kashmiri products from verified local vendors. Pashmina, saffron, carpets, handicrafts and more.",
  keywords: ["Kashmir", "Pashmina", "Handicrafts", "Saffron", "Carpets", "Papier-mâché", "Walnut woodwork", "Kashmiri", "Multi-vendor", "E-commerce"],
  alternates: {
    canonical: "/",
    sitemap: "/sitemap.xml",
  },
  openGraph: {
    type: "website",
    siteName: "Kashmir Bazaar",
    title: "Kashmir Bazaar — Authentic Kashmiri Products",
    description:
      "Shop authentic Kashmiri products from verified local vendors. Pashmina, saffron, carpets, handicrafts and more.",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kashmir Bazaar — Authentic Kashmiri Products",
    description:
      "Shop authentic Kashmiri products from verified local vendors. Pashmina, saffron, carpets, handicrafts and more.",
  },
  icons: { icon: "/favicon.ico" },

  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

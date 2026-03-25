import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SiteShell from "@/components/layout/SiteShell"
import CustomCursor from "@/components/interactions/CustomCursor"
import KonamiCode from "@/components/interactions/KonamiCode"
import ThemeProvider from "@/components/layout/ThemeProvider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})


export const metadata: Metadata = {
  title: "Eden Sabach — Product Designer",
  description:
    "Portfolio of Eden Sabach, UX/UI product designer at Lightricks (Facetune, Videoleap). Studied at Bezalel Academy of Arts and Design.",
  openGraph: {
    title: "Eden Sabach — Product Designer",
    description: "Product design work from Facetune, Videoleap, and beyond.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CustomCursor />
          <KonamiCode />
          <SiteShell>{children}</SiteShell>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

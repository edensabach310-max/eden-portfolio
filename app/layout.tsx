import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CustomCursor from "@/components/interactions/CustomCursor"
import KonamiCode from "@/components/interactions/KonamiCode"

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
    <html lang="en" className={inter.variable}>
      <body>
        <CustomCursor />
        <KonamiCode />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith("/studio")

  return (
    <>
      {!isStudio && <Navbar />}
      <main>{children}</main>
      {!isStudio && <Footer />}
    </>
  )
}

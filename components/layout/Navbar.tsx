"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import ProximityText from "@/components/ui/ProximityText"

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/play", label: "Play" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [logoClicks, setLogoClicks] = useState(0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleLogoClick = () => {
    const next = logoClicks + 1
    setLogoClicks(next)
    if (next >= 3) {
      setLogoClicks(0)
      window.location.href = "/play"
    }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div
        className={`flex items-center justify-between py-5 transition-all duration-500 ${
          scrolled ? "border-b border-card" : ""
        }`}
        style={{
          background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        {/* Logo — proximity weight effect */}
        <button
          onClick={handleLogoClick}
          title={logoClicks > 0 ? `${3 - logoClicks} more…` : "Eden Fainberg Sabach"}
          className="text-ink"
        >
          <ProximityText
            text="Eden Fainberg Sabach"
            style={{ fontSize: "0.95rem", letterSpacing: "0.01em" }}
          />
        </button>

        {/* Nav links — simple underline hover */}
        <nav className="flex items-center gap-8 font-sans text-sm">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover-underline transition-colors duration-200 ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}

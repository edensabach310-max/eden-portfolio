"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

import ProximityText from "@/components/ui/ProximityText"
import NavStickers from "./NavStickers"
import YinYangToggle from "@/components/ui/YinYangToggle"

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])


  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[999] px-6 md:px-12 transition-all duration-500"
      style={{
        background: scrolled ? "color-mix(in srgb, var(--color-bg) 85%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(6px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-card)" : "none",
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="/" className="text-ink">
          {/* Desktop: proximity text animation */}
          <span className="hidden md:inline">
            <ProximityText
              text="Eden Fainberg Sabach"
              style={{ fontSize: "1.875rem", letterSpacing: "-0.01em", fontWeight: 300 }}
            />
          </span>
          {/* Mobile: simple name */}
          <span
            className="md:hidden t-body whitespace-nowrap"
            style={{ fontSize: "1.125rem", letterSpacing: "-0.01em" }}
          >
            Eden Sabach
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-4 md:gap-6 t-body text-lg md:text-3xl">
          <span className="hidden md:contents">
            <NavStickers />
          </span>
          {links.map((link) => {
            const active =
              (link.href === "/#work" && pathname === "/") ||
              (link.href !== "/#work" && pathname.startsWith(link.href))
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
          <YinYangToggle />
        </nav>
      </div>
    </motion.header>
  )
}

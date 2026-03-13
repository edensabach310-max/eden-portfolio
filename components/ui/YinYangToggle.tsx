"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function YinYangToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div style={{ width: 32, height: 32 }} />

  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.88 }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", padding: 0 }}
    >
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 100 100"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left half — dark */}
        <path
          d="M50,5 A45,45 0 0,0 50,95 A22.5,22.5 0 0,0 50,50 A22.5,22.5 0 0,1 50,5 Z"
          fill="currentColor"
        />
        {/* Right half — light */}
        <path
          d="M50,5 A45,45 0 0,1 50,95 A22.5,22.5 0 0,1 50,50 A22.5,22.5 0 0,0 50,5 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Top dot — light in dark half */}
        <circle cx="50" cy="27.5" r="8" fill="white" />
        {/* Bottom dot — dark in light half */}
        <circle cx="50" cy="72.5" r="8" fill="currentColor" />
        {/* Outer ring */}
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      </motion.svg>
    </motion.button>
  )
}

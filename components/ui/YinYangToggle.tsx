"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function YinYangToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div style={{ width: 34, height: 34 }} />

  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      whileTap={{ scale: 0.88 }}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", padding: 0 }}
    >
      <motion.svg
        width="34"
        height="34"
        viewBox="0 0 256 256"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Light half — white fill */}
        <circle cx="128" cy="128" r="104" fill="white" />

        {/* Dark half — black S-shape */}
        <path
          d="M128,24 A104,104 0 1 1 128,232 A52,52 0 0 0 128,128 A52,52 0 0 1 128,24 Z"
          fill="#111111"
        />

        {/* White dot in dark half */}
        <circle cx="128" cy="76" r="18" fill="white" />

        {/* Dark dot in light half */}
        <circle cx="128" cy="180" r="18" fill="#111111" />

        {/* Outer ring */}
        <circle cx="128" cy="128" r="104" fill="none" stroke="currentColor" strokeWidth="5" />
      </motion.svg>
    </motion.button>
  )
}

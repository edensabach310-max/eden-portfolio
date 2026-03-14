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
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 256 256"
        fill="currentColor"
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40,128a88.1,88.1,0,0,1,88-88,40,40,0,0,1,0,80A56,56,0,0,0,77.39,200,88,88,0,0,1,40,128Zm88,88a40,40,0,0,1,0-80,56,56,0,0,0,50.61-79.95A88,88,0,0,1,128,216Zm12-40a12,12,0,1,1-12-12A12,12,0,0,1,140,176ZM116,80a12,12,0,1,1,12,12A12,12,0,0,1,116,80Z" />
      </motion.svg>
    </motion.button>
  )
}

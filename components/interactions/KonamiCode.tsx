"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
]

function Confetti() {
  const colors = ["#0057FF", "#FF3D7F", "#C8F135", "#1A4D2E", "#111111"]
  const pieces = Array.from({ length: 80 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {pieces.map((i) => {
        const color = colors[i % colors.length]
        const x = Math.random() * 100
        const delay = Math.random() * 0.5
        const duration = 2 + Math.random() * 2
        const size = 6 + Math.random() * 10
        const rotation = Math.random() * 720 - 360

        return (
          <motion.div
            key={i}
            className="absolute top-0 rounded-sm"
            style={{
              left: `${x}%`,
              width: size,
              height: size * 0.6,
              backgroundColor: color,
            }}
            initial={{ y: -20, rotate: 0, opacity: 1 }}
            animate={{
              y: "110vh",
              rotate: rotation,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration,
              delay,
              ease: "easeIn",
            }}
          />
        )
      })}
    </div>
  )
}

export default function KonamiCode() {
  const [, setKeys] = useState<string[]>([])
  const [activated, setActivated] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length)
        if (next.join(",") === KONAMI.join(",")) {
          setActivated(true)
          setTimeout(() => setActivated(false), 4000)
        }
        return next
      })
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <AnimatePresence>
      {activated && (
        <>
          <Confetti />
          <motion.div
            className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center">
              <div className="font-display text-[8rem] leading-none">🎮</div>
              <div className="font-display text-display-md text-ink mt-4">
                You found it.
              </div>
              <div className="font-sans text-muted mt-2">
                The classic move.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [label, setLabel] = useState("")
  const [isTouch, setIsTouch] = useState(true) // start hidden, reveal only on pointer:fine

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches)
  }, [])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 400, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28 })

  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [data-cursor]")
      if (interactive) {
        setIsHovering(true)
        const cursorLabel = interactive.getAttribute("data-cursor-label") || ""
        setLabel(cursorLabel)
      } else {
        setIsHovering(false)
        setLabel("")
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          width: isHovering ? (label ? 80 : 44) : 32,
          height: isHovering ? (label ? 80 : 44) : 32,
          borderColor: isHovering ? "#0057FF" : "#111111",
          scale: isClicking ? 0.85 : 1,
          backgroundColor: isHovering ? "rgba(0,87,255,0.08)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
          border: "1.5px solid #111111",
          borderRadius: "50%",
        }}
      >
        {label && (
          <span className="text-[10px] font-sans text-blue font-medium tracking-wide text-center leading-tight px-1">
            {label}
          </span>
        )}
      </motion.div>

      {/* Center dot */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-1 h-1 bg-ink rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: isClicking ? 2 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}

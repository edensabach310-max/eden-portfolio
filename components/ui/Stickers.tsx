"use client"

import Image from "next/image"
import { motion, animate, useMotionValue, type MotionValue } from "framer-motion"
import { useEffect } from "react"

interface StickerScatter {
  x: MotionValue<string>
  y: MotionValue<string>
  rotate: MotionValue<number>
  opacity: MotionValue<number>
}

// ─── Sticker image list ───────────────────────────────────────────────────────
// Drop PNG files (transparent background) into /public/stickers/
// with these filenames, or edit the list below.

export const STICKER_FILES = [
  "kali.png",
  "flowers.png",
  "smiley.png",
  "butterfly.png",
  "monkey.png",
  "golden-dog.png",
  "bow.png",
  "dice-yellow.png",
  "dice-orange.png",
  "dice-purple.png",
  "dice-pink.png",
  "dice-teal.png",
  "fish.png",
  "disco-ball.png",
  "macbook.png",
] as const

export type StickerFile = (typeof STICKER_FILES)[number]

// ─── Inline sticker (used inside hero text) ───────────────────────────────────

interface InlineStickerProps {
  src: string
  /** CSS size — use em units to scale with parent font-size */
  size?: string
  rotate?: number
  alt?: string
  /** Scroll-driven scatter animation values */
  scatter?: StickerScatter
}

export function InlineSticker({ src, size = "0.75em", rotate = 0, alt = "", scatter }: InlineStickerProps) {
  return (
    <motion.span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        verticalAlign: "middle",
        lineHeight: 0,
        flexShrink: 0,
        rotate: scatter?.rotate ?? rotate,
        x: scatter?.x,
        y: scatter?.y,
        opacity: scatter?.opacity,
        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.18))",
      }}
    >
      <Image src={src} alt={alt} width={80} height={80} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </motion.span>
  )
}

// ─── Spawnable sticker (used for click-to-drop on hero) ──────────────────────

interface SpawnStickerProps {
  src: string
  x: number
  y: number
  size: number
  rotate: number
  onRemove: () => void
}

export function SpawnSticker({ src, x, y, size, rotate, onRemove }: SpawnStickerProps) {
  const xMv      = useMotionValue(0)
  const yMv      = useMotionValue(0)
  const rotateMv = useMotionValue(rotate)
  const opacityMv = useMotionValue(1)

  useEffect(() => {
    let fired = false
    const flyOut = () => {
      if (fired) return
      fired = true
      window.removeEventListener("scroll", onScroll)
      // Small random stagger so stickers don't all leave at identical frame
      const stagger = Math.random() * 300
      setTimeout(() => {
        const fallDist = window.innerHeight - yMv.get() + 200 // fall to below screen
        const driftX   = (Math.random() - 0.5) * 180
        const tumble   = (Math.random() - 0.5) * 80
        const opts = { duration: 0.85, ease: [0.4, 0, 1, 1] } as const
        animate(yMv, yMv.get() + fallDist, { ...opts, onComplete: onRemove })
        animate(xMv, xMv.get() + driftX, opts)
        animate(rotateMv, rotateMv.get() + tumble, { duration: 0.85 })
      }, stagger)
    }
    const onScroll = () => { if (window.scrollY > 60) flyOut() }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        position: "fixed",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        x: xMv,
        y: yMv,
        rotate: rotateMv,
        opacity: opacityMv,
        zIndex: 200,
        cursor: "grab",
        touchAction: "none",
        filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.18))",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      whileDrag={{ scale: 1.12, cursor: "grabbing" }}
    >
      <Image src={src} alt="" width={120} height={120} style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} />
    </motion.div>
  )
}

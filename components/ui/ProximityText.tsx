"use client"

import React, { useRef, useEffect, useCallback } from "react"

interface ProximityTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  minWeight?: number
  maxWeight?: number
  sigma?: number
  sigmaY?: number
  fontFamily?: string
}

export default function ProximityText({
  text,
  className,
  style,
  minWeight = 300,
  maxWeight = 800,
  sigma = 60,
  sigmaY,
  fontFamily = "var(--font-inter), sans-serif",
}: ProximityTextProps) {
  const sy = sigmaY ?? sigma
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cachedRects = useRef<{ cx: number; cy: number; h: number; hw: number; hh: number }[]>([])
  const currentWeights = useRef<number[]>([])
  const prevMouse = useRef<{ x: number; y: number } | null>(null)

  const updateRects = useCallback(() => {
    cachedRects.current = letterRefs.current.map((el) => {
      if (!el) return { cx: 0, cy: 0, h: 0, hw: 0, hh: 0 }
      const r = el.getBoundingClientRect()
      return {
        cx: r.left + r.width / 2,
        cy: r.top + r.height / 2,
        h: r.height,
        hw: r.width / 2,   // half-width
        hh: r.height / 2,  // half-height
      }
    })
  }, [])

  const resetWeights = useCallback(() => {
    prevMouse.current = null
    letterRefs.current.forEach((el, i) => {
      if (!el) return
      currentWeights.current[i] = minWeight
      el.style.transition = "font-variation-settings 1.4s ease-out"
      el.style.fontVariationSettings = `'wght' ${minWeight}`
    })
  }, [minWeight])

  useEffect(() => {
    // Delay initial cache until after mount animations settle
    const t1 = setTimeout(updateRects, 100)
    const t2 = setTimeout(updateRects, 800)
    window.addEventListener("resize", updateRects)
    window.addEventListener("scroll", updateRects, { passive: true })
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener("resize", updateRects)
      window.removeEventListener("scroll", updateRects)
    }
  }, [updateRects])

  useEffect(() => {
    const sig2 = 2 * sigma * sigma
    const sy2 = 2 * sy * sy

    const onMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      const prev = prevMouse.current
      prevMouse.current = { x: mx, y: my }

      letterRefs.current.forEach((el, i) => {
        if (!el) return
        const { cx, cy, h, hw } = cachedRects.current[i] ?? { cx: 0, cy: 0, h: 0, hw: 0, hh: 0 }

        // Find closest point on movement path [prev → current]
        let pathX = mx
        let pathY = my

        if (prev) {
          const lx = mx - prev.x
          const ly = my - prev.y
          const len2 = lx * lx + ly * ly
          if (len2 > 0) {
            const tParam = Math.max(0, Math.min(1, ((cx - prev.x) * lx + (cy - prev.y) * ly) / len2))
            const closestX = prev.x + tParam * lx
            const closestY = prev.y + tParam * ly
            // Use closest path point if nearer to letter center
            if ((closestX - cx) ** 2 + (closestY - cy) ** 2 < (pathX - cx) ** 2 + (pathY - cy) ** 2) {
              pathX = closestX
              pathY = closestY
            }
          }
        }

        // dx: 0 if cursor within letter's horizontal bounds (whole letter = "center zone")
        const dx = Math.max(0, Math.abs(pathX - cx) - hw)
        const dy = pathY - cy

        let w: number
        if (Math.abs(dy) > h * 1.4) {
          w = minWeight
        } else {
          const rawT = Math.exp(-(dx * dx) / sig2 - (dy * dy) / sy2)
          const t = Math.min(1, rawT * 60)
          w = Math.round(minWeight + (maxWeight - minWeight) * t)
        }

        const prevW = currentWeights.current[i] ?? minWeight
        if (prevW !== w) {
          currentWeights.current[i] = w
          el.style.transition = w > prevW ? "font-variation-settings 0s" : "font-variation-settings 1.4s ease-out"
          el.style.fontVariationSettings = `'wght' ${w}`
        }
      })
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", resetWeights)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", resetWeights)
    }
  }, [minWeight, maxWeight, sigma, sy, resetWeights])

  return (
    <span className={className} style={style}>
      {text.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => { letterRefs.current[i] = el }}
          style={{
            display: "inline-block",
            fontFamily,
            fontVariationSettings: `'wght' ${minWeight}`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  )
}

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
  const containerRef = useRef<HTMLSpanElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const cachedRects = useRef<{ cx: number; cy: number; h: number }[]>([])
  const currentWeights = useRef<number[]>([])
  const prevMouse = useRef<{ x: number; y: number } | null>(null)

  const updateRects = useCallback(() => {
    cachedRects.current = letterRefs.current.map((el) => {
      if (!el) return { cx: 0, cy: 0, h: 0 }
      const r = el.getBoundingClientRect()
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, h: r.height }
    })
  }, [])

  const resetWeights = useCallback(() => {
    prevMouse.current = null
    letterRefs.current.forEach((el, i) => {
      if (!el) return
      currentWeights.current[i] = minWeight
      el.style.transition = "font-variation-settings 0.8s ease-out"
      el.style.fontVariationSettings = `'wght' ${minWeight}`
    })
  }, [minWeight])

  useEffect(() => {
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

  // Desktop: mouse proximity animation
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const sig2 = 2 * sigma * sigma
    const sy2 = 2 * sy * sy

    const onMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      const prev = prevMouse.current
      prevMouse.current = { x: mx, y: my }

      letterRefs.current.forEach((el, i) => {
        if (!el) return
        const { cx, cy, h } = cachedRects.current[i] ?? { cx: 0, cy: 0, h: 0 }

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
            if ((closestX - cx) ** 2 + (closestY - cy) ** 2 < (pathX - cx) ** 2 + (pathY - cy) ** 2) {
              pathX = closestX
              pathY = closestY
            }
          }
        }

        const dx = pathX - cx
        const dy = pathY - cy

        let w: number
        if (Math.abs(dy) > h * 0.6) {
          w = minWeight
        } else {
          const rawT = Math.exp(-(dx * dx) / sig2 - (dy * dy) / sy2)
          const t = Math.min(1, rawT * 1.2)
          w = Math.round(minWeight + (maxWeight - minWeight) * t)
        }

        const prevW = currentWeights.current[i] ?? minWeight
        if (prevW !== w) {
          currentWeights.current[i] = w
          el.style.transition = w > prevW ? "font-variation-settings 0s" : "font-variation-settings 0.8s ease-out"
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

  // Mobile: scroll-based weight animation
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const rect = container.getBoundingClientRect()
      const viewH = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const distance = Math.abs(elementCenter - viewH * 0.5)
      // Peaks at viewport center, fades to minWeight at 60% of viewH away
      const t = Math.max(0, 1 - distance / (viewH * 0.6))
      const weight = Math.round(minWeight + (maxWeight - minWeight) * t)

      letterRefs.current.forEach((el) => {
        if (!el) return
        el.style.transition = "font-variation-settings 0.25s ease-out"
        el.style.fontVariationSettings = `'wght' ${weight}`
      })
    }

    window.addEventListener("scroll", update, { passive: true })
    update()
    return () => window.removeEventListener("scroll", update)
  }, [minWeight, maxWeight])

  return (
    <span ref={containerRef} className={className} style={style}>
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

"use client"

import React, { useRef, useEffect, useCallback } from "react"

interface ProximityTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  minWeight?: number
  maxWeight?: number
  sigma?: number        // px — horizontal radius
  sigmaY?: number       // px — vertical radius (defaults to 2× sigma for equal feel)
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
  const sy = sigmaY ?? sigma * 2
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  const resetWeights = useCallback(() => {
    letterRefs.current.forEach((el) => {
      if (!el) return
      el.style.transition = "font-variation-settings 0.5s ease"
      el.style.fontVariationSettings = `'wght' ${minWeight}`
    })
  }, [minWeight])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const mx = e.clientX
      const my = e.clientY
      letterRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = mx - cx
        const dy = my - cy
        const t = Math.exp(-(dx * dx) / (2 * sigma * sigma) - (dy * dy) / (2 * sy * sy))
        const w = Math.round(minWeight + (maxWeight - minWeight) * t)
        el.style.transition = "font-variation-settings 0.05s linear"
        el.style.fontVariationSettings = `'wght' ${w}`
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

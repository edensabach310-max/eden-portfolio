"use client"

import React, { useRef, useEffect, useCallback } from "react"

interface ProximityTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  minWeight?: number
  maxWeight?: number
  sigma?: number        // px — radius of the gravity field
  fontFamily?: string
}

export default function ProximityText({
  text,
  className,
  style,
  minWeight = 300,
  maxWeight = 800,
  sigma = 60,
  fontFamily = "var(--font-inter), sans-serif",
}: ProximityTextProps) {
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
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2)
        const t = Math.exp(-(dist * dist) / (2 * sigma * sigma))
        const w = Math.round(minWeight + (maxWeight - minWeight) * t)
        el.style.transition = "font-variation-settings 0.04s linear"
        el.style.fontVariationSettings = `'wght' ${w}`
      })
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", resetWeights)
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", resetWeights)
    }
  }, [minWeight, maxWeight, sigma, resetWeights])

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

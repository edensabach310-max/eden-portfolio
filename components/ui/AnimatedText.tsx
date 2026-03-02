"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  tag?: "h1" | "h2" | "h3" | "p" | "div" | "span"
}

export default function AnimatedText({
  text,
  className = "",
  style,
  delay = 0,
  tag: Tag = "div",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-5%" })

  const words = text.split(" ")

  return (
    <Tag className={className} style={style}>
      <span ref={ref} className="inline" aria-hidden>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
            style={{ paddingBottom: "0.15em", marginBottom: "-0.15em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: delay + i * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

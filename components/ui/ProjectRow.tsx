"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import type { Project } from "@/types"

interface ProjectRowProps {
  project: Project
  index: number
}

export default function ProjectRow({ project, index }: ProjectRowProps) {
  const [hovered, setHovered] = useState(false)
  const accent = project.accentColor || "#0057FF"

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group relative flex items-center border-b-2 border-ink/40 py-2 md:py-3 overflow-x-hidden gap-5 md:gap-7"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor
      data-cursor-label="Open"
    >
      {/* Subtle hover tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: `${accent}0D` }}
      />

      {/* Index circle — number morphs to arrow on hover */}
      <div
        className="flex-shrink-0 relative z-10 flex items-center justify-center rounded-full overflow-hidden"
        style={{ width: 84, height: 84, backgroundColor: accent }}
      >
        {/* Number — slides out upward on hover */}
        <motion.span
          className="absolute font-sans font-medium tabular-nums"
          style={{ fontSize: "2.7rem", letterSpacing: "-0.04em", color: "#111111", lineHeight: 1 }}
          animate={{ y: hovered ? "-110%" : "0%", opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Arrow — slides in from below on hover */}
        <motion.span
          className="absolute font-sans font-medium"
          style={{ fontSize: "2.2rem", color: "#111111", lineHeight: 1 }}
          animate={{ y: hovered ? "0%" : "110%", opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          →
        </motion.span>
      </div>

      {/* Title */}
      <div className="flex-1 relative z-10 min-w-0">
        <motion.div
          className="font-sans font-medium leading-none"
          style={{
            fontSize: "clamp(2rem, 5vw, 4.2rem)",
            letterSpacing: "-0.03em",
          }}
          animate={{ color: hovered ? accent : "#111111" }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.div>
      </div>

      {/* Role + year — desktop only */}
      <div className="hidden md:flex items-center gap-8 flex-shrink-0 relative z-10">
        <motion.span
          className="font-sans text-xs uppercase tracking-widest"
          animate={{ color: hovered ? `${accent}CC` : "#8C8C8C" }}
          transition={{ duration: 0.2 }}
        >
          {project.role}
        </motion.span>
        <motion.span
          className="font-sans font-bold text-sm w-10 text-right"
          animate={{ color: hovered ? `${accent}99` : "#8C8C8C" }}
          transition={{ duration: 0.2 }}
        >
          {project.year}
        </motion.span>
      </div>

      {/* Arrow */}
      <motion.span
        className="relative z-10 flex-shrink-0 font-bold text-base"
        animate={{
          x: hovered ? 6 : 0,
          opacity: hovered ? 1 : 0.2,
          color: hovered ? accent : "#111111",
        }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </Link>
  )
}

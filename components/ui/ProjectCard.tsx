"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import type { Project } from "@/types"

interface ProjectCardProps {
  project: Project
  index: number
  large?: boolean
}

export default function ProjectCard({ project, large = false }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const accent = project.accentColor || "#0057FF"

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
    >
      <Link
        href={`/work/${project.slug.current}`}
        data-cursor
        data-cursor-label="View"
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image area */}
        <div className={`relative overflow-hidden rounded-sm mb-4 ${large ? "aspect-[4/3]" : "aspect-[3/2]"}`}>
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundColor: hovered ? `${accent}26` : "#E8E8E0" }}
            transition={{ duration: 0.35 }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-display font-bold select-none"
              style={{ color: accent, opacity: 0.25, fontSize: "clamp(4rem, 12vw, 8rem)" }}
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.title.charAt(0)}
            </motion.span>
          </div>

          <div className="absolute top-4 right-4 font-mono text-xs text-muted bg-bg/80 backdrop-blur-sm px-2 py-1 rounded-full">
            {project.year}
          </div>

          <motion.div
            className="absolute bottom-4 left-4 font-sans text-xs tracking-widest uppercase px-3 py-1.5 rounded-full"
            animate={{
              backgroundColor: hovered ? accent : "rgba(245,245,240,0.9)",
              color: hovered ? "#F5F5F0" : "#8C8C8C",
            }}
            transition={{ duration: 0.25 }}
          >
            {project.category === "product" ? "Product" : "Creative"}
          </motion.div>
        </div>

        {/* Text */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-4">
            <motion.h3
              className={`font-display ${large ? "text-2xl" : "text-xl"}`}
              animate={{ color: hovered ? accent : "#111111" }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
            <motion.span
              className="text-muted mt-0.5 flex-shrink-0 text-sm"
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </div>
          <p className="font-sans text-sm text-muted leading-relaxed">{project.tagline}</p>
          {project.role && (
            <p className="font-mono text-xs text-muted/60 pt-0.5">{project.role}</p>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

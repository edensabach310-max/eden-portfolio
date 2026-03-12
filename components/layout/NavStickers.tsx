"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { sanityClient } from "@/lib/sanity"

type ProjectStub = { slug: { current: string }; accentColor: string; order: number }

const ROTATIONS = [-7, 5, -4, 8, -6, 4, -8, 6]

function StickerItem({
  slug, accentColor, index, isActive,
}: {
  slug: string; accentColor: string; index: number; isActive: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const rotate = ROTATIONS[index % ROTATIONS.length]
  const filled = isActive || hovered
  const label = String(index + 1).padStart(2, "0")

  return (
    <motion.div style={{ rotate }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
      <Link
        href={`/work/${slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            animate={{ background: filled ? accentColor : "transparent" }}
            transition={{ duration: 0.2 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "1.5px solid #111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: 19,
              color: "#111",
            }}
          >
            {label}
          </motion.div>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: -18,
              fontSize: 13,
              color: "#111",
              fontFamily: "var(--font-sans)",
              pointerEvents: "none",
            }}
          >
            ↑
          </motion.span>
        </div>
      </Link>
    </motion.div>
  )
}

export default function NavStickers() {
  const pathname = usePathname()
  const [projects, setProjects] = useState<ProjectStub[]>([])

  useEffect(() => {
    sanityClient
      .fetch<ProjectStub[]>(
        `*[_type == "project" && category == "product"] | order(order asc) { slug, accentColor, order }`
      )
      .then(setProjects)
  }, [])

  if (!projects.length) return null

  const currentSlug = pathname?.startsWith("/work/") ? pathname.replace("/work/", "") : null

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {projects.map((p, i) => (
        <StickerItem
          key={p.slug.current}
          slug={p.slug.current}
          accentColor={p.accentColor || "#0057FF"}
          index={i}
          isActive={p.slug.current === currentSlug}
        />
      ))}
    </div>
  )
}

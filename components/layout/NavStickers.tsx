"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { sanityClient } from "@/lib/sanity"

type ProjectStub = { slug: { current: string }; accentColor: string; order: number }

function StickerItem({
  slug, accentColor, index, isActive,
}: {
  slug: string; accentColor: string; index: number; isActive: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const filled = isActive || hovered
  const label = String(index + 1).padStart(2, "0")

  return (
    <Link
      href={`/work/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        <motion.div
          animate={{
            background: filled ? accentColor : "transparent",
            boxShadow: filled ? "inset 0 0 0 1.5px transparent" : "inset 0 0 0 1.5px #8C8C8C",
            color: filled ? "#111" : "#8C8C8C",
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 300,
            fontSize: 16,
            letterSpacing: "-0.02em",
            color: "#8C8C8C",
          }}
        >
          {label}
        </motion.div>
      </Link>
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

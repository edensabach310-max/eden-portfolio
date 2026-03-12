"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { sanityClient } from "@/lib/sanity"

type ProjectStub = { slug: { current: string }; accentColor: string; order: number }

const ROTATIONS = [-7, 5, -4, 8, -6, 4, -8, 6]

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
      {projects.map((p, i) => {
        const isActive = p.slug.current === currentSlug
        const rotate = ROTATIONS[i % ROTATIONS.length]
        return (
          <motion.div
            key={p.slug.current}
            style={{ rotate }}
            whileHover={{ scale: 1.15, rotate: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/work/${p.slug.current}`} title={`Project ${String(i + 1).padStart(2, "0")}`}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: p.accentColor || "#0057FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#111",
                  // sticker-style shadow: offset + slight blur, like peeling off the screen
                  filter: isActive
                    ? `drop-shadow(2px 4px 0px rgba(0,0,0,0.35))`
                    : `drop-shadow(1px 3px 0px rgba(0,0,0,0.25))`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

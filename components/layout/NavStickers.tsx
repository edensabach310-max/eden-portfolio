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
            whileHover="hovered"
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/work/${p.slug.current}`} title={`Project ${String(i + 1).padStart(2, "0")}`}>
              <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: p.accentColor || "#0057FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#111",
                    filter: isActive
                      ? `drop-shadow(1px 2px 0px rgba(0,0,0,0.3))`
                      : `drop-shadow(1px 1px 0px rgba(0,0,0,0.2))`,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Arrow that slides up on hover */}
                <motion.span
                  variants={{ hovered: { opacity: 1, y: 0 }, default: { opacity: 0, y: 4 } }}
                  initial="default"
                  style={{
                    position: "absolute",
                    bottom: -18,
                    fontSize: 13,
                    color: "#111",
                    fontFamily: "var(--font-sans)",
                    pointerEvents: "none",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  ↑
                </motion.span>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}

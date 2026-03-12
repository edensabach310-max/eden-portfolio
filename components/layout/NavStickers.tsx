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
    <div className="flex items-center gap-1.5 md:gap-2">
      {projects.map((p, i) => {
        const isActive = p.slug.current === currentSlug
        const rotate = ROTATIONS[i % ROTATIONS.length]
        return (
          <motion.div
            key={p.slug.current}
            style={{ rotate }}
            whileHover={{ scale: 1.2, rotate: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={`/work/${p.slug.current}`} title={`Project ${String(i + 1).padStart(2, "0")}`}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: p.accentColor || "#0057FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#111",
                  opacity: isActive ? 1 : 0.55,
                  boxShadow: isActive
                    ? `0 3px 10px ${p.accentColor}80`
                    : "0 1px 3px rgba(0,0,0,0.12)",
                  transition: "opacity 0.2s",
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

"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useCallback } from "react"
import Link from "next/link"
import ProjectRow from "@/components/ui/ProjectRow"
import AnimatedText from "@/components/ui/AnimatedText"
import { InlineSticker, SpawnSticker, STICKER_FILES } from "@/components/ui/Stickers"
import type { Project } from "@/types"

interface Spawned {
  id: number
  src: string
  x: number
  y: number
  size: number
  rotate: number
}

interface HomeClientProps {
  productProjects: Project[]
  creativeProjects: Project[]
}

export default function HomeClient({ productProjects, creativeProjects }: HomeClientProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [spawned, setSpawned] = useState<Spawned[]>([])

  const handleHeroClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return
    const src = `/stickers/${STICKER_FILES[Math.floor(Math.random() * STICKER_FILES.length)]}`
    const rotate = (Math.random() - 0.5) * 50
    const size = 90 + Math.floor(Math.random() * 50)
    setSpawned((prev) => [
      ...prev.slice(-29),
      { id: Date.now() + Math.random(), src, x: e.clientX, y: e.clientY, size, rotate },
    ])
  }, [])

  return (
    <div className="min-h-screen">
      {/* ── Draggable spawned stickers ────────────────────── */}
      {spawned.map((s) => (
        <SpawnSticker
          key={s.id} src={s.src} x={s.x} y={s.y} size={s.size} rotate={s.rotate}
          onRemove={() => setSpawned((prev) => prev.filter((p) => p.id !== s.id))}
        />
      ))}

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onClick={handleHeroClick}
        className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 cursor-crosshair"
        style={{ userSelect: "none" }}
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            className="font-mono text-xs tracking-widest uppercase text-muted mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Product Designer · Tel Aviv
          </motion.p>

          {/* Editorial hero */}
          <motion.div
            className="font-sans font-medium text-ink"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 7.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              Hi, I&apos;m Eden{" "}
              <InlineSticker src="/stickers/smiley.png" size="0.9em" rotate={10} />
            </div>
            <div>
              <InlineSticker src="/stickers/flowers.png" size="0.85em" rotate={-8} />{" "}
              live in Tel Aviv,
            </div>
            <div>
              love designing{" "}
              <InlineSticker src="/stickers/macbook.png" size="0.9em" rotate={6} />
            </div>
            <div>
              &amp; walking with{" "}
              <InlineSticker src="/stickers/kali.png" size="1em" rotate={-10} />
              {" "}Kali.
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mt-10 gap-6">
            <motion.p
              className="font-sans text-base md:text-lg text-muted max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              Product designer at Lightricks — making AI apps feel effortless
              for millions of people.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <Link
                href="/about"
                onClick={(e) => e.stopPropagation()}
                className="font-sans text-sm text-muted hover:text-ink transition-colors hover-underline"
              >
                About me ↓
              </Link>
            </motion.div>
          </div>

          {/* Hint — appears late, very subtle */}
          <motion.p
            className="font-mono text-[10px] text-muted/30 tracking-widest uppercase mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.5 }}
          >
            click to sticker
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute right-6 md:right-12 bottom-20 flex flex-col items-center gap-2">
          <motion.div
            className="w-px h-16 bg-muted/40 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <span className="font-mono text-[10px] text-muted/60 tracking-widest uppercase rotate-90 mt-2">
            scroll
          </span>
        </div>
      </section>

      {/* ── Work Section ───────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-12 pb-8">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-sans font-bold text-ink tracking-tight uppercase" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "0.04em" }}>
            Selected Work
          </span>
          <span className="font-sans text-xs uppercase tracking-widest text-muted">{productProjects.length} projects</span>
        </div>

        {productProjects.map((project, i) => (
          <ProjectRow key={project._id} project={project} index={i} />
        ))}
      </section>

      {/* ── Creative / Play ────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-12 pb-24">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-sans font-bold text-ink tracking-tight uppercase" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "0.04em" }}>
            <span className="text-muted">(not a product)</span> design projects
          </span>
          <span className="font-sans text-xs uppercase tracking-widest text-muted">{creativeProjects.length} projects</span>
        </div>

        {creativeProjects.map((project, i) => (
          <ProjectRow key={project._id} project={project} index={i} />
        ))}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="border-t border-card px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <AnimatedText
            text="Let's make something great."
            className="font-display text-display-md text-ink max-w-lg"
          />
          <Link
            href="mailto:eden@example.com"
            data-cursor
            data-cursor-label="Email"
            className="font-sans text-sm border border-ink text-ink px-8 py-4 hover:bg-ink hover:text-bg transition-colors duration-300 tracking-wide"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}

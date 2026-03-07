"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import ProjectRow from "@/components/ui/ProjectRow"
import AnimatedText from "@/components/ui/AnimatedText"
import { InlineSticker } from "@/components/ui/Stickers"
import type { Project } from "@/types"

interface HomeClientProps {
  productProjects: Project[]
  creativeProjects: Project[]
}

export default function HomeClient({ productProjects, creativeProjects }: HomeClientProps) {
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32">
        <motion.div>
          <motion.p
            className="font-sans text-xl md:text-3xl font-light text-muted mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Product Designer · Tel Aviv
          </motion.p>

          {/* Editorial hero */}
          <motion.div
            className="font-sans font-light text-ink"
            style={{
              fontSize: "clamp(2rem, 8.5vw, 7.5rem)",
              letterSpacing: "-0.02em",
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
              className="font-sans text-xl md:text-3xl font-light text-muted max-w-xl leading-normal"
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
                className="font-sans text-xl md:text-3xl font-light text-muted hover:text-ink transition-colors hover-underline"
              >
                About me ↓
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute right-6 md:right-12 bottom-20 hidden md:flex flex-col items-center gap-2">
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
      <section id="work" className="px-6 md:px-12 pt-12 pb-8">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-sans text-xl md:text-3xl font-light text-ink">
            Selected Work
          </span>
          <span className="font-sans text-xl md:text-3xl font-light text-muted">{productProjects.length} projects</span>
        </div>

        {productProjects.map((project, i) => (
          <ProjectRow key={project._id} project={project} index={i} />
        ))}
      </section>

      {/* ── Creative / Play ────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-12 pb-24">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-4 mb-0">
          <span className="font-sans text-xl md:text-3xl font-light text-ink">
            <span className="text-muted">(not a product)</span> design projects
          </span>
          <span className="font-sans text-xl md:text-3xl font-light text-muted">{creativeProjects.length} projects</span>
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
            className="font-sans font-light text-ink max-w-lg"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
          />
          <Link
            href="mailto:eden@example.com"
            data-cursor
            data-cursor-label="Email"
            className="font-sans text-base md:text-3xl font-light border border-ink text-ink px-6 md:px-8 py-3 md:py-4 hover:bg-ink hover:text-bg transition-colors duration-300"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}

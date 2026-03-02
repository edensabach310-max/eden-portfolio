"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"
import { placeholderAbout } from "@/lib/placeholder-data"

const about = placeholderAbout

// ─── Polaroid Wall ────────────────────────────────────────────────────────────

type StickerDef = { src: string; top: number; left: number; size: number; rotate: number }

function Polaroid({
  src,
  alt,
  rotate,
  top,
  left,
  stickers,
  delay,
}: {
  src: string
  alt: string
  rotate: number
  top: number
  left: number
  stickers: StickerDef[]
  delay: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: 240 }}
      initial={{ opacity: 0, y: 30, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Polaroid image — already has white border baked in */}
      <Image src={src} alt={alt} width={240} height={340} className="object-contain" />

      {/* Stickers ON the photo — positioned to look like they're pinning it */}
      {stickers.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, transform: `rotate(${s.rotate}deg)`, zIndex: 10 }}
        >
          <Image src={s.src} alt="" fill className="object-contain" />
        </div>
      ))}
    </motion.div>
  )
}

function PolaroidWall() {
  return (
    <div className="relative hidden md:block" style={{ height: 600, width: 500 }}>
      <Polaroid
        src="/about/photo-1.png"
        alt="Eden Sabach"
        rotate={0}
        top={30}
        left={0}
        delay={0.4}
        stickers={[
          { src: "/stickers/smiley.png", top: -33, left: 75, size: 66, rotate: -8 },
        ]}
      />
      <Polaroid
        src="/about/photo-2.png"
        alt="Eden Sabach"
        rotate={0}
        top={30}
        left={245}
        delay={0.55}
        stickers={[
          { src: "/stickers/smiley.png", top: -33, left: 87, size: 66, rotate: 28 },
        ]}
      />

      {/* Extra floating sticker */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: 40, left: 30, width: 40, height: 40 }}
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: -15 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Image src="/stickers/kali.png" alt="" fill className="object-contain drop-shadow-sm" />
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-32 px-6 md:px-12">

      {/* Header */}
      <div className="mb-20">
        <motion.p
          className="font-mono text-xs tracking-widest uppercase text-muted mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          About
        </motion.p>
        <AnimatedText
          text="Making complex things feel obvious."
          className="font-sans font-bold text-ink max-w-3xl"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
          tag="h1"
        />
      </div>

      {/* Bio + photo */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_520px] gap-16 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xl md:text-2xl text-ink/80 leading-relaxed max-w-2xl mb-8">
            Product Designer, currently at Lightricks.
            <br /><br />
            I design systems and experiences shaped by real behavior &mdash; making complex things feel obvious.
          </p>
          <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
            Based in Tel Aviv. I look for inspiration in technology, culture, and city streets &mdash;
            usually on walks with Kali 🐕‍🦺
            <br /><br />
            I studied at <em className="font-sans text-ink not-italic font-medium">Bezalel Academy of Arts and Design</em>,
            which gave me a deep respect for how things look and feel &mdash; not just how they work.
          </p>
        </motion.div>

        {/* Polaroid wall */}
        <PolaroidWall />
      </div>

      {/* Skills + Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border-t border-card pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-6">Skills</h2>
          <ul className="space-y-3">
            {about.skills.map((skill, i) => (
              <motion.li
                key={skill}
                className="font-sans text-ink text-lg border-b border-card pb-3 last:border-0 flex items-center justify-between group"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {skill}
                <span className="text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-6">Tools</h2>
          <div className="flex flex-wrap gap-3">
            {about.tools.map((tool, i) => (
              <motion.span
                key={tool}
                className="font-sans text-sm px-4 py-2 border border-card rounded-full text-muted hover:border-ink hover:text-ink transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience band */}
      <motion.div
        className="border-t border-card pt-12 mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-mono text-xs tracking-widest uppercase text-muted mb-8">Experience</h2>
        <div className="space-y-8">
          {[
            {
              role: "UX/UI Product Designer",
              place: "Lightricks",
              products: "Facetune · Videoleap",
              period: "2022 – Present",
              accent: "#0057FF",
            },
            {
              role: "B.Des Graphic Design",
              place: "Bezalel Academy of Arts and Design",
              products: "Jerusalem",
              period: "2019 – 2023",
              accent: "#FF3D7F",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card pb-8 last:border-0">
              <div className="flex items-start gap-4">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: item.accent }}
                />
                <div>
                  <div className="font-sans text-ink font-medium">{item.role}</div>
                  <div className="font-sans text-muted text-sm">{item.place} · {item.products}</div>
                </div>
              </div>
              <div className="font-mono text-sm text-muted ml-6 md:ml-0">{item.period}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        className="border-t border-card pt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <h2 className="font-sans font-bold text-ink mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}>Say hello.</h2>
            <p className="font-sans text-muted">Always open to interesting projects and conversations.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`mailto:${about.email}`}
              data-cursor
              data-cursor-label="Email"
              className="font-sans text-sm border border-ink text-ink px-6 py-3 hover:bg-ink hover:text-bg transition-colors duration-300"
            >
              {about.email}
            </Link>
            <Link
              href={about.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-muted hover:text-ink transition-colors hover-underline"
            >
              LinkedIn →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

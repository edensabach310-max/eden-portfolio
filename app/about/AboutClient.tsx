"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"

type Experience = {
  role: string
  place: string
  products: string
  period: string
  accent: string
}

type AboutData = {
  bio?: string
  bio2?: string
  skills?: string[]
  tools?: string[]
  email?: string
  linkedIn?: string
  experience?: Experience[]
}

// ─── Polaroid Wall ────────────────────────────────────────────────────────────

type StickerDef = { src: string; top: number; left: number; size: number; rotate: number }

function Polaroid({
  src, alt, rotate, top, left, stickers, delay,
}: {
  src: string; alt: string; rotate: number; top: number; left: number; stickers: StickerDef[]; delay: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: 240 }}
      initial={{ opacity: 0, y: 30, rotate: rotate - 4 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image src={src} alt={alt} width={240} height={340} className="object-contain" />
      {stickers.map((s, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, transform: `rotate(${s.rotate}deg)`, zIndex: 10 }}>
          <Image src={s.src} alt="" fill className="object-contain" />
        </div>
      ))}
    </motion.div>
  )
}

function PolaroidWall() {
  return (
    <div className="relative hidden md:block" style={{ height: 600, width: 500 }}>
      <Polaroid src="/about/photo-1.png" alt="Eden Sabach" rotate={0} top={30} left={0} delay={0.4}
        stickers={[{ src: "/stickers/smiley.png", top: -33, left: 75, size: 66, rotate: -8 }]} />
      <Polaroid src="/about/photo-2.png" alt="Eden Sabach" rotate={0} top={30} left={245} delay={0.55}
        stickers={[{ src: "/stickers/smiley.png", top: -33, left: 87, size: 66, rotate: 28 }]} />
      <motion.div className="absolute pointer-events-none"
        style={{ bottom: 40, left: 30, width: 40, height: 40 }}
        initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 1, rotate: -15 }}
        transition={{ duration: 0.6, delay: 0.9 }}>
        <Image src="/stickers/kali.png" alt="" fill className="object-contain drop-shadow-sm" />
      </motion.div>
    </div>
  )
}

export default function AboutClient({ about }: { about: AboutData }) {
  const skills = about.skills ?? ["Product Design", "UX Research", "Interaction Design", "Prototyping", "Design Systems", "0→1 Products"]
  const tools = about.tools ?? ["Figma", "Framer", "Principle", "Cursor / Vibe Coding", "After Effects", "Procreate"]
  const email = about.email ?? "eden@example.com"
  const linkedIn = about.linkedIn ?? "https://linkedin.com/in/eden-sabach"
  const experience = about.experience ?? [
    { role: "UX/UI Product Designer", place: "Lightricks", products: "Facetune · Videoleap", period: "2022 – Present", accent: "#0057FF" },
    { role: "Teaching Assistant", place: "Bezalel Academy of Arts and Design", products: "Year D Book Design Studio · with Michal Sahar", period: "2025 – 2026", accent: "#C8F135" },
    { role: "Teaching Assistant", place: "Bezalel Academy of Arts and Design", products: "Year D Total Design Studio · with Michal Sahar", period: "2024 – 2025", accent: "#C8F135" },
    { role: "B.Des Graphic Design", place: "Bezalel Academy of Arts and Design", products: "Jerusalem", period: "2019 – 2023", accent: "#FF3D7F" },
  ]

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12">

      {/* Header */}
      <div className="mb-8 md:mb-20">
        <motion.p className="t-body text-base md:text-3xl text-muted mb-4 md:mb-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          About
        </motion.p>
        <AnimatedText text="Making complex things feel obvious."
          className="font-sans font-light text-ink max-w-3xl"
          style={{ fontSize: "clamp(2rem, 6vw, 5.5rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          tag="h1" />
      </div>

      {/* Mobile photos */}
      <motion.div className="md:hidden flex gap-3 mb-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
        <div className="relative shrink-0 w-[48%]">
          <Image src="/about/photo-1.png" alt="Eden Sabach" width={240} height={340} className="w-full h-auto object-contain" />
          <div className="absolute pointer-events-none" style={{ top: -20, left: "35%", width: 44, height: 44, transform: "rotate(-8deg)" }}>
            <Image src="/stickers/smiley.png" alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="relative shrink-0 w-[48%]">
          <Image src="/about/photo-2.png" alt="Eden Sabach" width={240} height={340} className="w-full h-auto object-contain" />
          <div className="absolute pointer-events-none" style={{ top: -20, left: "40%", width: 44, height: 44, transform: "rotate(28deg)" }}>
            <Image src="/stickers/smiley.png" alt="" fill className="object-contain" />
          </div>
        </div>
      </motion.div>

      {/* Bio + photo */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_520px] gap-12 md:gap-16 mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <p className="t-body text-base md:text-3xl text-ink max-w-2xl mb-6 md:mb-8">
            Product Designer, currently at Lightricks.
            <br /><br />
            I design systems and experiences shaped by real behavior &mdash; making complex things feel obvious.
          </p>
          <p className="t-body text-base md:text-3xl text-muted max-w-2xl">
            Based in Tel Aviv. I look for inspiration in technology, culture, and city streets &mdash;
            usually on walks with Kali 🐕‍🦺
            <br /><br />
            I studied at Bezalel Academy of Arts and Design,
            which gave me a deep respect for how things look and feel &mdash; not just how they work.
          </p>
        </motion.div>
        <PolaroidWall />
      </div>

      {/* Skills + Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-24 border-t border-card pt-10 md:pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="t-body text-base md:text-3xl text-muted mb-4 md:mb-6">Skills</h2>
          <ul className="space-y-2 md:space-y-3">
            {skills.map((skill, i) => (
              <motion.li key={skill}
                className="t-body text-xl md:text-3xl text-ink border-b border-card pb-2 md:pb-3 last:border-0 flex items-center justify-between group"
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                {skill}
                <span className="t-body text-base md:text-3xl text-muted opacity-0 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="t-body text-base md:text-3xl text-muted mb-4 md:mb-6">Tools</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {tools.map((tool, i) => (
              <motion.span key={tool}
                className="t-body text-sm md:text-3xl px-3 md:px-5 py-1.5 md:py-2 border border-card rounded-full text-muted hover:border-ink hover:text-ink transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }}>
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience */}
      <motion.div className="border-t border-card pt-10 md:pt-12 mb-16 md:mb-24"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }} transition={{ duration: 0.7 }}>
        <h2 className="t-body text-base md:text-3xl text-muted mb-6 md:mb-8">Experience</h2>
        <div className="space-y-6 md:space-y-8">
          {experience.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 border-b border-card pb-6 md:pb-8 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full mt-3 flex-shrink-0" style={{ backgroundColor: item.accent }} />
                <div>
                  <div className="t-body text-xl md:text-3xl text-ink">{item.role}</div>
                  <div className="t-body text-base md:text-3xl text-muted">{item.place} · {item.products}</div>
                </div>
              </div>
              <div className="t-body text-base md:text-3xl text-muted ml-6 md:ml-0">{item.period}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div className="border-t border-card pt-10 md:pt-12"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
          <div>
            <h2 className="font-sans font-light text-ink mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}>Say hello.</h2>
            <p className="t-body text-xl md:text-3xl text-muted">Always open to interesting projects and conversations.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            <Link href={`mailto:${email}`} data-cursor data-cursor-label="Email"
              className="t-body text-sm md:text-3xl border border-ink text-ink px-5 md:px-6 py-2.5 md:py-3 hover:bg-ink hover:text-bg transition-colors duration-300 break-all">
              {email}
            </Link>
            <Link href={linkedIn} target="_blank" rel="noopener noreferrer"
              className="t-body text-base md:text-3xl text-muted hover:text-ink transition-colors hover-underline">
              LinkedIn →
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"
import type { Project } from "@/types"

interface Props {
  project: Project
  nextProject?: Project
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function SectionBlock({ label, text }: { label?: string; text: string }) {
  return (
    <div className="border-t border-card pt-12 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div>
          {label && (
            <span className="font-sans text-3xl font-light text-muted">{label}</span>
          )}
        </div>
        <div className="font-sans text-3xl font-light text-ink leading-normal">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

function ImageBlock({
  src,
  alt,
  caption,
  fullWidth,
}: {
  src: string
  alt: string
  caption?: string
  fullWidth?: boolean
}) {
  return (
    <div className={`my-12 ${fullWidth ? "-mx-6 md:-mx-12" : ""}`}>
      <div className="relative aspect-video overflow-hidden bg-card/30">
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </div>
      {caption && (
        <p className="font-sans text-3xl font-light text-muted mt-3">{caption}</p>
      )}
    </div>
  )
}

function ImagePairBlock({
  leftSrc,
  leftAlt,
  rightSrc,
  rightAlt,
  caption,
}: {
  leftSrc: string
  leftAlt: string
  rightSrc: string
  rightAlt: string
  caption?: string
}) {
  return (
    <div className="my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative aspect-video overflow-hidden bg-card/30">
          <Image src={leftSrc} alt={leftAlt} fill className="object-cover" sizes="50vw" />
        </div>
        <div className="relative aspect-video overflow-hidden bg-card/30">
          <Image src={rightSrc} alt={rightAlt} fill className="object-cover" sizes="50vw" />
        </div>
      </div>
      {caption && (
        <p className="font-sans text-3xl font-light text-muted mt-3">{caption}</p>
      )}
    </div>
  )
}

function FigmaEmbed({ url, caption }: { url: string; caption?: string }) {
  return (
    <div className="my-12">
      <div className="overflow-hidden border border-card">
        <iframe
          src={url}
          allowFullScreen
          className="w-full"
          style={{ height: "clamp(400px, 60vh, 700px)", border: "none" }}
          title="Figma design"
        />
      </div>
      {caption && (
        <p className="font-sans text-3xl font-light text-muted mt-3">{caption}</p>
      )}
    </div>
  )
}

function MetricBlock({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12 p-8 bg-card/40">
      {metrics.map((m, i) => (
        <div key={i} className="text-center">
          <div
            className="font-sans font-bold text-ink mb-1"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            {m.value}
          </div>
          <div className="font-sans text-3xl font-light text-muted">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CaseStudyClient({ project, nextProject }: Props) {
  const accent = project.accentColor || "#0057FF"

  // Resolve hero image URL (supports both Sanity CDN objects and local paths)
  const heroImageUrl = project.heroImage
    ? (project.heroImage as unknown as { url: string }).url || null
    : null

  return (
    <div className="min-h-screen pt-32 pb-32">
      {/* Back */}
      <div className="px-6 md:px-12 mb-16">
        <Link href="/" className="font-sans text-3xl font-light text-muted hover:text-ink transition-colors hover-underline">
          ← All work
        </Link>
      </div>

      {/* Hero text */}
      <div className="px-6 md:px-12">
        <motion.p
          className="font-sans text-3xl font-light text-muted mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.category === "product" ? "Product Design" : "Creative"} · {project.year}
        </motion.p>

        <AnimatedText
          text={project.title}
          className="font-sans font-light text-ink mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.02em", lineHeight: 1.0 }}
          tag="h1"
        />

        <motion.p
          className="font-sans text-3xl font-light text-muted max-w-3xl leading-normal mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.tagline}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap gap-12 pb-12 border-b border-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
            project.team ? { label: "Team", value: project.team } : null,
          ]
            .filter(Boolean)
            .map((meta) => (
              <div key={meta!.label}>
                <div className="font-sans text-3xl font-light text-muted mb-1">{meta!.label}</div>
                <div className="font-sans text-3xl font-light text-ink">{meta!.value}</div>
              </div>
            ))}
        </motion.div>
      </div>

      {/* Hero image — full width, right after meta */}
      <div className="px-6 md:px-12 mt-12">
        {heroImageUrl ? (
          <motion.div
            className="relative aspect-video overflow-hidden bg-card/30"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={heroImageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, calc(100vw - 6rem)"
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            className="aspect-video flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${accent}18 0%, ${accent}38 100%)` }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-sans font-bold select-none"
              style={{ fontSize: "clamp(5rem, 15vw, 12rem)", color: accent, opacity: 0.2, lineHeight: 1 }}
            >
              {project.title.charAt(0)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 md:px-12">

        {/* Editorial grid: 2/3 text | 1/3 side images */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-x-16 items-start">

          {/* Left — text sections */}
          <div>
            {project.overview && <SectionBlock label="Overview" text={project.overview} />}
            {project.problem && <SectionBlock label="Problem" text={project.problem} />}
            {project.process && <SectionBlock label="Process" text={project.process} />}
            {project.solution && <SectionBlock label="Solution" text={project.solution} />}
            {project.impact && <SectionBlock label="Impact" text={project.impact} />}

            {project.contentBlocks?.filter(b =>
              b._type === "sectionBlock" || b._type === "textBlock" ||
              b._type === "figmaEmbed" || b._type === "metricBlock" || b._type === "videoBlock" ||
              b._type === "imagePair" || (b._type === "imageBlock" && b.fullWidth)
            ).map((block) => {
              if (block._type === "sectionBlock")
                return <SectionBlock key={block._key} label={block.label} text={block.text} />
              if (block._type === "textBlock")
                return <SectionBlock key={block._key} text={block.text} />
              if (block._type === "imageBlock" && block.fullWidth) {
                const src = (block.image as unknown as { url: string }).url || ""
                return <ImageBlock key={block._key} src={src} alt={block.image.alt || ""} caption={block.caption} />
              }
              if (block._type === "imagePair") {
                const leftSrc = (block.left as unknown as { url: string }).url || ""
                const rightSrc = (block.right as unknown as { url: string }).url || ""
                return <ImagePairBlock key={block._key} leftSrc={leftSrc} leftAlt={block.left.alt || ""} rightSrc={rightSrc} rightAlt={block.right.alt || ""} caption={block.caption} />
              }
              if (block._type === "figmaEmbed")
                return <FigmaEmbed key={block._key} url={block.embedUrl} caption={block.caption} />
              if (block._type === "metricBlock")
                return <MetricBlock key={block._key} metrics={block.metrics} />
              if (block._type === "videoBlock")
                return (
                  <div key={block._key} className="my-12">
                    <video src={block.url} controls className="w-full aspect-video bg-card/30" />
                    {block.caption && <p className="font-sans text-3xl font-light text-muted mt-3">{block.caption}</p>}
                  </div>
                )
              return null
            })}
          </div>

          {/* Right — side images (non-fullWidth imageBlocks) */}
          <div className="hidden md:flex flex-col gap-8 pt-12 sticky top-32">
            {project.contentBlocks?.filter(b => b._type === "imageBlock" && !b.fullWidth).map((block) => {
              if (block._type !== "imageBlock") return null
              const src = (block.image as unknown as { url: string }).url || ""
              return (
                <div key={block._key}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-card/30">
                    <Image src={src} alt={block.image.alt || ""} fill className="object-cover" sizes="33vw" />
                  </div>
                  {block.caption && <p className="font-sans text-3xl font-light text-muted mt-3">{block.caption}</p>}
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* Next project */}
      <div className="px-6 md:px-12 mt-24 pt-12 border-t border-card">
        {nextProject ? (
          <Link href={`/work/${nextProject.slug.current}`} className="group flex items-center justify-between">
            <span className="font-sans text-3xl font-light text-muted">Next project</span>
            <motion.span
              className="font-sans font-bold text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              {nextProject.title} →
            </motion.span>
          </Link>
        ) : (
          <Link href="/" className="group flex items-center justify-between">
            <span className="font-sans text-3xl font-light text-muted">More work</span>
            <motion.span
              className="font-sans font-bold text-ink"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              View all →
            </motion.span>
          </Link>
        )}
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import AnimatedText from "@/components/ui/AnimatedText"
import type { Project } from "@/types"

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  return match ? match[1] : null
}

function AutoplayVideo({ src, caption, size = "full" }: { src: string; caption?: string; size?: "full" | "medium" | "small" }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeId = src ? getYouTubeId(src) : null

  useEffect(() => {
    const video = videoRef.current
    if (!video || youtubeId) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [youtubeId])

  const wrapperClass =
    size === "small"
      ? "my-8 md:my-12 w-full md:max-w-[340px]"
      : size === "medium"
      ? "my-8 md:my-12 w-full md:max-w-[66%]"
      : "my-8 md:my-12 w-full"

  return (
    <div className={wrapperClass}>
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1`}
          className="w-full aspect-video bg-card/30"
          allow="autoplay; fullscreen"
          style={{ border: "none" }}
          title="video"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          playsInline
          loop
          className="w-full bg-card/30"
          style={{ aspectRatio: "auto" }}
        />
      )}
      {caption && <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>}
    </div>
  )
}

interface Props {
  project: Project
  nextProject?: Project
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function SectionBlock({ label, text }: { label?: string; text: string }) {
  return (
    <div className="border-t border-card pt-8 md:pt-12 mt-8 md:mt-12 md:max-w-[66%]">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-8">
        <div>
          {label && (
            <span className="t-body text-sm md:text-3xl text-muted">{label}</span>
          )}
        </div>
        <div className="t-body text-base md:text-3xl text-ink">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

function SectionWithMediaBlock({
  label,
  text,
  imageSrc,
  imageAlt,
  videoSrc,
  caption,
}: {
  label?: string
  text: string
  imageSrc?: string
  imageAlt?: string
  videoSrc?: string
  caption?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const youtubeId = videoSrc ? getYouTubeId(videoSrc) : null

  useEffect(() => {
    const video = videoRef.current
    if (!video || youtubeId) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [youtubeId])

  const media = (
    <div>
      {videoSrc ? (
        youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1`}
            className="w-full aspect-video"
            allow="autoplay; fullscreen"
            style={{ border: "none" }}
            title="video"
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            loop
            className="w-full"
            style={{ aspectRatio: "auto" }}
          />
        )
      ) : imageSrc ? (
        <Image src={imageSrc} alt={imageAlt || ""} width={0} height={0} sizes="280px" className="w-full h-auto mix-blend-multiply" />
      ) : null}
    </div>
  )

  return (
    <div className="relative border-t border-card pt-8 md:pt-12 mt-8 md:mt-12">
      {/* Desktop: media absolute-right so it doesn't stretch the section height */}
      <div className="hidden md:block absolute top-8 right-0 w-[280px]">
        {media}
        {caption && (
          <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>
        )}
      </div>

      {/* Text — constrained so it doesn't run under the absolute media */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-8 md:pr-[316px]">
        <div>
          {label && (
            <span className="t-body text-sm md:text-3xl text-muted">{label}</span>
          )}
        </div>
        <div className="t-body text-base md:text-3xl text-ink">
          <p>{text}</p>
        </div>
      </div>

      {/* Mobile: media below text */}
      <div className="md:hidden mt-6">
        {media}
        {caption && (
          <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>
        )}
      </div>
    </div>
  )
}

function ImageBlock({
  src,
  alt,
  caption,
  alignment = "left",
}: {
  src: string
  alt: string
  caption?: string
  alignment?: "full" | "left" | "right"
}) {
  const wrapperClass =
    alignment === "full"
      ? "my-8 md:my-12 w-full"
      : alignment === "right"
      ? "my-8 md:my-12 w-full md:max-w-[66%] ml-auto"
      : "my-8 md:my-12 w-full md:max-w-[66%]"

  return (
    <div className={wrapperClass}>
      <div>
        <Image src={src} alt={alt} width={0} height={0} sizes="100vw" className="w-full h-auto mix-blend-multiply" />
      </div>
      {caption && (
        <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>
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
    <div className="my-8 md:my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Image src={leftSrc} alt={leftAlt} width={0} height={0} sizes="50vw" className="w-full h-auto mix-blend-multiply" />
        </div>
        <div>
          <Image src={rightSrc} alt={rightAlt} width={0} height={0} sizes="50vw" className="w-full h-auto mix-blend-multiply" />
        </div>
      </div>
      {caption && (
        <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>
      )}
    </div>
  )
}

function FigmaEmbed({ url, caption }: { url: string; caption?: string }) {
  return (
    <div className="my-8 md:my-12 md:max-w-[66%]">
      <div className="overflow-hidden border border-card">
        <iframe
          src={url}
          allowFullScreen
          className="w-full"
          style={{ height: "clamp(300px, 60vh, 700px)", border: "none" }}
          title="Figma design"
        />
      </div>
      {caption && (
        <p className="t-body text-sm md:text-3xl text-muted mt-3">{caption}</p>
      )}
    </div>
  )
}

function MetricBlock({ metrics }: { metrics: { label: string; value: string }[] }) {
  return (
    <div className="py-4 my-8 md:my-10 md:max-w-[66%]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <div key={i}>
            <div
              className="font-sans font-light text-ink"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {m.value}
            </div>
            <div className="t-body text-xs uppercase tracking-widest text-muted mt-3" style={{ lineHeight: 1.3 }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
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
    <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-32">
      {/* Back */}
      <div className="px-6 md:px-12 mb-10 md:mb-16">
        <Link href="/" className="t-body text-base md:text-3xl text-muted hover:text-ink transition-colors hover-underline">
          ← All work
        </Link>
      </div>

      {/* Hero text */}
      <div className="px-6 md:px-12">
        <AnimatedText
          text={project.title}
          className="font-sans font-light text-ink mb-6 md:mb-8"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.02em", lineHeight: 1.0 }}
          tag="h1"
        />

        <motion.p
          className="t-body text-xl md:text-3xl text-muted max-w-3xl mb-10 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.tagline}
        </motion.p>

        {/* Meta row */}
        <motion.div
          className="flex flex-wrap gap-8 md:gap-12 pb-8 md:pb-12 border-b border-card"
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
                <div className="t-body text-xs md:text-3xl text-muted mb-1 uppercase tracking-widest md:tracking-normal md:normal-case">{meta!.label}</div>
                <div className="t-body text-base md:text-3xl text-ink">{meta!.value}</div>
              </div>
            ))}
        </motion.div>
      </div>

      {/* Hero image — full width, right after meta */}
      <div className="px-6 md:px-12 mt-8 md:mt-12">
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
              style={{ fontSize: "clamp(4rem, 15vw, 12rem)", color: accent, opacity: 0.2, lineHeight: 1 }}
            >
              {project.title.charAt(0)}
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 md:px-12">

        {project.overview && <SectionBlock label="Overview" text={project.overview} />}
        {project.problem && <SectionBlock label="Problem" text={project.problem} />}
        {project.process && <SectionBlock label="Process" text={project.process} />}
        {project.solution && <SectionBlock label="Solution" text={project.solution} />}
        {project.impact && <SectionBlock label="Impact" text={project.impact} />}

        {project.contentBlocks?.map((block) => {
          if (block._type === "sectionBlock")
            return <SectionBlock key={block._key} label={block.label} text={block.text} />
          if (block._type === "textBlock")
            return <SectionBlock key={block._key} text={block.text} />
          if (block._type === "sectionWithMedia") {
            const imageSrc = (block.image as unknown as { url: string })?.url || ""
            const videoSrc = block.videoUrl || block.videoFileUrl || ""
            return <SectionWithMediaBlock key={block._key} label={block.label} text={block.text} imageSrc={imageSrc} imageAlt={block.image?.alt || ""} videoSrc={videoSrc || undefined} caption={block.caption} />
          }
          if (block._type === "imageBlock") {
            const src = (block.image as unknown as { url: string }).url || ""
            // alignment field takes precedence; fall back to legacy fullWidth boolean
            const alignment = block.alignment ?? (block.fullWidth ? "full" : "left")
            return <ImageBlock key={block._key} src={src} alt={block.image.alt || ""} caption={block.caption} alignment={alignment} />
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
          if (block._type === "videoBlock") {
            const src = block.url || block.fileUrl || ""
            return <AutoplayVideo key={block._key} src={src} caption={block.caption} size={block.size} />
          }
          return null
        })}

      </div>

      {/* Next project */}
      <div className="px-6 md:px-12 mt-16 md:mt-24 pt-8 md:pt-12 border-t border-card">
        {nextProject ? (
          <Link href={`/work/${nextProject.slug.current}`} className="group flex items-center justify-between">
            <span className="t-body text-sm md:text-3xl text-muted">Next project</span>
            <motion.span
              className="font-sans font-light text-ink"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.2 }}
            >
              {nextProject.title} →
            </motion.span>
          </Link>
        ) : (
          <Link href="/" className="group flex items-center justify-between">
            <span className="t-body text-sm md:text-3xl text-muted">More work</span>
            <motion.span
              className="font-sans font-light text-ink"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
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

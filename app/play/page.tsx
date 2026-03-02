"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import AnimatedText from "@/components/ui/AnimatedText"
import ProjectCard from "@/components/ui/ProjectCard"
import { placeholderProjects } from "@/lib/placeholder-data"

// Load PongGame client-only (uses canvas)
const PongGame = dynamic(() => import("@/components/interactions/PongGame"), { ssr: false })

const creativeProjects = placeholderProjects.filter((p) => p.category === "creative")

export default function PlayPage() {
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
          Play
        </motion.p>
        <AnimatedText
          text="Experiments, side projects, and things made for fun."
          className="font-display text-ink max-w-3xl"
          tag="h1"
        />
        <motion.p
          className="font-sans text-muted mt-4 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Not everything needs to ship. Some things just need to exist.
        </motion.p>
      </div>

      {/* Pong Game */}
      <section className="mb-24">
        <div className="flex items-baseline gap-4 mb-6">
          <h2 className="font-display text-2xl text-ink">Typography Pong</h2>
          <span className="font-mono text-xs text-muted">Interactive</span>
        </div>
        <p className="font-sans text-sm text-muted mb-6 max-w-md">
          A pong game where letters are paddles. Built solo. First to {7} wins.
        </p>
        <PongGame />
      </section>

      {/* Divider */}
      <div className="border-t border-card mb-16" />

      {/* Creative projects grid */}
      <section>
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-2xl text-ink">Creative Work</h2>
          <span className="font-mono text-xs text-muted">{creativeProjects.length} projects</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {creativeProjects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-card mt-24 pt-16">
        <div className="flex items-center justify-between">
          <p className="font-sans text-muted text-sm max-w-md">
            Want to see the product design work?
          </p>
          <Link
            href="/"
            className="font-sans text-sm text-muted hover:text-ink transition-colors hover-underline"
          >
            View all work →
          </Link>
        </div>
      </div>
    </div>
  )
}

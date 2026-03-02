import { notFound } from "next/navigation"
import CaseStudyClient from "./CaseStudyClient"
import { placeholderProjects } from "@/lib/placeholder-data"
import type { Metadata } from "next"

interface Props {
  params: { slug: string }
}

// Uncomment to fetch from Sanity:
// import { getProjectBySlug, getAllProjects } from "@/lib/sanity"

async function getProject(slug: string) {
  // return await getProjectBySlug(slug)
  return placeholderProjects.find((p) => p.slug.current === slug) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return { title: "Not Found" }
  return {
    title: `${project.title} — Eden Sabach`,
    description: project.tagline,
  }
}

export async function generateStaticParams() {
  // const projects = await getAllProjects()
  return placeholderProjects.map((p) => ({ slug: p.slug.current }))
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  const allProjects = placeholderProjects.filter((p) => p.category === project.category)
  const idx = allProjects.findIndex((p) => p.slug.current === params.slug)
  const nextProject = allProjects[idx + 1] ?? undefined

  return <CaseStudyClient project={project} nextProject={nextProject} />
}

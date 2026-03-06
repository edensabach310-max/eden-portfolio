import { notFound } from "next/navigation"

export const revalidate = 60 // refresh every 60 seconds
import CaseStudyClient from "./CaseStudyClient"
import { getProjectBySlug, getAllProjects } from "@/lib/sanity"
import type { Metadata } from "next"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug)
  if (!project) return { title: "Not Found" }
  return {
    title: `${project.title} — Eden Sabach`,
    description: project.tagline,
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p: { slug: { current: string } }) => ({ slug: p.slug.current }))
}

export default async function CaseStudyPage({ params }: Props) {
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getAllProjects(),
  ])
  if (!project) notFound()

  const sameCategory = allProjects.filter((p: { category: string }) => p.category === project.category)
  const idx = sameCategory.findIndex((p: { slug: { current: string } }) => p.slug.current === params.slug)
  const nextProject = sameCategory[idx + 1] ?? undefined

  return <CaseStudyClient project={project} nextProject={nextProject} />
}

import { getAllProjects } from "@/lib/sanity"
import HomeClient from "./HomeClient"

export const revalidate = 60 // refresh every 60 seconds

export default async function HomePage() {
  const allProjects = await getAllProjects()
  const productProjects = allProjects.filter((p: { category: string }) => p.category === "product")
  const creativeProjects = allProjects.filter((p: { category: string }) => p.category === "creative")

  return <HomeClient productProjects={productProjects} creativeProjects={creativeProjects} />
}

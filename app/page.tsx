import { getAllProjects } from "@/lib/sanity"
import HomeClient from "./HomeClient"

export default async function HomePage() {
  const allProjects = await getAllProjects()
  const productProjects = allProjects.filter((p: { category: string }) => p.category === "product")
  const creativeProjects = allProjects.filter((p: { category: string }) => p.category === "creative")

  return <HomeClient productProjects={productProjects} creativeProjects={creativeProjects} />
}

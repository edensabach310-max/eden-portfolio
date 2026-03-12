import { getAllProjects, getHomepageData } from "@/lib/sanity"
import HomeClient from "./HomeClient"

export const revalidate = 60

export default async function HomePage() {
  const [allProjects, homepageData] = await Promise.all([
    getAllProjects(),
    getHomepageData(),
  ])
  const productProjects = allProjects.filter((p: { category: string }) => p.category === "product")
  const creativeProjects = allProjects.filter((p: { category: string }) => p.category === "creative")

  return (
    <HomeClient
      productProjects={productProjects}
      creativeProjects={creativeProjects}
      homepageData={homepageData}
    />
  )
}

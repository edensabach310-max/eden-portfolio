import { getAboutData } from "@/lib/sanity"
import AboutClient from "./AboutClient"

export const revalidate = 60

export default async function AboutPage() {
  const about = await getAboutData()
  return <AboutClient about={about ?? {}} />
}

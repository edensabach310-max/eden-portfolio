import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImage } from "@/types"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "prod",
  apiVersion: "2024-01-01",
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export async function getAllProjects() {
  return sanityClient.fetch(`
    *[_type == "project"] | order(order asc) {
      _id, title, slug, category, tagline, heroImage, accentColor,
      role, year, team, overview, featured, order
    }
  `)
}

export async function getFeaturedProjects() {
  return sanityClient.fetch(`
    *[_type == "project" && featured == true] | order(order asc) {
      _id, title, slug, category, tagline, heroImage, accentColor,
      role, year, team, overview, featured, order
    }
  `)
}

export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, slug, category, tagline,
      "heroImage": heroImage { ..., "url": asset->url },
      accentColor, role, year, team,
      overview, problem, process, solution, impact,
      contentBlocks[] {
        ...,
        _type == "imageBlock" => {
          ...,
          "image": image { ..., "url": asset->url }
        },
        _type == "imagePair" => {
          ...,
          "left": left { ..., "url": asset->url },
          "right": right { ..., "url": asset->url }
        }
      },
      featured, order
    }`,
    { slug }
  )
}

export async function getAboutData() {
  return sanityClient.fetch(`*[_type == "about"][0]`)
}

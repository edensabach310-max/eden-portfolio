import { createClient } from "@sanity/client"
import { env } from "node:process"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: env.SANITY_TOKEN,
  useCdn: false,
})

const doc = await client.fetch(
  `*[_type == "project" && slug.current == "outfits" && !(_id in path("drafts.**"))][0]{ _id, contentBlocks }`
)

const filtered = doc.contentBlocks.filter(b => b._key !== "results-challenge")

await client.patch(doc._id).set({ contentBlocks: filtered }).commit()
console.log("✓ Challenge block removed")

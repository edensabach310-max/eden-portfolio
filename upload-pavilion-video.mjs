import { createClient } from "@sanity/client"
import { env } from "node:process"
import { createReadStream } from "node:fs"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: env.SANITY_TOKEN,
  useCdn: false,
})

console.log("Uploading video...")
const asset = await client.assets.upload(
  "file",
  createReadStream("/Users/esabach/Desktop/Screen Recording 2026-03-09 at 20.55.42.mov"),
  { filename: "pavilion-2023.mov", contentType: "video/quicktime" }
)

const videoUrl = `https://cdn.sanity.io/files/vc48nvpz/prod/${asset._id.replace("file-", "").replace(/-mov$/, ".mov")}`
console.log("✓ Uploaded:", videoUrl)

const doc = await client.fetch(
  `*[_type == "project" && slug.current == "pavilion" && !(_id in path("drafts.**"))][0]{ _id, contentBlocks }`
)

// Replace the existing YouTube videoBlock with the local file
const updated = doc.contentBlocks.map(b =>
  b._key === "pavilion-video"
    ? { ...b, url: videoUrl, caption: "Bezalel Pavilion 2023" }
    : b
)

await client.patch(doc._id).set({ contentBlocks: updated }).commit()
console.log("✓ Video block updated")

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

const asset = await client.assets.upload(
  "image",
  createReadStream("/Users/esabach/Downloads/WhatsApp Image 2026-03-09 at 16.30.49 (3).jpeg"),
  { filename: "pavilion-hero.jpg", contentType: "image/jpeg" }
)
console.log("✓ Uploaded:", asset._id)

const doc = await client.fetch(
  `*[_type == "project" && slug.current == "pavilion" && !(_id in path("drafts.**"))][0]{ _id }`
)

await client.patch(doc._id).set({
  heroImage: {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: "Bezalel Pavilion facade at night, Jerusalem",
  },
}).commit()

console.log("✓ Hero updated")

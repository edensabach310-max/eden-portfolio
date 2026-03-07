// Run: SANITY_TOKEN=<token> node upload-nir-oz-images.mjs

import { createClient } from "@sanity/client"
import { createReadStream } from "fs"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const images = [
  { path: "/Users/esabach/Desktop/madaf24sep-173-1600x-q80.jpg", alt: "Nir Oz book cover", role: "hero" },
  { path: "/Users/esabach/Desktop/madaf24sep-175-1600x-q80.jpg", alt: "Kibbutz map spread", role: "content" },
  { path: "/Users/esabach/Desktop/madaf24sep-179-1600x-q80.jpg", alt: "Door documentation", role: "content" },
  { path: "/Users/esabach/Desktop/madaf24sep-186-1600x-q80.jpg", alt: "Botanical index — green spread", role: "content" },
  { path: "/Users/esabach/Desktop/madaf24sep-188-1600x-q80.jpg", alt: "Close-up plant photography", role: "content" },
  { path: "/Users/esabach/Desktop/madaf24sep-196-1600x-q80.jpg", alt: "Garden photographs grid", role: "content" },
]

console.log("Uploading images to Sanity...")

const uploaded = []
for (const img of images) {
  process.stdout.write(`  Uploading ${img.alt}... `)
  const asset = await client.assets.upload("image", createReadStream(img.path), {
    filename: img.path.split("/").pop(),
  })
  uploaded.push({ ...img, assetId: asset._id })
  console.log("✓")
}

// Get the project document
const doc = await client.fetch(
  `*[_type == "project" && slug.current == "nir-oz-book" && !(_id in path("drafts.**"))][0]{ _id, contentBlocks }`,
)

if (!doc) {
  console.error("Project not found")
  process.exit(1)
}

// Set hero image
const heroAsset = uploaded.find((u) => u.role === "hero")
console.log("Setting hero image...")
await client.patch(doc._id).set({
  heroImage: {
    _type: "image",
    asset: { _type: "reference", _ref: heroAsset.assetId },
    alt: heroAsset.alt,
  },
}).commit()

// Build image content blocks
const imageBlocks = uploaded
  .filter((u) => u.role === "content")
  .map((u, i) => ({
    _type: "imageBlock",
    _key: `img-${i}`,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: u.assetId },
      alt: u.alt,
    },
    fullWidth: true,
  }))

// Merge with existing text blocks
const existingBlocks = doc.contentBlocks || []
const textBlocks = existingBlocks.filter((b) => b._type !== "imageBlock")

// Interleave: overview → image1, process → image2,3, impact → image4,5
const merged = [
  textBlocks[0],            // Overview
  imageBlocks[0],           // Map
  imageBlocks[1],           // Doors
  textBlocks[1],            // Process
  imageBlocks[2],           // Green botanical
  imageBlocks[3],           // B&W plant
  textBlocks[2],            // Impact
  imageBlocks[4],           // Garden grid
].filter(Boolean)

console.log("Updating content blocks...")
await client.patch(doc._id).set({ contentBlocks: merged }).commit()

// Also update the draft
const draft = await client.fetch(
  `*[_type == "project" && _id == $id][0]{ _id }`,
  { id: `drafts.${doc._id}` },
)
if (draft) {
  await client.patch(draft._id).set({
    heroImage: {
      _type: "image",
      asset: { _type: "reference", _ref: heroAsset.assetId },
      alt: heroAsset.alt,
    },
    contentBlocks: merged,
  }).commit()
  console.log("✓ Draft updated too")
}

console.log("\n✓ All done. Nir Oz now has hero image + 5 content images.")

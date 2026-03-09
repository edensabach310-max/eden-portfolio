// Run: SANITY_TOKEN=<token> node update-pavilion-text.mjs

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
  `*[_type == "project" && slug.current == "pavilion" && !(_id in path("drafts.**"))][0]{ _id, contentBlocks }`
)

if (!doc) { console.error("Pavilion not found"); process.exit(1) }

// Preserve the uploaded image blocks (everything except old text blocks)
const imageBlocks = doc.contentBlocks.filter(b =>
  ["videoBlock", "imageBlock", "imagePair"].includes(b._type)
)

// Find image blocks by key
const video     = imageBlocks.find(b => b._key === "pavilion-video")
const diagram   = imageBlocks.find(b => b._key === "pavilion-diagram")
const poster    = imageBlocks.find(b => b._key === "pavilion-poster")
const led       = imageBlocks.find(b => b._key === "pavilion-led")
const events    = imageBlocks.find(b => b._key === "pavilion-events-pair")
const street    = imageBlocks.find(b => b._key === "pavilion-street-pair")

const contentBlocks = [
  // 1. What is the pavilion
  {
    _type: "sectionBlock",
    _key: "text-about",
    label: "About",
    text: "The Bezalel Pavilion is a temporary structure in the center of Jerusalem — a creative hub for cultural events by the academy's students, as well as for urban and community activities. It was hosted at the Jerusalem Arts Campus in July–August 2023, celebrating Bezalel's move to the city center.",
  },

  // 2. Video
  video,

  // 3. The team & brief
  {
    _type: "sectionBlock",
    _key: "text-brief",
    label: "Brief",
    text: "Design a unified visual identity for a multilingual, multicultural event — one that speaks to all of Jerusalem in Hebrew, English, and Arabic. The identity needed to work across a month of programming: posters, digital screens, event materials, and the physical pavilion itself.",
  },

  // 4. Architecture diagram
  diagram,

  // 5. Identity system
  {
    _type: "sectionBlock",
    _key: "text-identity",
    label: "Identity",
    text: "The visual system is built around a tri-lingual logotype and a set of geometric symbols — each shape representing one of the five program zones. Bold, simple forms that scale from a large LED facade to a strip of branded tape on a stage edge.",
  },

  // 6. Poster
  poster,

  // 7. LED
  led,

  // 8. Program
  {
    _type: "sectionBlock",
    _key: "text-program",
    label: "Program",
    text: "The pavilion hosted a month-long program featuring the Sam Spiegel Film and Television School, the Visual Theater School, the Center for Eastern Music, Nisan Nativ Acting Studio, and Kolben Dance Company — open to the public, free of charge.",
  },

  // 9. Event posters pair
  events,

  // 10. Street applications
  street,
]

await client.patch(doc._id).set({ contentBlocks }).commit()
console.log("✓ Pavilion content blocks updated with sections")

// Run: SANITY_TOKEN=<token> node update-outfits-results.mjs

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

if (!doc) {
  console.error("Outfits project not found")
  process.exit(1)
}

console.log(`Found project: ${doc._id}`)

const newBlocks = [
  {
    _type: "metricBlock",
    _key: "results-metrics",
    metrics: [
      { value: "+63%", label: "Feature reach vs baseline" },
      { value: "45%",  label: "Export rate — users who got a result" },
      { value: "3×",   label: "Median exports per exporter" },
      { value: "↑",    label: "Long-term retention (stable vs declining)" },
    ],
  },
  {
    _type: "sectionBlock",
    _key: "results-challenge",
    label: "Challenge",
    text: `The new Outfits flow introduced the feature to significantly more users — but a 20% drop at the intro screen and a 20% generation failure rate (half due to content policy) meant fewer users reached a result.\n\nThe data is clear: users who do get a result export at a 45% rate and generate 3× more exports than in the old flow. The opportunity ahead is narrowing the gap — reducing intro friction and improving generation reliability so more users can reach that value.`,
  },
]

const updatedBlocks = [...(doc.contentBlocks || []), ...newBlocks]

await client.patch(doc._id).set({ contentBlocks: updatedBlocks }).commit()
console.log("✓ Results metrics added to Outfits")

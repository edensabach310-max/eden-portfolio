// Run: SANITY_TOKEN=<your_token> node update-nir-oz.mjs

import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const slug = "nir-oz-book"

const doc = await client.fetch(`*[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id, title }`, { slug })

if (!doc) {
  console.error(`Project with slug "${slug}" not found.`)
  process.exit(1)
}

console.log(`Found: ${doc.title} (${doc._id})`)

await client.patch(doc._id).set({
  title: "Nir Oz",
  tagline: "A 430-page book documenting Kibbutz Nir Oz after October 7 — designed as a Bezalel final thesis",
  role: "Book Designer",
  year: "2024",
  team: "Alon Boutboul",
  accentColor: "#1A4D2E",
  category: "creative",
  contentBlocks: [
    {
      _type: "sectionBlock",
      _key: "overview",
      label: "Overview",
      text: "פרחי גאולה ואבל — Flowers of Grief and Redemption — is a 430-page book documenting the courtyards and house facades of Kibbutz Nir Oz following October 7th. An index of the kibbutz: 196 door photographs representing every residence, stories, interviews, botanical photography, and first-hand accounts from survivors. Designed alongside Alon Boutboul as our final thesis at Bezalel Academy, supervised by Noam Schechter.",
    },
    {
      _type: "sectionBlock",
      _key: "process",
      label: "Process",
      text: "The project began during our final year at Bezalel, coinciding with reserve service. We couldn't remain indifferent. We crowdfunded through Headstart — raising ₪79,260 from 451 supporters — to cover printing costs and distribute copies to every kibbutz household.\n\nThe design uses a restrained palette of black, white, and green — the colors we observed on visits to the kibbutz. Typography set in Masada and Miriam Libre. Abstract close-up plant photography contrasts the sharp reality. Systematic door documentation as a way to walk readers through stories of residents who were largely absent.",
    },
    {
      _type: "sectionBlock",
      _key: "impact",
      label: "Impact",
      text: "1,500 copies printed. Exhibited at Jerusalem Design Week. A commissioned video collaboration with the National Library of Jerusalem. Soft cover, 430 pages, offset print. ISBN 978-965-598-968-7.",
    },
  ],
}).commit()

console.log("✓ Nir Oz updated successfully.")

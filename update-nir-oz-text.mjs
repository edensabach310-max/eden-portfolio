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
  `*[_type == "project" && slug.current == "nir-oz-book" && !(_id in path("drafts.**"))][0]{ _id, contentBlocks }`
)

const tagline = "A book of doors, flowers, and what remains."

const textBlocks = [
  {
    _type: "sectionBlock",
    _key: "overview",
    label: "Overview",
    text: `We started working on the book in the early months of the war — when everything was still raw, still acutely painful. We arrived at Kibbutz Nir Oz for the first time with cameras. Both of us had a bank of images saturated in our heads — all consumed through screens, none of it seen directly.

Everything was beautiful and terrible. There were no people. In their place: plants and empty houses. In the absence of residents, every door seemed to have its own character — telling us about the family behind it. Our eyes moved between a very narrow, very clear palette. The kibbutz carried images of beauty intertwined with images of destruction and death. Black or green.

פרחי גאולה ואבל — Flowers of Grief and Redemption — is an artistic and memorial book created in the aftermath of October 7th. It brings together photography, testimony, and editorial design to construct a space of remembrance; one that avoids spectacle and instead invites slow observation, reflection, and presence.`,
  },
  {
    _type: "sectionBlock",
    _key: "material",
    label: "Material Collection",
    text: `The foundation of the project is a prolonged process of on-site documentation. We photographed 196 doors across the kibbutz, each belonging to a home now emptied of its residents. These doors function as silent markers: familiar, personal, and repetitive, yet each carrying its own trace of life interrupted.

Alongside the doors, we photographed the everyday vegetation of the kibbutz — overlooked plants, close-up and abstract. The relationship between people and flowers runs throughout the book, exploring cultivation, fragility, and continuity. Growth appears here not as consolation, but as coexistence with loss.`,
  },
  {
    _type: "sectionBlock",
    _key: "structure",
    label: "Structure and Navigation",
    text: `All materials — photographs and interviews with kibbutz members who survived the October 7th attack — are woven into a book designed to simulate movement through the kibbutz. Page sequencing and repetition create a sense of walking between houses and passing from door to door, allowing the reader to navigate intuitively rather than linearly.`,
  },
  {
    _type: "sectionBlock",
    _key: "visual",
    label: "Visual Language",
    text: `The visual system is restrained and material-driven. A limited color palette, drawn directly from the photographed environment, supports emotional clarity and cohesion across the book's 430 pages.`,
  },
  {
    _type: "sectionBlock",
    _key: "animating",
    label: "Animating Memory",
    text: `The book was presented in the exhibition Flowers: Leafing Through the Collections of the National Library at the National Library of Israel. The project appeared through a selection of photographs from the book, accompanied by a video piece created specifically for the exhibition. The video animates images of the kibbutz using Generative AI, extending the book's visual language into a moving, time-based reflection on place, memory, and transformation.`,
  },
  {
    _type: "sectionBlock",
    _key: "recognition",
    label: "Recognition",
    text: `Printed in an edition of 1,500 copies. Presented at Jerusalem Design Week 2024.

Beyond its exhibitions and circulation, Flowers of Redemption and Mourning stands as a visual record of Kibbutz Nir Oz as it existed in this specific historical moment — a collective memory preserved through place, material, and absence.`,
  },
]

// Keep image blocks from existing content
const imageBlocks = doc.contentBlocks.filter(b => b._type === "imageBlock")

const blocks = [
  textBlocks[0],   // Overview
  imageBlocks[0],  // Map
  textBlocks[1],   // Material Collection
  imageBlocks[1],  // Doors spread
  imageBlocks[2],  // Green botanical
  imageBlocks[3],  // B&W plant
  textBlocks[2],   // Structure and Navigation
  textBlocks[3],   // Visual Language
  imageBlocks[4],  // Garden grid
  textBlocks[4],   // Animating Memory
  textBlocks[5],   // Recognition
].filter(Boolean)

await client.patch(doc._id).set({ tagline, contentBlocks: blocks }).commit()
console.log("✓ Published updated")

try {
  await client.delete("drafts.project-nir-oz")
} catch { /* no draft */ }

console.log("✓ Done")

/**
 * Imports placeholder projects into Sanity
 * Run with: node scripts/import-to-sanity.mjs
 */

import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const projects = [
  {
    _id: "project-outfits",
    _type: "project",
    title: "Outfits",
    slug: { _type: "slug", current: "outfits" },
    category: "product",
    tagline: "AI fashion try-on that feels like magic",
    accentColor: "#0057FF",
    role: "Product Designer",
    year: "2024",
    team: "PM (Gilad Sorek), Tech (Nissim Arfi), Design",
    overview: "Outfits brings AI-powered fashion try-on to Facetune. Users can try on pre-determined outfits or upload their own reference images — all within a seamless in-app experience that feels native and fast.",
    problem: "A realistic outfits try-on can serve existing Facetune audiences while bringing in new ones. Earlier results were promising, but the UX was clunky and disconnected from the rest of the app. The challenge: make AI feel effortless.",
    process: "Mapped the full user journey across 3 distinct entry points (main editor, What's New screen, motivational onboarding). Designed the gender detection flow, error states, garment selection, and the 'import your own outfit' sub-flow — including a novel web-view-based shopping integration with in-app screenshot capture.",
    solution: "A single cohesive flow that works identically across all entry points. Two modes: preset outfits (gender-sorted) and custom upload via gallery, camera, or in-app web browsing. Natural loading animations hide AI wait time. Share to WhatsApp with deep link.",
    impact: "Feature shipped to iOS and Android. Multiple entry points allow segmented experimentation. Rate-limiting system built in to push subscription conversion.",
    contentBlocks: [
      { _type: "figmaEmbed", _key: "figma1", embedUrl: "https://embed.figma.com/design/R2e4hZpAigWUWJTpRzopWj/Outfits-Try-on?node-id=0-1&embed-host=share", caption: "Full Outfits try-on design — explore the flow" },
    ],
    featured: true,
    order: 1,
  },
  {
    _id: "project-home-screen",
    _type: "project",
    title: "Home Screen Redesign",
    slug: { _type: "slug", current: "home-screen" },
    category: "product",
    tagline: "Bringing the user's world front and center",
    accentColor: "#FF71C7",
    role: "Lead Product Designer",
    year: "2025",
    team: "PM (Daniel Epstein), Or Shalev, Abby Zimmerman, Stakeholders: Alon David, Ofir Gluzman",
    overview: "Redesigned Facetune's homescreen from scratch as part of the augmented photography initiative. Brought users' own gallery front and center — and won the A/B test impressively.",
    problem: "The old homescreen created friction in the photo import process, delaying time to value and hurting engagement. Users had to navigate through multiple steps before seeing anything personal or relevant to them.",
    process: "Deep data analysis revealed that imports and time-to-first-edit were the key leverage points. Designed a vertical split screen: a custom iOS-inspired gallery in the top third, a modular promotional discovery area below. Ran extensive user testing to land on the right balance of gallery visibility vs. feature discovery.",
    solution: "A gallery-first homescreen where users see their own recent photos immediately. The gallery expands to full screen on scroll up, with smart filtering (faces, selfies) rather than chronological grids. The lower section is fully modular — personalized per user segment.",
    impact: "Won A/B test. Increased import rate and feature discovery metrics. Now 100% rolled out. The modular architecture unlocked a new personalization capability for the product team.",
    contentBlocks: [
      { _type: "figmaEmbed", _key: "figma2", embedUrl: "https://embed.figma.com/design/V26AQ9QDClWmCG4Hpkh5RG/Home-screen-2025?node-id=0-1&embed-host=share", caption: "Home Screen 2025 — full design explorations" },
    ],
    featured: true,
    order: 2,
  },
  {
    _id: "project-story-maker",
    _type: "project",
    title: "Story Maker",
    slug: { _type: "slug", current: "story-maker" },
    category: "product",
    tagline: "Turn your photo dump into a cinematic memory reel",
    accentColor: "#C8F135",
    role: "Lead Product Designer (0→1)",
    year: "2024",
    team: "PM (Gilad Sorek), Tech (Nissim Arfi), Copy (Chelsea Feil)",
    overview: "Story Maker lets users select 1–N photos and turn them into a cohesive AI-generated video reel. Each photo becomes a short animated clip; they're stitched into a single shareable story.",
    problem: "Gen Z photo dumps were everywhere on social media, but turning still photos into video content required professional tools or clunky apps. Facetune users wanted to share their life moments in motion — but had no easy way to do it.",
    process: "Started as a personal concept: what if the photo dump could move? Took the idea to PM, ran a weekend POC, got buy-in. Designed the full flow from zero: intro screen, multi-photo import drawer, AI loading state, video player with thumbnail timeline, per-clip regeneration.",
    solution: "Select photos → AI generates a short animated clip for each → clips are stitched into one continuous video. Users can control playback, see which photo maps to which clip, and individually regenerate clips.",
    impact: "Feature shipped as remote experiment. KPIs: feature retention, export rate, app mentions on social media. The thumbnail timeline interaction became a design innovation internally.",
    contentBlocks: [
      { _type: "figmaEmbed", _key: "figma3", embedUrl: "https://embed.figma.com/design/veIKe2muSaf2PcKyrxjus7/Story-Maker---Video-dump?node-id=0-1&embed-host=share", caption: "Story Maker — full design explorations" },
    ],
    featured: true,
    order: 3,
  },
  {
    _id: "project-ai-task-force",
    _type: "project",
    title: "AI Task Force",
    slug: { _type: "slug", current: "ai-task-force" },
    category: "product",
    tagline: "4 AI prototypes in 2 weeks via vibe coding",
    accentColor: "#FF4500",
    role: "Product Designer + Prototyper",
    year: "2024",
    team: "Selected team of 4 designers",
    overview: "Selected for Lightricks' AI Task Force. Delivered 4 functioning prototypes in 2 weeks using AI-assisted development — exploring novel interaction paradigms for AI image generation.",
    problem: "Text prompts for AI image generation are hard. Users don't know what to type, get frustrated, and abandon. The brief: rethink prompting entirely.",
    process: "Two-week sprint. Each prototype tackled a different aspect of the prompting problem, using behavioral psychology and interaction design principles. Built with vibe coding — AI-generated code reviewed and shaped by design.",
    solution: "\"This or That\": iterative style selection using binary psychological choice architecture — no prompts needed, just preferences. Mood Board Builder: assemble visual references instead of describing in words.",
    impact: "2 prototypes selected for full product development. Presented to company leadership.",
    contentBlocks: [],
    featured: true,
    order: 4,
  },
  {
    _id: "project-nir-oz",
    _type: "project",
    title: "Nir Oz Book",
    slug: { _type: "slug", current: "nir-oz-book" },
    category: "creative",
    tagline: "Design as documentation of history",
    accentColor: "#FF1744",
    role: "Book Designer",
    year: "2023",
    overview: "Designed during the Israel-Gaza war. A memorial and documentation book for Nir Oz kibbutz. Shown at Design Week and a video collaboration commissioned by the National Library of Jerusalem.",
    contentBlocks: [],
    featured: false,
    order: 5,
  },
  {
    _id: "project-pong",
    _type: "project",
    title: "Typography Pong",
    slug: { _type: "slug", current: "pong" },
    category: "creative",
    tagline: "A typography-forward pong game, built solo",
    accentColor: "#FFD700",
    role: "Designer + Developer",
    year: "2023",
    overview: "Built a typography-forward Pong game from scratch. Letters replace paddles, words score points. Playable directly in the portfolio.",
    contentBlocks: [],
    featured: false,
    order: 6,
  },
  {
    _id: "project-pavilion",
    _type: "project",
    title: "Pavilion",
    slug: { _type: "slug", current: "pavilion" },
    category: "creative",
    tagline: "Branding a real event in Jerusalem",
    accentColor: "#00C853",
    role: "Brand Designer",
    year: "2022",
    overview: "Branded a real public event in central Jerusalem as part of Bezalel's outstanding projects program. Full identity system: visual language, signage, print, and digital.",
    contentBlocks: [],
    featured: false,
    order: 7,
  },
]

async function importData() {
  console.log("Importing projects to Sanity...")
  for (const project of projects) {
    await client.createOrReplace(project)
    console.log(`✓ ${project.title}`)
  }
  console.log("\nDone! All projects imported.")
}

importData().catch(console.error)

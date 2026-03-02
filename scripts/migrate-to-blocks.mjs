/**
 * Migrates fixed text fields (overview, problem, process, solution, impact)
 * into contentBlocks sectionBlocks — so everything is orderable in Sanity.
 * Run with: SANITY_TOKEN=xxx node scripts/migrate-to-blocks.mjs
 */

import { createClient } from "@sanity/client"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const SECTION_FIELDS = [
  { field: "overview", label: "Overview" },
  { field: "problem",  label: "Problem"  },
  { field: "process",  label: "Process"  },
  { field: "solution", label: "Solution" },
  { field: "impact",   label: "Impact"   },
]

async function migrate() {
  const projects = await client.fetch(`*[_type == "project"]`)
  console.log(`Found ${projects.length} projects\n`)

  for (const project of projects) {
    const newBlocks = []

    // Convert each fixed field to a sectionBlock
    for (const { field, label } of SECTION_FIELDS) {
      if (project[field]) {
        newBlocks.push({
          _type: "sectionBlock",
          _key: `migrated-${field}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          label,
          text: project[field],
        })
      }
    }

    // Append existing contentBlocks after the text sections
    const existing = project.contentBlocks || []
    const merged = [...newBlocks, ...existing]

    if (newBlocks.length === 0) {
      console.log(`⏭  ${project.title} — no fixed fields to migrate`)
      continue
    }

    await client
      .patch(project._id)
      .set({ contentBlocks: merged })
      .unset(SECTION_FIELDS.map(f => f.field).filter(f => project[f]))
      .commit()

    console.log(`✓  ${project.title} — migrated: ${newBlocks.map(b => b.label).join(", ")}`)
  }

  console.log("\nDone!")
}

migrate().catch(console.error)

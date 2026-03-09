// Run: SANITY_TOKEN=<token> node update-pavilion.mjs

import { createClient } from "@sanity/client"
import { env } from "node:process"
import { createReadStream } from "node:fs"
import { resolve } from "node:path"

const client = createClient({
  projectId: "vc48nvpz",
  dataset: "prod",
  apiVersion: "2024-01-01",
  token: env.SANITY_TOKEN,
  useCdn: false,
})

const dl = "/Users/esabach/Downloads"

async function upload(file, name) {
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: name,
    contentType: "image/jpeg",
  })
  console.log(`  ✓ ${name}`)
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } }
}

console.log("Uploading images...")

const [hero, diagram, poster, led, evFilms, evPina, busstop, stageTape] = await Promise.all([
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.50 (4).jpeg"), "pavilion-facade-night.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.49.jpeg"),     "pavilion-arch-diagram.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.49 (1).jpeg"), "pavilion-poster-black.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.49 (2).jpeg"), "pavilion-led-wide.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.50 (1).jpeg"), "pavilion-event-films.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.50 (2).jpeg"), "pavilion-event-pina.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.50 (7).jpeg"), "pavilion-busstop-people.jpg"),
  upload(resolve(dl, "WhatsApp Image 2026-03-09 at 16.30.50 (3).jpeg"), "pavilion-stage-tape.jpg"),
])

const existing = await client.fetch(
  `*[_type == "project" && slug.current == "pavilion" && !(_id in path("drafts.**"))][0]{ _id }`
)

const data = {
  title: "Bezalel Pavilion",
  slug: { _type: "slug", current: "pavilion" },
  category: "creative",
  tagline: "Brand identity for a cultural pavilion in the heart of Jerusalem",
  heroImage: { ...hero, alt: "Bezalel Pavilion facade at night, Jerusalem" },
  accentColor: "#E8331A",
  role: "Brand & Identity Design",
  year: "2023",
  team: "4 Visual Communication + 10 Architecture students",
  overview: `The Bezalel Pavilion is a terrestrial structure in the center of Jerusalem, serving as a creative hub for students of the academy for cultural events, as well as for urban and community activities.

The pavilion is a joint project of 4 students from the Department of Visual Communication, together with 10 students from the Department of Architecture, led by architects Deborah Pinto Fadida, Alyal Kaye, and designer Michal Sahar.

This year the pavilion was hosted in the Jerusalem Arts Campus, celebrating the transition of the school of arts to the new campus in the city center. The pavilion served as a venue for cultural events of Bezalel School, including the Film and Television School, the Visual Theater School, the Center for Eastern Music, Nisan Path Acting Studio, and the Kolben Dance Company.`,
  contentBlocks: [
    {
      _type: "videoBlock",
      _key: "pavilion-video",
      url: "https://www.youtube.com/watch?v=IJH_0h6vti0",
      caption: "Bezalel Pavilion 2023 — identity in motion",
    },
    {
      _type: "imageBlock",
      _key: "pavilion-diagram",
      image: { ...diagram, alt: "Pavilion spatial program — 5 zones" },
      caption: "The five zones: Entrance Stage, Book Store, Coffee Shop, Cinema, and Stage",
      alignment: "full",
    },
    {
      _type: "imageBlock",
      _key: "pavilion-poster",
      image: { ...poster, alt: "Bezalel Pavilion main identity poster" },
      caption: "Main identity poster — tri-lingual system in Hebrew, English, and Arabic",
      alignment: "left",
    },
    {
      _type: "imageBlock",
      _key: "pavilion-led",
      image: { ...led, alt: "Identity system on LED screens at the pavilion" },
      caption: "The identity in motion on the pavilion's LED screens",
      alignment: "full",
    },
    {
      _type: "imagePair",
      _key: "pavilion-events-pair",
      left: { ...evFilms, alt: "Student films screening event poster" },
      right: { ...evPina, alt: "Pina film screening poster — Kolben Dance" },
      caption: "Event posters — each night programmed across the five cultural schools",
    },
    {
      _type: "imagePair",
      _key: "pavilion-street-pair",
      left: { ...busstop, alt: "Identity displayed at a bus stop in Jerusalem" },
      right: { ...stageTape, alt: "Branded stage with pavilion identity tape" },
      caption: "Out-of-home advertising across Jerusalem and branded physical surfaces",
    },
  ],
  featured: false,
  order: 7,
}

if (existing) {
  await client.patch(existing._id).set(data).commit()
  console.log("✓ Pavilion updated:", existing._id)
} else {
  const created = await client.create({ _type: "project", ...data })
  console.log("✓ Pavilion created:", created._id)
}

"use client"

/**
 * Sanity Studio embedded at /studio
 * Access at: http://localhost:3000/studio
 * Eden: this is your CMS. Edit projects, about, etc. here.
 */
import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

export default function StudioPage() {
  return <NextStudio config={config} />
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: "product" | "creative"
  tagline: string
  heroImage?: SanityImage
  heroVideoUrl?: string | null
  liveUrl?: string
  accentColor: string
  role: string
  year: string
  team?: string
  overview?: string
  problem?: string
  process?: string
  solution?: string
  impact?: string
  contentBlocks?: ContentBlock[]
  featured: boolean
  order: number
}

export interface SanityImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
}

export type ContentBlock =
  | { _type: "sectionBlock"; _key: string; label?: string; text: string }
  | { _type: "textBlock"; _key: string; text: string }
  | { _type: "imageBlock"; _key: string; image: SanityImage; caption?: string; fullWidth?: boolean; alignment?: "full" | "left" | "right" }
  | { _type: "imagePair"; _key: string; left: SanityImage; right: SanityImage; caption?: string }
  | { _type: "videoBlock"; _key: string; url?: string; fileUrl?: string; caption?: string; size?: "full" | "medium" | "small"; rounded?: boolean; phoneFrame?: boolean }
  | { _type: "figmaEmbed"; _key: string; embedUrl: string; caption?: string }
  | { _type: "metricBlock"; _key: string; metrics: { label: string; value: string }[] }
  | { _type: "sectionWithMedia"; _key: string; label?: string; text: string; imageUrl?: string | null; imageAlt?: string; videoUrl?: string; videoFileUrl?: string; caption?: string; rounded?: boolean; phoneFrame?: boolean }

export interface AboutData {
  bio: string
  skills: string[]
  tools: string[]
  email: string
  linkedIn: string
  photo?: SanityImage
}

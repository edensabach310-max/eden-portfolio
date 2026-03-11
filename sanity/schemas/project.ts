import { defineField, defineType } from "sanity"

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Product Design", value: "product" },
          { title: "Creative / Personal", value: "creative" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One punchy line that sums up the project",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex color for this project (e.g. #0057FF)",
      initialValue: "#0057FF",
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "string",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "process",
      title: "Process",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "solution",
      title: "Solution",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "impact",
      title: "Impact / Results",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      description: "Build the case study freely — mix text sections, images, Figma, metrics in any order",
      of: [
        {
          type: "object",
          name: "sectionBlock",
          title: "Text Section",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "e.g. Overview · Problem · Process · Solution · Impact (leave blank for no label)",
            }),
            defineField({ name: "text", title: "Content", type: "text", rows: 6 }),
          ],
          preview: {
            select: { title: "label", subtitle: "text" },
            prepare({ title, subtitle }) {
              return { title: title || "Text Section", subtitle }
            },
          },
        },
        {
          type: "object",
          name: "sectionWithMedia",
          title: "Text + Image Side by Side",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Optional section label (leave blank for none)",
            }),
            defineField({ name: "text", title: "Content", type: "text", rows: 6 }),
            defineField({
              name: "image",
              title: "Image (optional)",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL — YouTube / Vimeo (optional)",
              type: "url",
              description: "Use instead of image — or leave empty and upload a file below",
            }),
            defineField({
              name: "videoFile",
              title: "Video File — mp4 / mov (optional)",
              type: "file",
              options: { accept: "video/*" },
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "text", media: "image" },
            prepare({ title, subtitle, media }) {
              return { title: title || "Text + Image", subtitle, media }
            },
          },
        },
        {
          type: "object",
          name: "textBlock",
          title: "Plain Text",
          fields: [
            defineField({ name: "text", title: "Text", type: "text", rows: 6 }),
          ],
        },
        {
          type: "object",
          name: "imageBlock",
          title: "Image",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "alignment",
              title: "Alignment",
              type: "string",
              options: {
                list: [
                  { title: "Full width (edge to edge)", value: "full" },
                  { title: "Left aligned (text column width)", value: "left" },
                  { title: "Right aligned (text column width)", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Image", media }
            },
          },
        },
        {
          type: "object",
          name: "imagePair",
          title: "Image Pair (2 side by side)",
          fields: [
            defineField({
              name: "left",
              title: "Left Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({
              name: "right",
              title: "Right Image",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { media: "left" },
            prepare({ media }) { return { title: "Image Pair", media } },
          },
        },
        {
          type: "object",
          name: "videoBlock",
          title: "Video",
          fields: [
            defineField({
              name: "url",
              title: "Video URL (YouTube / Vimeo)",
              type: "url",
              description: "Paste a YouTube or Vimeo link — OR leave empty and upload a file below",
            }),
            defineField({
              name: "file",
              title: "Video File",
              type: "file",
              description: "⚠️ MP4 only — MOV/QuickTime files won't play in Chrome. Export from QuickTime → File → Export As → 1080p to convert.",
              options: { accept: "video/mp4" },
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "Full width", value: "full" },
                  { title: "Medium (2/3 width)", value: "medium" },
                  { title: "Small (portrait / screen recording)", value: "small" },
                ],
                layout: "radio",
              },
              initialValue: "full",
            }),
          ],
        },
        {
          type: "object",
          name: "figmaEmbed",
          title: "Figma Embed",
          fields: [
            defineField({
              name: "embedUrl",
              title: "Figma Embed URL",
              type: "url",
              description: 'Use the embed URL: https://embed.figma.com/design/...',
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
        {
          type: "object",
          name: "metricBlock",
          title: "Metrics",
          fields: [
            defineField({
              name: "metrics",
              title: "Metrics",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "value", title: "Value (e.g. +38%)", type: "string" }),
                    defineField({ name: "label", title: "Label (e.g. D7 Retention)", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = appears first",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "heroImage" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === "product" ? "Product Design" : "Creative",
        media,
      }
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
})

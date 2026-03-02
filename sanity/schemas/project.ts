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
            defineField({ name: "fullWidth", title: "Full Width (edge to edge)", type: "boolean", initialValue: false }),
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
            defineField({ name: "url", title: "Video URL (YouTube/Vimeo)", type: "url" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
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

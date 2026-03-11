import { defineField, defineType } from "sanity"

export const aboutSchema = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio — First paragraph (dark)",
      type: "text",
      rows: 4,
      description: "e.g. Product Designer, currently at Lightricks...",
    }),
    defineField({
      name: "bio2",
      title: "Bio — Second paragraph (gray)",
      type: "text",
      rows: 4,
      description: "e.g. Based in Tel Aviv...",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
    }),
    defineField({
      name: "linkedIn",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "place", title: "Place", type: "string" }),
            defineField({ name: "products", title: "Products / Details", type: "string" }),
            defineField({ name: "period", title: "Period (e.g. 2022 – Present)", type: "string" }),
            defineField({ name: "accent", title: "Accent Color (hex)", type: "string", initialValue: "#0057FF" }),
          ],
          preview: {
            select: { title: "role", subtitle: "place" },
            prepare({ title, subtitle }) { return { title, subtitle } },
          },
        },
      ],
    }),
    defineField({
      name: "cv",
      title: "CV / Resume (PDF)",
      type: "file",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" }
    },
  },
})

import { defineField, defineType } from "sanity"

export const aboutSchema = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "The big title at the top of the page",
      initialValue: "Making complex things feel obvious.",
    }),
    defineField({
      name: "bio",
      title: "Bio — First paragraph (dark text)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bio2",
      title: "Bio — Second paragraph (gray text)",
      type: "text",
      rows: 4,
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
            defineField({ name: "role", title: "Role / Title", type: "string" }),
            defineField({ name: "place", title: "Company / Institution", type: "string" }),
            defineField({ name: "products", title: "Details (e.g. Facetune · Videoleap)", type: "string" }),
            defineField({ name: "period", title: "Period (e.g. 2022 – Present)", type: "string" }),
            defineField({
              name: "accent",
              title: "Accent Color (hex)",
              type: "string",
              initialValue: "#0057FF",
              description: "Blue #0057FF · Pink #FF3D7F · Lime #C8F135",
            }),
          ],
          preview: {
            select: { title: "role", subtitle: "period" },
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

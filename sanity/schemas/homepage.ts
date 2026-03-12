import { defineType, defineField } from "sanity"

export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle (under name)",
      type: "string",
      description: 'e.g. "Product Designer · Tel Aviv"',
      initialValue: "Product Designer · Tel Aviv",
    }),
    defineField({
      name: "heroLine1",
      title: "Hero — Line 1",
      type: "string",
      description: 'e.g. "Hi, I\'m Eden"',
      initialValue: "Hi, I'm Eden",
    }),
    defineField({
      name: "heroLine2",
      title: "Hero — Line 2",
      type: "string",
      description: 'e.g. "live in Tel Aviv,"',
      initialValue: "live in Tel Aviv,",
    }),
    defineField({
      name: "heroLine3",
      title: "Hero — Line 3",
      type: "string",
      description: 'e.g. "love designing"',
      initialValue: "love designing",
    }),
    defineField({
      name: "heroLine4Part1",
      title: "Hero — Line 4 (before dog name)",
      type: "string",
      description: 'e.g. "& walking with"',
      initialValue: "& walking with",
    }),
    defineField({
      name: "heroLine4Part2",
      title: "Hero — Line 4 (dog name + period)",
      type: "string",
      description: 'e.g. "Kali."',
      initialValue: "Kali.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 3,
      description: "Main paragraph below hero text",
      initialValue: "Product designer at Lightricks — making AI apps feel effortless for millions of people.",
    }),
    defineField({
      name: "accentNote",
      title: "Accent Note (blue text)",
      type: "string",
      description: 'e.g. "* oh, and I built this whole site myself using vibe coding."',
      initialValue: "* oh, and I built this whole site myself using vibe coding.",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      description: 'Used in the "Get in touch" button',
      initialValue: "eden@example.com",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
})

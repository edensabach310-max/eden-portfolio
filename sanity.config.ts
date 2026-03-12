import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "eden-portfolio-studio",
  title: "Eden Sabach Portfolio",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "prod",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document()
                  .schemaType("homepage")
                  .documentId("homepage")
              ),
            S.listItem()
              .title("About")
              .id("about")
              .child(
                S.document()
                  .schemaType("about")
                  .documentId("about")
              ),
            S.divider(),
            S.listItem()
              .title("Projects")
              .child(
                S.documentTypeList("project").title("All Projects")
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})

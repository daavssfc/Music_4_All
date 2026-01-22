import { defineField, defineType } from "sanity";

export default defineType({
  name: "externalLink",
  title: "External Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] })
    })
  ]
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "SEO Title",
      validation: (Rule) => Rule.max(60)
    }),
    defineField({
      name: "description",
      type: "text",
      title: "SEO Description",
      rows: 3,
      validation: (Rule) => Rule.max(160)
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Social Image",
      options: { hotspot: true }
    })
  ]
});

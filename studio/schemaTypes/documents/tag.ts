import { defineField, defineType } from "sanity";

export default defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Genre", value: "genre" },
          { title: "Topic", value: "topic" }
        ]
      },
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: { title: "name", subtitle: "type" }
  }
});

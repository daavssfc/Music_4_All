import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
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
      name: "bio",
      type: "blockContent",
      title: "Bio"
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Artist Image",
      options: { hotspot: true }
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [{ type: "externalLink" }]
    })
  ],
  preview: {
    select: { title: "name", media: "image" }
  }
});

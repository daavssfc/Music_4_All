import { defineField, defineType } from "sanity";

export default defineType({
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "artists",
      type: "array",
      title: "Artists",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "releaseDate",
      type: "date",
      title: "Release Date",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label"
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: { title: "title", media: "coverImage" }
  }
});

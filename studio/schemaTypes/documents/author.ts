import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "handle",
      type: "string",
      title: "Handle",
      description: "Short identifier used for display or attribution.",
      validation: (Rule) => Rule.required().min(2)
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
      type: "text",
      title: "Bio",
      rows: 4
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: { hotspot: true }
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "Editor", value: "editor" },
          { title: "Reviewer", value: "reviewer" }
        ]
      },
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" }
  }
});

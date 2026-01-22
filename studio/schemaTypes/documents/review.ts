import { defineField, defineType } from "sanity";

const requiredWhenPublished = (value: unknown, context: { document?: { status?: string } }) => {
  if (context.document?.status === "published" && (value === undefined || value === null || value === "")) {
    return "Required to publish.";
  }
  return true;
};

export default defineType({
  name: "review",
  title: "Review",
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
      name: "album",
      type: "reference",
      title: "Album",
      to: [{ type: "album" }],
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Rating (0-10)",
      validation: (Rule) =>
        Rule.min(0)
          .max(10)
          .precision(1)
          .custom(requiredWhenPublished)
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt",
      rows: 3,
      validation: (Rule) => Rule.max(280).custom(requiredWhenPublished)
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Body",
      validation: (Rule) => Rule.custom(requiredWhenPublished)
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "reference", to: [{ type: "tag" }] }]
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "In Review", value: "inReview" },
          { title: "Published", value: "published" },
          { title: "Scheduled", value: "scheduled" }
        ]
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      validation: (Rule) => Rule.custom(requiredWhenPublished)
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status"
    }
  }
});

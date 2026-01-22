import { defineField, defineType } from "sanity";
import type { ValidationContext } from "sanity";

const requiredWhenPublished = (value: unknown, context: ValidationContext) => {
  const document = context.document as { status?: string } | undefined;
  if (document?.status === "published" && (value === undefined || value === null || value === "")) {
    return "Required to publish.";
  }
  return true;
};

export default defineType({
  name: "event",
  title: "Event",
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
      of: [{ type: "reference", to: [{ type: "artist" }] }]
    }),
    defineField({
      name: "venue",
      type: "string",
      title: "Venue",
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "country",
      type: "string",
      title: "Country",
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "startsAt",
      type: "datetime",
      title: "Starts At",
      validation: (Rule) => Rule.required().custom(requiredWhenPublished)
    }),
    defineField({
      name: "ticketUrl",
      type: "url",
      title: "Ticket URL",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] })
    }),
    defineField({
      name: "description",
      type: "blockContent",
      title: "Description"
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Event Image",
      options: { hotspot: true }
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
      subtitle: "city"
    }
  }
});

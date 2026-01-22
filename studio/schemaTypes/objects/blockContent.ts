import { defineField, defineType } from "sanity";

export default defineType({
  name: "blockContent",
  title: "Rich Text",
  type: "array",
  of: [
    defineField({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" }
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" }
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" }
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) => Rule.uri({ scheme: ["http", "https", "mailto"] })
              })
            ]
          }
        ]
      }
    }),
    defineField({
      type: "image",
      options: { hotspot: true }
    })
  ]
});

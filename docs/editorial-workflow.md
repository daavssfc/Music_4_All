# Editorial Workflow

This guide walks through how Admins, Editors, and Reviewers should work inside the Studio.

## Roles

- **Admin**: manage everything, including users and publish actions.
- **Editor**: edit and publish content, approve reviewer submissions.
- **Reviewer**: create/edit their own drafts, cannot publish.

## Workflow States

Each content type includes a `status` field with:

- `draft`
- `inReview`
- `published`
- `scheduled`

### Suggested process

1. **Reviewer** creates a new document and leaves it as `draft`.
2. **Reviewer** sets `status` → `inReview` when ready.
3. **Editor** reviews content and either:
   - returns it to `draft` with feedback, or
   - sets `status` → `published` and adds `publishedAt`.
4. **Admin/Editor** can set `scheduled` with a future `publishedAt`.

## Field requirements for publishing

When `status` is `published`, these fields must be set (validation enforced in Studio):

- `title`
- `slug`
- `author`
- `publishedAt`
- content-specific required fields (e.g., `rating` for reviews, `venue` for events)

## Uploading images

Use the built-in image picker. For best results:

- Cover images: at least 1200×1200
- Social images: at least 1200×630

## Quick checklist for Editors

- ✅ Title, slug, excerpt
- ✅ Body content
- ✅ Author assigned
- ✅ Tags/genres assigned
- ✅ PublishedAt set
- ✅ SEO fields filled (optional but recommended)

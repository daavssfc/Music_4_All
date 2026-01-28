# Security Notes

## Security headers

The application sets baseline security headers in `next.config.mjs` for all routes:

- `Content-Security-Policy` to limit where scripts, styles, and images can load from.
- `Strict-Transport-Security` (HSTS) to enforce HTTPS.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`
  to reduce common browser-based attack surfaces.

If you add third-party embeds (YouTube, Spotify, SoundCloud, etc.), update the CSP allowlist to include the required domains.

## Rate limiting

API routes are protected by a basic, in-memory rate limit in `middleware.ts`.

Default values:
- `RATE_LIMIT_WINDOW_MS=60000`
- `RATE_LIMIT_MAX=120`

These defaults can be overridden via environment variables.

## Rich text rendering (XSS safety)

When rendering Sanity Portable Text content, **never** use `dangerouslySetInnerHTML`.
Use a safe renderer (e.g., `@portabletext/react`) and escape any raw strings. For
simple previews, use the helper in `lib/security/sanitize.ts`:

- `escapeHtml(text)` for raw strings
- `portableTextToPlainText(blocks)` for a safe text-only preview

These utilities strip markup and escape HTML characters to mitigate XSS.

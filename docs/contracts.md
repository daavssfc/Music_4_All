# API Contracts

These endpoints provide a stable, JSON-based contract for the external UI. All list endpoints support pagination via `limit` and `offset`, returning `pageInfo`.

## Pagination

All list endpoints accept:

- `limit` (default: 20, max: 100)
- `offset` (default: 0)

Response envelope:

```json
{
  "items": ["..."],
  "pageInfo": {
    "limit": 20,
    "offset": 0,
    "total": 120,
    "hasMore": true
  }
}
```

## Reviews

### List

`GET /api/reviews`

Query params:

- `tag`: tag slug
- `genre`: genre tag slug (type = `genre`)
- `artist`: artist slug (filters by album artists)
- `year`: published year
- `ratingMin`: minimum rating (0-10)
- `ratingMax`: maximum rating (0-10)
- `q`: full-text search (title, excerpt, body)

### Detail

`GET /api/reviews/[slug]`

## News

### List

`GET /api/news`

Query params:

- `tag`: tag slug
- `q`: full-text search (title, excerpt, body)

### Detail

`GET /api/news/[slug]`

## Events

### List

`GET /api/events`

Query params:

- `artist`: artist slug
- `city`: city match
- `country`: country match
- `when`: `upcoming`, `past`, or `all`
- `q`: full-text search (title, venue, description)

### Detail

`GET /api/events/[slug]`

## Artists

### List

`GET /api/artists`

Query params:

- `q`: full-text search (name, bio)

### Detail

`GET /api/artists/[slug]`

## Tags

### List

`GET /api/tags`

Query params:

- `type`: `genre` or `topic`

### Detail

`GET /api/tags/[slug]`

## Canonical Routes (external UI)

The external UI should map to these stable URL patterns:

- `/reviews` and `/reviews/[slug]`
- `/news` and `/news/[slug]`
- `/events` and `/events/[slug]`
- `/artists/[slug]`
- `/tags/[slug]`

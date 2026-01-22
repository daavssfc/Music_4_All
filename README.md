# Music 4 All

Foundation for a headless music publication platform. The UI is intentionally minimal; it exists to validate the backend and data contracts.

## Requirements
- Node.js 20.x
- pnpm 9.x

## Getting started
```bash
pnpm install
pnpm dev
```

## Sanity Studio
The Sanity Studio lives in `/studio` and uses the same repo.

```bash
pnpm studio:dev
```

### Sanity setup notes
- If you were not asked to create a dataset, Sanity defaults to `production`.
- Add your project ID and dataset to a local `.env.local` file in the repo root.

## Scripts
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm studio:dev`
- `pnpm studio:build`

## Health endpoints
- `GET /api/health`
- `GET /api/version`

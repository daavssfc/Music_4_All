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
The Sanity Studio is embedded at `/studio` and uses the same repo.

```bash
pnpm studio:dev
```

### Sanity setup notes
- If you were not asked to create a dataset, Sanity defaults to `production`.
- Add your project ID and dataset to a local `.env.local` file in the repo root.
- When deploying to Vercel, set the public Studio env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`

## Scripts
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm studio:dev`
- `pnpm studio:build`

## Documentation
- API contracts: `docs/contracts.md`
- Revalidation setup: `docs/revalidation.md`
- Security notes: `docs/security.md`
- Observability notes: `docs/observability.md`
- Editorial workflow: `docs/editorial-workflow.md`

## Health endpoints
- `GET /api/health`
- `GET /api/version`

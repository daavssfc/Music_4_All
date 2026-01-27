# Observability

This project uses structured logging to make production debugging easier.

## Logging

- The server uses `pino` via `lib/logger.ts`.
- Logs are JSON and include a message plus contextual fields.
- Set `LOG_LEVEL` to control verbosity (`debug`, `info`, `warn`, `error`).

Example log entry:

```json
{"level":30,"time":1710000000000,"msg":"Health check requested","route":"/api/health"}
```

## Next steps (optional)

- Add a log drain (Vercel Log Drains, Datadog, or Logflare).
- Add error tracking (Sentry) for stack traces and alerts.

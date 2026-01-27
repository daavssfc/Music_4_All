# Uptime Monitoring

This project exposes lightweight health endpoints that are safe to ping on a schedule:

- `GET /api/health`
- `GET /api/version`

## Recommended setup (non-technical)

Use a simple uptime service (UptimeRobot, Better Stack, or Pingdom) to ping both endpoints
every 1–5 minutes. If either endpoint fails, you’ll get an email/SMS alert.

### Why two endpoints?

- `/api/health` validates app runtime health.
- `/api/version` confirms the deployed version is responding.

## Notes

- If you deploy with Vercel, these endpoints are publicly reachable by default.
- You can tighten security later by adding allowlists or edge protection.

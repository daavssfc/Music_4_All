# Revalidation Setup (Sanity → Next.js)

This project uses a token-protected endpoint to trigger revalidation when content is published.

## Endpoint

`POST /api/revalidate`

Example payload:

```json
{
  "secret": "<REVALIDATION_TOKEN>",
  "paths": ["/reviews", "/news", "/events"]
}
```

The endpoint will revalidate each path in the `paths` array.

---

## ACTION REQUIRED FROM PM

### 1) Add the revalidation token in Vercel

1. Go to https://vercel.com and open the **Music 4 All** project.
2. Look for **Settings** in the top navigation.
3. Click **Environment Variables** in the left sidebar.
4. Add a new variable:
   - **Name**: `REVALIDATION_TOKEN`
   - **Value**: generate a random long string (I can provide one if you want).
   - **Environment**: Production + Preview
5. Click **Save**.

Also add these Studio variables (Production + Preview):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (use `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (use `2024-01-01`)

Screenshot callout: look for “Environment Variables” in the left sidebar.

### 2) Create a Sanity webhook

1. Go to https://www.sanity.io/manage and open the **Music 4 All** project.
2. In the left sidebar, click **API**.
3. Find **Webhooks** and click **Add webhook**.
4. Fill in the form:
   - **Name**: `Next.js Revalidate`
   - **URL**: `https://<your-vercel-domain>/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Projection** (payload): paste the object **without** backticks or `json` fences:
     ```
     {
       "secret": "<REVALIDATION_TOKEN>",
       "paths": ["/reviews", "/news", "/events", "/artists", "/tags"]
     }
     ```
5. Save the webhook.

Screenshot callout: look for “API” in the left sidebar, then “Webhooks”.

### 3) Send me confirmation

Please reply with:
- Your Vercel domain (so I can confirm the webhook URL is correct).
- Confirmation that the `REVALIDATION_TOKEN` env var is set in Vercel.
- Confirmation that the Sanity webhook is saved.

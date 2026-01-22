import { headers } from "next/headers";

async function fetchHealth() {
  const incomingHeaders = headers();
  const fallbackHost = incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = process.env.VERCEL ? "https" : "http";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `${protocol}://${fallbackHost}`;
  const response = await fetch(`${baseUrl}/api/health`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Health check failed");
  }

  return response.json();
}

export default async function HomePage() {
  const health = await fetchHealth();

  return (
    <main>
      <h1>Music 4 All – Platform Stub</h1>
      <p>
        This minimal UI confirms the data layer is reachable. The external UI will
        replace this later.
      </p>

      <section>
        <h2>Health check</h2>
        <pre>{JSON.stringify(health, null, 2)}</pre>
        <p>
          API endpoint: <code>/api/health</code>
        </p>
      </section>

      <section>
        <h2>Planned routes</h2>
        <ul>
          <li>/reviews</li>
          <li>/news</li>
          <li>/events</li>
          <li>/artists/[slug]</li>
          <li>/tags/[slug]</li>
        </ul>
      </section>
    </main>
  );
}

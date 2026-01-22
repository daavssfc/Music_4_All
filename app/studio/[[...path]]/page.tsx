"use client";

import { Studio } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "@/studio/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export default function StudioPage() {
  if (!projectId) {
    return (
      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Sanity Studio is not configured</h1>
        <p>Add NEXT_PUBLIC_SANITY_PROJECT_ID to your environment variables.</p>
      </main>
    );
  }

  return (
    <Studio
      config={{
        name: "music-4-all",
        title: "Music 4 All Studio",
        projectId,
        dataset,
        plugins: [deskTool()],
        schema: { types: schemaTypes }
      }}
    />
  );
}

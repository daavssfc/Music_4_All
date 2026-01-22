import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_READ_TOKEN;

if (!projectId) {
  throw new Error("SANITY_PROJECT_ID is required to query Sanity.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token
});

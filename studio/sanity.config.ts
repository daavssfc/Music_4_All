import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemaTypes";
import { studioTheme } from "./studioTheme";
import "./theme.css";

const projectId = process.env.SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "music-4-all",
  title: "Music 4 All Studio",
  projectId,
  dataset,
  theme: studioTheme,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});

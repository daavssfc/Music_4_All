import { buildLegacyTheme, defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const dataset = process.env.SANITY_DATASET || "production";

const studioTheme = buildLegacyTheme({
  "--main-navigation-color": "#121212",
  "--main-navigation-color--inverted": "#f7f3ea",
  "--focus-color": "#d1a25a",
  "--body-bg": "#101217",
  "--body-text": "#f7f3ea",
  "--card-bg-color": "#171a21",
  "--card-fg-color": "#f7f3ea",
  "--border-color": "#2b313c"
});

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

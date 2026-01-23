import { buildLegacyTheme, defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemaTypes";
import "./theme.css";

const projectId = process.env.SANITY_PROJECT_ID || "YOUR_PROJECT_ID";
const dataset = process.env.SANITY_DATASET || "production";

const studioTheme = buildLegacyTheme({
  "--main-navigation-color": "#121212",
  "--main-navigation-color--inverted": "#f7f3ea",
  "--brand-primary": "#d1a25a",
  "--focus-color": "#d1a25a",
  "--body-bg": "#101217",
  "--body-text": "#f7f3ea",
  "--card-bg-color": "#171a21",
  "--card-fg-color": "#f7f3ea",
  "--border-color": "#2b313c",
  "--default-button-primary-color": "#d1a25a",
  "--default-button-primary-color--inverted": "#1a1408",
  "--default-button-secondary-color": "#1b1f27",
  "--default-button-secondary-color--inverted": "#f7f3ea"
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

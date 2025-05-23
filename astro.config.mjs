import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import dotenv from "dotenv";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  site: 'https://democraft.studio',
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon(), mdx()],
});

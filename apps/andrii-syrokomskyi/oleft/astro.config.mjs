// @ts-check

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcssPostcss from "@tailwindcss/postcss";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcssPostcss],
      },
    },
  },
});

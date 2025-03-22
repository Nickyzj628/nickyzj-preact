import path from "path";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import collectAssets from "./vite-plugin-collect-assets";
// @ts-ignore
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [preact(), tailwindcss(), svgr(), collectAssets()],
  build: {
    // outDir: "D:/nginx/html",
  },
});
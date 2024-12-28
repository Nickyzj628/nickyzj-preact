import path from "path";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [preact(), svgr()],
  build: {
    outDir: "D:/nginx/html",
  },
});
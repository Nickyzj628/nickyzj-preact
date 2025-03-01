import path from "path";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [preact(), tailwindcss(), svgr()],
  build: {
    outDir: "D:/nginx/html",
  },
});
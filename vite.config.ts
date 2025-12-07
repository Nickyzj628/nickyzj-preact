import path from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
	plugins: [
		preact(),
		tailwindcss(),
		analyzer({
			enabled: command === "build",
			defaultSizes: "gzip",
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimizeDeps: {
		include: ["nano-css/addon/vcssom"],
	},
	build: {
		// outDir: "./dist",
		outDir: "D:/nginx/html",
		emptyOutDir: true,
	},
}));

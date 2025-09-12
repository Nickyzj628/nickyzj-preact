import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
    html: {
        template: "./index.html",
    },
    source: {
        entry: {
            index: "./src/app.tsx",
        },
    },
    resolve: {
        alias: {
            "@": "./src",
        },
    },
    plugins: [pluginPreact()],
    performance: {
        chunkSplit: {
            strategy: "split-by-module",
        },
    },
    output: {
        filename: {
            js: "[name].js?v=[contenthash:8]",
            css: "[name].css?v=[contenthash:8]",
        },
        distPath: {
            root: "D:/nginx/html",
        },
        cleanDistPath: true,
    },
});

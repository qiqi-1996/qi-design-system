import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import pages from "vite-plugin-pages"

import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    root: "./src-docs",
    base: "/qi-design-system/",
    build: {
        outDir: resolve(__dirname, "dist/docs"),
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src-docs"),
            "@core": resolve(__dirname, "src"),
        },
    },
    plugins: [
        {
            enforce: "pre",
            ...mdx(),
        },
        tailwindcss(),
        react(),
        pages({
            dirs: "views",
            importPath: "absolute",
        }),
    ],
})

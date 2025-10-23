import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tailwindcss from "@tailwindcss/vite"
import pages from "vite-plugin-pages"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    root: "./src-docs",
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
        tailwindcss(),
        react(),
        pages({
            dirs: "views",
        }),
    ],
})

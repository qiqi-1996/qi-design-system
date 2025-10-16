import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, useRoutes } from "react-router-dom"
import routes from "~react-pages"
import "./index.css"
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core"
import { initI18n } from "./i18n"

initI18n()

const theme = createTheme({
    colors: {
        brand: [
            "#ebf0ff",
            "#d2ddfa",
            "#a0b8f7",
            "#6c90f6",
            "#446ff5",
            "#2f5af6",
            "#254ff7",
            "#1b41dc",
            "#1339c5",
            "#002fa7",
        ],
    },
    primaryColor: "brand",
    respectReducedMotion: true,
    defaultRadius: "lg",
})

function App() {
    return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ColorSchemeScript defaultColorScheme="auto" />
            <MantineProvider theme={theme} defaultColorScheme="auto">
                <App />
            </MantineProvider>
        </BrowserRouter>
    </StrictMode>,
)

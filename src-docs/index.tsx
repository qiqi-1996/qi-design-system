import { ColorSchemeScript, MantineProvider, mergeThemeOverrides } from "@mantine/core"
import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, useRoutes } from "react-router-dom"
import routes from "~react-pages"
import { initI18n } from "./i18n"
import "./index.css"
import designSystemTheme from "./theme"

initI18n()

const theme = mergeThemeOverrides(designSystemTheme, {
    respectReducedMotion: true,
    defaultRadius: "lg",
})

function App() {
    return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename="qi-design-system">
            <ColorSchemeScript defaultColorScheme="auto" />
            <MantineProvider theme={theme} defaultColorScheme="auto">
                <App />
            </MantineProvider>
        </BrowserRouter>
    </StrictMode>,
)

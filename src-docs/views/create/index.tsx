import { AppPage } from "@/components/app-layout/page"
import { generate } from "@ant-design/colors"
import { commonGenColorPalette, commonGenColorSemantic, genTailwindV4, type DesignSystemConfig } from "@core"
import { createTheme, MantineProvider } from "@mantine/core"
import { pick } from "lodash"
import { useMemo, useState } from "react"
import { DesignSystemEditor } from "./editor"
import type { DesignSystemFlags } from "./editor/types"
import { DesignSystemPreview } from "./preview"

export default function () {
    const [designSystemConfig, setDesignSystemConfig] = useState<DesignSystemConfig>({})
    const [designSystemFlags, setDesignSystemFlags] = useState<DesignSystemFlags>({
        space: false,
        color: false,
        font: false,
    })

    const generated = {
        space: designSystemConfig.space,
        color: {
            palettes: commonGenColorPalette(designSystemConfig.color?.palettes),
            semantics: commonGenColorSemantic(designSystemConfig.color?.semantic),
        },
    }

    const theme = useMemo(
        () =>
            createTheme({
                colors: {
                    primary: (generated.color.palettes[0]?.[1].palette ?? generate("#002FA7")) as any,
                },
                primaryColor: "primary",
            }),
        [generated.color.palettes],
    )

    const cssVariables = `:root{ ${genTailwindV4(pick(designSystemConfig, "color"), { noTheme: true })} }`

    return (
        <AppPage noBodyPadding>
            <style>{cssVariables}</style>
            <MantineProvider theme={theme}>
                <div className="flex h-full w-full overflow-auto pt-2">
                    <DesignSystemEditor
                        className="h-full shrink-0 overflow-auto pr-1 pb-5 pl-5"
                        value={{ config: designSystemConfig, flags: designSystemFlags }}
                        onChange={(evt) => {
                            setDesignSystemConfig(evt.config)
                            setDesignSystemFlags(evt.flags)
                        }}
                    />
                    <DesignSystemPreview
                        className="h-full w-full overflow-auto pr-5 pl-5"
                        value={{ config: designSystemConfig, flags: designSystemFlags }}
                    />
                </div>
            </MantineProvider>
        </AppPage>
    )
}

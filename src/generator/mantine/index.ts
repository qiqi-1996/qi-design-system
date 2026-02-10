import { colorSchema, commonGenColorPalette, designSystemSchema } from "@core/index"
import type { MantineThemeOverride } from "@mantine/core"
import z from "zod"

export function genMantine(data: z.infer<ReturnType<typeof designSystemSchema>>) {
    const system = designSystemSchema().parse(data)
    const lightIndex =
        system.color?.palettes?.findIndex(
            (item) => item.type === "qi-design-system-v0" && (item.args?.[0] ?? "light") === "light",
        ) ?? -1
    const darkIndex =
        system.color?.palettes?.findIndex(
            (item) => item.type === "qi-design-system-v0" && (item.args?.[0] ?? "light") === "dark",
        ) ?? -1
    const lightName = system.color?.palettes?.[lightIndex]?.name
    const darkTheme = system.color?.palettes?.[darkIndex]?.name

    const themeObject: MantineThemeOverride = {
        colors: genColor(system.color),
        primaryColor: system.color?.palettes?.[0]?.name,
        primaryShade: (lightIndex !== -1 && lightIndex < 2) || (darkIndex !== -1 && darkIndex < 2) ? 7 : undefined,
    }

    if (lightName && darkTheme) {
        return `import { createTheme } from "@mantine/core"
    
export const lightTheme = createTheme(${JSON.stringify({ ...themeObject, primaryColor: lightName }, null, 4)})

export const darkTheme = createTheme(${JSON.stringify({ ...themeObject, primaryColor: darkTheme }, null, 4)})

export default lightTheme
        `
    } else {
        return `import { createTheme } from "@mantine/core"

export default createTheme(${JSON.stringify(themeObject, null, 4)})
        `
    }
}

function genColor(colorConfig: z.infer<typeof colorSchema>): Exclude<MantineThemeOverride["colors"], undefined> {
    const fullColorConfig = colorSchema().parse(colorConfig)
    const fullPalette = commonGenColorPalette(fullColorConfig.palettes ?? [])

    return fullPalette.reduce((acc, [name, data]) => {
        acc[name] = data.palette
        return acc
    }, {} as any)
}

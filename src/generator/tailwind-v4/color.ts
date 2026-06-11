import type z from "zod"
import { colorSchema } from "../../schema/color"
import { commonGenColorPalette, commonGenColorSemantic } from "../common/color"
import { isColorVariable } from "@core/helper/color"
import type { TailwindDisableDefaultConfig } from "@core/schema/output"

export function genColor(
    colorConfig: z.infer<typeof colorSchema>,
    options?: { disableDefault?: TailwindDisableDefaultConfig; darkSemantic?: boolean },
) {
    const fullColorConfig = colorSchema().parse(colorConfig)
    const fullPalette = commonGenColorPalette(fullColorConfig.palette ?? [])
    const fullSemantic = commonGenColorSemantic(fullColorConfig.semantic ?? {})
    const disableDefault = options?.disableDefault ?? []
    const darkSemantic = options?.darkSemantic ?? true

    const rootSemantic: [string, string][] = []
    const darkClassSemantic: [string, string][] = []

    for (const [name, value] of fullSemantic) {
        if (name.startsWith("dark-")) {
            darkClassSemantic.push([name.slice(5), value])
            if (darkSemantic) {
                rootSemantic.push([name.slice(5) + "-dark", value])
            }
        } else {
            rootSemantic.push([name, value])
        }
    }

    const root = [
        disableDefault.includes("color") ? `--color-*: initial;` : "",
        ...fullPalette.flatMap(([name, data]) => [
            `--color-${name}: ${data.primary};`,
            ...data.palette.map((c, i) => `--color-${name}-${(i + 1) * 100}: ${c};`),
        ]),
        ...rootSemantic.map(
            ([name, value]) => `--color-${name}: ${isColorVariable(value) ? `var(--color-${value});` : value};`,
        ),
    ]
        .filter(Boolean)
        .join("\n")

    const dark = darkClassSemantic
        .map(([name, value]) => `--color-${name}: ${isColorVariable(value) ? `var(--color-${value});` : value};`)
        .join("\n")

    return { root, dark }
}

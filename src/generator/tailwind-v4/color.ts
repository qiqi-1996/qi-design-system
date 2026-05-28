import type z from "zod"
import { colorSchema } from "../../schema/color"
import { commonGenColorPalette, commonGenColorSemantic } from "../common/color"
import { isColorVariable } from "@core/helper/color"
import type { TailwindDisableDefaultConfig } from "@core/schema/output"

export function genColor(
    colorConfig: z.infer<typeof colorSchema>,
    options?: { disableDefault?: TailwindDisableDefaultConfig },
) {
    const fullColorConfig = colorSchema().parse(colorConfig)
    const fullPalette = commonGenColorPalette(fullColorConfig.palette ?? [])
    const fullSemantic = commonGenColorSemantic(fullColorConfig.semantic ?? {})
    const disableDefault = options?.disableDefault ?? []

    const rootSemantic = fullSemantic.filter(([name]) => !name.startsWith("dark-"))
    const darkSemantic = fullSemantic.filter(([name]) => name.startsWith("dark-"))

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

    const dark = darkSemantic
        .map(([name, value]) => {
            const semanticName = name.replace(/^dark-/, "")
            return `--color-${semanticName}: ${isColorVariable(value) ? `var(--color-${value});` : value};`
        })
        .join("\n")

    return {
        root,
        dark,
    }
}

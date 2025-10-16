import type z from "zod"
import { colorSchema } from "../../schema/color"
import { commonGenColorPalette, commonGenColorSemantic } from "../common/color"
import { isColorVariable } from "@core/helper/color"

export function genColor(colorConfig: z.infer<typeof colorSchema>) {
    const fullColorConfig = colorSchema().parse(colorConfig)
    const fullPalette = commonGenColorPalette(fullColorConfig.palettes ?? [])
    const fullSemantic = commonGenColorSemantic(fullColorConfig.semantic ?? {})

    return [
        fullPalette.map(([name, data]) => {
            return [
                `--color-${name}: ${data.primary};`,
                data.palette.map((c, i) => `--color-${name}-${(i + 1) * 100}: ${c};`).join("\n"),
            ].join("\n")
        }),
        fullSemantic
            .map(([name, value]) => `--color-${name}: ${isColorVariable(value) ? `var(--color-${value});` : value};`)
            .join("\n"),
    ].join("\n")
}

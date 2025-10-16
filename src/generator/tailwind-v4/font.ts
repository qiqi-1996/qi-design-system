import type { FontConfig } from "@core/schema/font"
import { commonGenFont } from "../common"
import { chain, isEmpty, negate } from "lodash"

export function genFont(fontConfig?: FontConfig) {
    const fullFont = commonGenFont(fontConfig)

    const toTheme = (prefix: string, input: Record<string, any>) =>
        chain(input)
            .toPairs()
            .map(([key, value]) => `${prefix}-${key}: ${value};`)
            .join("\n")
            .value()

    return [
        fullFont.disableDefault ? `--text-*: initial;\n--leading-*: initial;\n--font-weight-*: initial;` : "",
        toTheme("--text", fullFont.size),
        toTheme("--leading", fullFont.lineHeight),
        toTheme("--font-weight", fullFont.weight),
    ]
        .filter(negate(isEmpty))
        .join("\n")
}

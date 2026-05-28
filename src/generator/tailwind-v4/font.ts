import type { FontConfig } from "@core/schema/font"
import type { TailwindDisableDefaultConfig } from "@core/schema/output"
import { commonGenFont } from "../common"
import { chain, isEmpty, negate } from "lodash"

export function genFont(fontConfig?: FontConfig, options?: { disableDefault?: TailwindDisableDefaultConfig }) {
    const fullFont = commonGenFont(fontConfig)
    const disableDefault = options?.disableDefault ?? []

    const toTheme = (prefix: string, input: Record<string, any>) =>
        chain(input)
            .toPairs()
            .map(([key, value]) => `${prefix}-${key}: ${value};`)
            .join("\n")
            .value()

    return [
        disableDefault.includes("font-size") ? `--text-*: initial;` : "",
        disableDefault.includes("leading") ? `--leading-*: initial;` : "",
        disableDefault.includes("weight") ? `--font-weight-*: initial;` : "",
        toTheme("--text", fullFont.size),
        toTheme("--leading", fullFont.lineHeight),
        toTheme("--font-weight", fullFont.weight),
    ]
        .filter(negate(isEmpty))
        .join("\n")
}

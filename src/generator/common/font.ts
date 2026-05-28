import { sizeSemantic } from "@core/helper/size-semantic"
import { unit, withoutUnit } from "@core/helper/values"
import { fontSchema, type FontConfig } from "@core/schema/font"
import { isArray, toPairs } from "lodash"

export function commonGenFont(fontConfig?: FontConfig) {
    const fullFontConfig = fontSchema().parse(fontConfig ?? {})

    const semantic = fullFontConfig.semantic ?? {}
    const size = Object.fromEntries(toPairs(semantic).map(([key, value]) => [key, value.size]))
    const weight = Object.fromEntries(toPairs(semantic).map(([key, value]) => [key, value.weight]))
    const lineHeight = Object.fromEntries(
        toPairs(semantic)
            .flatMap(([key, value]) => {
                if (!value.lineHeight) return []
                if (isArray(value.lineHeight)) {
                    return value.lineHeight.map((height, index) => [
                        `${key}-${sizeSemantic(index)}`,
                        resolveLineHeight(value.size, height),
                    ])
                }
                return toPairs(value.lineHeight).map(([heightKey, height]) => [
                    `${key}-${heightKey}`,
                    resolveLineHeight(value.size, height),
                ])
            })
            .filter(([, value]) => value),
    )

    return {
        size,
        weight,
        lineHeight,
        disableDefault: fullFontConfig.disableDefault,
    }
}

function resolveLineHeight(size: string, lineHeight: string) {
    return lineHeight.startsWith("+") ? `${withoutUnit(size) + withoutUnit(lineHeight)}${unit(size)}` : lineHeight
}

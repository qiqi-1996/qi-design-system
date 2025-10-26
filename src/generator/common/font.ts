import { sizeSemantic } from "@core/helper/size-semantic"
import { unit, withoutUnit } from "@core/helper/values"
import { fontSchema, type FontConfig } from "@core/schema/font"
import { toPairs } from "lodash"

export function commonGenFont(fontConfig?: FontConfig) {
    const fullFontConfig = fontSchema().parse(fontConfig ?? {})

    const size = fullFontConfig.size?.semantic ?? {}
    const weight = fullFontConfig.weight?.semantic ?? {}
    let lineHeight = fullFontConfig.lineHeight?.semantic ?? {}

    const auto = fullFontConfig.lineHeight?.auto
    if (auto) {
        const step = auto.value ?? 4
        const [begin, end] = auto.range || [0, 0]
        const stepped = [...new Array(end - begin + 1)].map((_, idx) => (idx + begin) * step)
        toPairs(size).forEach(([key, value]) => {
            stepped.forEach((step, idx) => {
                lineHeight[`${key}-${sizeSemantic(idx)}`] = withoutUnit(value) + step + unit(value)
            })
        })
    }

    return {
        size,
        weight,
        lineHeight,
        disableDefault: fullFontConfig.disableDefault,
    }
}

import { colorPaletteKeySchema, type ColorPaletteKey, type ColorVariable } from "@core/schema/color"
import { isString } from "lodash"
import z from "zod"

export const isColorPaletteKey = (value: string): value is ColorPaletteKey =>
    colorPaletteKeySchema instanceof z.ZodUnion &&
    colorPaletteKeySchema.options.map((item) => item.def.values[0]).includes(value as any)

export const isColorVariable = (value: string): value is ColorVariable => {
    const [paletteKey, ...nameParts] = value.split("-").reverse()
    const name = nameParts.reverse().join("-")
    return !!name && !!paletteKey && isString(name) && isColorPaletteKey(paletteKey)
}

export const resolveColorVariable = (value: string) =>
    !isColorVariable(value)
        ? undefined
        : { name: value.split("-").slice(0, -1).join("-"), index: Number(value.split("-").at(-1)) / 100 - 1 }

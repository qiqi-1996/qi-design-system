import type z from "zod"
import { designSystemSchema } from "@core/schema"
import { commonGenColorPalette, commonGenColorSemantic } from "../common/color"
import { commonGenFont } from "../common/font"
import { isColorVariable, resolveColorVariable } from "@core/helper/color"
import { toPairs } from "lodash"

export function genEsModule(
    data: z.infer<ReturnType<typeof designSystemSchema>>,
    options?: { path?: string },
) {
    const system = designSystemSchema().parse(data)
    const isJs = options?.path?.endsWith(".js") ?? false
    const asConst = isJs ? "" : " as const"

    const sections = [
        genSpace(system.space, asConst),
        genColor(system.color, asConst),
        genFont(system.font, asConst),
    ].filter(Boolean)

    return sections.join("\n\n")
}

function genSpace(
    spaceData: z.infer<ReturnType<typeof designSystemSchema>>["space"],
    asConst: string,
) {
    const base = spaceData?.base ?? 8
    return `export const space = ${base}${asConst}`
}

function genColor(
    colorData: z.infer<ReturnType<typeof designSystemSchema>>["color"],
    asConst: string,
) {
    if (!colorData?.palette?.length && !colorData?.semantic) return ""

    const fullPalette = commonGenColorPalette(colorData.palette ?? [])
    const fullSemantic = commonGenColorSemantic(colorData.semantic ?? {})

    const paletteMap = new Map(fullPalette)

    const resolveColorValue = (value: string): string => {
        if (!isColorVariable(value)) return value
        const resolved = resolveColorVariable(value)
        if (!resolved) return value
        const paletteEntry = paletteMap.get(resolved.name)
        if (!paletteEntry) return value
        return paletteEntry.palette[resolved.index] ?? value
    }

    const colorEntries: [string, string][] = []

    for (const [name, data] of fullPalette) {
        colorEntries.push([name, data.primary])
        data.palette.forEach((color, index) => {
            colorEntries.push([`${name}${(index + 1) * 100}`, color])
        })
    }

    for (const [name, value] of fullSemantic) {
        colorEntries.push([name, resolveColorValue(value)])
    }

    const uniqueColorEntries = [...new Map(colorEntries.map(([key, value]) => [key, value])).entries()] as [string, string][]

    const objectBody = uniqueColorEntries
        .map(([key, value]) => `"${key}": "${value}"`)
        .join(",\n    ")

    return `export const color = {
    ${objectBody}
}${asConst}`
}

function genFont(
    fontData: z.infer<ReturnType<typeof designSystemSchema>>["font"],
    asConst: string,
) {
    const fullFont = commonGenFont(fontData)
    const semantic = fontData?.semantic ?? {}

    if (!Object.keys(semantic).length) return ""

    const fontEntries = toPairs(semantic).map(([name, config]) => {
        const properties: string[] = []
        properties.push(`"size": ${withoutUnit(config.size)}`)

        if (config.lineHeight) {
            if (Array.isArray(config.lineHeight)) {
                config.lineHeight.forEach((height, index) => {
                    const suffix = sizeSemantic(index)
                    properties.push(`"lineHeight${capitalize(suffix)}": ${withoutUnit(resolveLineHeight(config.size, height))}`)
                })
            } else {
                toPairs(config.lineHeight).forEach(([key, height]) => {
                    properties.push(`"lineHeight${capitalize(key)}": ${withoutUnit(resolveLineHeight(config.size, height))}`)
                })
            }
        }

        if (config.weight) {
            properties.push(`"weight": "${config.weight}"`)
        }

        return `"${name}": {
        ${properties.join(",\n        ")}
    }`
    })

    return `export const font = {
    ${fontEntries.join(",\n    ")}
}${asConst}`
}

function withoutUnit(value: string): number {
    return Number.parseFloat(value)
}

function sizeSemantic(index: number): string {
    const map = ["xs", "sm", "md", "lg", "xl"]
    return map[index] ?? String(index)
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function resolveLineHeight(size: string, lineHeight: string): string {
    return lineHeight.startsWith("+") ? `${withoutUnit(size) + withoutUnit(lineHeight)}` : lineHeight
}

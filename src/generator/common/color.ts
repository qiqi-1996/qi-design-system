import { isColorPaletteKey, isColorVariable } from "@core/helper/color"
import { generate } from "@ant-design/colors"
import { toPairs } from "lodash"
import type z from "zod"
import { colorPaletteSchema, colorSemanticItemSchema, colorSemanticThemeSchema } from "../../schema/color"

/**
 * 根据颜色系统定义生成色板
 * Generate color palette according to the definition of the color system
 */
export function commonGenColorPalette(paletteConfig: z.infer<ReturnType<typeof colorPaletteSchema>> | undefined): [
    /**
     * 颜色语义名称
     * Color semantic name
     */
    colorName: string,
    {
        /**
         * 色板中的主色
         * The main color in the color palette
         */
        primary: string
        /**
         * 色板
         * Color palette
         */
        palette: string[]
    },
][] {
    const fullPalettesConfig = colorPaletteSchema().parse(paletteConfig ?? [])
    return (
        fullPalettesConfig?.map((paletteConfig) => {
            if (paletteConfig.type === "ant-design") {
                if (paletteConfig.base) {
                    const palette = generate(paletteConfig.base)
                    return [paletteConfig.name, { primary: palette[5] ?? "", palette }]
                }
            }
            return [paletteConfig.name, { primary: "", palette: [] }]
        }) ?? []
    )
}

/**
 * 生成语义化颜色变量
 * Generate semantic color variables
 */
export function commonGenColorSemantic(
    semanticConfig: z.infer<ReturnType<typeof colorSemanticThemeSchema>> | undefined,
): [semanticName: string, semanticValue: string][] {
    const fullSemanticConfig = colorSemanticThemeSchema().parse(semanticConfig ?? {})

    /**
     * @example
     * semanticName: primary
     * scope: { solid: "brand-600", fg: "other-600", contrast: "100", ... }
     * @return [["primary-solid", "brand-600"], ["primary-fg", "other-600"], ["primary-contrast", "brand-100"], ...]
     *          Notice: { contrast: "100" } will based on solid color name, means { constrast: "brand-100" }
     */
    const processThemeAndSemanticConfig = (
        themeName: string,
        semanticName: string,
        semanticConfig: z.infer<ReturnType<typeof colorSemanticItemSchema>>,
    ) => {
        let baseColorValue: string | undefined
        let baseColorPaletteName: string | undefined

        if (semanticConfig.type === "chakra") {
            if (isColorVariable(semanticConfig.default)) {
                baseColorValue = semanticConfig.default
            } else if (isColorVariable(semanticConfig.solid)) {
                baseColorValue = semanticConfig.solid
            }
        }
        if (!baseColorValue) {
            baseColorValue =
                semanticConfig.default || (semanticConfig.type === "chakra" ? semanticConfig.solid : undefined)
        }
        if (baseColorValue) {
            baseColorPaletteName = isColorVariable(baseColorValue) ? baseColorValue.split("-")[0] : undefined
            if (!baseColorPaletteName && isColorPaletteKey(baseColorValue)) {
                baseColorValue = undefined
            }
        }

        themeName = themeName === "default" ? "" : `-${themeName}`
        return [
            ...(baseColorValue ? [[`${semanticName}${themeName}`, baseColorValue]] : []),
            ...(baseColorPaletteName
                ? toPairs(semanticConfig)
                      .filter(([semanticKey]) => semanticKey !== "type" && semanticKey !== "default")
                      .map(([semanticKey, colorValue]) => {
                          return [
                              `${semanticName}${themeName}-${semanticKey}`,
                              isColorVariable(colorValue as string)
                                  ? colorValue
                                  : `${baseColorPaletteName}-${colorValue ?? "600"}`,
                          ]
                      })
                : []),
        ] as [semanticName: string, semanticValue: string][]
    }

    return toPairs(fullSemanticConfig)
        .map(([semanticName, semanticConfig]) => {
            return [
                ...processThemeAndSemanticConfig("default", semanticName, semanticConfig.default),
                ...(semanticConfig.dark
                    ? processThemeAndSemanticConfig("dark", semanticName, semanticConfig.dark)
                    : []),
            ]
        })
        .flat()
}

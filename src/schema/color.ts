import { t } from "i18next"
import z from "zod"

/**
 * 色板定义
 * Definition of color plate
 */
export const colorPaletteSchema = () =>
    z.array(
        z
            .discriminatedUnion("type", [
                z.object({
                    type: z
                        .union([z.literal("ant-design"), z.literal("qi-design-system-v0")])
                        .default("qi-design-system-v0")
                        .meta({
                            title: t("schema.color.type.title"),
                            description: t("schema.color.type.desc"),
                        }),
                    name: z.string().meta({
                        title: t("schema.color.palettes.name"),
                        description: t("schema.color.palettes.base-desc"),
                    }),
                    base: z.optional(
                        z
                            .string()
                            .default("#212121")
                            .meta({
                                title: t("schema.color.palettes.base"),
                                description: t("schema.color.palettes.base-desc"),
                            }),
                    ),
                    args: z.optional(
                        z
                            .array(z.any())
                            .default([])
                            .meta({
                                title: t("schema.color.palettes.args"),
                            }),
                    ),
                }),
            ])
            .default({
                type: "ant-design",
                name: "",
                base: "#212121",
                args: [],
            }),
    )

/**
 * 色板编号
 * Color plate number
 */
export const colorPaletteKeySchema = z.union([
    z.literal("100"),
    z.literal("200"),
    z.literal("300"),
    z.literal("400"),
    z.literal("500"),
    z.literal("600"),
    z.literal("700"),
    z.literal("800"),
    z.literal("900"),
    z.literal("1000"),
])

/**
 * Chakra UI 语义化键名
 * Chakra UI Semantic key name
 */
export const colorChakraSemanticKeySchema = z.union([
    z.literal("solid"),
    z.literal("contrast"),
    z.literal("fg"),
    z.literal("muted"),
    z.literal("subtle"),
    z.literal("emphasized"),
])

export type ColorPaletteKey = z.infer<typeof colorPaletteKeySchema>
export type ColorSemanticKey = z.infer<typeof colorChakraSemanticKeySchema>
export type ColorVariable = `${string}-${z.infer<typeof colorPaletteKeySchema>}`

const colorSemanticValue = () =>
    z.union([colorPaletteKeySchema, z.string<`${string}-${z.infer<typeof colorPaletteKeySchema>}`>()])

const chakraColorSemanticValue = (
    defaultValue: z.infer<typeof colorPaletteKeySchema>,
    type: z.infer<typeof colorChakraSemanticKeySchema>,
) =>
    colorSemanticValue()
        .optional()
        .default(defaultValue)
        .meta({
            title: {
                solid: "The bold fill color of the color.",
                contrast: "The text color that goes on solid color.",
                fg: "The foreground color used for text, icons, etc.",
                muted: "The muted color of the color.",
                subtle: "The subtle color of the color.",
                emphasized: "The emphasized version of the subtle color.",
            }[type],
        })

export const colorSemanticItemSchema = () =>
    z.discriminatedUnion("type", [
        z.object({
            type: z.literal("chakra"),
            default: chakraColorSemanticValue("600", "solid").meta({}),
            solid: chakraColorSemanticValue("600", "solid").meta({}),
            contrast: chakraColorSemanticValue("100", "contrast"),
            fg: chakraColorSemanticValue("200", "fg"),
            muted: chakraColorSemanticValue("300", "muted"),
            subtle: chakraColorSemanticValue("400", "subtle"),
            emphasized: chakraColorSemanticValue("500", "emphasized"),
        }),
        z.looseObject({
            type: z.literal("custom"),
            default: colorSemanticValue().optional(),
        }),
    ])
export type ColorSemanticItemConfig = z.infer<ReturnType<typeof colorSemanticItemSchema>>

export const colorSemanticThemeSchema = () =>
    z.record(
        /**
         * 自定义语义化键名
         * Custom semantic key name
         */
        z.string(),
        z.object({
            default: colorSemanticItemSchema()
                .optional()
                .default({
                    type: "chakra",
                    default: "100",
                    solid: "100",
                    contrast: "100",
                    fg: "200",
                    muted: "300",
                    subtle: "400",
                    emphasized: "500",
                })
                .meta({
                    title: "配色模式：默认",
                }),
            dark: colorSemanticItemSchema()
                .optional()
                .default({
                    type: "chakra",
                    default: "600",
                    solid: "600",
                    contrast: "100",
                    fg: "200",
                    muted: "300",
                    subtle: "400",
                    emphasized: "500",
                })
                .meta({
                    title: "配色模式：暗黑模式",
                }),
        }),
    )

export const colorSchema = () =>
    z
        .object({
            palettes: colorPaletteSchema()
                .optional()
                .meta({
                    title: t("schema.color.title"),
                    description: t("schema.color.desc"),
                }),
            semantic: colorSemanticThemeSchema()
                .optional()
                .meta({
                    title: t("common.semantic"),
                    description: t("schema.color.semantic.desc"),
                }),
        })
        .default({
            palettes: [],
        })
        .meta({ title: t("schema.color.title") })

export type ColorConfig = z.infer<ReturnType<typeof colorSchema>>

import { t } from "i18next"
import z from "zod"

export const fontLineHeightSchema = () => z.union([z.array(z.string()), z.record(z.string(), z.string())])

export const fontSemanticItemSchema = () =>
    z.object({
        size: z.string().meta({
            title: t("schema.font.size.title"),
            desc: t("schema.font.size.semantic-desc"),
        }),
        lineHeight: fontLineHeightSchema()
            .optional()
            .meta({
                title: t("schema.font.line-height.title"),
                description: t("schema.font.line-height.semantic-desc"),
            }),
        weight: z
            .union([
                z.literal("100"),
                z.literal("200"),
                z.literal("300"),
                z.literal("400"),
                z.literal("500"),
                z.literal("600"),
                z.literal("700"),
                z.literal("800"),
                z.literal("900"),
                z.literal(""),
            ])
            .optional()
            .meta({
                title: t("schema.font.weight.title"),
                description: t("schema.font.weight.semantic-desc"),
            }),
    })

export const fontSchema = () =>
    z
        .object({
            semantic: z.record(z.string(), fontSemanticItemSchema()).default({}).optional(),
            disableDefault: z
                .boolean()
                .default(true)
                .optional()
                .meta({
                    title: t("common.disable-default"),
                    description: t("common.disable-default-desc"),
                }),
        })
        .meta({
            title: "字体字号",
        })

export type FontSemanticItemConfig = z.infer<ReturnType<typeof fontSemanticItemSchema>>
export type FontConfig = z.infer<ReturnType<typeof fontSchema>>

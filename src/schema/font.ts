import { t } from "i18next"
import z from "zod"

export const fontSchema = () =>
    z
        .object({
            size: z
                .object({
                    semantic: z
                        .record(z.string(), z.string())
                        .meta({
                            title: t("common.semantic"),
                            desc: t("schema.font.size.semantic-desc"),
                        })
                        .optional(),
                })
                .default({
                    semantic: {
                        // footnote: "12px",
                        // text: "14px",
                        // subtitle: "16px",
                        // title: "24px",
                        // headline: "40px",
                    },
                })
                .optional()
                .meta({
                    title: t("schema.font.size.title"),
                }),
            lineHeight: z
                .object({
                    semantic: z
                        .record(z.string(), z.string())
                        .optional()
                        .meta({
                            title: t("common.semantic"),
                            description: t("schema.font.line-height.semantic-desc"),
                        }),
                    auto: z
                        .object({
                            value: z
                                .number()
                                .optional()
                                .meta({
                                    title: t("schema.font.line-height.auto.value"),
                                    description: t("schema.font.line-height.auto.value-desc"),
                                }),
                            range: z
                                .tuple([z.number(), z.number()])
                                .default([0, 3])
                                .optional()
                                .meta({
                                    title: t("schema.font.line-height.auto.range"),
                                    description: t("schema.font.line-height.auto.range-desc"),
                                }),
                        })
                        .optional()
                        .meta({
                            title: t("schema.font.line-height.auto.title"),
                        }),
                })
                .default({
                    semantic: {},
                    auto: {
                        value: 4,
                        range: [0, 3],
                    },
                })
                .optional()
                .meta({
                    title: t("schema.font.line-height.title"),
                }),
            weight: z
                .object({
                    semantic: z
                        .record(
                            z.string(),
                            z.union([
                                z.literal("100"),
                                z.literal("200"),
                                z.literal("300"),
                                z.literal("400"),
                                z.literal("500"),
                                z.literal("600"),
                                z.literal("700"),
                                z.literal("800"),
                                z.literal("900"),
                            ]),
                        )
                        .optional()
                        .meta({
                            title: t("common.semantic"),
                            description: t("schema.font.weight.semantic-desc"),
                        }),
                })
                .default({
                    semantic: {},
                })
                .optional()
                .meta({
                    title: t("schema.font.weight.title"),
                }),
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

export type FontConfig = z.infer<ReturnType<typeof fontSchema>>

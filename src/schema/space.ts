import { t } from "i18next"
import z from "zod"

export const spaceSchema = () =>
    z
        .object({
            base: z
                .number()
                .optional()
                .default(8)
                .meta({ title: t("schema.space.title"), description: t("schema.space.base.desc") }),
            unit: z
                .string()
                .optional()
                .default("px")
                .meta({ title: t("schema.space.unit.title"), description: t("schema.space.unit.desc") }),
            // TODO：Don't know how to implement this in Tailwind v4
            // subdivision: z.number().meta({
            //     title: "细分空间",
            //     description: "例如：当 base=8, subdivision=0.5 时，将会生成 1=8px, 1.5=12px, 2=16px",
            // }),
        })
        .optional()
        .default({
            base: 8,
            unit: "px",
        })
        .meta({
            title: t("schema.space.title"),
            description: t("schema.space.desc"),
        })

export type SpaceConfig = z.infer<ReturnType<typeof spaceSchema>>

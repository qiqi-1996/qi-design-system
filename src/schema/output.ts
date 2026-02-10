import z from "zod"

export const outputSchema = () =>
    z
        .array(
            z.object({
                type: z
                    .union([z.literal("tailwind-v4"), z.literal("mantine")])
                    .meta({ title: "输出类型", description: "例如：./src" }),
                path: z.string().meta({ title: "输出位置", description: "例如：./src/theme.css" }),
            }),
        )
        .meta({
            title: "输出配置",
        })

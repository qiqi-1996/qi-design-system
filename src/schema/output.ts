import z from "zod"

export const tailwindDisableDefaultSchema = () =>
    z.array(z.union([z.literal("color"), z.literal("font-size"), z.literal("weight"), z.literal("leading")]))

const darkSemanticSchema = () => z.boolean().optional().default(true)

export const outputSchema = () =>
    z
        .array(
            z.discriminatedUnion("type", [
                z.object({
                    type: z.literal("tailwind-v4").meta({ title: "输出类型", description: "例如：tailwind-v4" }),
                    path: z.string().meta({ title: "输出位置", description: "例如：./src/theme.css" }),
                    disableDefault: tailwindDisableDefaultSchema().optional().default([]),
                    darkClass: z.union([z.string(), z.boolean(), z.null()]).optional().default(".dark"),
                    darkSemantic: darkSemanticSchema(),
                }),
                z.object({
                    type: z.literal("mantine").meta({ title: "输出类型", description: "例如：mantine" }),
                    path: z.string().meta({ title: "输出位置", description: "例如：./src/theme.ts" }),
                }),
                z.object({
                    type: z.literal("esmodule").meta({ title: "输出类型", description: "例如：esmodule" }),
                    path: z.string().meta({ title: "输出位置", description: "例如：./src/theme.ts" }),
                    darkSemantic: darkSemanticSchema(),
                }),
            ]),
        )
        .meta({
            title: "输出配置",
        })

export type OutputConfig = z.infer<ReturnType<typeof outputSchema>>
export type TailwindDisableDefaultConfig = z.infer<ReturnType<typeof tailwindDisableDefaultSchema>>

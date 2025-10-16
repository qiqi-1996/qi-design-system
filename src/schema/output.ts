import z from "zod"

export const outputSchema = () =>
    z.record(z.union([z.literal("tailwind-v4")]), z.string().meta({ title: "文件输出位置" })).meta({
        title: "输出配置",
    })

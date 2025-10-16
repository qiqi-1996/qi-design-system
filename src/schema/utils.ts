import type z from "zod"

export const meta = (schema: z.ZodType, title: string, description?: string) =>
    schema.meta({
        title,
        description,
    })

import z from "zod"
import { colorSchema } from "./color"
import { spaceSchema } from "./space"
import { outputSchema } from "./output"
import { fontSchema } from "./font"

export * from "./color"
export * from "./space"
export * from "./output"
export * from "./font"

export const designSystemSchema = () =>
    z.object({
        color: z.optional(colorSchema()),
        space: z.optional(spaceSchema()),
        font: z.optional(fontSchema()),
    })

export type DesignSystemConfig = z.infer<ReturnType<typeof designSystemSchema>>

export const designSystemCliSchema = () =>
    z.object({
        // To make VSCode happy.
        $schema: z.string().optional(),
        output: z.optional(outputSchema()),
        ...designSystemSchema().shape,
    })

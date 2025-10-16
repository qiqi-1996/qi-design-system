import type z from "zod"
import { designSystemSchema } from "../../schema"
import { spaceSchema } from "../../schema/space"

export function genSpace(spaceData: z.infer<ReturnType<typeof designSystemSchema>>["space"]) {
    const space = spaceSchema().parse(spaceData)
    const spacing = `--spacing: ${space.base + space.unit};`
    return spacing
}

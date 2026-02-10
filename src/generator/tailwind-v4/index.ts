import type z from "zod"
import { designSystemSchema } from "../../schema"
import { genColor } from "./color"
import { genSpace } from "./space"
import { genFont } from "./font"

export function genTailwindV4(
    data: z.infer<ReturnType<typeof designSystemSchema>>,
    options?: {
        noTheme?: boolean
    },
) {
    const system = designSystemSchema().parse(data)
    const body = `${genSpace(system.space)}
    ${genColor(system.color)}
    ${genFont(system.font)}`

    if (options?.noTheme) return body
    return `@theme {
    ${body}
}`
}

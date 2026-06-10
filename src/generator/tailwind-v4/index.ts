import type z from "zod"
import { designSystemSchema } from "../../schema"
import { genColor } from "./color"
import { genSpace } from "./space"
import { genFont } from "./font"
import type { OutputConfig, TailwindDisableDefaultConfig } from "@core/schema/output"

export type TailwindV4Options = {
    noTheme?: boolean
    disableDefault?: TailwindDisableDefaultConfig
    darkClass?: Extract<OutputConfig[number], { type: "tailwind-v4" }>["darkClass"]
    darkSemantic?: boolean
}

export function genTailwindV4(data: z.infer<ReturnType<typeof designSystemSchema>>, options?: TailwindV4Options) {
    const system = designSystemSchema().parse(data)
    const color = genColor(system.color, { disableDefault: options?.disableDefault, darkSemantic: options?.darkSemantic })
    const body = `${genSpace(system.space)}
    ${color.root}
    ${genFont(system.font, { disableDefault: options?.disableDefault })}`

    if (options?.noTheme) return body
    const darkClass = options?.darkClass === undefined ? ".dark" : options.darkClass
    return `@theme {
    ${body}
}

${
    color.dark && darkClass
        ? `${darkClass} {
    ${color.dark}
}`
        : ""
}`
}

import { CodeBlock } from "@/components/code-block"
import { genTailwindV4 } from "@core"
import { formatCode } from "@core/helper/format"
import type { OutputConfig } from "@core/schema/output"
import { useEffect, useState, type ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"

export function DesignSystemTailwind(
    props: ComponentProps<"div"> & {
        value: DesignSystemEditorValue
        output?: Extract<OutputConfig[number], { type: "tailwind-v4" }>
    },
) {
    const { value, output, ...rest } = props
    const [code, setCode] = useState("")

    useEffect(() => {
        let mounted = true

        formatCode(
            genTailwindV4(value.config, {
                disableDefault: output?.disableDefault,
                darkClass: output?.darkClass,
            }),
        ).then((code) => {
            if (mounted) setCode(code)
        })

        return () => {
            mounted = false
        }
    }, [output?.darkClass, output?.disableDefault, value.config])

    return (
        <div {...rest}>
            <CodeBlock code={code} lang="css" />
        </div>
    )
}

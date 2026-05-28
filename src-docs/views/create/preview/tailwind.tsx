import { CodeBlock } from "@/components/code-block"
import { genTailwindV4 } from "@core"
import { formatCode } from "@core/helper/format"
import { useEffect, useState, type ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"

export function DesignSystemTailwind(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const { value, ...rest } = props
    const [code, setCode] = useState("")

    useEffect(() => {
        let mounted = true

        formatCode(genTailwindV4(value.config)).then((code) => {
            if (mounted) setCode(code)
        })

        return () => {
            mounted = false
        }
    }, [value.config])

    return (
        <div {...rest}>
            <CodeBlock code={code} lang="css" />
        </div>
    )
}

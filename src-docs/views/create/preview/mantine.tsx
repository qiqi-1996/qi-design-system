import { CodeBlock } from "@/components/code-block"
import { formatTypescript } from "@/utils/format-typescript"
import { genMantine } from "@core/generator/mantine"
import { useEffect, useState, type ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"

export function DesignSystemMantine(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const { value, ...rest } = props
    const [code, setCode] = useState("")

    useEffect(() => {
        let mounted = true

        formatTypescript(genMantine(value.config)).then((code) => {
            if (mounted) setCode(code)
        })

        return () => {
            mounted = false
        }
    }, [value.config])

    return (
        <div {...rest}>
            <CodeBlock code={code} lang="typescript" />
        </div>
    )
}

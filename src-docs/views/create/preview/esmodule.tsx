import { CodeBlock } from "@/components/code-block"
import { genEsModule } from "@core/generator/esmodule"
import { useEffect, useState, type ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"

export function DesignSystemEsModule(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const { value, ...rest } = props
    const [code, setCode] = useState("")

    useEffect(() => {
        const output = value.config.output?.find((o) => o.type === "esmodule")
        const result = genEsModule(value.config, { path: output?.path })
        setCode(result)
    }, [value.config])

    return (
        <div {...rest}>
            <CodeBlock code={code} lang="typescript" />
        </div>
    )
}

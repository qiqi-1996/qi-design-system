import cs from "classnames"
import { useEffect, useState, type ComponentProps } from "react"
import css from "@shikijs/langs/css"
import json from "@shikijs/langs/json"
import typescript from "@shikijs/langs/typescript"
import githubDarkDefault from "@shikijs/themes/github-dark-default"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
import { createHighlighterCore } from "shiki/core"

export type CodeBlockProps = Omit<ComponentProps<"div">, "children"> & {
    code: string
    lang: string
}

const highlighter = createHighlighterCore({
    themes: [githubDarkDefault],
    langs: [json, css, typescript],
    engine: createOnigurumaEngine(import("shiki/wasm")),
})

export function CodeBlock(props: CodeBlockProps) {
    const { code, lang, className, ...rest } = props
    const [html, setHtml] = useState("")

    useEffect(() => {
        let mounted = true

        highlighter
            .then((highlighter) =>
                highlighter.codeToHtml(code, {
                    lang,
                    theme: "github-dark-default",
                }),
            )
            .then((html) => {
                if (mounted) setHtml(html)
            })
            .catch(() => {
                if (mounted) setHtml("")
            })

        return () => {
            mounted = false
        }
    }, [code, lang])

    if (!html) {
        return (
            <pre {...rest} className={cs("overflow-auto rounded-xl bg-[#0d1117] p-2 text-[#e6edf3]", className)}>
                <code>{code}</code>
            </pre>
        )
    }

    return (
        <div
            {...rest}
            className={cs("overflow-auto rounded-xl [&_pre]:!m-0 [&_pre]:!p-3", className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    )
}

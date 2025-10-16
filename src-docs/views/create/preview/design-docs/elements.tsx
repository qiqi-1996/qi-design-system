import { Divider } from "@mantine/core"
import cs from "classnames"
import { isArray } from "lodash"
import type { ComponentProps, ReactNode } from "react"

export const Title = (props: { className?: string; children: ReactNode }) => (
    <>
        {isArray(props.children) ? (
            <div className={cs("my-5", props.className)}>
                <h1 className="mb-2 text-headline leading-headline-xs font-headline">{props.children[0]}</h1>
                <p className="mb-5 text-footnote leading-footnote-xs font-footnote text-color-footnote">
                    {props.children[1]}
                </p>
            </div>
        ) : (
            <h1 className={cs("my-5 text-headline leading-headline-xs font-headline", props.className)}>
                {props.children}
            </h1>
        )}
    </>
)

export const SubTitle = (props: { children: ReactNode }) => (
    <h1 className="mb-3 text-title leading-title-xs font-title">{props.children}</h1>
)

export const Measure = (
    props: ComponentProps<"div"> & { type?: "horizontal" | "vertical"; label?: string; alwaysDisplay?: boolean },
) => {
    const { type = "horizontal", alwaysDisplay = false } = props

    return (
        <div
            {...props}
            className={cs("group relative inline-flex shrink-0 items-center justify-center p-0.5", props.className)}
        >
            <Divider orientation={type} className="w-full !border-primary" size={"md"} variant="dotted"></Divider>
            {props.label && (
                <span
                    className={cs(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border-1 border-solid border-border bg-white/20 px-0.5 text-footnote font-footnote text-nowrap text-primary backdrop-blur-sm",
                        !alwaysDisplay && "invisible cursor-pointer group-hover:visible",
                    )}
                >
                    {props.label}
                </span>
            )}
        </div>
    )
}

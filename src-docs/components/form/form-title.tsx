import type { ComponentProps, ReactNode } from "react"

export type FormTitleProps = { title?: string; description?: string; children?: ReactNode }

export function FormTitle(props: ComponentProps<"div"> & FormTitleProps) {
    return (
        <div {...props}>
            <div className="flex flex-col gap-0.5">
                {props.title && <div className="text-text leading-text-xs font-title">{props.title}</div>}
                {props.description && (
                    <div className="text-footnote leading-footnote-sm font-footnote text-color-footnote">
                        {props.description}
                    </div>
                )}
            </div>
            {props.children && <div className="mt-1">{props.children}</div>}
        </div>
    )
}

import { type ComponentProps } from "react"

import type { DesignSystemEditorValue } from "../../editor/types"
import { SectionSpace } from "./sections/space"
import { SectionColor } from "./sections/color"
import { SectionFont } from "./sections/font"

export function DesignSystemDocs(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const {
        value: { config, flags },
    } = props

    return (
        <div {...props}>
            {flags.space && <SectionSpace spaceConfig={config.space} />}
            {flags.color && <SectionColor colorConfig={config.color} />}
            {flags.font && <SectionFont fontConfig={config.font} />}
        </div>
    )
}

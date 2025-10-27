import { commonGenColorPalette, commonGenColorSemantic } from "@core"
import { ColorSwatch, Paper } from "@mantine/core"
import cs from "classnames"
import { type ComponentProps } from "react"
import { useTranslation } from "react-i18next"

import type { DesignSystemEditorValue } from "../../editor/types"
import { SubTitle, Title } from "./elements"
import { SectionSpace } from "./sections/space"
import { SectionColor } from "./sections/color"
import { SectionFont } from "./sections/font"

export function DesignSystemDocs(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const {
        value: { config, flags },
    } = props

    return (
        <div {...props}>
            {/* <div>{JSON.stringify(props.value)}</div> */}
            <div className="-mt-5"></div>

            {flags.space && <SectionSpace spaceConfig={config.space} />}
            {flags.color && <SectionColor colorConfig={config.color} />}
            {flags.font && <SectionFont fontConfig={config.font} />}
        </div>
    )
}

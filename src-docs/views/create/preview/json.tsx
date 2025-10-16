import type { ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"

import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite"
import "react-json-view-lite/dist/index.css"

export function DesignSystemJson(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    return (
        <div>
            <JsonView data={props.value.config} shouldExpandNode={allExpanded} style={defaultStyles} />
        </div>
    )
}

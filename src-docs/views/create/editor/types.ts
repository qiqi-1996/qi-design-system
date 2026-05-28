import type { DesignSystemConfig } from "@core/schema"

export type DesignSystemEditorValue = {
    config: DesignSystemConfig
    flags: DesignSystemFlags
}

export type DesignSystemFlags = {
    output: boolean
    space: boolean
    color: boolean
    font: boolean
}

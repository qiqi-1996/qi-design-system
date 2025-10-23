import type { DesignSystemConfig } from "@core/schema"

export type DesignSystemEditorValue = {
    config: DesignSystemConfig
    flags: DesignSystemFlags
}

export type DesignSystemFlags = {
    space: boolean
    color: boolean
    font: boolean
}

import { Tabs } from "@mantine/core"
import type { ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"
import { DesignSystemDocs } from "./design-docs"
import { DesignSystemJson } from "./json"

export function DesignSystemPreview(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    return (
        <div {...props}>
            <Tabs defaultValue="docs" variant="pills">
                <Tabs.List justify="center">
                    <Tabs.Tab value="docs">设计文档</Tabs.Tab>
                    <Tabs.Tab value="developer">开发者JSON</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="docs">
                    <DesignSystemDocs value={props.value} />
                </Tabs.Panel>

                <Tabs.Panel value="developer">
                    <DesignSystemJson value={props.value} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

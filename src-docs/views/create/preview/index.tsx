import { Tabs } from "@mantine/core"
import type { ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"
import { DesignSystemDocs } from "./design-docs"
import { DesignSystemJson } from "./json"
import { useTranslation } from "react-i18next"

export function DesignSystemPreview(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const [t] = useTranslation()

    return (
        <div {...props}>
            <Tabs defaultValue="docs" variant="pills">
                <Tabs.List justify="center">
                    <Tabs.Tab value="docs">{t("editor.tabs.design-docs")}</Tabs.Tab>
                    <Tabs.Tab value="developer">{t("editor.tabs.developer")}</Tabs.Tab>
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

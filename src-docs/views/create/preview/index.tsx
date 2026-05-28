import { Tabs } from "@mantine/core"
import type { ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"
import { DesignSystemDocs } from "./design-docs"
import { DesignSystemJson } from "./json"
import { useTranslation } from "react-i18next"
import { DesignSystemTailwind } from "./tailwind"

export function DesignSystemPreview(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const [t] = useTranslation()

    return (
        <div {...props}>
            <Tabs defaultValue="docs" variant="pills">
                <Tabs.List className="mb-3" justify="center">
                    <Tabs.Tab value="docs">{t("editor.tabs.design-docs")}</Tabs.Tab>
                    <Tabs.Tab value="config">{t("editor.tabs.config-file")}</Tabs.Tab>
                    <Tabs.Tab value="tailwind">{t("editor.tabs.tailwind")}</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="docs">
                    <DesignSystemDocs value={props.value} />
                </Tabs.Panel>

                <Tabs.Panel value="config">
                    <DesignSystemJson value={props.value} />
                </Tabs.Panel>

                <Tabs.Panel value="tailwind">
                    <DesignSystemTailwind value={props.value} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

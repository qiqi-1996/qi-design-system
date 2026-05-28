import { Tabs } from "@mantine/core"
import type { ComponentProps } from "react"
import type { DesignSystemEditorValue } from "../editor/types"
import { DesignSystemDocs } from "./design-docs"
import { DesignSystemJson } from "./json"
import { useTranslation } from "react-i18next"
import { DesignSystemTailwind } from "./tailwind"
import { DesignSystemMantine } from "./mantine"

export function DesignSystemPreview(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const [t] = useTranslation()
    const outputConfig = props.value.flags.output ? props.value.config.output : []
    const tailwindOutput = outputConfig?.find((output) => output.type === "tailwind-v4")
    const mantineOutput = outputConfig?.find((output) => output.type === "mantine")
    const defaultTab = tailwindOutput ? "tailwind" : mantineOutput ? "mantine" : "docs"

    return (
        <div {...props}>
            <Tabs key={defaultTab} defaultValue={defaultTab} variant="pills">
                <Tabs.List className="mb-3" justify="center">
                    <Tabs.Tab value="docs">{t("editor.tabs.design-docs")}</Tabs.Tab>
                    <Tabs.Tab value="config">{t("editor.tabs.config-file")}</Tabs.Tab>
                    {tailwindOutput && <Tabs.Tab value="tailwind">{t("editor.tabs.tailwind")}</Tabs.Tab>}
                    {mantineOutput && <Tabs.Tab value="mantine">{t("editor.tabs.mantine")}</Tabs.Tab>}
                </Tabs.List>

                <Tabs.Panel value="docs">
                    <DesignSystemDocs value={props.value} />
                </Tabs.Panel>

                <Tabs.Panel value="config">
                    <DesignSystemJson value={props.value} />
                </Tabs.Panel>

                {tailwindOutput && (
                    <Tabs.Panel value="tailwind">
                        <DesignSystemTailwind value={props.value} output={tailwindOutput} />
                    </Tabs.Panel>
                )}

                {mantineOutput && (
                    <Tabs.Panel value="mantine">
                        <DesignSystemMantine value={props.value} />
                    </Tabs.Panel>
                )}
            </Tabs>
        </div>
    )
}

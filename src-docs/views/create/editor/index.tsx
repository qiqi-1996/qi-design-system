import { type UnifiedFormProps } from "@/components/form"
import { Accordion, Button, Switch } from "@mantine/core"
import cs from "classnames"
import { assign, omit } from "lodash"
import type { ComponentProps } from "react"
import { useTranslation } from "react-i18next"
import { LuLayoutDashboard, LuSwatchBook, LuText } from "react-icons/lu"
import type { DeepPartial } from "ts-essentials"
import { EditColor } from "./color"
import EditSpace from "./space"
import type { DesignSystemEditorValue } from "./types"
import EditFont from "./font"
import { useFileDialog } from "@mantine/hooks"
import { designSystemSchema } from "@core/schema"
import saveFile from "save-file"
import exampleDesignSystem from "../../../../design-system.json"

export function DesignSystemEditor(
    props: UnifiedFormProps<DesignSystemEditorValue> & Omit<ComponentProps<"div">, "onChange">,
) {
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    const { config, flags } = props.value
    const updateValue = (value: DeepPartial<DesignSystemEditorValue>) =>
        props.onChange({
            config: assign(props.value.config, value.config),
            flags: {
                ...props.value.flags,
                ...value.flags,
            },
        })

    const file = useFileDialog({
        accept: "*.json",
        multiple: false,
        resetOnOpen: true,
        async onChange(files) {
            const file = files?.[0]
            const text = await file?.text()
            const config = designSystemSchema().parse(JSON.parse(text || "{}") || {})
            props.onChange({
                config,
                flags: {
                    space: !!config.space,
                    color: !!config.color,
                    font: !!config.font,
                },
            })
        },
    })

    const handleSaveConfig = () => {
        saveFile(JSON.stringify(config), "design-system.json")
    }

    const handleLoadConfig = () => {
        file.open()
    }

    return (
        <div {...omit(props, "onChange")} className={cs("w-[400px]", props.className)}>
            <div className="flex gap-1">
                <Button fullWidth onClick={handleSaveConfig}>
                    {t("editor.save-config-to-local")}
                </Button>
                <Button variant="default" fullWidth onClick={handleLoadConfig}>
                    {t("editor.load-config-from-local")}
                </Button>
            </div>
            <Button
                className="my-1"
                variant="transparent"
                fullWidth
                onClick={() => {
                    const config = exampleDesignSystem
                    props.onChange({
                        config: config as any,
                        flags: {
                            space: !!config.space,
                            color: !!config.color,
                            font: !!config.font,
                        },
                    })
                }}
            >
                {t("editor.load-config-from-example")}
            </Button>

            <Accordion className="w-full" variant="contained">
                <Accordion.Item value="0">
                    <Accordion.Control icon={<LuLayoutDashboard />}>
                        <div className="flex w-full items-center justify-between pr-2">
                            {t("design-system.space")}
                            <Switch
                                checked={flags.space}
                                onChange={(evt) => updateValue({ flags: { space: evt.currentTarget.checked } })}
                            />
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <EditSpace
                            value={config.space}
                            onChange={(space) =>
                                updateValue({
                                    config: {
                                        space,
                                    },
                                    flags: {
                                        space: true,
                                    },
                                })
                            }
                        />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="1">
                    <Accordion.Control icon={<LuSwatchBook />}>
                        <div className="flex w-full items-center justify-between pr-2">
                            {t("design-system.color")}
                            <Switch
                                checked={flags.color}
                                onChange={(evt) =>
                                    updateValue({
                                        flags: { color: evt.currentTarget.checked },
                                    })
                                }
                            />
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <EditColor
                            value={config.color}
                            onChange={(color) =>
                                updateValue({
                                    config: {
                                        color,
                                    },
                                    flags: {
                                        color: true,
                                    },
                                })
                            }
                        />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="2">
                    <Accordion.Control icon={<LuText />}>
                        <div className="flex w-full items-center justify-between pr-2">
                            {t("design-system.font")}
                            <Switch
                                checked={flags.font}
                                onChange={(evt) =>
                                    updateValue({
                                        flags: { font: evt.currentTarget.checked },
                                    })
                                }
                            />
                        </div>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <EditFont
                            value={config.font}
                            onChange={(font) =>
                                updateValue({
                                    config: {
                                        font,
                                    },
                                    flags: {
                                        font: true,
                                    },
                                })
                            }
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

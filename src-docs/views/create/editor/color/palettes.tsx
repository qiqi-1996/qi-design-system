import { ArrayedForm } from "@/components/form/arrayed-form"
import { FormTitle } from "@/components/form/form-title"
import type { UnifiedFormProps } from "@/components/form/types"
import type { ColorConfig } from "@core/schema"
import { ColorInput, Input, NativeSelect } from "@mantine/core"
import { useControllableValue } from "ahooks"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"

const colorPaletteTypes = [
    {
        label: "Qi Design System V0",
        value: "qi-design-system-v0",
    },
    {
        label: "Ant Design",
        value: "ant-design",
    },
]

export function EditColorPalettes(props: UnifiedFormProps<ColorConfig["palettes"]>) {
    const [tc] = useTranslation("core")

    const itemRender = useCallback((props: UnifiedFormProps<Exclude<ColorConfig["palettes"], undefined>[number]>) => {
        const [state, setState] = useControllableValue<Exclude<ColorConfig["palettes"], undefined>[number]>(props)

        return (
            <div className="flex flex-col gap-3 py-1">
                <FormTitle title={tc("schema.color.palettes.name")} description={tc("schema.color.palettes.name-desc")}>
                    <Input
                        variant="filled"
                        value={state.name}
                        onChange={(evt) =>
                            setState({
                                ...state,
                                name: evt.currentTarget.value,
                            })
                        }
                    ></Input>
                </FormTitle>
                <FormTitle title={tc("schema.color.type.title")} description={tc("schema.color.type.desc")}>
                    <NativeSelect
                        variant="filled"
                        value={state.type}
                        onChange={(evt) => {
                            setState({
                                ...state,
                                type: evt.currentTarget.value as any,
                            })
                        }}
                        data={colorPaletteTypes}
                    />
                </FormTitle>
                <FormTitle title="基础颜色" description="base">
                    <ColorInput
                        variant="filled"
                        value={state.base}
                        onChange={(v) =>
                            setState({
                                ...state,
                                base: v,
                            })
                        }
                    />
                </FormTitle>

                {state.type === "qi-design-system-v0" && (
                    <FormTitle title="色板类型">
                        <NativeSelect
                            variant="filled"
                            value={state.args?.[0]}
                            data={[
                                {
                                    label: "Light",
                                    value: "light",
                                },
                                {
                                    label: "Dark",
                                    value: "dark",
                                },
                            ]}
                            defaultValue={"light"}
                            onChange={(evt) =>
                                setState({
                                    ...state,
                                    args: [evt.currentTarget.value],
                                })
                            }
                        />
                    </FormTitle>
                )}
            </div>
        )
    }, [])

    return (
        <ArrayedForm
            {...props}
            title={tc("schema.color.palettes.title")}
            itemDefaultValue={{
                type: "ant-design",
                name: "Unamed",
            }}
            itemRender={itemRender}
        />
    )
}

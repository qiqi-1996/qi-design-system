import { ArrayedForm } from "@/components/form/arrayed-form"
import { FormTitle } from "@/components/form/form-title"
import type { UnifiedFormProps } from "@/components/form/types"
import type { ColorConfig } from "@core/schema"
import { Accordion, Input } from "@mantine/core"
import { useControllableValue } from "ahooks"
import { fromPairs, omit, toPairs } from "lodash"
import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { LuContrast, LuMoon, LuSun } from "react-icons/lu"
import { SemanticFormInput } from "./semantic-components"

export type EditColorSemanticsValue = ({
    key?: string
} & Partial<Exclude<ColorConfig["semantic"], undefined>[string]>)[]

export const toEditColorSemanticsValue = (value: ColorConfig["semantic"]) =>
    toPairs(value?.semantic ?? {}).map(([key, value]) => ({
        key,
        ...value,
    })) as EditColorSemanticsValue

export const toColorConfigSemantic = (value: EditColorSemanticsValue | undefined) =>
    fromPairs(value?.map((item) => [item.key, omit(item, "key")])) as ColorConfig["semantic"]

export function EditColorSemantics(
    props: UnifiedFormProps<EditColorSemanticsValue | undefined> & { colorPalettesConfig: ColorConfig["palettes"] },
) {
    const { colorPalettesConfig } = props
    const [tc] = useTranslation("core")

    const itemRender = useCallback(
        (props: UnifiedFormProps<EditColorSemanticsValue[number]>) => {
            const [state, setState] = useControllableValue<EditColorSemanticsValue[number]>(props)

            return (
                <div className="flex flex-col gap-3 py-1">
                    <FormTitle title="命名">
                        <Input
                            variant="filled"
                            value={state.key}
                            onChange={(evt) =>
                                setState({
                                    ...state,
                                    key: evt.currentTarget.value,
                                })
                            }
                        ></Input>
                    </FormTitle>
                    <FormTitle title="主题">
                        <Accordion defaultValue="default" variant="contained">
                            <Accordion.Item key="default" value="default">
                                <Accordion.Control icon={<LuSun />}>默认</Accordion.Control>
                                <Accordion.Panel>
                                    <SemanticFormInput
                                        value={state.default}
                                        onChange={(theme) =>
                                            setState({
                                                ...state,
                                                default: theme,
                                            })
                                        }
                                        colorPalettesConfig={colorPalettesConfig}
                                    />
                                </Accordion.Panel>
                            </Accordion.Item>
                            <Accordion.Item key="dark" value="dark">
                                <Accordion.Control icon={<LuMoon />}>暗黑</Accordion.Control>
                                <Accordion.Panel>
                                    <SemanticFormInput
                                        value={state.dark}
                                        onChange={(theme) =>
                                            setState({
                                                ...state,
                                                dark: theme,
                                            })
                                        }
                                        colorPalettesConfig={colorPalettesConfig}
                                    />
                                </Accordion.Panel>
                            </Accordion.Item>
                            <Accordion.Item key="contrast" value="contrast">
                                <Accordion.Control icon={<LuContrast />}>高对比度</Accordion.Control>
                                {/* <Accordion.Panel>
                                    <SemanticFormInput
                                        value={state.dark}
                                        onChange={(theme) =>
                                            setState({
                                                ...state,
                                                dark: theme,
                                            })
                                        }
                                        colorPalettesConfig={colorPalettesConfig}
                                    />
                                </Accordion.Panel> */}
                            </Accordion.Item>
                        </Accordion>
                    </FormTitle>
                </div>
            )
        },
        [colorPalettesConfig],
    )

    return (
        <ArrayedForm
            value={props.value}
            onChange={(v) => props.onChange(v as EditColorSemanticsValue)}
            title={tc("common.semantic")}
            itemDefaultValue={{
                key: "",
            }}
            itemRender={itemRender}
        />
    )
}

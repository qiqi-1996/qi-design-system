import { ArrayedForm, ArrayedKeyValuePairsItemRender, FormTitle, type UnifiedFormProps } from "@/components/form"
import { fontSchema, type FontConfig } from "@core"
import { Accordion, Input, NumberInput, Paper } from "@mantine/core"
import { fromPairs, toPairs } from "lodash"
import { useTranslation } from "react-i18next"
import { produce } from "immer"
import type { DeepRequired } from "ts-essentials"

const defaultValue = fontSchema().parse({})

const defaultProduce = produce<FontConfig>((draft) => {
    draft = draft || defaultValue
    draft.lineHeight = draft.lineHeight || defaultValue.lineHeight || {}
    draft.lineHeight.auto = draft.lineHeight.auto || defaultValue.lineHeight?.auto || {}
    draft.size = draft.size || defaultValue.size || {}
    draft.size.semantic = draft.size.semantic || defaultValue.size?.semantic || {}
    draft.weight = draft.weight || defaultValue.weight || {}
    draft.weight.semantic = draft.weight.semantic || defaultValue.weight?.semantic || {}
    return draft
}) as (draft: FontConfig | undefined) => DeepRequired<FontConfig>

export default function EditFont(props: UnifiedFormProps<FontConfig | undefined>) {
    const { value, onChange } = props

    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    return (
        <div className="flex flex-col gap-2">
            <FormTitle>
                <ArrayedForm
                    title={{
                        title: tc("schema.font.size.title"),
                        description: tc("schema.font.size.semantic-desc"),
                    }}
                    value={toPairs(value?.size?.semantic)}
                    onChange={(pairs) => {
                        onChange(
                            produce(defaultProduce(value), (draft) => {
                                draft.size.semantic = fromPairs(pairs)
                            }),
                        )
                    }}
                    itemDefaultValue={["", ""]}
                    itemRender={ArrayedKeyValuePairsItemRender}
                    inline
                />
            </FormTitle>
            <FormTitle>
                <ArrayedForm
                    title={{
                        title: tc("schema.font.weight.title"),
                        description: tc("schema.font.weight.semantic-desc"),
                    }}
                    value={toPairs(value?.weight?.semantic)}
                    onChange={(pairs) => {
                        onChange(
                            produce(defaultProduce(value), (draft) => {
                                draft.weight.semantic = fromPairs(pairs)
                            }),
                        )
                    }}
                    itemDefaultValue={["", ""]}
                    itemRender={ArrayedKeyValuePairsItemRender}
                    inline
                />
            </FormTitle>
            <FormTitle title={tc("schema.font.line-height.title")}>
                <Paper className="p-2">
                    <Accordion defaultValue="semantic" variant="contained">
                        <Accordion.Item value="semantic">
                            <Accordion.Control>{tc("common.semantic")}</Accordion.Control>
                            <Accordion.Panel>
                                <ArrayedForm
                                    title={{
                                        description: tc("schema.font.line-height.semantic-desc"),
                                    }}
                                    value={toPairs(value?.lineHeight?.semantic)}
                                    onChange={(pairs) =>
                                        onChange(
                                            produce(defaultProduce(value), (draft) => {
                                                draft.lineHeight.semantic = fromPairs(pairs)
                                            }),
                                        )
                                    }
                                    itemDefaultValue={["", ""]}
                                    itemRender={ArrayedKeyValuePairsItemRender}
                                    inline
                                />
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="auto">
                            <Accordion.Control>{tc("schema.font.line-height.auto.title")}</Accordion.Control>
                            <Accordion.Panel>
                                <div className="flex flex-col gap-2">
                                    <FormTitle
                                        title={tc("schema.font.line-height.auto.value")}
                                        description={tc("schema.font.line-height.auto.value-desc")}
                                    >
                                        <NumberInput
                                            value={value?.lineHeight?.auto?.value}
                                            onChange={(autoValue) =>
                                                onChange(
                                                    produce(defaultProduce(value), (draft) => {
                                                        draft.lineHeight.auto.value = Number(autoValue)
                                                    }),
                                                )
                                            }
                                        />
                                    </FormTitle>
                                    <FormTitle
                                        title={tc("schema.font.line-height.auto.range")}
                                        description={tc("schema.font.line-height.auto.range-desc")}
                                    >
                                        <div className="flex gap-1">
                                            <NumberInput
                                                placeholder="from"
                                                value={value?.lineHeight?.auto?.range?.[0]}
                                                onChange={(rangeStart) =>
                                                    onChange(
                                                        produce(defaultProduce(value), (draft) => {
                                                            draft.lineHeight.auto.range[0] = Number(rangeStart)
                                                        }),
                                                    )
                                                }
                                            />
                                            <NumberInput
                                                placeholder="to"
                                                value={value?.lineHeight?.auto?.range?.[1]}
                                                onChange={(rangeEnd) =>
                                                    onChange(
                                                        produce(defaultProduce(value), (draft) => {
                                                            draft.lineHeight.auto.range[1] = Number(rangeEnd)
                                                        }),
                                                    )
                                                }
                                            />
                                        </div>
                                    </FormTitle>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Paper>
            </FormTitle>
        </div>
    )
}

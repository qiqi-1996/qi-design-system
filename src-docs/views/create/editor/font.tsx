import { ArrayedForm, ArrayedKeyValuePairsItemRender, FormTitle, type UnifiedFormProps } from "@/components/form"
import type { FontConfig, FontSemanticItemConfig } from "@core"
import { Input, NativeSelect } from "@mantine/core"
import { fromPairs, isArray, toPairs } from "lodash"
import { useTranslation } from "react-i18next"

type FontSemanticEditorItem = {
    key: string
} & FontSemanticItemConfig

const fontWeightData = ["", "100", "200", "300", "400", "500", "600", "700", "800", "900"]

const toEditorValue = (semantic: FontConfig["semantic"] | undefined): FontSemanticEditorItem[] =>
    toPairs(semantic ?? {}).map(([key, value]) => ({
        key,
        ...value,
    }))

const toConfigSemantic = (value: FontSemanticEditorItem[] | undefined): FontConfig["semantic"] =>
    fromPairs(value?.filter((item) => item.key).map(({ key, ...item }) => [key, item])) as FontConfig["semantic"]

export default function EditFont(props: UnifiedFormProps<FontConfig | undefined>) {
    const { value, onChange } = props
    const [tc] = useTranslation("core")

    return (
        <div className="flex flex-col gap-2">
            <ArrayedForm
                title={{
                    title: tc("common.semantic"),
                    description: tc("schema.font.size.semantic-desc"),
                }}
                value={toEditorValue(value?.semantic)}
                onChange={(semantic) =>
                    onChange({
                        ...value,
                        semantic: toConfigSemantic(semantic),
                    })
                }
                itemDefaultValue={{ key: "", size: "", weight: "400", lineHeight: [] }}
                itemRender={FontSemanticItemRender}
            />
        </div>
    )
}

function FontSemanticItemRender(props: UnifiedFormProps<FontSemanticEditorItem>) {
    const { value, onChange } = props
    const [tc] = useTranslation("core")
    const lineHeightPairs = isArray(value.lineHeight)
        ? value.lineHeight.map((height) => ["", height])
        : toPairs(value.lineHeight)

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-2">
                <FormTitle title="Name">
                    <Input value={value.key} onChange={(evt) => onChange({ ...value, key: evt.currentTarget.value })} />
                </FormTitle>
                <FormTitle title={tc("schema.font.size.title")}>
                    <Input
                        value={value.size}
                        onChange={(evt) => onChange({ ...value, size: evt.currentTarget.value })}
                    />
                </FormTitle>
                <FormTitle title={tc("schema.font.weight.title")}>
                    <NativeSelect
                        value={value.weight}
                        onChange={(evt) =>
                            onChange({ ...value, weight: evt.currentTarget.value as FontSemanticItemConfig["weight"] })
                        }
                        data={fontWeightData}
                    />
                </FormTitle>
            </div>
            <ArrayedForm
                title={{
                    title: tc("schema.font.line-height.title"),
                    description: tc("schema.font.line-height.semantic-desc"),
                }}
                value={lineHeightPairs as [string, string][]}
                onChange={(pairs) => {
                    const lineHeight = pairs?.some(([key]) => key)
                        ? fromPairs(pairs?.filter(([key]) => key))
                        : pairs?.map(([, height]) => height).filter(Boolean)
                    onChange({
                        ...value,
                        lineHeight,
                    })
                }}
                itemDefaultValue={["", ""]}
                itemRender={ArrayedKeyValuePairsItemRender}
                inline
            />
        </div>
    )
}

import { ArrayedForm, ArrayedKeyValuePairsItemRender, FormTitle, type UnifiedFormProps } from "@/components/form"
import { fontSchema, type FontConfig } from "@core"
import { Input } from "@mantine/core"
import { fromPairs, toPairs } from "lodash"
import { useTranslation } from "react-i18next"

const defaultValue = fontSchema().parse({})

export default function EditFont(props: UnifiedFormProps<FontConfig | undefined>) {
    const { value, onChange } = props

    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    return (
        <div className="flex flex-col gap-2">
            <p className="text-footnote font-footnote text-color-footnote">{tc("schema.font.desc")}</p>
            <FormTitle title={t("design-system.font")} description={tc("schema.font.desc")}>
                <ArrayedForm
                    value={toPairs(value?.size.semantic)}
                    onChange={(pairs) =>
                        onChange({
                            ...defaultValue,
                            ...value,
                            size: {
                                ...value?.size,
                                semantic: fromPairs(pairs ?? []),
                            },
                        })
                    }
                    itemDefaultValue={["", ""]}
                    itemRender={ArrayedKeyValuePairsItemRender}
                    inline
                />
            </FormTitle>
        </div>
    )
}

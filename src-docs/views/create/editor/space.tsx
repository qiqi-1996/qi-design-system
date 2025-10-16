import { FormTitle, type UnifiedFormProps } from "@/components/form"
import { spaceSchema, type SpaceConfig } from "@core"
import { Input, NumberInput } from "@mantine/core"
import { useTranslation } from "react-i18next"

const defaultValue = spaceSchema().parse({})

export default function EditSpace(props: UnifiedFormProps<SpaceConfig | undefined>) {
    const [tc] = useTranslation("core")

    return (
        <div className="flex flex-col gap-2">
            <p className="text-footnote font-footnote text-color-footnote">{tc("schema.space.desc")}</p>
            <FormTitle title={tc("schema.space.base.title")} description={tc("schema.space.base.desc")}>
                <NumberInput
                    value={props.value?.base}
                    onChange={(value) =>
                        props.onChange({
                            ...defaultValue,
                            ...props.value,
                            base: Number(value),
                        })
                    }
                />
            </FormTitle>
            <FormTitle title={tc("schema.space.unit.title")} description={tc("schema.space.unit.desc")}>
                <Input
                    value={props.value?.unit}
                    onChange={(evt) =>
                        props.onChange({
                            ...defaultValue,
                            ...props.value,
                            unit: evt.currentTarget.value,
                        })
                    }
                />
            </FormTitle>
        </div>
    )
}

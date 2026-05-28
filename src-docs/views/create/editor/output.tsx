import { ArrayedForm, FormTitle, type UnifiedFormProps } from "@/components/form"
import type { OutputConfig, TailwindDisableDefaultConfig } from "@core/schema/output"
import { Checkbox, Input, NativeSelect, TextInput } from "@mantine/core"
import { useControllableValue } from "ahooks"

type OutputItemConfig = OutputConfig[number]

const disableDefaultOptions: { label: string; value: TailwindDisableDefaultConfig[number] }[] = [
    { label: "Color", value: "color" },
    { label: "Font Size", value: "font-size" },
    { label: "Weight", value: "weight" },
    { label: "Leading", value: "leading" },
]

export default function EditOutput(props: UnifiedFormProps<OutputConfig | undefined>) {
    return (
        <ArrayedForm
            value={props.value ?? []}
            onChange={(output) => props.onChange(output as OutputConfig)}
            title="输出配置"
            itemDefaultValue={{ type: "tailwind-v4", path: "./theme.css", disableDefault: [], darkClass: ".dark" }}
            itemRender={OutputItemRender}
        />
    )
}

function OutputItemRender(props: UnifiedFormProps<OutputItemConfig>) {
    const [state, setState] = useControllableValue<OutputItemConfig>(props)
    const outputType = state.type ?? "tailwind-v4"
    const tailwindState = state.type === "tailwind-v4" ? state : undefined

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[140px_1fr] gap-2">
                <FormTitle title="类型">
                    <NativeSelect
                        value={outputType}
                        data={[
                            { label: "Tailwind v4", value: "tailwind-v4" },
                            { label: "Mantine", value: "mantine" },
                        ]}
                        onChange={(evt) => {
                            const type = evt.currentTarget.value
                            setState(
                                type === "tailwind-v4"
                                    ? { type, path: "./theme.css", disableDefault: [], darkClass: ".dark" }
                                    : { type, path: "./theme.ts" },
                            )
                        }}
                    />
                </FormTitle>
                <FormTitle title="路径">
                    <TextInput
                        value={state.path}
                        onChange={(evt) => setState({ ...state, path: evt.currentTarget.value } as OutputItemConfig)}
                    />
                </FormTitle>
            </div>
            {state.type === "tailwind-v4" && (
                <div className="flex flex-col gap-2 rounded-xl border border-black/10 p-2">
                    <FormTitle title="禁用 Tailwind 默认原子类">
                        <div className="grid grid-cols-2 gap-1">
                            {disableDefaultOptions.map((item) => (
                                <Checkbox
                                    key={item.value}
                                    label={item.label}
                                    checked={tailwindState?.disableDefault?.includes(item.value) ?? false}
                                    onChange={(evt) => {
                                        const checked = evt.currentTarget.checked
                                        const current = tailwindState?.disableDefault ?? []
                                        const disableDefault = checked
                                            ? [...current, item.value]
                                            : current.filter((value) => value !== item.value)
                                        setState({ ...state, disableDefault })
                                    }}
                                />
                            ))}
                        </div>
                    </FormTitle>
                    <FormTitle title="暗色类名" description="留空则不生成暗色变量覆盖块">
                        <Input
                            value={(tailwindState?.darkClass || "") as string}
                            onChange={(evt) => setState({ ...state, darkClass: evt.currentTarget.value })}
                        />
                    </FormTitle>
                </div>
            )}
        </div>
    )
}

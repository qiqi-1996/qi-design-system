import { ArrayedForm } from "@/components/form/arrayed-form"
import { FormTitle, type FormTitleProps } from "@/components/form/form-title"
import type { UnifiedFormProps } from "@/components/form/types"
import type { ColorConfig, ColorSemanticItemConfig } from "@core"
import { commonGenColorPalette, isColorVariable } from "@core"
import { Button, ColorInput, ColorSwatch, Input, Popover, Radio, Select, Tabs } from "@mantine/core"
import { fromPairs, isEmpty, omit, toPairs } from "lodash"
import { useCallback, type ComponentProps } from "react"
import { LuCircleHelp } from "react-icons/lu"

type SemanticItemValue = [key: string, value: string]

function SemanticItemValueInput(
    props: UnifiedFormProps<SemanticItemValue | undefined> & {
        title?: FormTitleProps
        colorPalettesConfig: ColorConfig["palettes"]
    },
) {
    const { title, value: [key, value = ""] = [], onChange, colorPalettesConfig } = props
    const name = key ?? title?.title ?? title?.description ?? ""

    return (
        <div className="flex items-center justify-between gap-1">
            {props.title ? (
                <FormTitle {...props.title} />
            ) : (
                <div>
                    <Input value={name} onChange={(evt) => onChange([evt.currentTarget.value, value])} />
                </div>
            )}
            <SemanticPalettePickerAndInput
                value={value}
                onChange={(value) => onChange([name, value])}
                colorPalettesConfig={colorPalettesConfig}
            />
        </div>
    )
}

export function SemanticFormInput(
    props: UnifiedFormProps<ColorSemanticItemConfig | undefined> & { colorPalettesConfig: ColorConfig["palettes"] },
) {
    const { value, onChange, colorPalettesConfig } = props

    const itemRender = useCallback(
        (props: UnifiedFormProps<SemanticItemValue | undefined>) => (
            <SemanticItemValueInput {...props} colorPalettesConfig={colorPalettesConfig} />
        ),
        [colorPalettesConfig],
    )
    const staticItemBind = (key: string): ComponentProps<typeof SemanticItemValueInput> => ({
        title: {
            title: key,
        },
        value: [key, (value as any)[key]],
        onChange(kv) {
            onChange({
                type: "custom",
                ...value,
                ...(kv ? { [kv[0]]: kv[1] } : {}),
            })
        },
        colorPalettesConfig,
    })

    return (
        <div className="flex flex-col gap-2">
            <FormTitle description="语义化风格">
                <Select
                    value={value?.type}
                    onChange={(type) =>
                        onChange({
                            // ...value,
                            type: type as any,
                        })
                    }
                    data={[
                        { label: "Chakra 风格", value: "chakra" },
                        { label: "自定义", value: "custom" },
                    ]}
                />
            </FormTitle>

            {value?.type === "chakra" && (
                <div className="flex flex-col gap-0.5">
                    <SemanticItemValueInput {...staticItemBind("solid")} />
                    <SemanticItemValueInput {...staticItemBind("constract")} />
                    <SemanticItemValueInput {...staticItemBind("fg")} />
                    <SemanticItemValueInput {...staticItemBind("muted")} />
                    <SemanticItemValueInput {...staticItemBind("subtle")} />
                    <SemanticItemValueInput {...staticItemBind("emphasized")} />
                </div>
            )}
            {value?.type === "custom" && (
                <ArrayedForm
                    title="语义化键值"
                    value={
                        [
                            // ["default", value?.default ?? ""],
                            ...toPairs(omit(value, "type")),
                        ] as SemanticItemValue[]
                    }
                    onChange={(pairs) => {
                        onChange({
                            type: value?.type,
                            ...fromPairs((pairs ?? []) as any),
                        } as any)
                    }}
                    itemDefaultValue={["", ""]}
                    itemRender={itemRender}
                    inline
                />
            )}
        </div>
    )
}

/**
 * 语义化配置：从色板选取或自定义输入
 * Semantic configuration: choose or customize input from the color plate
 */
export function SemanticPalettePickerAndInput(
    props: UnifiedFormProps<string> & {
        colorPalettesConfig: ColorConfig["palettes"]
    },
) {
    const palettes = commonGenColorPalette(props.colorPalettesConfig)

    const colorFromPalettes = (colorId: string) =>
        palettes.find(([colorName]) => colorName === colorId.split("-")[0])?.[1].palette?.[
            Number(colorId.split("-")[1]) / 100 - 1
        ]

    return (
        <div>
            <Popover
                width={400}
                position="right"
                withArrow
                shadow="md"
                withOverlay
                overlayProps={{ zIndex: 10000, blur: "2px", backgroundOpacity: 0.1 }}
                zIndex={10001}
            >
                <Popover.Target>
                    <Button variant="default" leftSection={isEmpty(props.value) ? <LuCircleHelp /> : undefined}>
                        {!isEmpty(props.value) && (
                            <ColorSwatch
                                className="mr-0.5"
                                size={14}
                                color={
                                    isColorVariable(props.value) ? (colorFromPalettes(props.value) ?? "") : props.value
                                }
                            />
                        )}
                        {isEmpty(props.value) ? "选取或输入" : props.value}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <div className="flex flex-col gap-1">
                        {palettes?.[0]?.[0] && (
                            <>
                                <FormTitle title="从色板选取" />
                                <Tabs defaultValue={palettes?.[0]?.[0]}>
                                    <Tabs.List>
                                        {palettes.map(([colorName]) => (
                                            <Tabs.Tab value={colorName}>{colorName}</Tabs.Tab>
                                        ))}
                                    </Tabs.List>
                                    {palettes.map(([colorName, { palette }]) => {
                                        const colorId = (index: number) => `${colorName}-${(index + 1) * 100}`
                                        const isSelected = (index: number) => colorId(index) === props.value

                                        return (
                                            <Tabs.Panel value={colorName}>
                                                <div className="flex flex-col gap-0.5 py-1">
                                                    {palette.map((color, index) => (
                                                        <Button
                                                            key={colorId(index)}
                                                            variant={isSelected(index) ? "filled" : "default"}
                                                            leftSection={<ColorSwatch color={color} size={24} />}
                                                            justify="left"
                                                            onClick={() => {
                                                                props.onChange(colorId(index))
                                                            }}
                                                        >
                                                            {colorId(index)}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </Tabs.Panel>
                                        )
                                    })}
                                </Tabs>
                            </>
                        )}
                        <FormTitle
                            title="自定义色值"
                            onMouseDown={(evt) => {
                                evt.stopPropagation()
                            }}
                        >
                            <ColorInput
                                value={isColorVariable(props.value) ? undefined : props.value}
                                onChange={(color) => props.onChange(color)}
                                popoverProps={{
                                    zIndex: 10002,
                                }}
                            />
                        </FormTitle>
                    </div>
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}

import { Button, CloseButton, Paper } from "@mantine/core"
import { useListState } from "@mantine/hooks"
import cs from "classnames"
import { useEffect, useMemo, type ComponentProps, type ComponentType } from "react"
import { LuPlus, LuTrash2 } from "react-icons/lu"
import type { UnifiedFormProps } from "../types"
import { FormTitle, type FormTitleProps } from "../form-title"

export * from "./key-value-pairs-item"

export function ArrayedForm<T = any>(
    props: UnifiedFormProps<T[] | undefined> & {
        title?: string | FormTitleProps
        /**
         * 内联布局（无边框，输入组件和删除按钮维系在一行内）
         * Inline layout (no border, input components and delete buttons are maintained in one line)
         */
        inline?: boolean

        itemDefaultValue: T
        itemRender: ComponentType<UnifiedFormProps<T>>
    },
) {
    const [list, api] = useListState<T>(props.value ?? [])
    const Item = props.itemRender

    useEffect(() => {
        console.log(props.value)
        api.setState(props.value ?? [])
        // ;(props.value ?? []).forEach((item, index) => {
        //     api.setItem(index, item)
        // })
    }, [JSON.stringify(props.value)])

    useEffect(() => {
        if (JSON.stringify(list) !== JSON.stringify(props.value)) {
            props.onChange(list)
        }
    }, [JSON.stringify(list)])

    const handleAdd = () => {
        api.append(props.itemDefaultValue)
    }

    const ItemContainer = useMemo(
        () => (!props.inline ? Paper : (props: ComponentProps<"div">) => <div {...props}>{props.children}</div>),
        [props.inline],
    )

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-1">
                {typeof props.title === "string" ? (
                    <div className="text-footnote font-footnote text-color-footnote">{props.title}</div>
                ) : (
                    <FormTitle {...props.title} />
                )}
                <Button className="shrink-0" size="compact-sm" variant="light" onClick={() => handleAdd()}>
                    <LuPlus />
                </Button>
            </div>
            {list.map((value, index) => {
                return (
                    <ItemContainer
                        key={index}
                        className={cs(!props.inline ? "relative p-2" : "flex items-center gap-1")}
                        withBorder
                    >
                        <Item value={value} onChange={(newValue) => api.setItem(index, newValue)} />
                        <CloseButton
                            className={cs(!props.inline ? "!absolute top-2 right-2 z-10" : "")}
                            icon={<LuTrash2 />}
                            onClick={() => {
                                api.remove(index)
                            }}
                        />
                    </ItemContainer>
                )
            })}
            <Button leftSection={<LuPlus />} size="sm" variant="white" fullWidth onClick={() => handleAdd()}>
                添加
            </Button>
        </div>
    )
}

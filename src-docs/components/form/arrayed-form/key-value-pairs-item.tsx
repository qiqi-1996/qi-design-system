import { Input } from "@mantine/core"
import type { UnifiedFormProps } from "../types"

export function ArrayedKeyValuePairsItemRender(props: UnifiedFormProps<[key: string, value: any]>) {
    const { value: [key, value] = ["", ""], onChange } = props

    return (
        <div className="flex gap-1">
            <Input
                placeholder="key"
                value={key}
                onChange={({ currentTarget: { value: newKey } }) => onChange([newKey, value])}
            ></Input>
            <Input
                placeholder="value"
                value={value}
                onChange={({ currentTarget: { value: newValue } }) => onChange([key, newValue])}
            ></Input>
        </div>
    )
}

import type { UnifiedFormProps } from "@/components/form/types"
import type { ColorConfig } from "@core"
import { useControllableValue } from "ahooks"
import { EditColorPalettes } from "./palettes"
import { EditColorSemantics, toColorConfigSemantic, toEditColorSemanticsValue } from "./semantic"

export function EditColor(props: UnifiedFormProps<ColorConfig | undefined>) {
    const [state, setState] = useControllableValue<ColorConfig | undefined>(props)

    return (
        <div className="flex flex-col gap-2">
            <EditColorPalettes
                value={state?.palettes ?? []}
                onChange={(palettes) =>
                    setState({
                        ...state,
                        palettes,
                    })
                }
            />
            <EditColorSemantics
                value={toEditColorSemanticsValue(state?.semantic)}
                onChange={(value) =>
                    setState({
                        ...state,
                        semantic: toColorConfigSemantic(value),
                    })
                }
                colorPalettesConfig={state?.palettes}
            />
        </div>
    )
}

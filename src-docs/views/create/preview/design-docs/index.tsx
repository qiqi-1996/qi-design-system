import { commonGenColorPalette, commonGenColorSemantic } from "@core"
import { ColorSwatch, Paper } from "@mantine/core"
import cs from "classnames"
import { type ComponentProps } from "react"
import { useTranslation } from "react-i18next"

import type { DesignSystemEditorValue } from "../../editor/types"
import { SubTitle, Title } from "./elements"
import { SpaceDemo } from "./space-demo"

export function DesignSystemDocs(props: ComponentProps<"div"> & { value: DesignSystemEditorValue }) {
    const {
        value: { config, flags },
    } = props
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    // console.log({ config })
    const color = {
        palettes: commonGenColorPalette(config.color?.palettes),
        semantics: commonGenColorSemantic(config.color?.semantic),
    }

    return (
        <div {...props}>
            {/* <div>{JSON.stringify(props.value)}</div> */}
            <div className="-mt-5"></div>

            {flags.space && (
                <>
                    <Title>
                        {t("design-system.space")}
                        {tc("schema.space.desc")}
                    </Title>
                    <div>
                        <SpaceDemo spaceConfig={config.space} />
                    </div>
                </>
            )}

            {flags.color && (
                <>
                    <Title>{t("design-system.color")}</Title>
                    <SubTitle>{tc("schema.color.palettes.title")}</SubTitle>
                    {color.palettes.map(([colorName, { primary, palette }]) => {
                        return (
                            <div className="mb-2">
                                <h1 className="mb-1 text-subtitle leading-subtitle-xs font-subtitle">{colorName}</h1>
                                <div className="grid grid-cols-10 gap-1">
                                    {palette.map((color, index) => (
                                        <Paper
                                            className={cs(
                                                "relative !flex flex-col items-center gap-1 overflow-hidden pt-2",
                                                color === primary && "!border-2 !border-primary",
                                            )}
                                            withBorder
                                        >
                                            <ColorSwatch color={color} size={48} />
                                            <p className="text-footnote leading-footnote-xs font-footnote text-color-footnote">
                                                {colorName}-{(index + 1) * 100}
                                            </p>
                                            {color === primary && (
                                                <div className="w-full bg-primary text-center font-title text-primary-contrast">
                                                    主色
                                                </div>
                                            )}
                                        </Paper>
                                    ))}
                                </div>
                            </div>
                        )
                    })}

                    <h2 className="mb-3 text-title leading-title-xs font-title">{tc("common.semantic")}</h2>
                </>
            )}
        </div>
    )
}

import { commonGenColorPalette, commonGenColorSemantic, isColorVariable, resolveColorVariable } from "@core"
import type { ColorConfig } from "@core/schema"
import { SubTitle, Title } from "../elements"
import { useTranslation } from "react-i18next"
import { ColorSwatch, Divider, Paper } from "@mantine/core"
import cs from "classnames"
import { isEmpty, toPairs } from "lodash"

export function SectionColor(props: { colorConfig?: ColorConfig }) {
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    const color = {
        palettes: commonGenColorPalette(props.colorConfig?.palettes),
        semantics: commonGenColorSemantic(props.colorConfig?.semantic),
    }

    return (
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
                                    key={color}
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

            <div className="grid grid-cols-4 gap-1">
                {color.semantics
                    .filter(([semanticKey, semanticValue]) => !isEmpty(semanticKey) && !isEmpty(semanticValue))
                    .map(([semanticKey, semanticValue]) => {
                        const colorValue = isColorVariable(semanticValue)
                            ? color.palettes.find(
                                  ([colorName]) => colorName === resolveColorVariable(semanticValue)?.name,
                              )?.[1].palette[resolveColorVariable(semanticValue)?.index ?? 0]
                            : semanticValue

                        return (
                            <Paper
                                key={semanticKey}
                                className={cs(
                                    "relative !flex flex-col items-center gap-1 overflow-hidden p-2",
                                    // color === primary && "!border-2 !border-primary",
                                )}
                                withBorder
                            >
                                <ColorSwatch color={colorValue!} size={48} />
                                <div className="flex flex-col gap-1 items-center">
                                    <span className="text-text leading-text-xs font-text">{semanticKey}</span>
                                    <span className="text-footnote leading-footnote-xs font-footnote text-color-footnote">
                                        {semanticValue}
                                    </span>
                                </div>
                                {/* {color === primary && (
                                    <div className="w-full bg-primary text-center font-title text-primary-contrast">
                                        主色
                                    </div>
                                )} */}
                            </Paper>
                        )
                    })}
            </div>
        </>
    )
}

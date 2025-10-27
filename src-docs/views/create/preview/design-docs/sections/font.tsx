import type { FontConfig } from "@core/schema"
import { useTranslation } from "react-i18next"
import { SubTitle, Title } from "../elements"
import { commonGenFont } from "@core/generator"
import { isEmpty, toPairs } from "lodash"
import { Divider, Paper } from "@mantine/core"
import { LuKey, LuScale, LuText } from "react-icons/lu"

export function SectionFont(props: { fontConfig?: FontConfig }) {
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    const font = commonGenFont(props.fontConfig)

    return (
        <div className="">
            <Title>{t("design-system.font")}</Title>
            <SubTitle>{tc("schema.font.size.title")}</SubTitle>
            <div className="mb-5 grid grid-cols-1 gap-2">
                {toPairs(font.size)
                    .filter(([key, size]) => !isEmpty(key) && !isEmpty(size))
                    .map(([key, size]) => {
                        return (
                            <Paper key={key} className="p-2" withBorder>
                                <div className="mb-1 inline-flex gap-2 rounded-xl bg-black/5 px-2 py-0.5">
                                    <span>{key}</span>
                                    <Divider orientation="vertical" />
                                    <span>{size}</span>
                                    <Divider orientation="vertical" />
                                    {font.weight[key] && <span>{font.weight[key]}</span>}
                                </div>
                                <div
                                    style={{
                                        fontSize: `${size}`,
                                        lineHeight: `${size}`,
                                        fontWeight: font.weight[key] || "400",
                                    }}
                                >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                </div>
                            </Paper>
                        )
                    })}
            </div>

            <SubTitle>{tc("schema.font.weight.title")}</SubTitle>
            <div className="mb-5 grid grid-cols-5 gap-2">
                {toPairs(font.weight)
                    .filter(([key, weight]) => !isEmpty(key) && !isEmpty(weight))
                    .map(([key, weight]) => {
                        return (
                            <Paper key={key} className="!flex items-baseline justify-between p-2" withBorder>
                                <div
                                    className="text-title"
                                    style={{
                                        fontWeight: weight,
                                    }}
                                >
                                    {key}
                                </div>
                                <div>{weight}</div>
                            </Paper>
                        )
                    })}
            </div>

            <SubTitle>{tc("schema.font.line-height.title")}</SubTitle>
        </div>
    )
}

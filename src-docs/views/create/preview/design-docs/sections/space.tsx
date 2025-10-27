import { spaceSchema, type SpaceConfig } from "@core/schema"
import { ActionIcon, Button, Paper } from "@mantine/core"
import { LuHeart, LuMessageSquare, LuSend } from "react-icons/lu"
import { Measure, Title } from "../elements"
import { useTranslation } from "react-i18next"

export function SectionSpace(props: { spaceConfig?: SpaceConfig }) {
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    const { spaceConfig } = props

    const spaceValue = (v: number) => {
        const space = spaceSchema().parse(spaceConfig)
        return `${space.base * v}${space.unit}`
    }

    const single = (
        <Paper className="w-full" shadow="md" withBorder>
            <div className="flex justify-center">
                <Measure
                    type="vertical"
                    style={{ height: spaceValue(5) }}
                    label={`5 × ${spaceValue(1)} = ${spaceValue(5)}`}
                    alwaysDisplay
                />
            </div>
            <div className="flex">
                <Measure style={{ width: spaceValue(5) }} label={spaceValue(5)} />
                <div className="flex w-full flex-col items-center">
                    <div className="w-full text-headline leading-headline-xs font-headline">BASE / {spaceValue(1)}</div>
                    <Measure type="vertical" style={{ height: spaceValue(3) }} label={spaceValue(3)} />
                    <div className="flex w-full">
                        <Button>Primary Button</Button>
                        <Measure style={{ width: spaceValue(2) }} label={spaceValue(2)} />
                        <Button variant="default">Normal Button 2</Button>
                        <Measure style={{ width: spaceValue(2) }} label={spaceValue(2)} />
                        <Button variant="default">Normal Button 3</Button>
                    </div>
                    <Measure type="vertical" style={{ height: spaceValue(3) }} label={spaceValue(3)} />
                    <div className="flex w-full">
                        <ActionIcon variant="light" size={"lg"}>
                            <LuHeart />
                        </ActionIcon>
                        <Measure style={{ width: spaceValue(2) }} label={spaceValue(2)} />
                        <ActionIcon variant="default" size={"lg"}>
                            <LuMessageSquare />
                        </ActionIcon>
                        <Measure style={{ width: spaceValue(2) }} label={spaceValue(2)} />
                        <ActionIcon variant="default" size={"lg"}>
                            <LuSend />
                        </ActionIcon>
                    </div>
                </div>
                <Measure style={{ width: spaceValue(5) }} label={spaceValue(5)} />
            </div>
            <div className="flex justify-center">
                <Measure type="vertical" style={{ height: spaceValue(5) }} label={"Hoverable"} alwaysDisplay />
            </div>
        </Paper>
    )

    return (
        <>
            <Title>
                {t("design-system.space")}
                {tc("schema.space.desc")}
            </Title>
            <div>
                <div className="flex w-full items-center overflow-auto rounded-xl p-2">
                    {single}
                    <Measure style={{ width: spaceValue(8) }} label={spaceValue(8)} />
                    {single}
                </div>
            </div>
        </>
    )
}

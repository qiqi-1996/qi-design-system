import { commonGenColorPalette, commonGenColorSemantic, isColorVariable, resolveColorVariable } from "@core"
import type { ColorConfig } from "@core/schema"
import { SubTitle, Title } from "../elements"
import { useTranslation } from "react-i18next"
import { Paper } from "@mantine/core"
import cs from "classnames"
import { isEmpty } from "lodash"

type SemanticColorEntry = [semanticKey: string, semanticValue: string]

type SemanticColorGroup = {
    key: string
    title: string
    lightEntries: SemanticColorEntry[]
    darkEntries: SemanticColorEntry[]
}

const semanticColorSuffixes = ["solid", "contrast", "fg", "muted", "subtle", "emphasized"]

function getSemanticColorGroupKey(semanticKey: string) {
    const keyWithoutTheme = semanticKey.replace(/^dark-/, "")
    const suffix = semanticColorSuffixes.find((suffix) => semanticKey.endsWith(`-${suffix}`))
    return suffix ? keyWithoutTheme.slice(0, -(suffix.length + 1)) : keyWithoutTheme
}

function getSemanticColorGroups(entries: SemanticColorEntry[]): SemanticColorGroup[] {
    return entries.reduce<SemanticColorGroup[]>((groups, entry) => {
        const [semanticKey] = entry
        const groupKey = getSemanticColorGroupKey(semanticKey)
        const existingGroup = groups.find((group) => group.key === groupKey)
        const groupEntriesKey = semanticKey.startsWith("dark-") ? "darkEntries" : "lightEntries"

        if (existingGroup) {
            return groups.map((group) =>
                group.key === groupKey ? { ...group, [groupEntriesKey]: [...group[groupEntriesKey], entry] } : group,
            )
        }

        return [
            ...groups,
            {
                key: groupKey,
                title: groupKey,
                lightEntries: groupEntriesKey === "lightEntries" ? [entry] : [],
                darkEntries: groupEntriesKey === "darkEntries" ? [entry] : [],
            },
        ]
    }, [])
}

function resolvePreviewColor(semanticValue: string, palettes: ReturnType<typeof commonGenColorPalette>) {
    if (!isColorVariable(semanticValue)) return semanticValue

    const variable = resolveColorVariable(semanticValue)
    return palettes.find(([colorName]) => colorName === variable?.name)?.[1].palette[variable?.index ?? 0]
}

function ColorDot(props: { color?: string }) {
    return <div className="h-6 w-6 shrink-0 rounded-full" style={{ backgroundColor: props.color }} />
}

function SemanticColorCard(props: {
    entry: SemanticColorEntry
    palettes: ReturnType<typeof commonGenColorPalette>
    dark?: boolean
}) {
    const [semanticKey, semanticValue] = props.entry
    const colorValue = resolvePreviewColor(semanticValue, props.palettes)

    return (
        <Paper
            className={cs(
                "relative !flex flex-col items-center gap-1 overflow-hidden p-2",
                props.dark && "!bg-black !text-white",
            )}
            withBorder
        >
            <ColorDot color={colorValue} />
            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-text leading-text-xs font-text">{semanticKey}</span>
                <span
                    className={cs(
                        "text-footnote leading-footnote-xs font-footnote text-color-footnote",
                        props.dark && "!text-white",
                    )}
                >
                    {semanticValue}
                </span>
            </div>
        </Paper>
    )
}

export function SectionColor(props: { colorConfig?: ColorConfig }) {
    const [t] = useTranslation()
    const [tc] = useTranslation("core")

    const color = {
        palettes: commonGenColorPalette(props.colorConfig?.palette),
        semantics: commonGenColorSemantic(props.colorConfig?.semantic),
    }
    const semanticGroups = getSemanticColorGroups(
        color.semantics.filter(([semanticKey, semanticValue]) => !isEmpty(semanticKey) && !isEmpty(semanticValue)),
    )

    return (
        <>
            <Title>{t("design-system.color")}</Title>
            <SubTitle>{tc("schema.color.palettes.title")}</SubTitle>
            {color.palettes.map(([colorName, { primary, palette }]) => {
                return (
                    <div key={colorName} className="mb-2">
                        <h1 className="mb-1 text-subtitle leading-subtitle-xs font-subtitle">{colorName}</h1>
                        <div className="grid grid-cols-10 gap-1">
                            {palette.map((color, index) => (
                                <Paper
                                    key={index}
                                    className={cs(
                                        "relative !flex flex-col items-center gap-1 overflow-hidden pt-2",
                                        color === primary && "!border-2 !border-primary",
                                    )}
                                    withBorder
                                >
                                    <ColorDot color={color} />
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

            <div className="flex flex-col gap-3">
                {semanticGroups.map((group) => (
                    <section key={group.key} className="rounded-2xl border border-border p-3">
                        <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-subtitle leading-subtitle-xs font-subtitle">{group.title}</h3>
                            <span className="rounded-full bg-secondary-background px-2 py-0.5 text-footnote leading-footnote-xs font-footnote text-color-footnote">
                                {group.lightEntries.length + group.darkEntries.length}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            {group.lightEntries.length > 0 && (
                                <div>
                                    <div className="mb-1 text-footnote leading-footnote-xs font-footnote tracking-[0.16em] text-color-footnote uppercase">
                                        Light Mode
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                                        {group.lightEntries.map((entry) => (
                                            <SemanticColorCard key={entry[0]} entry={entry} palettes={color.palettes} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {group.darkEntries.length > 0 && (
                                <div>
                                    <div className="mb-1 text-footnote leading-footnote-xs font-footnote tracking-[0.16em] text-color-footnote uppercase">
                                        Dark Mode
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                                        {group.darkEntries.map((entry) => (
                                            <SemanticColorCard
                                                key={entry[0]}
                                                entry={entry}
                                                palettes={color.palettes}
                                                dark
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </>
    )
}

import { AppPage } from "@/components/app-layout/page"
import { pkg } from "@/utils/resources"
import { Badge, Button } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { LuArrowRight, LuGithub } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

type HomeContent = {
    label: string
    slogan: string
    description: string
    primaryAction: string
    secondaryAction: string
    githubAction: string
    note: string
    supported: string
    supportedItems: string[]
    valueTitle: string
    valueDescription: string
    flow: string[]
}

const content: Record<"zh" | "en", HomeContent> = {
    zh: {
        label: "Qi Design System",
        slogan: "一份设计系统 JSON，同步各类 UI 框架配置",
        description:
            "把空间、颜色、文字这些基础设计约定写成一份配置文件，再生成项目需要的框架主题配置。包括但不限于 Tailwind 和 Mantine。",
        primaryAction: "打开创建编辑器",
        secondaryAction: "查看配置文档",
        githubAction: "GitHub",
        note: `当前版本 v${pkg.version}`,
        supported: "已支持输出",
        supportedItems: ["Tailwind v4 theme CSS", "Mantine theme TS"],
        valueTitle: "少写几份重复主题配置",
        valueDescription: "维护一份 JSON，生成项目需要的 UI 框架配置。简单、直接、可版本化。",
        flow: ["Design System JSON", "Generate Configs", "Enojy Coding..."],
    },
    en: {
        label: "Qi Design System",
        slogan: "One design-system JSON, synced to UI framework configs",
        description:
            "Describe spacing, colors and typography in one config file, then generate framework theme files for your project. Including, but not limited to, Tailwind and Mantine.",
        primaryAction: "Open editor",
        secondaryAction: "Read docs",
        githubAction: "GitHub",
        note: `Current version v${pkg.version}`,
        supported: "Supported outputs",
        supportedItems: ["Tailwind v4 theme CSS", "Mantine theme TS"],
        valueTitle: "Write fewer repeated theme files",
        valueDescription:
            "Maintain one JSON and generate the UI framework configs your project needs. Simple, direct and versionable.",
        flow: ["Design System JSON", "Generate Configs", "Enojy Coding..."],
    },
}

export default function HomePage() {
    const [, i18n] = useTranslation()
    const navigate = useNavigate()
    const page = i18n.language === "en" ? content.en : content.zh

    return (
        <AppPage>
            <div className="relative overflow-hidden rounded-[40px] border border-black/8 bg-[#fbf7ef] px-4 py-5 text-[#17130f] sm:px-7 sm:py-8 lg:px-10 lg:py-10">
                <div className="pointer-events-none absolute top-[-120px] right-[-80px] h-[360px] w-[360px] rounded-full bg-[#e9c7ad]/45 blur-[96px]" />
                <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-[420px] w-[420px] rounded-full bg-[#d8dec8]/55 blur-[120px]" />
                <div className="pointer-events-none absolute top-[36%] right-[22%] h-[280px] w-[280px] rounded-full bg-[#d9c7ee]/35 blur-[110px]" />
                <div className="pointer-events-none absolute top-1/2 right-[18%] h-24 w-24 -translate-y-1/2 rounded-full border border-black/10" />

                <section className="relative grid min-h-[560px] grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_320px]">
                    <div>
                        <div className="mb-5 flex flex-wrap items-center gap-2">
                            <Badge variant="outline" color="dark" className="!border-black/15 !text-[#17130f]">
                                {page.label}
                            </Badge>
                            <span className="text-footnote text-black/50">{page.note}</span>
                        </div>

                        <h1 className="max-w-[920px] [font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[42px] leading-[1.06] font-[760] tracking-[-0.055em] text-balance sm:text-[64px] lg:text-[88px]">
                            {page.slogan}
                        </h1>
                        <p className="mt-5 max-w-[760px] text-[18px] leading-7 text-black/58 sm:text-[21px]">
                            {page.description}
                        </p>

                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                            <Button
                                size="lg"
                                color="dark"
                                rightSection={<LuArrowRight />}
                                onClick={() => navigate("/create")}
                            >
                                {page.primaryAction}
                            </Button>
                            <Button size="lg" variant="default" onClick={() => navigate("/docs")}>
                                {page.secondaryAction}
                            </Button>
                            <Button
                                size="lg"
                                variant="subtle"
                                color="dark"
                                leftSection={<LuGithub />}
                                onClick={() => window.open("https://github.com/qiqi-1996/qi-design-system")}
                            >
                                {page.githubAction}
                            </Button>
                        </div>
                    </div>

                    <aside className="relative rounded-[32px] border border-black/10 bg-white/55 p-4 shadow-2xl shadow-black/5 backdrop-blur-md">
                        <div className="mb-4 text-footnote tracking-[0.2em] text-black/45 uppercase">
                            {page.supported}
                        </div>
                        <div className="flex flex-col gap-2">
                            {page.supportedItems.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-black/10 bg-white/70 px-3 py-2 text-subtitle font-subtitle"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>
            </div>

            <section className="grid grid-cols-1 gap-4 px-1 py-7 lg:grid-cols-[0.9fr_1.1fr] lg:py-8">
                <div>
                    <div className="mb-2 h-1 w-12 rounded-full bg-primary" />
                    <h2 className="leading-tight font-black max-w-[720px] text-[34px] tracking-[-0.045em] sm:text-[52px]">
                        {page.valueTitle}
                    </h2>
                </div>
                <div className="flex flex-col justify-between gap-4">
                    <p className="text-[18px] leading-8 text-black/58">{page.valueDescription}</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {page.flow.map((item, index) => (
                            <div
                                key={item}
                                className="rounded-[28px] border border-black/10 bg-white p-4 shadow-xl shadow-black/[0.03]"
                            >
                                <div className="font-black mb-5 text-[40px] leading-none tracking-[-0.06em] text-black/12">
                                    {String(index + 1).padStart(2, "0")}
                                </div>
                                <div className="text-subtitle font-subtitle">{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </AppPage>
    )
}

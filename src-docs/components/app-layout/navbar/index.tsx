import { Select, UnstyledButton } from "@mantine/core"
import type { ComponentProps, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import cs from "classnames"
import { LuLanguages } from "react-icons/lu"

export function ActiveBar(props: { children: ReactNode; activated: boolean }) {
    return (
        <div>
            {props.children}
            {props.activated && <div className="h-0.5 w-full bg-primary"></div>}
        </div>
    )
}

export function AppNavbar(props: ComponentProps<"div">) {
    const [t, i18n] = useTranslation()
    const navigate = useNavigate()

    const pathname = useLocation().pathname

    return (
        <div {...props} className={cs("flex w-full items-center justify-between px-5 py-3", props.className)}>
            <div>
                <h1 className="cursor-pointer text-subtitle font-subtitle" onClick={() => navigate("/")}>
                    Qi Design System
                </h1>
            </div>

            <div className="flex items-center gap-2">
                <Select
                    className="w-[120px]"
                    leftSection={<LuLanguages />}
                    size="sm"
                    checkIconPosition="right"
                    value={i18n.language}
                    onChange={(lang) => {
                        i18n.changeLanguage(lang as any)
                    }}
                    data={[
                        { label: "简体中文", value: "zh-CN" },
                        { label: "English", value: "en" },
                    ]}
                />
                <ActiveBar activated={pathname === "/"}>
                    <UnstyledButton onClick={() => navigate("/")}>{t("navbar.home")}</UnstyledButton>
                </ActiveBar>
                <ActiveBar activated={pathname === "/create"}>
                    <UnstyledButton onClick={() => navigate("/create")}>{t("navbar.create")}</UnstyledButton>
                </ActiveBar>
                <ActiveBar activated={pathname === "/docs"}>
                    <UnstyledButton onClick={() => navigate("/docs")}>{t("navbar.docs")}</UnstyledButton>
                </ActiveBar>
            </div>
        </div>
    )
}

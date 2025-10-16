import { UnstyledButton } from "@mantine/core"
import type { ComponentProps, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import cs from "classnames"

export function ActiveBar(props: { children: ReactNode; activated: boolean }) {
    return (
        <div>
            {props.children}
            {props.activated && <div className="bg-primary w-full h-0.5"></div>}
        </div>
    )
}

export function AppNavbar(props: ComponentProps<"div">) {
    const [t] = useTranslation()
    const navigate = useNavigate()

    const pathname = useLocation().pathname

    return (
        <div {...props} className={cs("flex justify-between items-center py-3 px-5 w-full", props.className)}>
            <div>
                <h1 className="font-subtitle text-subtitle cursor-pointer" onClick={() => navigate("/")}>
                    Qi Design System
                </h1>
            </div>

            <div className="flex gap-2">
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

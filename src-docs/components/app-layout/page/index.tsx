import type { ReactNode } from "react"
import { AppNavbar } from "../navbar"
import cs from "classnames"

export function AppPage(props: { children: ReactNode; noBodyPadding?: boolean }) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center pt-2">
            <AppNavbar className="shrink-0" />
            <div
                className={cs("w-full max-w-[1580px] flex-1", {
                    "p-3 pt-1": !props.noBodyPadding,
                })}
            >
                {props.children}
            </div>
        </div>
    )
}

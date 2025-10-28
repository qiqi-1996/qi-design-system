import type { ReactNode } from "react"
import { AppNavbar } from "../navbar"
import cs from "classnames"

export function AppPage(props: { children: ReactNode; noBodyPadding?: boolean }) {
    return (
        <div className="flex h-full w-full flex-col items-center pt-2">
            <AppNavbar className="shrink-0" />
            <div
                className={cs("w-full max-w-[1580px] grow basis-0 overflow-hidden", {
                    "p-5 pt-2": !props.noBodyPadding,
                })}
            >
                {props.children}
            </div>
        </div>
    )
}

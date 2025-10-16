import type { ReactNode } from "react"
import { AppNavbar } from "../navbar"
import cs from "classnames"

export function AppPage(props: { children: ReactNode; noBodyPadding?: boolean }) {
    return (
        <div className="w-full h-full pt-2 flex flex-col">
            <AppNavbar className="shrink-0" />
            <div className={cs("basis-0 grow overflow-hidden", { "p-5 pt-2": !props.noBodyPadding })}>
                {props.children}
            </div>
        </div>
    )
}

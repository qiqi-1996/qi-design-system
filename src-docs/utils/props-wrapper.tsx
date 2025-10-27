import type { ComponentType } from "react"

/**
 * Wrap fixed props for a component
 * @param component - Origin component.
 * @param props - Fixed properties or a lazy evaluation function (re-called on each render).
 * @returns New component
 */
export function withProps<T, K extends keyof T>(
    component: ComponentType<T>,
    props: Pick<T, K> | (() => Pick<T, K>),
): ComponentType<Omit<T, K> & Partial<Pick<T, K>>> {
    return (resetProps) => {
        const C = component as any
        const p = typeof props === "function" ? props() : props
        return <C {...p} {...resetProps} />
    }
}

export function withoutUnit(value: string): number {
    return Number(value.match(/^[+-]?\d*(?:\.\d+)?/)?.[0])
}

export function unit(value: string): string {
    return value.match(/[a-zA-Z]*$/)?.[0] ?? ""
}

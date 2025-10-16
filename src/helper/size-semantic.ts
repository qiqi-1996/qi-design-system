export function sizeSemantic(index: number, offset: number = 0) {
    let pos = index + Math.max(offset, 0)
    if (pos < 5) {
        return ["xs", "sm", "md", "lg", "xl"][pos]
    } else {
        return pos - 5 + 2 + "xl"
    }
}

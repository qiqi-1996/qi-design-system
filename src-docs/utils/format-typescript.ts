import * as prettier from "prettier/standalone"
import * as estreeParser from "prettier/plugins/estree"
import * as typescriptParser from "prettier/plugins/typescript"

export function formatTypescript(code: string) {
    return prettier.format(code, {
        parser: "typescript",
        plugins: [typescriptParser, estreeParser as any],
        tabWidth: 4,
    })
}

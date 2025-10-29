import * as prettier from "prettier/standalone"
import * as babelParser from "prettier/plugins/babel"
import * as estreeParser from "prettier/plugins/estree"

export function formatJson(code: string) {
    return prettier.format(code, {
        parser: "json",
        plugins: [babelParser, estreeParser as any],
        tabWidth: 4,
    })
}

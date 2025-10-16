import * as prettier from "prettier/standalone"
import * as postcssParser from "prettier/plugins/postcss"

export function formatCode(code: string) {
    return prettier.format(code, {
        parser: "css",
        plugins: [postcssParser],

        tabWidth: 4,
    })
}

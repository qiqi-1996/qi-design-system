import { parseArgs } from "node:util"
import { packageDirectory } from "package-directory"
import path from "path"
import { generateContent } from "./generate"

async function bootstrap() {
    const { values } = parseArgs({
        args: process.argv,
        options: {
            help: {
                type: "boolean",
                short: "h",
            },
            config: {
                type: "string",
                default: path.resolve((await packageDirectory()) ?? process.cwd(), "design-system.json"),
            },
        },
        strict: true,
        allowPositionals: true,
    })

    if (values.help) {
        console.log(`Qi Design System

Options: 
        --help, -h      Show this message
        --config        Use specified config
`)
        process.exit()
    }

    generateContent(values.config)
}

bootstrap()

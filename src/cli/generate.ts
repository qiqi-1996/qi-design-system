import { formatCode } from "../helper/format"
import { genTailwindV4 } from "../generator/tailwind-v4"
import { designSystemCliSchema } from "../schema"
import fs from "node:fs/promises"
import { genMantine } from "@core/generator/mantine"

export async function emitFile(filePath: string, content: string) {
    await fs
        .writeFile(filePath, content)
        .then(() => {
            console.log(`✅ Generated at '${filePath}'`)
        })
        .catch((err) => {
            console.log(`❌ Generate failed at '${filePath}', caused by '${err}'`)
        })
}

export async function generateContent(configPath: string) {
    let file: fs.FileHandle | undefined
    try {
        file = await fs.open(configPath, "r")
    } catch (e) {
        console.error(`Design system config file is not exists, tried: ${configPath}`)
    }
    if (!file) return
    const system = designSystemCliSchema().parse(JSON.parse((await file.readFile()).toString()) ?? {})
    await file.close()
    for (let output of system.output ?? []) {
        if (output.type === "tailwind-v4") {
            const result = await formatCode(genTailwindV4(system))
            await emitFile(output.path, result)
        } else if (output.type === "mantine") {
            const result = genMantine(system)
            await emitFile(output.path, result)
        }
    }
}

import { formatCode } from "../helper/format"
import { genTailwindV4 } from "../generator/tailwind-v4"
import { designSystemCliSchema } from "../schema"
import fs from "node:fs/promises"

export async function emitFile(filePath: string, content: string) {
    await fs
        .writeFile(filePath, await formatCode(content))
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
    if (system.output?.["tailwind-v4"]) {
        const outputPath = system.output["tailwind-v4"]
        const result = genTailwindV4(system)
        await emitFile(outputPath, result)
    }
}

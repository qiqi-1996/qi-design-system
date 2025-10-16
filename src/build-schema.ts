import { coreI18nResource } from "./i18n/resources"
import i18next from "i18next"
import { keys } from "lodash"
import z from "zod"
import { designSystemCliSchema } from "."
import { initI18n } from "./i18n"

await initI18n()
const tasks = keys(coreI18nResource.resource).map((lng) => {
    const file = Bun.file(`dist/schema-${lng}.json`)
    i18next.changeLanguage(lng)
    return file.write(
        JSON.stringify(
            z.toJSONSchema(designSystemCliSchema(), {
                io: "input",
            }),
        ),
    )
})
await Promise.all(tasks)

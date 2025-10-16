import "i18next"
import type { docI18nResource } from "./i18n/resources"
import type { coreI18nResource } from "@core/i18n/resources"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation"
        resources: {
            [docI18nResource.namespace]: typeof docI18nResource.resource.zh
            core: typeof coreI18nResource.resource.zh
        }
    }
}

import "i18next"
import type { coreI18nResource } from "./i18n/resources"

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation"
        resources: {
            [coreI18nResource.namespace]: typeof coreI18nResource.resource.zh
        }
    }
}

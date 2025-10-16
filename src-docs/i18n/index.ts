import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { fromPairs, merge, toPairs } from "lodash"
import { initReactI18next } from "react-i18next"
import { docI18nResource } from "./resources"
import { coreI18nResource } from "@core/i18n/resources"

export function initI18n() {
    let result = i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: "en",
            resources: merge(
                {},
                fromPairs(toPairs(docI18nResource.resource).map(([lng, res]) => [lng, { translation: res }])),
                fromPairs(toPairs(coreI18nResource.resource).map(([lng, res]) => [lng, { core: res }])),
            ),
            interpolation: {
                escapeValue: false,
            },
            detection: {
                order: ["navigator"],
                caches: [],
                cookieMinutes: 0,
            },
        })
    return result
}

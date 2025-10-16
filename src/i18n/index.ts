import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { fromPairs, toPairs } from "lodash"
import { initReactI18next } from "react-i18next"
import { coreI18nResource } from "./resources"

export function initI18n() {
    let result = i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: "en",
            resources: fromPairs(
                toPairs(coreI18nResource.resource).map(([lng, res]) => [lng, { [coreI18nResource.namespace]: res }]),
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

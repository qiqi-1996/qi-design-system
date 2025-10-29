import { AppPage } from "@/components/app-layout/page"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ContentZh } from "./content"
import styles from "./styles.module.css"

export default function () {
    const [_, i18n] = useTranslation()
    const Page = useMemo(
        () =>
            ({
                zh: ContentZh,
            })[i18n.language] ?? ContentZh,
        [i18n.language],
    )

    return (
        <AppPage>
            <div className={styles["markdown-content"]}>
                <Page />
            </div>
        </AppPage>
    )
}

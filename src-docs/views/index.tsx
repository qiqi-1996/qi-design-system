import { AppPage } from "@/components/app-layout/page"
import { useTranslation } from "react-i18next"

import { Badge, Button, Divider } from "@mantine/core"
import { pkg } from "@/utils/resources"

export default function () {
    const [t] = useTranslation()

    return (
        <AppPage>
            <div className="relative flex h-[61.8%] w-full items-center justify-start gap-2">
                <div>
                    <h1 className="text-headline leading-[64px] font-headline">
                        {t("home.title-build-bridge")} <br />
                        <span className="text-[64px]">{t("home.title-designer-and-developer")}</span>
                    </h1>
                    <p className="mt-2 text-text leading-text-xs font-text text-color-footnote">
                        {t("common.description")}
                    </p>

                    <div className="mt-5 flex items-center gap-1">
                        <Button>{t("home.btn-create-design-system")}</Button>
                        <Button variant="default">{t("home.btn-documentation")}</Button>
                        <Divider className="mx-2" orientation="vertical" />
                        <Badge size="lg" variant="light">
                            Version {pkg.version}
                        </Badge>
                        <Badge size="lg" variant="dot">
                            Working In Progress
                        </Badge>
                    </div>

                    <div className="mt-2 flex items-center gap-1"></div>
                </div>

                {/* <div className="absolute top-1/2 right-0 inline-block -translate-y-1/2"></div> */}
            </div>

            <Divider />
        </AppPage>
    )
}

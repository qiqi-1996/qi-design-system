import { formatJson } from "@/utils/format-json"
import { designSystemConfig } from "@/utils/resources"
import { Badge, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export function ExampleDesignSystemConfig() {
    const [t] = useTranslation()
    const [configString, setConfigString] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        formatJson(JSON.stringify(designSystemConfig)).then(setConfigString)
    }, [])

    return (
        <div className="my-2">
            <div className="h-[200px] overflow-auto rounded-xl bg-black/5 p-2">
                <pre>
                    <code>{configString}</code>
                </pre>
            </div>
            <div className="mt-2 flex items-center gap-1">
                <Button
                    onClick={() => {
                        navigate("/create")
                    }}
                >
                    {t("home.btn-create-design-system")}
                </Button>
                <Badge size="lg" variant="dot">
                    {t("home.btn-create-design-system-desc")}
                </Badge>
            </div>
        </div>
    )
}

import { AppPage } from "@/components/app-layout/page"

export default function () {
    return (
        <AppPage>
            <div className="flex h-[61.8%] w-full items-center justify-start gap-2">
                <div>
                    <h1 className="text-headline leading-[64px] font-headline">
                        Build a bridge to connect <br />
                        <span className="text-[64px]">Designer & Developer</span>
                    </h1>
                    <h2 className="text-title leading-title-xs font-title text-primary mt-5">Working In Progress</h2>
                </div>
            </div>
        </AppPage>
    )
}

import { AppHeader } from "@/components/apps/app-header";
import { AppsNavigation } from "@/components/apps/app-navigation";
import { AppsContextProvider } from "@/context/apps-context";
import { FC, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {
    [x: string]: any;
}

const AppsLayout: FC<LayoutProps> = async ({ children, params }) => {
    const { slug } = await params;
    return (
        <AppsContextProvider slug={slug}>
            <AppHeader />
            <AppsNavigation slug={slug} />
            <div className="h-full">{children}</div>
        </AppsContextProvider>
    );
};
export default AppsLayout;

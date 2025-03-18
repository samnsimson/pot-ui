import { AppHeader } from "@/components/apps/app-header";
import { AppsNavigation } from "@/components/apps/app-navigation";
import { AppsContextProvider } from "@/context/apps-context";
import { FC, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {
    [x: string]: any;
}

const AppsLayout: FC<LayoutProps> = async ({ children }) => {
    return (
        <AppsContextProvider>
            <div id="header">
                <AppHeader />
                <AppsNavigation />
            </div>
            <div className="flex-1">{children}</div>
        </AppsContextProvider>
    );
};
export default AppsLayout;

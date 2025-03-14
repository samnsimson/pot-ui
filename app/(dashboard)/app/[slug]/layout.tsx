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
            <AppHeader />
            <AppsNavigation />
            <div className="h-full">{children}</div>
        </AppsContextProvider>
    );
};
export default AppsLayout;

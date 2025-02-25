import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="w-full h-screen flex flex-col">
                    <DashboardHeader />
                    <div className="p-6 flex-1">{children}</div>
                </div>
            </main>
        </SidebarProvider>
    );
};
export default DashboardLayout;

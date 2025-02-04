import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="w-full h-screen">
                    <DashboardHeader />
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
};
export default DashboardLayout;

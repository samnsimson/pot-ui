import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { FC, PropsWithChildren } from "react";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="w-full h-screen flex flex-col">
                    <DashboardHeader />
                    <div className="flex-1 flex flex-col">{children}</div>
                </div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
};
export default DashboardLayout;

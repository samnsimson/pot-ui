import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ModalProvider } from "@/context/modal-context";
import { headers } from "next/headers";
import { FC, PropsWithChildren } from "react";

export const metadata = {
    title: "Dashboard - POT CMS",
    description: "Manage your content and media",
};

const DashboardLayout: FC<PropsWithChildren> = async ({ children }) => {
    const heads = await headers();
    const pathname = heads.get("x-pathname");
    return (
        <div className="dashboard-theme">
            <ModalProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="w-full">
                        <div className="flex h-screen w-full flex-col">
                            <DashboardHeader pathname={pathname} />
                            <div className="flex flex-1 flex-col">{children}</div>
                        </div>
                    </main>
                    <Toaster />
                </SidebarProvider>
            </ModalProvider>
        </div>
    );
};
export default DashboardLayout;

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import Link from "next/link";

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="p-0">
                <div className="p-2 border-b border-border min-h-12 flex items-center">
                    <h1>Pot CMS</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <Link href="/">Home</Link>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

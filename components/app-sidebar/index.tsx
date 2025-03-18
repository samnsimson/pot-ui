import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Icon } from "@/lib/types";
import { BoxIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { LogoutButton } from "../logout-button";

type SidebarLinkProp = {
    text: string;
    link: string;
    icon?: Icon;
};

const SidebarLink: FC<SidebarLinkProp> = ({ text, link, icon: Icon }) => {
    return (
        <Link href={link} className="flex h-full min-h-12 w-full items-center gap-3 p-3 font-semibold transition-all duration-150 hover:bg-success">
            {Icon && <Icon size={18} />}
            <span>{text}</span>
        </Link>
    );
};

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="p-0">
                <div className="flex min-h-12 items-center border-b border-foreground p-2">
                    <h1>Pot CMS</h1>
                </div>
            </SidebarHeader>
            <SidebarContent className="gap-0">
                <SidebarGroup className="p-0">
                    <SidebarLink link="/dashboard" text="Home" icon={HomeIcon} />
                </SidebarGroup>
                <SidebarGroup className="p-0">
                    <SidebarLink link="/dashboard/apps" text="Apps" icon={BoxIcon} />
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-0">
                <LogoutButton className="h-12 w-full border-x border-destructive" />
            </SidebarFooter>
        </Sidebar>
    );
};

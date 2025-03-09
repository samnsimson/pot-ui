import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Icon } from "@/lib/types";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type SidebarLinkProp = {
    text: string;
    link: string;
    icon?: Icon;
};

const SidebarLink: FC<SidebarLinkProp> = ({ text, link, icon: Icon }) => {
    return (
        <Link href={link} className="w-full h-full min-h-12 p-3 transition-all duration-150 hover:bg-success font-semibold flex items-center gap-3">
            {Icon && <Icon size={18} />}
            <span>{text}</span>
        </Link>
    );
};

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="p-0">
                <div className="p-2 border-b border-foreground min-h-12 flex items-center">
                    <h1>Pot CMS</h1>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className="p-0">
                    <SidebarLink link="/" text="Home" icon={HomeIcon} />
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

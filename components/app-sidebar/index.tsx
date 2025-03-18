"use client";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Icon } from "@/lib/types";
import { BoxIcon, HomeIcon } from "lucide-react";
import { FC, useMemo } from "react";
import { LogoutButton } from "../logout-button";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";

type SidebarLinkProp = {
    text: string;
    link: string;
    icon?: Icon;
    segment: string | null;
};

const sidebarLinks: Array<SidebarLinkProp> = [
    {
        text: "Home",
        link: "/dashboard",
        icon: HomeIcon,
        segment: null,
    },
    {
        text: "Apps",
        link: "/dashboard/apps",
        icon: BoxIcon,
        segment: "apps",
    },
];

const SidebarLink: FC<SidebarLinkProp> = ({ text, link, icon: Icon, segment: linkSegment }) => {
    const pathname = usePathname();
    const segment = useSelectedLayoutSegment();
    const active = useMemo(() => (linkSegment === null ? pathname === "/dashboard" : segment === linkSegment), [pathname, segment, linkSegment]);
    return (
        <Button asChild variant={active ? "success" : "primary"} className="justify-start ring-0 hover:bg-success">
            <Link href={link} className="flex h-full min-h-12 w-full items-center gap-3 p-3 font-semibold">
                {Icon && <Icon size={18} />}
                <span>{text}</span>
            </Link>
        </Button>
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
                {sidebarLinks.map(({ link, text, icon, segment: linkSegment }, index) => (
                    <SidebarGroup key={index} className="p-0">
                        <SidebarLink link={link} text={text} icon={icon} segment={linkSegment} />
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-0">
                <LogoutButton className="h-12 w-full border-x border-destructive" />
            </SidebarFooter>
        </Sidebar>
    );
};

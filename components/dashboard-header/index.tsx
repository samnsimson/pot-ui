"use client";
import { FC, HTMLAttributes } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrentPath } from "@/lib/utils";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ ...props }) => {
    const pathname = usePathname();
    const myAccountLink = "/dashboard/my-account";
    const isMyAccountPage = isCurrentPath(pathname, myAccountLink);
    return (
        <div className="flex w-full items-center justify-between gap-6 border-b border-border" {...props}>
            <div className="flex items-center gap-6">
                <SidebarTrigger className="border-r border-border" />
                <p>Header</p>
            </div>
            <div className="flex items-center">
                <Button className="space-x-2" variant={isMyAccountPage ? "success" : "ghost"} asChild>
                    <Link href={myAccountLink}>
                        <UserCircleIcon /> <span>My Account</span>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

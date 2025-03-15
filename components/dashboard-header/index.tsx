import { FC, HTMLAttributes } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { UserCircleIcon } from "lucide-react";

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({ ...props }) => {
    return (
        <div className="w-full gap-6 flex items-center justify-between border-b border-border" {...props}>
            <div className="flex items-center gap-6">
                <SidebarTrigger className="border-r border-border" />
                <p>Header</p>
            </div>
            <div className="flex items-center">
                <Button className="space-x-2" variant="ghost">
                    <UserCircleIcon /> <span>My Account</span>
                </Button>
            </div>
        </div>
    );
};

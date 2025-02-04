import { FC, HTMLAttributes } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { LogoutButton } from "../logout-button";

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
				<LogoutButton className="border-x border-destructive h-12" />
			</div>
		</div>
	);
};

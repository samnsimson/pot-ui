import { ListApps } from "@/components/apps/list-apps";
import { FC, PropsWithChildren } from "react";

const DashboardPage: FC<PropsWithChildren> = async ({ children }) => {
    return <ListApps />;
};
export default DashboardPage;

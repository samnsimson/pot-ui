import { getApps } from "@/actions/apps-actions";
import { ListApps } from "@/components/apps/list-apps";
import { FC, PropsWithChildren } from "react";

const DashboardPage: FC<PropsWithChildren> = async ({}) => {
    const apps = await getApps();
    return <ListApps apps={apps} />;
};
export default DashboardPage;

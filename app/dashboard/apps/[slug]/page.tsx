import { env } from "@/env";
import { ServerApi } from "@/lib/api/server";
import { NextPage } from "next";

export async function generateStaticParams() {
    const api = new ServerApi();
    const { data } = await api.auth.login(env.USERNAME, env.PASSWORD);
    const { data: apps } = await api.apps.listApps({ headers: { Authorization: `Bearer ${data.access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const AppsSinglePage: NextPage = ({ children }: any) => {
    return <div>{children}</div>;
};
export default AppsSinglePage;

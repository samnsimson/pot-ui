import { AppsApi, AuthApi, Configuration } from "@/api/client";
import { SettingsList } from "@/components/settings/settings-list";
import { env } from "@/env";
import { NextPage } from "next";

export async function generateStaticParams() {
    const config = new Configuration({ basePath: env.SERVER_BASE_PATH });
    const authApi = new AuthApi(config);
    const appsApi = new AppsApi(config);
    const { data } = await authApi.login(env.USERNAME, env.PASSWORD);
    const { data: apps } = await appsApi.listApps({ headers: { Authorization: `Bearer ${data.access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const SettingsPage: NextPage = async ({ params }: any) => {
    const { slug } = await params;
    return <SettingsList slug={slug} />;
};
export default SettingsPage;

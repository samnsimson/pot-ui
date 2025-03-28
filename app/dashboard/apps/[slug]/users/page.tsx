import { AppsApi, AuthApi, Configuration } from "@/api/client";
import { AppUsersList } from "@/components/apps/app-users";
import { env } from "@/env";
import { NextPage } from "next";

interface PageProps {
    params: Promise<Record<string, any>>;
}

export async function generateStaticParams() {
    const config = new Configuration({ basePath: env.SERVER_BASE_PATH });
    const authApi = new AuthApi(config);
    const appsApi = new AppsApi(config);
    const { data } = await authApi.login(env.USERNAME, env.PASSWORD);
    const { data: apps } = await appsApi.listApps({ headers: { Authorization: `Bearer ${data.access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const UsersPage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;
    return <AppUsersList slug={slug} />;
};
export default UsersPage;

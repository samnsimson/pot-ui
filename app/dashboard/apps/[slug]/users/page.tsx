import { AppUsersList } from "@/components/apps/app-users";
import { env } from "@/env";
import { Api } from "@/lib/api/client";
import { NextPage } from "next";

interface PageProps {
    params: Promise<Record<string, any>>;
}

export async function generateStaticParams() {
    const api = new Api({ basePath: env.BASE_PATH });
    const { access_token } = await api.login({ username: env.USERNAME, password: env.PASSWORD });
    const { data: apps } = await api.apps.listApps({ headers: { Authorization: `Bearer ${access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const UsersPage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;
    return <AppUsersList slug={slug} />;
};
export default UsersPage;

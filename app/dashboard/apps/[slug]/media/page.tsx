import { AppMediaList } from "@/components/apps/app-media";
import { env } from "@/env";
import { Api } from "@/lib/api/client";
import { NextPage } from "next";

export async function generateStaticParams() {
    const api = new Api({ basePath: env.BASE_PATH });
    const { access_token } = await api.login({ username: env.USERNAME, password: env.PASSWORD });
    const { data: apps } = await api.apps.listApps({ headers: { Authorization: `Bearer ${access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const MediaPage: NextPage = async ({ params }: any) => {
    const { slug } = await params;
    return (
        <div className="h-full p-3">
            <AppMediaList />
        </div>
    );
};
export default MediaPage;

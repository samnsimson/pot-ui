import { AppsApi, AuthApi, Configuration } from "@/api/client";
import { ContentData } from "@/components/content/content-data";
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

const ContentPage: NextPage = async ({ params }: any) => {
    const { slug } = await params;
    return (
        <div className="h-full flex-1">
            <ContentData slug={slug} />
        </div>
    );
};
export default ContentPage;

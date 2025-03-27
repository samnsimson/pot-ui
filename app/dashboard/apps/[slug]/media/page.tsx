import { AppMediaList } from "@/components/apps/app-media";
import { env } from "@/env";
import { api } from "@/lib/api";
import { NextPage } from "next";

export async function generateStaticParams() {
    const { access_token } = await api.login({ username: env.USERNAME, password: env.PASSWORD });
    const apps = await api.list_apps({ headers: { Authorization: `Bearer ${access_token}` } });
    return apps.map((app) => ({ slug: app.slug }));
}

const MediaPage: NextPage = async ({ params }: any) => {
    const { slug } = await params;
    return (
        <div className="p-3">
            <AppMediaList />
        </div>
    );
};
export default MediaPage;

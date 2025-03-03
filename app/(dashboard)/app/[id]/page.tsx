import { AppDetail } from "@/components/apps/app-detail";
import { AppsViewContextProvider } from "@/context/apps-view-context";
import { api } from "@/lib/api";

const AppPage = async ({ params }: any) => {
    const { id } = await params;
    return (
        <AppsViewContextProvider appId={id}>
            <AppDetail />
        </AppsViewContextProvider>
    );
};
export default AppPage;
export const revalidate = 60;
export const dynamicParams = true;
export const generateStaticParams = async () => {
    const { access_token } = await api.login({ username: "samnsimson@gmail.com", password: "W3lcome!" });
    const apps = await api.list_apps({ headers: { Authorization: `Bearer ${access_token}` } });
    return apps.map((app) => ({ id: app.id }));
};

import { getApp } from "@/actions/apps-actions";
import { PageLoader } from "@/components/loader/page-loader";

const AppPage = async ({ params }: any) => {
    const { id } = await params;
    const app = await getApp(id);
    return <PageLoader />;
};
export default AppPage;

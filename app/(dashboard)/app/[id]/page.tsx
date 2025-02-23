import { getApp } from "@/actions/apps-actions";

const AppPage = async ({ params }: any) => {
    const { id } = await params;
    const app = await getApp(id);
    return <div>AppPage</div>;
};
export default AppPage;

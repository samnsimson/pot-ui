import { AppDetail } from "@/components/apps/app-detail";
import { AppsViewContextProvider } from "@/context/apps-view-context";

const AppPage = async ({ params }: any) => {
    const { id } = await params;
    return (
        <AppsViewContextProvider appId={id}>
            <AppDetail />
        </AppsViewContextProvider>
    );
};
export default AppPage;

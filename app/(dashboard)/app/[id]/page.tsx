import { PageLoader } from "@/components/loader/page-loader";
import { AppsViewContextProvider } from "@/context/apps-view-context";

const AppPage = async ({ params }: any) => {
    const { id } = await params;
    return (
        <AppsViewContextProvider appId={id}>
            <PageLoader />
        </AppsViewContextProvider>
    );
};
export default AppPage;

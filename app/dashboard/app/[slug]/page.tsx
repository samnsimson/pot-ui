import { redirect, RedirectType } from "next/navigation";

const AppsPage = async ({ params }: any) => {
    const { slug } = await params;
    return redirect(`/dashboard/app/${slug}/content`, RedirectType.replace);
};
export default AppsPage;

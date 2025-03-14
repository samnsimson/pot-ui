import { AppUsersList } from "@/components/apps/app-users";
import { NextPage } from "next";

interface PageProps {
    slug: string;
    params: Promise<Record<string, any>>;
}

const UsersPage: NextPage<PageProps> = async ({ params }) => {
    const { slug } = await params;
    return <AppUsersList slug={slug} />;
};
export default UsersPage;

import { ListApps } from "@/components/apps/list-apps";
import { SectionTitle } from "@/components/section-title";
import { BoxIcon } from "lucide-react";

const AppsPage = () => {
    return (
        <div className="space-y-6">
            <SectionTitle icon={BoxIcon} sectionTitle="Apps" description="Manage your content apps" />
            <ListApps />;
        </div>
    );
};
export default AppsPage;

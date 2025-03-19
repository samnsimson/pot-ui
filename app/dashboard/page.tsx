import { SectionTitle } from "@/components/section-title";
import { LayoutGridIcon } from "lucide-react";
import { NextPage } from "next";

const DashboardPage: NextPage = async ({}) => {
    return (
        <div>
            <SectionTitle sectionTitle="Dashboard" description="POT CMS Dashboard" icon={LayoutGridIcon} />
        </div>
    );
};
export default DashboardPage;

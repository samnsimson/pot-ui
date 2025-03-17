import { SectionTitle } from "@/components/section-title";
import { UserIcon } from "lucide-react";
import { FC, PropsWithChildren } from "react";

const MyAccountLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <SectionTitle icon={UserIcon} sectionTitle="My Account" description="Manage your account settings" />
            {children}
        </div>
    );
};
export default MyAccountLayout;

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { dashboardLinks } from "@/constants/dashboard-links";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const DashboardPage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="grid grid-cols-12 gap-6 p-6">
            {dashboardLinks.map((item) => (
                <div key={item.key} className="col-span-2 border border-border p-6 group">
                    <AspectRatio ratio={1 / 1}>
                        <Link href={item.link} className="flex flex-col items-center justify-center h-full w-full gap-3">
                            <item.icon size={48} className="text-border group-hover:text-sky-300" />
                            <p className="group-hover:font-semibold">{item.name}</p>
                        </Link>
                    </AspectRatio>
                </div>
            ))}
        </div>
    );
};
export default DashboardPage;

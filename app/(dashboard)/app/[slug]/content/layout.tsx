import { FolderTree } from "@/components/apps/folder-tree";
import { FC, PropsWithChildren } from "react";

const ContentLayout: FC<PropsWithChildren & any> = async ({ children, params }) => {
    const { slug } = await params;
    return (
        <div className="grid h-full grid-cols-12 divide-x">
            <div className="col-span-3">
                <FolderTree slug={slug} />
            </div>
            <div className="col-span-9">{children}</div>
        </div>
    );
};
export default ContentLayout;

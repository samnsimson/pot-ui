import { FolderTree } from "@/components/apps/folder-tree";
import { FC, PropsWithChildren } from "react";

const ContentLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-full grid grid-cols-12 divide-x">
            <div className="col-span-3">
                <FolderTree />
            </div>
            <div className="col-span-9">{children}</div>
        </div>
    );
};
export default ContentLayout;

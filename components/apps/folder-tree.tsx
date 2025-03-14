"use client";
import { FileIcon, FolderIcon, FolderOpenIcon, PencilIcon, PlusIcon, XIcon } from "lucide-react";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ClickBoundry } from "../click-boundry";
import { Content } from "@/lib/types";
import { useAppContext } from "@/context/apps-context";
import { Button } from "../ui/button";
import { useModal } from "@/context/modal-context";
import { ContentCreateForm } from "../form/content-create-form";
import { useParams } from "next/navigation";

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    onActiveStateChange?: (prop: { id: string; name: string; active: boolean }) => void;
}

interface TreeNodeProps {
    node: Content;
    onActiveStateChange?: (prop: { id: string; name: string; active: boolean }) => void;
}

const NoContentAction: FC<{ appId: string }> = ({ appId }) => {
    const { slug } = useParams();
    const { openModal } = useModal({ title: "Create Content", render: () => <ContentCreateForm appId={appId} slug={slug as string} /> });
    return (
        <div className="flex items-center justify-center h-full">
            <div className="items-center flex flex-col gap-3">
                <FolderOpenIcon size={42} className="text-input" />
                <p className="font-semibold">Create new content</p>
                <Button className="gap-3" variant="ghost" onClick={openModal}>
                    <PlusIcon size={16} />
                    <span>Create</span>
                </Button>
            </div>
        </div>
    );
};

const FolderTree: FC<FolderTreeProps> = ({ onActiveStateChange, className }) => {
    const { appData, appContent } = useAppContext();
    const isEmpty = appContent.length === 0;
    if (!appData) return null;
    return (
        <div className={cn("p-2 h-full", className)}>
            {isEmpty ? (
                <NoContentAction appId={appData.id} />
            ) : (
                appContent.map((node, index) => <TreeNodeComponent key={index} node={node} onActiveStateChange={onActiveStateChange} />)
            )}
        </div>
    );
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, onActiveStateChange: cb }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = useMemo(() => !!node.children?.length, [node]);
    return (
        <div className="">
            <div className="flex items-center gap-3">
                <div className={`flex items-center cursor-pointer h-8 ${isFolder ? "font-bold" : ""}`}>
                    {isFolder ? (
                        <span className="mr-2" onClick={() => isFolder && setIsOpen(!isOpen)}>
                            {isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}
                        </span>
                    ) : (
                        <span className="mr-2">
                            <FileIcon size={16} />
                        </span>
                    )}
                    <ClickBoundry onStateChange={(active) => cb && cb({ id: node.id, name: node.name, active })}>
                        <span className="truncate line-clamp-1">{node.name}</span>
                    </ClickBoundry>
                </div>
            </div>

            {isOpen && node.children && (
                <div className="ml-4 border-l-2 border-border border-dashed pl-2">
                    {node.children.map((child, index) => child && <TreeNodeComponent key={index} node={child} onActiveStateChange={cb} />)}
                </div>
            )}
        </div>
    );
};

export { FolderTree };

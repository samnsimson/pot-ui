"use client";
import { ChevronRightIcon, FileTextIcon, FilePlusIcon, FolderIcon, FolderOpenIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Content } from "@/lib/types";
import { useAppContext } from "@/context/apps-context";
import { Button } from "../ui/button";
import { useModal } from "@/context/modal-context";
import { ContentCreateForm } from "../form/content-create-form";
import { useParams } from "next/navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

interface ClickBoundryCallbackProps {
    id: string;
    name: string;
    active: boolean;
}

interface TreeNodeProps {
    content: Content;
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

const FolderTree: FC<FolderTreeProps> = ({ className }) => {
    const { appData, appContent } = useAppContext();
    const { slug } = useParams();
    const { openModal } = useModal({ title: "Create Content", render: () => <ContentCreateForm appId={appData?.id} slug={slug as string} /> });

    if (!appData) return null;

    return (
        <div className="pt-4 pl-1 flex flex-col h-full">
            <div className="flex-1 space-y-2 overflow-y-scroll">
                {appContent.map((content) => {
                    return <TreeNode key={content.id} content={content} />;
                })}
            </div>
            <div className="flex divide-x border-t border-border">
                <Button className="w-full space-x-2" variant="ghost" onClick={() => openModal()}>
                    <FilePlusIcon size={16} />
                    <span>New</span>
                </Button>
                <Button className="w-full space-x-2 disabled:cursor-not-allowed" variant="ghost" disabled>
                    <PencilIcon size={16} />
                    <span>Edit</span>
                </Button>
                <Button className="w-full space-x-2 disabled:cursor-not-allowed" variant="ghost" disabled>
                    <TrashIcon size={16} />
                    <span>Delete</span>
                </Button>
            </div>
        </div>
    );
};

const TreeNode: FC<TreeNodeProps> = ({ content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isFolder = !!(content.children && content.children.length);
    return (
        <Collapsible onOpenChange={setIsOpen} className={cn("w-full space-y-2")}>
            <div className={cn("flex items-center cursor-pointer space-x-2")}>
                {isFolder && (
                    <CollapsibleTrigger asChild>
                        <ChevronRightIcon className={cn("transition-all duration-100", isOpen ? "rotate-90" : "rotate-0")} />
                    </CollapsibleTrigger>
                )}
                <div className={cn("flex items-center cursor-pointer", { "ml-8": !isFolder })}>
                    <div className="flex items-center space-x-2 transition-all hover:pl-2">
                        {isFolder ? isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} /> : <FileTextIcon size={16} />}
                        <span className={cn("")}>{content.name}</span>
                    </div>
                </div>
            </div>
            {isFolder && (
                <CollapsibleContent className="ml-3 pl-2 border-l border-border space-y-2">
                    {content.children?.map((child) => <TreeNode key={child.id} content={child} />)}
                </CollapsibleContent>
            )}
        </Collapsible>
    );
};

export { FolderTree };

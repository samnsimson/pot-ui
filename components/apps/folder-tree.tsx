"use client";
import { ChevronRightIcon, FileTextIcon, FilePlusIcon, FolderIcon, FolderOpenIcon, PencilIcon, TrashIcon } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { Content } from "@/lib/types";
import { useAppContext } from "@/context/apps-context";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal-context";
import { ContentCreateForm } from "../form/content-create-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useConfirmation } from "@/hooks/use-confirmation";
import Link from "next/link";
import { useQueryState } from "nuqs";

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    slug: string;
}

interface TreeNodeProps {
    slug: string;
    content: Content;
    activeId: string | undefined;
}

type ContentIdType = string | undefined;

const renderForm = ({ appId, slug, parentId = undefined }: { appId: string; slug: string; parentId?: string }) => {
    return <ContentCreateForm appId={appId} slug={slug} parentId={parentId} />;
};

const FolderTree: FC<FolderTreeProps> = ({ slug, className }) => {
    const [contentId] = useQueryState("id");
    const { openModal } = useModal();
    const { appData, appContent } = useAppContext();
    const { confirm } = useConfirmation({ confirmText: "Confirm", cancelText: "Ignore", onConfirm: () => alert("deleted") });

    const openContentCreateModal = (appId: string, contentId: ContentIdType) => {
        openModal({ title: "Create Content", render: () => renderForm({ appId, slug: String(slug), parentId: contentId }) });
    };

    if (!appData) return null;

    return (
        <div className={cn("flex h-full flex-col pl-1 pt-4", className)}>
            <div className="flex-1 space-y-2 overflow-y-scroll">
                {appContent.map((content) => {
                    return <TreeNode key={content.id} slug={slug as string} content={content} activeId={contentId as ContentIdType} />;
                })}
            </div>
            <div className="flex divide-x border-t border-border">
                <Button className="w-full space-x-2" variant="ghost" onClick={() => openContentCreateModal(appData.id, contentId as ContentIdType)}>
                    <FilePlusIcon size={16} />
                    <span>New</span>
                </Button>
                <Button className="w-full space-x-2 disabled:cursor-not-allowed" variant="ghost" disabled={!contentId}>
                    <PencilIcon size={16} />
                    <span>Edit</span>
                </Button>
                <Button className="w-full space-x-2 disabled:cursor-not-allowed" variant="ghost" disabled={!contentId} onClick={confirm}>
                    <TrashIcon size={16} />
                    <span>Delete</span>
                </Button>
            </div>
        </div>
    );
};

const TreeNode: FC<TreeNodeProps> = ({ slug, content, activeId }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isFolder = !!(content.children && content.children.length);
    const marginClass = !isFolder && content.parent_id ? "ml-8" : "ml-1";
    const activeClass = { "text-info font-semibold": activeId === content.id };

    return (
        <Collapsible onOpenChange={setIsOpen} className={cn("w-full space-y-2")}>
            <div className={cn("flex cursor-pointer items-center space-x-2")}>
                {isFolder && (
                    <CollapsibleTrigger asChild>
                        <ChevronRightIcon className={cn("transition-all duration-100", isOpen ? "rotate-90" : "rotate-0")} />
                    </CollapsibleTrigger>
                )}
                <Link href={`/dashboard/apps/${slug}/content?id=${content.id}`} className={cn("flex cursor-pointer items-center", marginClass, activeClass)}>
                    <div className="flex items-center space-x-2 transition-all hover:pl-2">
                        {isFolder ? isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} /> : <FileTextIcon size={16} />}
                        <span className={cn("")}>{content.name}</span>
                    </div>
                </Link>
            </div>
            {isFolder && (
                <CollapsibleContent className="ml-3 space-y-2 border-l border-border pl-2">
                    {content.children?.map((child) => <TreeNode key={child.id} slug={slug} content={child} activeId={activeId} />)}
                </CollapsibleContent>
            )}
        </Collapsible>
    );
};

export { FolderTree };

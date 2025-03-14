"use client";
import { FileIcon, FolderIcon, FolderOpenIcon, PencilIcon, XIcon } from "lucide-react";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ClickBoundry } from "../click-boundry";
import { Content } from "@/lib/types";
import { useAppContext } from "@/context/apps-context";

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    onActiveStateChange?: (prop: { id: string; name: string; active: boolean }) => void;
}

interface TreeNodeProps {
    node: Content;
    onActiveStateChange?: (prop: { id: string; name: string; active: boolean }) => void;
}

const FolderTree: FC<FolderTreeProps> = ({ onActiveStateChange, className }) => {
    const { appContent } = useAppContext();
    return (
        <div className={cn("p-2", className)}>
            {appContent.map((node, index) => (
                <TreeNodeComponent key={index} node={node} onActiveStateChange={onActiveStateChange} />
            ))}
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

"use client";
import { FileIcon, FolderIcon, FolderOpenIcon, PencilIcon, XIcon } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { ClickBoundry } from "../click-boundry";

interface TreeNode {
    name: string;
    isFolder: boolean;
    children?: TreeNode[];
}

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    data: TreeNode[];
}

const NodeName: FC<{ name: string }> = ({ name }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const Icon = isEditing ? XIcon : PencilIcon;
    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form className="inline">
                    <input type="text" name="name" defaultValue={name} className="border border-border px-2" />
                </form>
            ) : (
                <div>{name}</div>
            )}
            <Icon size={13} onClick={() => setIsEditing(!isEditing)} />
        </div>
    );
};

const FolderTree: FC<FolderTreeProps> = ({ data, className }) => {
    return (
        <div className={cn("p-2", className)}>
            {data.map((node, index) => (
                <TreeNodeComponent key={index} node={node} />
            ))}
        </div>
    );
};

const TreeNodeComponent: React.FC<{ node: TreeNode }> = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeNode, setActiveNode] = useState<string | null>(null);

    return (
        <div className="">
            <div className="flex items-center gap-3">
                <div className={`flex items-center cursor-pointer h-8 ${node.isFolder ? "font-bold" : ""}`}>
                    {node.isFolder ? (
                        <span className="mr-2" onClick={() => node.isFolder && setIsOpen(!isOpen)}>
                            {isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}
                        </span>
                    ) : (
                        <span className="mr-2">
                            <FileIcon size={16} />
                        </span>
                    )}
                    <ClickBoundry onStateChange={(active) => setActiveNode(active ? node.name : null)}>{node.name}</ClickBoundry>
                </div>
            </div>

            {isOpen && node.children && (
                <div className="ml-4 border-l-2 border-border border-dashed pl-2">
                    {node.children.map((child, index) => (
                        <TreeNodeComponent key={index} node={child} />
                    ))}
                </div>
            )}
        </div>
    );
};

export { FolderTree };

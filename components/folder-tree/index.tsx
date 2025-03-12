"use client";
import { FileIcon, FolderIcon, FolderOpenIcon, PencilIcon, XIcon } from "lucide-react";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ClickBoundry } from "../click-boundry";
import { Content } from "@/lib/types";

interface FolderTreeProps extends HTMLAttributes<HTMLDivElement> {
    data: Content[];
    onActiveStateChange: (prop: { id: string; name: string; active: boolean }) => void;
}

interface TreeNodeProps {
    node: Content;
    onActiveStateChange: (prop: { id: string; name: string; active: boolean }) => void;
}

const FolderTree: FC<FolderTreeProps> = ({ data, onActiveStateChange, className }) => {
    return (
        <div className={cn("p-2", className)}>
            {data.map((node, index) => (
                <TreeNodeComponent key={index} node={node} onActiveStateChange={onActiveStateChange} />
            ))}
        </div>
    );
};

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, onActiveStateChange }) => {
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
                    <ClickBoundry onStateChange={(active) => onActiveStateChange({ id: node.id, name: node.name, active })}>{node.name}</ClickBoundry>
                </div>
            </div>

            {isOpen && node.children && (
                <div className="ml-4 border-l-2 border-border border-dashed pl-2">
                    {node.children.map((child, index) => child && <TreeNodeComponent key={index} node={child} onActiveStateChange={onActiveStateChange} />)}
                </div>
            )}
        </div>
    );
};

export { FolderTree };

import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { useState } from "react";

interface TreeNode {
    name: string;
    isFolder: boolean;
    children?: TreeNode[];
}

interface FolderTreeProps {
    data: TreeNode[];
}

const FolderTree: React.FC<FolderTreeProps> = ({ data }) => {
    return (
        <div className="p-2">
            {data.map((node, index) => (
                <TreeNodeComponent key={index} node={node} />
            ))}
        </div>
    );
};

const TreeNodeComponent: React.FC<{ node: TreeNode }> = ({ node }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            <div className={`flex items-center cursor-pointer h-8 ${node.isFolder ? "font-bold" : ""}`} onClick={() => node.isFolder && setIsOpen(!isOpen)}>
                {/* {node.isFolder && <span className="mr-1">{isOpen ? "📂" : "📁"}</span>} */}
                {node.isFolder && <span className="mr-2">{isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}</span>}
                <span>{node.name}</span>
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

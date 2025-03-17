"use client";
import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { ContentActionButtons } from "@/components/content/action-buttons";
import { useQueryState } from "nuqs";
import { useAppContext } from "@/context/apps-context";
import { Content } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyButton } from "@/components/copy-button";
import { PageLoader } from "@/components/loader/page-loader";
import { NoContentData } from "./no-content-data";

interface ContentDataProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type ContentData = Record<string, any> | null;

const contentCache = new Map<string, ContentData>();

const getContentData = (content: Array<Content> | undefined, id: string): ContentData => {
    if (contentCache.has(id)) return contentCache.get(id)!;
    if (!content || content.length === 0) return null;
    const queue: Content[] = [...content];
    while (queue.length) {
        const current = queue.shift()!;
        if (current.children) queue.push(...current.children);
        if (current.id === id) {
            const data = current.data as ContentData;
            contentCache.set(id, data);
            return data;
        }
    }
    return null;
};

export const ContentData: FC<ContentDataProps> = ({ ...props }) => {
    const [contentId] = useQueryState("content-id");
    const [action] = useQueryState("action");
    const { appData, appContent } = useAppContext();
    const [contentData, setContentData] = useState<ContentData | undefined>(undefined);
    const [expandedCell, setExpandedCell] = useState<string | null>(null);
    const isEditing = useMemo(() => action === "edit", [action]);

    useEffect(() => setContentData(contentId ? getContentData(appContent, contentId) : undefined), [contentId, appContent]);

    const truncatedValue = (key: string, text: string) => {
        const isExpanded = expandedCell === key;
        return (
            <div
                className={`${isExpanded ? "" : "truncate"} cursor-pointer`}
                title={isExpanded ? "" : text}
                onClick={() => setExpandedCell(isExpanded ? null : key)}
            >
                {text}
            </div>
        );
    };

    if (!appData) return <PageLoader />;
    if (contentData === undefined) return <p>Select a content</p>;
    if (contentData === null) return <NoContentData />;

    return (
        <div {...props}>
            <ContentActionButtons appId={appData.id} contentId={contentId} />
            <div className="divide-y border-b border-border">
                <Table className="w-full table-fixed">
                    <TableCaption className="m-0 border-t border-border bg-accent p-3">Your content</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Key</TableHead>
                            <TableHead className="w-[60%]">Value</TableHead>
                            <TableHead className="w-[10%] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(contentData).map(([key, value], index) => (
                            <TableRow key={index}>
                                <TableCell className="w-[30%]">
                                    {isEditing ? <Input type="text" defaultValue={key} /> : truncatedValue(`key-${index}`, key)}
                                </TableCell>
                                <TableCell className="w-[60%]">
                                    {isEditing ? <Input type="text" defaultValue={value} /> : truncatedValue(`value-${index}`, value)}
                                </TableCell>
                                <TableCell className="w-[10%] text-right">
                                    <CopyButton value={JSON.stringify({ [key]: value })} />
                                    <Button variant="ghost" className="h-8 w-8 rounded-md p-0">
                                        <TrashIcon width={16} height={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

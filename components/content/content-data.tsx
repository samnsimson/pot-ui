"use client";
import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { ContentActionButtons } from "@/components/content/action-buttons";
import { useQueryState } from "nuqs";
import { useAppContext } from "@/context/apps-context";
import { Content } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

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
    const { appContent } = useAppContext();
    const [contentData, setContentData] = useState<ContentData | undefined>(undefined);
    const isEditing = useMemo(() => action === "edit", [action]);

    useEffect(() => {
        setContentData(contentId ? getContentData(appContent, contentId) : undefined);
    }, [contentId, appContent]);

    if (contentData === undefined) return <p>Select a content</p>;
    if (contentData === null) return <p>No Data</p>;

    return (
        <div {...props}>
            <ContentActionButtons />
            <div className="divide-y border-b border-border">
                <Table>
                    <TableCaption className="m-0 border-t border-border bg-accent p-3">Your content</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Object.entries(contentData).map(([key, value], index) => (
                            <TableRow key={index}>
                                <TableCell width={360}>{isEditing ? <Input type="text" defaultValue={key} /> : key}</TableCell>
                                <TableCell>{isEditing ? <Input type="text" defaultValue={value} /> : value}</TableCell>
                                <TableCell width={120} align="right">
                                    <Button variant="outline" className="h-8 w-8 rounded-md p-0">
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

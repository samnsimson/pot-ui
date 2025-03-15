"use client";
import { FC, HTMLAttributes } from "react";
import { ContentActionButtons } from "@/components/content/action-buttons";
import { useQueryState } from "nuqs";

interface ContentDataProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ContentData: FC<ContentDataProps> = ({ ...props }) => {
    const [contentId] = useQueryState("content-id");
    if (!contentId) return null;
    return (
        <div {...props}>
            <ContentActionButtons />
        </div>
    );
};

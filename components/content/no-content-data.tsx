"use client";
import { FileWarningIcon, PlusIcon } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";

interface NoContentDataProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const NoContentData: FC<NoContentDataProps> = ({ action, ...props }) => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-6" {...props}>
            <FileWarningIcon size={42} className="text-gray-300" />
            <h2 className="font-bold">Nothing to view here!</h2>
            <Button variant="primary" onClick={() => action("create")}>
                <PlusIcon size={16} /> <span>Add data</span>
            </Button>
        </div>
    );
};

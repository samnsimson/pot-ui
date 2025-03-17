"use client";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { FC, HTMLAttributes, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
}

export const CopyButton: FC<CopyButtonProps> = ({ className, value, ...props }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(async (value: string) => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }, []);

    return (
        <Button variant="ghost" className={cn("h-8 w-8 rounded-md p-0", className)} onClick={() => copyToClipboard(value)}>
            {copied ? <CheckCheckIcon size={16} /> : <CopyIcon size={16} />}
        </Button>
    );
};

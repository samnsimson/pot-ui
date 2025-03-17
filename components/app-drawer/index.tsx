"use client";
import { FC, HTMLAttributes, ReactElement } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface AppDrawerProps extends HTMLAttributes<HTMLDivElement> {
    size?: "small" | "medium" | "large";
    side?: "top" | "right" | "bottom" | "left";
    open: boolean;
    title: string;
    description?: string;
    component: ReactElement;
    onClose: () => void;
}

const SIZE = {
    small: "w-full max-w-sm sm:max-w-sm",
    medium: "w-full max-w-xl sm:max-w-xl",
    large: "w-full max-w-2xl sm:max-w-2xl",
};

export const AppDrawer: FC<AppDrawerProps> = ({ open, title, description = "", component, onClose, size = "medium", side = "right", ...props }) => {
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className={`${SIZE[size]} p-0`} side={side} {...props}>
                <SheetHeader className="border-b border-border p-6">
                    <SheetTitle>{title}</SheetTitle>
                    {description && <SheetDescription>{description}</SheetDescription>}
                </SheetHeader>
                <div className="p-6">{component}</div>
            </SheetContent>
        </Sheet>
    );
};

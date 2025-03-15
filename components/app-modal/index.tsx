"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Dispatch, FC, ReactElement, SetStateAction } from "react";

export type AppModalProps = {
    isOpen: boolean;
    title: string;
    description?: string;
    component: ReactElement;
    footer?: ReactElement;
    size: "sm" | "md" | "lg" | "xl";
    trigger: Dispatch<SetStateAction<boolean>>;
};

export const AppModal: FC<AppModalProps> = ({ size = "md", isOpen = false, title, description = null, component, footer = null, trigger }) => {
    const sizeClass = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl" };
    return (
        <Dialog open={isOpen} onOpenChange={trigger}>
            <DialogContent className={cn("w-full p-0 gap-0 overflow-hidden", sizeClass[size])}>
                <DialogHeader className="p-3 border-b border-border bg-accent">
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="p-3">{component}</div>
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
};

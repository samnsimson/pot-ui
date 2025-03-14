"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, FC, ReactElement, SetStateAction } from "react";

export type AppModalProps = {
    isOpen: boolean;
    title: string;
    description?: string;
    component: ReactElement;
    footer?: ReactElement;
    trigger: Dispatch<SetStateAction<boolean>>;
};

export const AppModal: FC<AppModalProps> = ({ isOpen = false, title, description = null, component, footer = null, trigger }) => {
    return (
        <Dialog open={isOpen} onOpenChange={trigger}>
            <DialogContent className="w-full max-w-2xl p-0 gap-0 overflow-hidden">
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

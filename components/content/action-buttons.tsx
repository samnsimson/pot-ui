"use client";
import { FC, HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { NewspaperIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";

interface ContentActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ContentActionButtons: FC<ContentActionButtonsProps> = ({ ...props }) => {
    const [action, setAction] = useQueryState("action");
    return (
        <div className="w-full divide-x border-b border-border" {...props}>
            {action === "edit" ? (
                <Button variant="secondary" className="gap-2" onClick={() => setAction(null)}>
                    <XIcon size={16} />
                    <span>Cancel</span>
                </Button>
            ) : (
                <Button variant={action === "edit" ? "secondary" : "muted"} className="gap-2" onClick={() => setAction("edit")}>
                    <PencilIcon size={16} />
                    <span>Edit</span>
                </Button>
            )}
            <Button variant={action === "save" ? "secondary" : "muted"} className="gap-2" onClick={() => setAction("save")}>
                <SaveIcon size={16} />
                <span>Save</span>
            </Button>
            <Button variant={action === "publish" ? "secondary" : "muted"} className="gap-2" onClick={() => setAction("publish")}>
                <NewspaperIcon size={16} />
                <span>Publish</span>
            </Button>
        </div>
    );
};

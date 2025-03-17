"use client";
import { FC, Fragment, HTMLAttributes, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { NewspaperIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";

interface ContentActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ContentActionButtons: FC<ContentActionButtonsProps> = ({ ...props }) => {
    const [action, setAction] = useQueryState("action");
    const isEditing = useMemo(() => action === "edit", [action]);
    return (
        <div className="w-full border-b border-border" {...props}>
            <div className="inline-flex divide-x border-r border-border">
                {isEditing ? (
                    <Fragment>
                        <Button variant="secondary" className="gap-2" onClick={() => setAction(null)}>
                            <XIcon size={16} className="text-destructive" />
                            <span>Cancel</span>
                        </Button>
                        <Button variant="ghost" className="gap-2" disabled={!isEditing}>
                            <SaveIcon size={16} />
                            <span>Save</span>
                        </Button>
                        <Button variant="ghost" className="gap-2" disabled={!isEditing}>
                            <NewspaperIcon size={16} />
                            <span>Publish</span>
                        </Button>
                    </Fragment>
                ) : (
                    <Button variant={isEditing ? "secondary" : "ghost"} className="gap-2" onClick={() => setAction("edit")}>
                        <PencilIcon size={16} />
                        <span>Edit</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

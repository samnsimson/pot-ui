"use client";
import { FC, Fragment, HTMLAttributes, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, LoaderIcon, NewspaperIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { client } from "@/actions/client";
import { useFeedback } from "@/hooks/use-feedback";

interface ContentActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
    appId: string | null;
    contentId: string | null;
    [x: string]: any;
}

export const ContentActionButtons: FC<ContentActionButtonsProps> = ({ appId, contentId, ...props }) => {
    const [action, setAction] = useQueryState("action");
    const [downloading, setDownloading] = useState(false);
    const isEditing = useMemo(() => action === "edit", [action]);
    const { feedbackFailure, feedbackSuccess } = useFeedback();

    const download = (url: string, filename: string) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    const exportContent = async ({ appId, contentId }: { appId: string | null; contentId: string | null }) => {
        try {
            if (!appId || !contentId) return;
            setDownloading(true);
            const response = (await client.exportContent(appId, contentId)) as any;
            const blob = new Blob([response], { type: "application/json" });
            const url = window.URL.createObjectURL(blob);
            download(url, `content-${contentId}.json`);
            feedbackSuccess({ title: "Success!", description: "Your dowonload should begin shortly" });
        } catch (error) {
            console.log("🚀 ~ exportContent ~ error:", error);
            feedbackFailure({ title: "Error!", description: "Unable to download the file" });
        } finally {
            setDownloading(false);
        }
    };

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
                    <Fragment>
                        <Button variant={isEditing ? "secondary" : "ghost"} className="gap-2" onClick={() => setAction("edit")}>
                            <PencilIcon size={16} />
                            <span>Edit</span>
                        </Button>
                        <Button variant="ghost" className="gap-2" disabled={downloading} onClick={() => exportContent({ appId, contentId })}>
                            {downloading ? <LoaderIcon size={16} className="animate-spin" /> : <DownloadIcon size={16} />}
                            <span>Export</span>
                        </Button>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

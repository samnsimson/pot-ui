"use client";
import { FC, Fragment, HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { DownloadIcon, LoaderIcon, NewspaperIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useFeedback } from "@/hooks/use-feedback";
import { api } from "@/lib/api/client";

interface ContentActionButtonsProps extends HTMLAttributes<HTMLDivElement> {
    appId: string | null;
    contentId: string | null;
    isFormMode: boolean;
    isUpdating: boolean;
    [x: string]: any;
}

const Spinner = () => <LoaderIcon size={16} className="animate-spin" />;

export const ContentActionButtons: FC<ContentActionButtonsProps> = ({ appId, isFormMode, isUpdating, onCancel, contentId, ...props }) => {
    const [action, setAction] = useQueryState("action");
    const [downloading, setDownloading] = useState(false);
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
            const response = (await api.content.exportContent(appId, contentId)) as any;
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
        <div className="w-full" {...props}>
            <div className="inline-flex divide-x border-r border-border">
                {isFormMode ? (
                    <Fragment>
                        <Button type="button" variant="secondary" className="gap-2" onClick={() => onCancel(null)}>
                            <XIcon size={16} className="text-destructive" />
                            <span>Cancel</span>
                        </Button>
                        <Button type="submit" variant="ghost" className="gap-2" disabled={!isFormMode || isUpdating}>
                            {isUpdating ? <Spinner /> : <SaveIcon size={16} />}
                            <span>Save</span>
                        </Button>
                        <Button type="button" variant="ghost" className="gap-2" disabled={!isFormMode}>
                            <NewspaperIcon size={16} />
                            <span>Publish</span>
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button type="button" variant={isFormMode ? "secondary" : "ghost"} className="gap-2" onClick={() => setAction("edit")}>
                            <PencilIcon size={16} />
                            <span>Edit</span>
                        </Button>
                        <Button type="button" variant="ghost" className="gap-2" disabled={downloading} onClick={() => exportContent({ appId, contentId })}>
                            {downloading ? <Spinner /> : <DownloadIcon size={16} />}
                            <span>Export</span>
                        </Button>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

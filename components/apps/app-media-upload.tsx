"use client";
import { FC, HTMLAttributes, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImageUpIcon, MousePointerClickIcon, UploadIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Api } from "@/lib/api/client";
import { env } from "@/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationKeys } from "@/constants/mutation-keys";
import { useAppContext } from "@/context/apps-context";
import { queryKeys } from "@/constants/query-keys";
import { MediaResponse } from "@/api/client";
import { useFeedback } from "@/hooks/use-feedback";

interface AppMediaUploadProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppMediaUpload: FC<AppMediaUploadProps> = ({ ...props }) => {
    const api = new Api({ basePath: env.NEXT_PUBLIC_BASE_PATH });
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const { feedbackSuccess, feedbackFailure } = useFeedback();
    const queryClient = useQueryClient();
    const { appData } = useAppContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setFile(file);
    };

    const { mutate: upload, isPending } = useMutation({
        mutationKey: [mutationKeys.UPLOAD_MEDIA],
        mutationFn: api.uploadMedia,
        onError: () => feedbackFailure({ title: "Error!", description: "Unable to upload the file" }),
        onSuccess: async (data) => {
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (file) setFile(null);
            await queryClient.setQueryData([queryKeys.LIST_APP_MEDIA, appData?.slug], (medias: Array<MediaResponse>) => [...medias, data]);
            feedbackSuccess({ title: "Success", description: "File uploaded successfully" });
        },
    });

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex min-h-48 flex-col items-center justify-center space-y-6">
                <ImageUpIcon size={42} className="text-input" />
                <h2>{file?.name || "You have not uploaded any media"}</h2>
                <Input ref={fileInputRef} accept="image/*" type="file" className="hidden" onChange={handleFileChange} />
                {file ? (
                    <Button variant="success" disabled={isPending} isLoading={isPending} onClick={() => appData && upload({ appId: appData.id, file })}>
                        <UploadIcon size={16} /> Upload Media
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                        <MousePointerClickIcon size={16} /> Select file to upload
                    </Button>
                )}
            </div>
        </div>
    );
};

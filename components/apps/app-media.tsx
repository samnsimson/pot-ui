"use client";
import { useAppContext } from "@/context/apps-context";
import type { FC, HTMLAttributes } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AppMediaUpload } from "./app-media-upload";
import { useModal } from "@/context/modal-context";
import { MediaResponse } from "@/api/client";
import { ImageViewer } from "./app-media-viewer";

interface AppMediaListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppMediaList: FC<AppMediaListProps> = ({ className, ...props }) => {
    const { appMedia } = useAppContext();
    const { openModal } = useModal({ size: "4xl" });

    const openImageViewer = (media: MediaResponse) => {
        openModal({ title: media.name, render: () => <ImageViewer media={media} /> });
    };

    if (!appMedia.length) return <AppMediaUpload />;
    return (
        <div {...props} className={`grid grid-cols-3 gap-3 shadow-none sm:grid-cols-6 md:grid-cols-12 ${className || ""}`}>
            {appMedia.map((media) => (
                <Card
                    key={media.id}
                    onClick={() => openImageViewer(media)}
                    className="cursor-pointer overflow-clip rounded-md ring ring-transparent ring-offset-1 hover:ring-success"
                >
                    <CardContent className="p-0">
                        <AspectRatio ratio={1 / 1}>
                            <div className="relative h-full w-full">
                                <Image src={media.url || ""} alt={media.alt_text || ""} title={media.name} fill className="object-cover" />
                            </div>
                        </AspectRatio>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

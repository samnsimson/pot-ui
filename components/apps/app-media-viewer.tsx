"use client";
import { MediaResponse } from "@/api/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PenLineIcon, SaveIcon, TrashIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { FC, HTMLAttributes, useState } from "react";

interface ImageViewerProp extends HTMLAttributes<HTMLDivElement> {
    media: MediaResponse;
}
export const ImageViewer: FC<ImageViewerProp> = ({ media, ...prop }) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div className="grid grid-cols-12 gap-3" {...prop}>
            <div className="relative col-span-6 overflow-clip rounded-md">
                <AspectRatio ratio={1 / 1}>
                    <Image src={media.url || ""} alt={media.alt_text || ""} title={media.name} fill className="object-cover" />,
                </AspectRatio>
            </div>
            <div className="col-span-6 flex flex-col">
                <div className="flex-grow space-y-3">
                    <div className="flex-col space-y-1">
                        <Label className="font-semibold" htmlFor="media-caption">
                            Caption
                        </Label>
                        <Input id="media-caption" type="text" defaultValue={media.caption ?? ""} readOnly={!isEditing} />
                    </div>
                    <div className="flex-col space-y-1">
                        <Label className="font-semibold" htmlFor="media-alt">
                            Alt Text
                        </Label>
                        <Input id="media-alt" type="text" defaultValue={media.alt_text ?? ""} readOnly={!isEditing} />
                    </div>
                    <div className="flex-col space-y-1">
                        <Label className="font-semibold" htmlFor="media-url">
                            URL
                        </Label>
                        <Input id="media-url" type="text" defaultValue={media.url ?? ""} readOnly />
                    </div>
                </div>
                <div className="mt-auto">
                    <div className="flex space-x-3">
                        {!isEditing ? (
                            <>
                                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                                    <PenLineIcon /> Edit
                                </Button>
                                <Button variant="destructive" className="w-full">
                                    <TrashIcon /> Delete
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" className="w-full" onClick={() => setIsEditing(false)}>
                                    <XIcon /> Cancel
                                </Button>
                                <Button variant="success" className="w-full">
                                    <SaveIcon /> Save
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

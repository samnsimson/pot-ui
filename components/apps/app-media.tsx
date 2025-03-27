"use client";
import { useAppContext } from "@/context/apps-context";
import type { FC, HTMLAttributes } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AppMediaListProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppMediaList: FC<AppMediaListProps> = ({ className, ...props }) => {
    const { appMedia } = useAppContext();
    return (
        <div {...props} className={`grid grid-cols-3 gap-3 shadow-none sm:grid-cols-6 md:grid-cols-12 ${className || ""}`}>
            {appMedia.map((media) => (
                <Card key={media.id} className="cursor-pointer overflow-clip rounded-md ring ring-transparent ring-offset-1 hover:ring-success">
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

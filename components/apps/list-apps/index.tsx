"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FolderIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { schemas } from "@/lib/api-client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CreateAppComponent } from "@/components/create-app";
import { useDrawer } from "@/context/drawer-context";

interface ListAppsProps extends HTMLAttributes<HTMLDivElement> {
    apps: Array<z.infer<typeof schemas.AppOutSchema>>;
}

export const ListApps: FC<ListAppsProps> = ({ apps, ...props }) => {
    const { openDrawer } = useDrawer();
    return (
        <div className="grid grid-cols-12 gap-6" {...props}>
            {apps.map((app) => (
                <div key={app.id} className="col-span-2 border border-border p-6 group">
                    <AspectRatio ratio={1 / 1}>
                        <Link href={String(app.name)} className="flex flex-col items-center justify-center h-full w-full gap-3">
                            <FolderIcon size={48} className="text-border group-hover:text-sky-300" />
                            <p className="group-hover:font-semibold">{app.name}</p>
                        </Link>
                    </AspectRatio>
                </div>
            ))}
            <div className="col-span-2">
                <AspectRatio
                    ratio={1 / 1}
                    onClick={() => openDrawer({ title: "Create New App", render: ({ isOpen }) => <CreateAppComponent isOpen={isOpen} /> })}
                >
                    <Button variant="secondary" className="flex flex-col items-center justify-center h-full w-full gap-3 border-dashed border-2">
                        <PlusCircleIcon size={48} className="text-gray-400 " />
                        <p className="">Create new App</p>
                    </Button>
                </AspectRatio>
            </div>
        </div>
    );
};

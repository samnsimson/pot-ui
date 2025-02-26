"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FolderIcon, LayoutGridIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { schemas } from "@/lib/api";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CreateAppComponent } from "@/components/create-app";
import { useDrawer } from "@/context/drawer-context";
import { GridView } from "@/components/grid-view";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/http-client";

interface ListAppsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

interface AppComponentProps extends HTMLAttributes<HTMLDivElement> {
    app: z.infer<typeof schemas.AppOutSchema>;
}

const AppComponent: FC<AppComponentProps> = ({ app }) => {
    return (
        <div className="border border-border p-6 group">
            <AspectRatio ratio={1 / 1}>
                <Link href={`app/${app.id}`} className="flex flex-col items-center justify-center h-full w-full gap-3">
                    <FolderIcon size={48} className="text-border group-hover:text-sky-300" />
                    <p className="group-hover:font-semibold">{app.name}</p>
                </Link>
            </AspectRatio>
        </div>
    );
};

const SuffixComponent: FC<{ trigger: () => void }> = ({ trigger }) => {
    return (
        <AspectRatio ratio={1 / 1}>
            <Button variant="secondary" className="flex flex-col items-center justify-center h-full w-full gap-3" onClick={() => trigger()}>
                <PlusCircleIcon size={48} className="text-gray-400" />
                <p>Create New App</p>
            </Button>
        </AspectRatio>
    );
};

export const ListApps: FC<ListAppsProps> = ({ ...props }) => {
    const { openDrawer } = useDrawer({
        title: "Create New App",
        description: "Create a new app",
        render: ({ isOpen }) => <CreateAppComponent isOpen={isOpen} />,
    });

    const { data: apps } = useQuery({ queryKey: ["getApps"], queryFn: api.getApps });
    return (
        <div {...props}>
            <GridView
                gap="md"
                data={apps || []}
                title="Apps"
                icon={LayoutGridIcon}
                columns={{ sm: 2, md: 6 }}
                renderItem={(app) => <AppComponent app={app} />}
                description="List of all the apps from the website"
                renderSuffix={() => <SuffixComponent trigger={openDrawer} />}
                fallback={{ text: "Create App", action: openDrawer }}
            />
        </div>
    );
};

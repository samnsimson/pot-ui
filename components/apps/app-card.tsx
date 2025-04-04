"use client";

import { useMemo, type FC } from "react";
import Link from "next/link";
import { FolderIcon, MoreHorizontal, ExternalLink, Edit, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { App } from "@/lib/types";
import { AppOutSchema } from "@/api/client";

interface AppCardProps {
    app: AppOutSchema;
    viewMode: "grid" | "list";
    onEdit?: (app: AppOutSchema) => void;
    onDelete?: (app: AppOutSchema) => void;
}

export const AppCard: FC<AppCardProps> = ({ app, viewMode, onEdit, onDelete }) => {
    const isGridView = useMemo(() => viewMode === "grid", [viewMode]);
    return (
        <Card className={cn("group rounded-none shadow-none transition-all duration-200 hover:border-primary/50", isGridView ? "h-full" : "flex items-center")}>
            {isGridView ? <GridViewCard app={app} onEdit={onEdit} onDelete={onDelete} /> : <ListViewCard app={app} onEdit={onEdit} onDelete={onDelete} />}
        </Card>
    );
};

const GridViewCard: FC<Omit<AppCardProps, "viewMode">> = ({ app, onEdit, onDelete }) => {
    return (
        <div className="relative">
            <div className="absolute right-2 top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <AppActions app={app} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <AspectRatio ratio={1 / 1}>
                <Link href={`/dashboard/apps/${app.slug}/content`} className="group flex h-full w-full flex-col items-center justify-center gap-3 p-6">
                    <div className="rounded-full p-4 transition-all duration-150 group-hover:bg-accent">
                        <FolderIcon size={40} className="text-gray-400 group-hover:text-gray-400" />
                    </div>
                    <p className="line-clamp-1 overflow-hidden text-ellipsis text-center font-medium group-hover:font-semibold">{app.name}</p>
                </Link>
            </AspectRatio>
        </div>
    );
};

const ListViewCard: FC<Omit<AppCardProps, "viewMode">> = ({ app, onEdit, onDelete }) => {
    return (
        <div className="group flex w-full items-center p-4">
            <div className="mr-4 rounded-full p-3 transition-all duration-150 group-hover:bg-accent">
                <FolderIcon size={24} className="text-primary" />
            </div>

            <div className="min-w-0 flex-1">
                <Link href={`/dashboard/apps/${app.slug}/content`} className="hover:text-primary">
                    <h3 className="line-clamp-1 font-medium group-hover:font-semibold">{app.name}</h3>
                </Link>
                <p className="line-clamp-1 text-sm text-muted-foreground">{app.slug}</p>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                    <Link href={`/dashboard/apps/${app.slug}/content`}>
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Open app</span>
                    </Link>
                </Button>

                <AppActions app={app} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    );
};

const AppActions: FC<Omit<AppCardProps, "viewMode">> = ({ app, onEdit, onDelete }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(app)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                )}
                {onDelete && (
                    <DropdownMenuItem onClick={() => onDelete(app)} className="text-destructive focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

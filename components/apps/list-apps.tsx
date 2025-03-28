"use client";
import { PlusCircleIcon } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateAppComponent } from "@/components/create-app";
import { useDrawer } from "@/context/drawer-context";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { PageLoader } from "../loader/page-loader";
import { Card } from "@/components/ui/card";
import { useQueryState } from "nuqs";
import { ErrorCard } from "../error-card";
import { Input } from "@/components/ui/input";
import { AppCard } from "./app-card";
import { EmptyApps } from "./empty-apps";
import { ViewToggle } from "./view-toggle";
import { Api } from "@/lib/api/client";
import { AppOutSchema } from "@/api/client";
import { env } from "@/env";

interface ListAppsProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListApps: FC<ListAppsProps> = ({ ...props }) => {
    const api = new Api({ basePath: env.NEXT_PUBLIC_BASE_PATH });
    const title = "Create New App";
    const description = "Create a new app";
    const [viewMode, setViewMode] = useState<"grid" | "list">(() => (localStorage.getItem("viewMode") as any) ?? "grid");
    const [searchQuery, setSearchQuery] = useQueryState("q");
    const { openDrawer } = useDrawer({ title, description, render: ({ isOpen }) => <CreateAppComponent isOpen={isOpen} /> });
    const { data, error, isError } = useQuery({ queryKey: [queryKeys.GET_APPS], queryFn: api.listApps });
    const [appsList, setAppsList] = useState<Array<AppOutSchema>>([]);

    useEffect(() => {
        if (data && !searchQuery) return setAppsList(data);
        if (data && searchQuery) {
            setAppsList(
                data.filter((app) => {
                    const includesAppName = app.name.toLowerCase().includes(searchQuery.toLowerCase());
                    const includesAppSlug = app.slug.toLowerCase().includes(searchQuery.toLowerCase());
                    return includesAppName || includesAppSlug;
                }),
            );
        }
    }, [data, searchQuery]);

    const handleEditApp = (app: AppOutSchema) => {
        console.log("Edit app:", app);
    };

    const handleDeleteApp = (app: AppOutSchema) => {
        console.log("Delete app:", app);
    };

    if (isError) return <ErrorCard />;
    if (!data) return <PageLoader />;
    if (!data.length) return <EmptyApps onCreateApp={openDrawer} />;

    return (
        <div className="space-y-6" {...props}>
            <div className="flex w-full items-center justify-between gap-3 px-4">
                <Input placeholder="Search apps..." className="max-w-xl" value={searchQuery || ""} onChange={(e) => setSearchQuery(e.target.value || null)} />
                <div className="flex items-center space-x-3">
                    <ViewToggle onChange={setViewMode} defaultMode={viewMode} />
                    <Button variant="success" onClick={openDrawer}>
                        <PlusCircleIcon size={16} />
                        <span>Create new app</span>
                    </Button>
                </div>
            </div>

            <div className="px-4">
                {appsList?.length === 0 && searchQuery ? (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No apps found matching &quot;{searchQuery}&quot;</p>
                    </Card>
                ) : (
                    <div
                        className={
                            viewMode === "grid"
                                ? "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
                                : "grid grid-cols-1 gap-3"
                        }
                    >
                        {appsList?.map((app) => <AppCard key={app.id} app={app} viewMode={viewMode} onEdit={handleEditApp} onDelete={handleDeleteApp} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

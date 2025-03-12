"use client";
import { useAppContext } from "@/context/apps-context";
import { FC, HTMLAttributes, useState } from "react";
import { PageLoader } from "../loader/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppUsers } from "./app-users";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { roles } from "@/lib/utils";
import { SectionTitle } from "../section-title";
import { BoxIcon, DatabaseIcon, PencilIcon, PlusIcon, SettingsIcon, TrashIcon, UsersIcon } from "lucide-react";
import { FolderTree } from "../folder-tree";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/context/modal-context";
import { ContentCreateForm } from "../form/content-create-form";

interface AppDetailProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppDetail: FC<AppDetailProps> = ({ ...props }) => {
    const { appData, appContent, deleteApp, isDeleting } = useAppContext();
    const { openModal } = useModal({ title: "New Modal", description: "New modal description", render: () => <ContentCreateForm /> });
    const { data: session } = useSession();

    if (!appData) return <PageLoader />;

    return (
        <div className="h-full" {...props}>
            <div className="flex flex-col h-full">
                <SectionTitle title={appData.name} icon={BoxIcon} description={`secret: ${appData.secret}`} />
                <Tabs defaultValue="content" className="w-full flex flex-col flex-1">
                    <TabsList>
                        <TabsTrigger value="content">
                            <DatabaseIcon size={16} />
                            <span>Content</span>
                        </TabsTrigger>
                        <TabsTrigger value="users">
                            <UsersIcon size={16} />
                            <span>Users</span>
                        </TabsTrigger>
                        <TabsTrigger value="settings">
                            <SettingsIcon size={16} />
                            <span>Settings</span>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="flex-1">
                        <div className="grid grid-cols-12 h-full">
                            <div className="col-span-3 md:col-span-2 border-r border-border flex flex-col">
                                <ScrollArea className="flex-1">
                                    <FolderTree data={appContent} onActiveStateChange={(prop) => console.log(prop)} className="h-full" />
                                </ScrollArea>
                                <div className="flex divide-x border-t border-border">
                                    <Button className="w-full rounded-none" variant="ghost" onClick={() => openModal()}>
                                        <PlusIcon size={16} />
                                    </Button>
                                    <Button className="w-full rounded-none" variant="ghost">
                                        <PencilIcon size={16} />
                                    </Button>
                                    <Button className="w-full rounded-none" variant="ghost">
                                        <TrashIcon size={16} />
                                    </Button>
                                </div>
                            </div>
                            <div className="col-span-9 md:col-span-10"></div>
                        </div>
                    </TabsContent>
                    <TabsContent value="users" className="flex-1">
                        <AppUsers appId={appData.id} />
                    </TabsContent>
                    <TabsContent value="settings" className="gap-6 flex-1">
                        {roles.isSuperAdmin(session) && (
                            <Button variant="destructive" isLoading={isDeleting} onClick={() => deleteApp(appData.id)}>
                                Delete App
                            </Button>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

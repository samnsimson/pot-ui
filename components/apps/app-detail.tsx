"use client";
import { useAppContext } from "@/context/apps-view-context";
import { FC, HTMLAttributes, useState } from "react";
import { PageLoader } from "../loader/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppUsers } from "./app-users";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { roles } from "@/lib/utils";
import { SectionTitle } from "../section-title";
import { BoxIcon, DatabaseIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { FolderTree } from "../folder-tree";

interface AppDetailProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppDetail: FC<AppDetailProps> = ({ ...props }) => {
    const { appData, deleteApp, isDeleting } = useAppContext();
    const { data: session } = useSession();

    const [folderData, setFolderData] = useState([
        {
            name: "src",
            isFolder: true,
            children: [
                { name: "components", isFolder: true, children: [{ name: "Button.tsx", isFolder: false }] },
                { name: "utils.ts", isFolder: false },
            ],
        },
        {
            name: "public",
            isFolder: true,
            children: [{ name: "index.html", isFolder: false }],
        },
    ]);

    if (!appData) return <PageLoader />;

    return (
        <div className="h-full" {...props}>
            <div className="flex flex-col h-full">
                <SectionTitle title={appData.name} icon={BoxIcon} description={`secret: ${appData.secret}`} />
                <Tabs defaultValue="content" className="w-full h-full">
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
                    <TabsContent value="content" className="h-full">
                        <div className="grid grid-cols-12 h-full">
                            <FolderTree data={folderData} className="col-span-2 border-r border-border" />
                            <div className="col-span-10"></div>
                        </div>
                    </TabsContent>
                    <TabsContent value="users">
                        <AppUsers appId={appData.id} />
                    </TabsContent>
                    <TabsContent value="settings" className="gap-6">
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

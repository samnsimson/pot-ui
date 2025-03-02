"use client";
import { useAppContext } from "@/context/apps-view-context";
import { FC, HTMLAttributes } from "react";
import { PageLoader } from "../loader/page-loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppDetailProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppDetail: FC<AppDetailProps> = ({ ...props }) => {
    const { appData } = useAppContext();

    if (!appData) return <PageLoader />;

    return (
        <div {...props}>
            <div className="flex flex-col gap-4">
                <h2>{appData.name}</h2>

                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Settings</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <div className="flex gap-3 items-center">
                            <span>Secret: </span>
                            <pre className="bg-accent p-2 rounded border-border">{appData.secret}</pre>
                        </div>
                    </TabsContent>
                    <TabsContent value="users">
                        {appData.users.map((user) => (
                            <p key={user.id}>{user.email}</p>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

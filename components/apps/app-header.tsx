"use client";
import { useAppContext } from "@/context/apps-context";
import { FC, HTMLAttributes } from "react";
import { SectionTitle } from "../section-title";
import { BoxIcon } from "lucide-react";
import { App } from "@/lib/types";
import { Badge } from "../ui/badge";

interface AppHeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const getAppName = (app: App) => {
    return (
        <span className="flex items-center gap-3">
            <span>{app.name}</span>
            <Badge variant={app.is_active ? "success" : "destructive"}>{app.is_active ? "Active" : "Stale"}</Badge>
        </span>
    );
};

export const AppHeader: FC<AppHeaderProps> = ({ ...props }) => {
    const { appData } = useAppContext();
    return appData && <SectionTitle sectionTitle={getAppName(appData)} icon={BoxIcon} description={`secret: ${appData.secret}`} />;
};

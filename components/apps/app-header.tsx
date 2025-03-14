"use client";
import { useAppContext } from "@/context/apps-context";
import { FC, HTMLAttributes } from "react";
import { SectionTitle } from "../section-title";
import { BoxIcon } from "lucide-react";

interface AppHeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const AppHeader: FC<AppHeaderProps> = ({ ...props }) => {
    const { appData } = useAppContext();
    return appData && <SectionTitle title={appData.name} icon={BoxIcon} description={`secret: ${appData.secret}`} />;
};

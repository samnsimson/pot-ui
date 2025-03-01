"use client";
import { queryKeys } from "@/constants/query-keys";
import { schemas } from "@/lib/api";
import { api } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { z } from "zod";

interface AppsViewContextInterface {
    appId: string;
    appData?: z.infer<typeof schemas.AppOutSchema>;
}

interface ProviderProps extends PropsWithChildren {
    appId: string;
}

const AppsViewContext = createContext<AppsViewContextInterface>({
    appId: "",
    appData: undefined,
});

export const AppsViewContextProvider: FC<ProviderProps> = ({ children, appId }) => {
    const { data } = useQuery({ queryKey: [queryKeys.GET_APPS_DETAIL, appId], queryFn: () => api.getApp(appId) });
    return <AppsViewContext.Provider value={{ appId, appData: data }}>{children}</AppsViewContext.Provider>;
};

export const useAppsView = () => useContext(AppsViewContext);

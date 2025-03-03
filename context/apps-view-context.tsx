"use client";
import { client } from "@/actions/client-actions";
import { queryKeys } from "@/constants/query-keys";
import { schemas } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";
import { z } from "zod";

interface AppsViewContextInterface {
    appId: string;
    appData?: z.infer<typeof schemas.AppOutSchema>;
    error: Error | null;
}

interface ProviderProps extends PropsWithChildren {
    appId: string;
}

const AppsViewContext = createContext<AppsViewContextInterface>({
    appId: "",
    appData: undefined,
    error: null,
});

export const AppsViewContextProvider: FC<ProviderProps> = ({ children, appId }) => {
    const { data, error } = useQuery({ queryKey: [queryKeys.GET_APPS_DETAIL, appId], queryFn: () => client.getApp(appId) });
    const contextValue = useMemo(() => ({ appId, error, appData: data }), [appId, error, data]);

    if (error) throw error;
    return <AppsViewContext.Provider value={contextValue}>{children}</AppsViewContext.Provider>;
};

export const useAppContext = () => useContext(AppsViewContext);

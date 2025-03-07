"use client";
import { client } from "@/actions/client-actions";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { schemas } from "@/lib/api";
import { App } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";
import { z } from "zod";

interface AppsViewContextInterface {
    appId: string;
    appData?: z.infer<typeof schemas.AppOutSchema>;
    error: Error | null;
    deleteApp: (id: string) => void;
    isDeleting: boolean;
}

interface ProviderProps extends PropsWithChildren {
    appId: string;
}

const AppsViewContext = createContext<AppsViewContextInterface>({
    appId: "",
    appData: undefined,
    error: null,
    deleteApp: () => {},
    isDeleting: false,
});

export const AppsViewContextProvider: FC<ProviderProps> = ({ children, appId }) => {
    const { feedbackSuccess, feedbackFailure } = useFeedback();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data, error } = useQuery({ queryKey: [queryKeys.GET_APPS_DETAIL, appId], queryFn: () => client.getApp(appId) });

    const { mutate: deleteApp, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => client.deleteApp(id),
        onError: () => feedbackFailure({ title: "Oops!", description: "Error deleting the app!" }),
        onSuccess: (data) => {
            queryClient.setQueryData([queryKeys.GET_APPS], (state: Array<App>) => state.filter((x) => x.id !== data.id));
            router.push("/");
            feedbackSuccess({ title: "Success", description: "App deleted successfully!" });
        },
    });

    const context = useMemo(() => ({ appId, error, deleteApp, appData: data, isDeleting }), [appId, error, deleteApp, data, isDeleting]);

    if (error) throw error;
    return <AppsViewContext.Provider value={context}>{children}</AppsViewContext.Provider>;
};

export const useAppContext = () => useContext(AppsViewContext);

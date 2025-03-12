"use client";
import { client } from "@/actions/client";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { App, Content } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";

interface AppsContextInterface {
    slug: string;
    appData?: App;
    appContent: Array<Content>;
    error: Error | null;
    deleteApp: (id: string) => void;
    isDeleting: boolean;
}

interface ProviderProps extends PropsWithChildren {
    slug: string;
}

const AppsContext = createContext<AppsContextInterface>({
    slug: "",
    appData: undefined,
    appContent: [],
    error: null,
    deleteApp: () => {},
    isDeleting: false,
});

export const AppsContextProvider: FC<ProviderProps> = ({ children, slug }) => {
    const { feedbackSuccess, feedbackFailure } = useFeedback();
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data, error } = useQuery({ queryKey: [queryKeys.GET_APPS_DETAIL, slug], queryFn: () => client.getApp(slug) });
    const { data: appContent } = useQuery({ queryKey: [queryKeys.GET_APP_CONTENT, slug], queryFn: () => client.getContent(data!.id), enabled: !!data });

    const { mutate: deleteApp, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => client.deleteApp(id),
        onError: () => feedbackFailure({ title: "Oops!", description: "Error deleting the app!" }),
        onSuccess: (data) => {
            queryClient.setQueryData([queryKeys.GET_APPS], (state: Array<App>) => state.filter((x) => x.id !== data.id));
            router.push("/");
            feedbackSuccess({ title: "Success", description: "App deleted successfully!" });
        },
    });

    const context = useMemo(
        () => ({ slug, error, deleteApp, appData: data, appContent: appContent ?? [], isDeleting }),
        [slug, error, deleteApp, data, appContent, isDeleting],
    );

    if (error) throw error;
    return <AppsContext.Provider value={context}>{children}</AppsContext.Provider>;
};

export const useAppContext = () => useContext(AppsContext);

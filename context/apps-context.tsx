"use client";
import { client } from "@/actions/client";
import { PageLoader } from "@/components/loader/page-loader";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { App, AppUsers, Content, Media } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";

interface AppsContextInterface {
    appData: App | undefined;
    appContent: Array<Content>;
    appUsers: Array<AppUsers>;
    appMedia: Array<Media>;
    error: Error | null;
    deleteApp: (id: string) => void;
    isDeleting: boolean;
}

interface ProviderProps extends PropsWithChildren {
    [x: string]: any;
}

const AppsContext = createContext<AppsContextInterface>({
    appData: undefined,
    appContent: [],
    appUsers: [],
    appMedia: [],
    error: null,
    deleteApp: () => {},
    isDeleting: false,
});

export const AppsContextProvider: FC<ProviderProps> = ({ children }) => {
    const router = useRouter();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const { feedbackSuccess, feedbackFailure } = useFeedback();
    const { GET_APPS, GET_APP_DETAIL, GET_APP_CONTENT, GET_APP_USERS, LIST_APP_MEDIA } = queryKeys;

    const { data: appData, error } = useQuery({ queryKey: [GET_APP_DETAIL, slug], queryFn: () => client.getApp(String(slug)), enabled: !!slug });
    const { data: appContent = [] } = useQuery({ queryKey: [GET_APP_CONTENT, slug], queryFn: () => client.getContent(appData!.id), enabled: !!appData });
    const { data: appUsers = [] } = useQuery({ queryKey: [GET_APP_USERS, slug], queryFn: () => client.getAppUsers(appData!.id), enabled: !!appData });
    const { data: appMedia = [] } = useQuery({ queryKey: [LIST_APP_MEDIA, slug], queryFn: () => client.listMedia({ appId: appData!.id }), enabled: !!appData });

    const { mutate: deleteApp, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => client.deleteApp(id),
        onError: () => feedbackFailure({ title: "Oops!", description: "Error deleting the app!" }),
        onSuccess: async (data) => {
            await queryClient.setQueryData([GET_APPS], (state: Array<App>) => state.filter((x) => x.id !== data.id));
            feedbackSuccess({ title: "Success", description: "App deleted successfully!" });
            router.push("/");
        },
    });

    const context = useMemo(
        () => ({ slug, error, deleteApp, appData, appContent, appUsers, appMedia, isDeleting }),
        [slug, error, deleteApp, appData, appContent, appUsers, appMedia, isDeleting],
    );

    if (error) throw error;
    if (!appData || !appContent) return <PageLoader />;
    return <AppsContext.Provider value={context}>{children}</AppsContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppsContext);
    if (!context) throw new Error("App context cannot be used outside of the provider");
    return context;
};

"use client";
import { AppOutSchema, MediaResponse, UserOutSchema } from "@/api/client";
import { PageLoader } from "@/components/loader/page-loader";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { api } from "@/lib/api/client";
import { App, Content } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";

interface AppsContextInterface {
    appData: AppOutSchema | undefined;
    appContent: Array<Content>;
    appUsers: Array<UserOutSchema>;
    appMedia: Array<MediaResponse>;
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

    const { data: appData, error } = useQuery({
        queryKey: [GET_APP_DETAIL, slug],
        queryFn: () => api.apps.getAppByIdOrSlug(String(slug)),
        select: ({ data }) => data,
        enabled: !!slug,
    });

    const { data: appContent = [] } = useQuery({
        queryKey: [GET_APP_CONTENT, slug],
        queryFn: () => api.content.getContent(appData!.id),
        select: ({ data }) => data,
        enabled: !!appData,
    });

    const { data: appUsers = [] } = useQuery({
        queryKey: [GET_APP_USERS, slug],
        queryFn: () => api.apps.getAppUsers(appData!.id),
        select: ({ data }) => data,
        enabled: !!appData,
    });

    const { data: appMedia = [] } = useQuery({
        queryKey: [LIST_APP_MEDIA, slug],
        queryFn: () => api.media.listAppMedia(appData!.id),
        select: ({ data }) => data,
        enabled: !!appData,
    });

    const { mutate: deleteApp, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => api.apps.deleteApp(id),
        onError: () => feedbackFailure({ title: "Oops!", description: "Error deleting the app!" }),
        onSuccess: async ({ data }) => {
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

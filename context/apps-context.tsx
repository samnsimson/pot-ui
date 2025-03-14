"use client";
import { client } from "@/actions/client";
import { PageLoader } from "@/components/loader/page-loader";
import { queryKeys } from "@/constants/query-keys";
import { useFeedback } from "@/hooks/use-feedback";
import { App, AppUsers, Content } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useMemo } from "react";

interface AppsContextInterface {
    appData?: App;
    appContent: Array<Content>;
    appUsers: Array<AppUsers>;
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
    error: null,
    deleteApp: () => {},
    isDeleting: false,
});

export const AppsContextProvider: FC<ProviderProps> = ({ children }) => {
    const router = useRouter();
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const { feedbackSuccess, feedbackFailure } = useFeedback();

    const { data: appData, error } = useQuery({ queryKey: [queryKeys.GET_APPS_DETAIL, slug], queryFn: () => client.getApp(String(slug)), enabled: !!slug });
    const { data: appContent } = useQuery({ queryKey: [queryKeys.GET_APP_CONTENT, slug], queryFn: () => client.getContent(appData!.id), enabled: !!appData });
    const { data: appUsers } = useQuery({ queryKey: [queryKeys.GET_APP_USERS, slug], queryFn: () => client.getAppUsers(appData!.id), enabled: !!appData });

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
        () => ({ slug, error, deleteApp, appData, appContent: appContent ?? [], appUsers: appUsers || [], isDeleting }),
        [slug, error, deleteApp, appData, appContent, appUsers, isDeleting],
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

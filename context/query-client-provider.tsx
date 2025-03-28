"use client";
import { FC, PropsWithChildren, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const queryClient = useMemo(() => {
        return new QueryClient({
            defaultOptions: {
                queries: { retry: false, staleTime: 1000 * 60 },
            },
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

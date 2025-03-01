"use client";
import { FC, PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 1000 * 60 } } }));
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

"use client";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "@/context/drawer-context";
import { QueryProvider } from "@/context/query-client-provider";
import { FC, PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

interface ProviderProps extends PropsWithChildren {
    [x: string]: any;
}

const Providers: FC<ProviderProps> = ({ children }) => {
    return (
        <NuqsAdapter>
            <SessionProvider>
                <QueryProvider>
                    <DrawerProvider>{children}</DrawerProvider>
                </QueryProvider>
            </SessionProvider>
        </NuqsAdapter>
    );
};
export default Providers;

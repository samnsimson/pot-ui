"use client";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "@/context/drawer-context";
import { QueryProvider } from "@/providers/query-client-provider";
import { FC, PropsWithChildren } from "react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SessionProvider>
            <QueryProvider>
                <DrawerProvider>{children}</DrawerProvider>
            </QueryProvider>
        </SessionProvider>
    );
};
export default Providers;

"use client";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "@/context/drawer-context";
import { QueryProvider } from "@/context/query-client-provider";
import { FC, PropsWithChildren } from "react";
import { ModalProvider } from "./modal-context";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NuqsAdapter>
            <SessionProvider>
                <QueryProvider>
                    <ModalProvider>
                        <DrawerProvider>{children}</DrawerProvider>
                    </ModalProvider>
                </QueryProvider>
            </SessionProvider>
        </NuqsAdapter>
    );
};
export default Providers;

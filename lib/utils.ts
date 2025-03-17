import { clsx, type ClassValue } from "clsx";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getToken = async () => {
    const session = await getSession();
    const token = session ? `Bearer ${session.accessToken}` : undefined;
    return token;
};

export const getTransactionId = () => {
    return `${Date.now()}${Math.floor(100000 + Math.random() * 900000)}`;
};

export const token = {
    get: () => window.localStorage.getItem("accessToken"),
    set: (token: string) => window.localStorage.setItem("accessToken", token),
};

export const roles = {
    isSuperAdmin: (session: Session | null) => {
        if (!session) return false;
        return session.role === "super_admin";
    },
};

export const isCurrentPath = (pathname: string | null, currentpath: string) => {
    return !!pathname && (pathname === currentpath || pathname.startsWith(currentpath));
};

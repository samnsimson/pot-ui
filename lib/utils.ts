import { clsx, type ClassValue } from "clsx";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getHeaders = async () => {
    const session = await getSession();
    const token = session ? `Bearer ${session.accessToken}` : undefined;
    return { "Content-Type": "application/json", Authorization: token };
};

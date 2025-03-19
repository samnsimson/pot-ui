import { clsx, type ClassValue } from "clsx";
import { getSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { env } from "@/env";

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

export const isCurrentPath = (pathname: string | null, currentpath: string) => {
    return !!pathname && (pathname === currentpath || pathname.startsWith(currentpath));
};

export const encrypt = (text: string): string => {
    const secretKey = env.NEXTAUTH_SECRET;
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export function decrypt(encryptedText: string): string {
    const secretKey = env.NEXTAUTH_SECRET;
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

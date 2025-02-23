"use server";
import { api, schemas } from "@/lib/api-client";
import { getHeaders } from "@/lib/server-utils";
import { cache } from "react";
import { z } from "zod";

export const getApp = cache(async (id: string) => {
    try {
        const headers = await getHeaders();
        return await api.get_app({ params: { id }, ...headers });
    } catch (error: any) {
        throw new Error(error.message);
    }
});

export const getApps = cache(async () => {
    try {
        const headers = await getHeaders();
        return await api.list_apps({ ...headers });
    } catch (error) {
        console.log("🚀 ~ getApps ~ error:", error);
        return [];
    }
});

export const createApp = cache(async (data: z.infer<typeof schemas.AppCreateSchema>) => {
    try {
        const headers = await getHeaders();
        return await api.create_app(data, { ...headers });
    } catch (error: any) {
        console.log("🚀 ~ createApp ~ error:", error);
        throw new Error(error.message);
    }
});

"use server";
import { api, schemas } from "@/lib/api-client";
import { getHeaders } from "@/lib/server-utils";
import { z } from "zod";

export const getApps = async () => {
    try {
        const headers = await getHeaders();
        return await api.get_apps({ ...headers });
    } catch (error) {
        console.log("🚀 ~ getApps ~ error:", error);
        return [];
    }
};

export const createApp = async (data: z.infer<typeof schemas.AppCreateSchema>) => {
    try {
        const headers = await getHeaders();
        return await api.create_app(data, { ...headers });
    } catch (error: any) {
        console.log("🚀 ~ createApp ~ error:", error);
        throw new Error(error.message);
    }
};

"use server";
import { api } from "@/lib/api-client";
import { getHeaders } from "@/lib/server-utils";

export const getApps = async () => {
    try {
        const headers = await getHeaders();
        return await api.get_apps({ ...headers });
    } catch (error) {
        console.log("🚀 ~ getApps ~ error:", error);
        return [];
    }
};

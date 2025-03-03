"use client";
import { createApiClient } from "@/lib/api";
import { axiosInstance } from "@/lib/axios-instance";
import { AppCreate } from "@/lib/types";

export const http = createApiClient("/data", { axiosInstance });

export const client = {
    getApp: async (id: string) => await http.get_app({ params: { id } }),
    getApps: async () => await http.list_apps(),
    createApp: async (data: AppCreate) => await http.create_app(data),
    getAppUsers: async (id: string) => await http.get_app_users({ params: { id } }),
};

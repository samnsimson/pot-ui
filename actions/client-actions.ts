"use client";
import { createApiClient } from "@/lib/api";
import { axiosInstance } from "@/lib/axios-instance";
import { AppCreate } from "@/lib/types";
import { AxiosError } from "axios";

export const http = createApiClient("/data", { axiosInstance });

const throwError = (err: AxiosError<Record<string, any>>) => {
    throw new Error(err?.response?.data["detail"] || "Something went wrong!");
};

export const client = {
    getApp: async (id: string) => http.get_app({ params: { id } }).catch(throwError),
    getApps: async () => http.list_apps().catch(throwError),
    createApp: async (data: AppCreate) => http.create_app(data).catch(throwError),
    getAppUsers: async (id: string) => http.get_app_users({ params: { id } }).catch(throwError),
    deleteApp: async (id: string) => http.delete_app(undefined, { params: { id } }),
};

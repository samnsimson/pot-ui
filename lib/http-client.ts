"use client";
import axiosInstance from "./axios-instance";
import { createApiClient, schemas } from "./api";
import { z } from "zod";

export const http = createApiClient("/data", { axiosInstance });

export const api = {
    getApp: async (id: string) => await http.get_app({ params: { id } }),
    getApps: async () => await http.list_apps(),
    createApp: async (data: z.infer<typeof schemas.AppCreateSchema>) => await http.create_app(data),
};

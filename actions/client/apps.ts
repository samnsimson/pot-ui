import { http } from "@/lib/http-client";
import { AppCreate } from "@/lib/types";

export const appsAction = {
    getApp: async (key: string) => http.get_app_by_id_or_slug({ params: { key } }),
    getApps: async () => http.list_apps(),
    createApp: async (data: AppCreate) => http.create_app(data),
    getAppUsers: async (id: string) => http.get_app_users({ params: { id } }),
    deleteApp: async (id: string) => http.delete_app(undefined, { params: { id } }),
};

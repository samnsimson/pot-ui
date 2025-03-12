import { http } from "@/lib/http-client";
import { ContentCreate } from "@/lib/types";

export const contentActions = {
    getContent: async (appId: string) => await http.get_content({ params: { app_id: appId } }),
    createContent: async (appId: string, data: ContentCreate) => await http.create_content(data, { params: { app_id: appId } }),
};

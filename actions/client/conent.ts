import { http } from "@/lib/http-client";
import { ContentCreate, ContentUpdate } from "@/lib/types";

export const contentActions = {
    getContent: async (appId: string) => await http.get_content({ params: { app_id: appId } }),
    createContent: async (appId: string, data: ContentCreate) => await http.create_content(data, { params: { app_id: appId } }),
    exportContent: async (app_id: string, content_id: string) => await http.export_content({ queries: { app_id, content_id } }).then((x) => JSON.stringify(x)),
    updateContent: async (app_id: string, content_id: string, data: ContentUpdate) => await http.update_content(data, { queries: { app_id, content_id } }),
};
